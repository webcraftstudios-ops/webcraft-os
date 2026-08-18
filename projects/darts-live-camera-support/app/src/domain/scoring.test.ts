import { describe, expect, it } from 'vitest';
import { createNumberedDart, MISS, OUTER_BULL, type DartSequence } from './darts';
import {
  applyTurn,
  correctLastTurn,
  undoLastTurn,
  validateTurnScore,
  type ApplyTurnInput,
} from './scoring';
import type { MatchState } from './types';

function createTestState(remainingScore1 = 501, remainingScore2 = 501): MatchState {
  return {
    match: {
      id: 'match-1',
      status: 'active',
      gameType: '501',
      startingScore: 501,
      currentPlayerId: 'p1',
      createdAt: '2026-07-13T00:00:00.000Z',
    },
    players: [
      { id: 'p1', name: 'Player 1' },
      { id: 'p2', name: 'Player 2' },
    ],
    playerScores: [
      { playerId: 'p1', remainingScore: remainingScore1 },
      { playerId: 'p2', remainingScore: remainingScore2 },
    ],
    turns: [],
    snapshots: [],
    corrections: [],
  };
}

function numbered(value: number, multiplier: number) {
  return createNumberedDart(value, multiplier);
}

describe('scoring domain logic', () => {
  describe('validateTurnScore', () => {
    it('accepts valid Quick Total scores from 0 through 180', () => {
      expect(validateTurnScore(0).valid).toBe(true);
      expect(validateTurnScore(60).valid).toBe(true);
      expect(validateTurnScore(180).valid).toBe(true);
    });

    it('rejects negative, decimal and above-maximum scores', () => {
      expect(validateTurnScore(-1).reason).toContain('negative');
      expect(validateTurnScore(20.5).reason).toContain('integer');
      expect(validateTurnScore(181).reason).toContain('exceed');
    });
  });

  describe('applyTurn', () => {
    it('preserves the existing Quick Total call and player-switch behaviour', () => {
      const { state, turn } = applyTurn({ state: createTestState(), score: 100 });

      expect(turn.entry).toEqual({ mode: 'quick-total' });
      expect(turn.enteredScore).toBe(100);
      expect(turn.confirmedScore).toBe(100);
      expect(turn.scoreBefore).toBe(501);
      expect(turn.scoreAfter).toBe(401);
      expect(state.playerScores[0].remainingScore).toBe(401);
      expect(state.match.currentPlayerId).toBe('p2');
    });

    it('derives a three-dart total inside applyTurn', () => {
      const darts = [numbered(20, 1), numbered(20, 3), numbered(20, 2)] as const satisfies DartSequence;
      const { turn } = applyTurn({
        state: createTestState(),
        entry: { mode: 'per-dart', darts },
      });

      expect(turn.entry).toEqual({ mode: 'per-dart', darts });
      expect(turn.enteredScore).toBe(120);
      expect(turn.confirmedScore).toBe(120);
      expect(turn.scoreAfter).toBe(381);
    });

    it('does not allow Per Dart callers to provide an independent score', () => {
      const darts = [numbered(20, 3)] as const satisfies DartSequence;

      // @ts-expect-error Per Dart derives its score from darts and cannot accept score.
      const invalidInput: ApplyTurnInput = {
        state: createTestState(),
        score: 60,
        entry: { mode: 'per-dart', darts },
      };

      expect(invalidInput.entry?.mode).toBe('per-dart');
    });

    it('finishes exactly on zero after one dart', () => {
      const darts = [numbered(10, 2)] as const satisfies DartSequence;
      const { state, turn } = applyTurn({
        state: createTestState(20),
        entry: { mode: 'per-dart', darts },
      });

      expect(turn.confirmedScore).toBe(20);
      expect(state.match.status).toBe('finished');
      expect(state.match.winnerPlayerId).toBe('p1');
      expect(state.match.currentPlayerId).toBe('p1');
    });

    it('finishes exactly on zero after two darts', () => {
      const darts = [numbered(20, 1), numbered(10, 2)] as const satisfies DartSequence;
      const { state, turn } = applyTurn({
        state: createTestState(40),
        entry: { mode: 'per-dart', darts },
      });

      expect(turn.confirmedScore).toBe(40);
      expect(state.playerScores[0].remainingScore).toBe(0);
      expect(state.match.status).toBe('finished');
    });

    it('preserves aggregate bust behaviour for Per Dart', () => {
      const darts = [numbered(20, 3)] as const satisfies DartSequence;
      const { state, turn } = applyTurn({
        state: createTestState(20),
        entry: { mode: 'per-dart', darts },
      });

      expect(turn.isBust).toBe(true);
      expect(turn.scoreBefore).toBe(20);
      expect(turn.scoreAfter).toBe(20);
      expect(state.playerScores[0].remainingScore).toBe(20);
      expect(state.match.currentPlayerId).toBe('p2');
    });

    it('supports a valid zero-value Per Dart turn containing a real MISS', () => {
      const darts = [MISS] as const satisfies DartSequence;
      const { turn, state } = applyTurn({
        state: createTestState(),
        entry: { mode: 'per-dart', darts },
      });

      expect(turn.confirmedScore).toBe(0);
      expect(turn.entry).toEqual({ mode: 'per-dart', darts });
      expect(state.match.currentPlayerId).toBe('p2');
    });

    it('rejects score application after the match is finished', () => {
      const state = createTestState(0);
      state.match.status = 'finished';
      expect(() => applyTurn({ state, score: 20 })).toThrow('not active');
    });
  });

  describe('undoLastTurn', () => {
    it('removes the complete Per Dart turn and restores the active player', () => {
      const darts = [OUTER_BULL, numbered(20, 3)] as const satisfies DartSequence;
      const { state } = applyTurn({
        state: createTestState(),
        entry: { mode: 'per-dart', darts },
      });

      expect(state.turns[0].entry.mode).toBe('per-dart');

      const undoneState = undoLastTurn(state);

      expect(undoneState.turns).toHaveLength(0);
      expect(undoneState.playerScores[0].remainingScore).toBe(501);
      expect(undoneState.match.currentPlayerId).toBe('p1');
    });

    it('does nothing when no turns exist', () => {
      const state = createTestState();
      expect(undoLastTurn(state)).toEqual(state);
    });
  });

  describe('correctLastTurn', () => {
    it('keeps a corrected Quick Total turn as Quick Total', () => {
      const { state } = applyTurn({ state: createTestState(), score: 100 });
      const { state: correctedState, correction } = correctLastTurn({
        state,
        newScore: 140,
        reason: 'Misclick',
      });

      expect(correction.oldScore).toBe(100);
      expect(correction.newScore).toBe(140);
      expect(correctedState.turns.at(-1)?.entry).toEqual({ mode: 'quick-total' });
      expect(correctedState.playerScores[0].remainingScore).toBe(361);
      expect(correctedState.corrections).toHaveLength(1);
    });

    it('converts a total-corrected Per Dart turn to Quick Total and removes dartdetails', () => {
      const darts = [numbered(20, 3), numbered(20, 3), numbered(20, 3)] as const satisfies DartSequence;
      const { state } = applyTurn({
        state: createTestState(),
        entry: { mode: 'per-dart', darts },
      });
      const { state: correctedState } = correctLastTurn({ state, newScore: 140 });
      const correctedTurn = correctedState.turns.at(-1);

      expect(correctedTurn?.confirmedScore).toBe(140);
      expect(correctedTurn?.entry).toEqual({ mode: 'quick-total' });
      expect(correctedTurn?.entry.mode === 'per-dart' ? correctedTurn.entry.darts : undefined).toBeUndefined();
    });

    it('preserves snapshotId when correcting a Per Dart turn by total', () => {
      const darts = [numbered(20, 1)] as const satisfies DartSequence;
      const { state } = applyTurn({
        state: createTestState(),
        entry: { mode: 'per-dart', darts },
        snapshotId: 'snapshot-1',
      });
      const { state: correctedState } = correctLastTurn({ state, newScore: 18 });

      expect(correctedState.turns.at(-1)?.snapshotId).toBe('snapshot-1');
      expect(correctedState.turns.at(-1)?.entry).toEqual({ mode: 'quick-total' });
    });
  });
});
