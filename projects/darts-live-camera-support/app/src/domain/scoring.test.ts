import { describe, it, expect } from 'vitest';
import {
  validateTurnScore,
  applyTurn,
  undoLastTurn,
  correctLastTurn,
} from './scoring';
import type { MatchState } from './types';

// Helper om snel een test state op te zetten
function createTestState(remainingScore1 = 501, remainingScore2 = 501): MatchState {
  return {
    match: {
      id: 'match-1',
      status: 'active',
      gameType: 501,
      startingScore: 501,
      currentPlayerId: 'p1',
      createdAt: new Date().toISOString(),
    },
    players: [
      { id: 'p1', name: 'Player 1', order: 1 },
      { id: 'p2', name: 'Player 2', order: 2 },
    ],
    playerScores: [
      { playerId: 'p1', remainingScore: remainingScore1 },
      { playerId: 'p2', remainingScore: remainingScore2 },
    ],
    turns: [],
    corrections: [],
  };
}

describe('scoring domain logic', () => {
  describe('validateTurnScore', () => {
    it('accepteert geldige scores (0 t/m 180)', () => {
      expect(validateTurnScore(0).valid).toBe(true);
      expect(validateTurnScore(60).valid).toBe(true);
      expect(validateTurnScore(180).valid).toBe(true);
    });

    it('verwerpt negatieve scores', () => {
      const result = validateTurnScore(-1);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('negative');
    });

    it('verwerpt scores hoger dan 180', () => {
      const result = validateTurnScore(181);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('exceed');
    });

    it('verwerpt decimale getallen', () => {
      const result = validateTurnScore(20.5);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('integer');
    });
  });

  describe('applyTurn', () => {
    it('verwerkt een normale worp en wisselt de beurt', () => {
      const initialState = createTestState(501, 501);
      const { state, turn } = applyTurn({ state: initialState, score: 100 });

      expect(turn.scoreBefore).toBe(501);
      expect(turn.scoreAfter).toBe(401);
      expect(turn.isBust).toBe(false);
      
      expect(state.playerScores[0].remainingScore).toBe(401);
      expect(state.match.currentPlayerId).toBe('p2'); // Beurt is gewisseld
      expect(state.turns).toHaveLength(1);
    });

    it('registreert een BUST wanneer de score onder 0 duikt', () => {
      const initialState = createTestState(20, 501);
      const { state, turn } = applyTurn({ state: initialState, score: 25 });

      expect(turn.isBust).toBe(true);
      expect(turn.scoreBefore).toBe(20);
      expect(turn.scoreAfter).toBe(20); // Score reset naar begin van beurt
      
      expect(state.playerScores[0].remainingScore).toBe(20);
      expect(state.match.currentPlayerId).toBe('p2'); // Beurt wel gewisseld
    });

    it('handelt exact op 0 uitgooien af en eindigt de match', () => {
      const initialState = createTestState(40, 501);
      const { state } = applyTurn({ state: initialState, score: 40 });

      expect(state.playerScores[0].remainingScore).toBe(0);
      expect(state.match.status).toBe('finished');
      expect(state.match.winnerPlayerId).toBe('p1');
      expect(state.match.currentPlayerId).toBe('p1'); // Geen beurtwissel bij winst
    });

    it('gooit een foutmelding als je probeert te scoren in een afgeronde match', () => {
      const initialState = createTestState(0, 501);
      initialState.match.status = 'finished';
      
      expect(() => applyTurn({ state: initialState, score: 20 })).toThrow('not active');
    });
  });

  describe('undoLastTurn', () => {
    it('draait de laatste beurt terug en herstelt de actieve speler', () => {
      const initialState = createTestState(501, 501);
      const { state: afterTurn1 } = applyTurn({ state: initialState, score: 100 });
      
      expect(afterTurn1.match.currentPlayerId).toBe('p2');
      
      const undoneState = undoLastTurn(afterTurn1);
      
      expect(undoneState.turns).toHaveLength(0);
      expect(undoneState.playerScores[0].remainingScore).toBe(501);
      expect(undoneState.match.currentPlayerId).toBe('p1');
    });

    it('doet niets als er geen beurten zijn', () => {
      const initialState = createTestState();
      const undoneState = undoLastTurn(initialState);
      expect(undoneState).toEqual(initialState);
    });
  });

  describe('correctLastTurn', () => {
    it('vervangt de laatste beurtscore en logt een correctie', () => {
      const initialState = createTestState(501, 501);
      // Speler 1 gooit 100 (foutief ingevoerd, moest 140 zijn)
      const { state: afterTurn1 } = applyTurn({ state: initialState, score: 100 });
      
      const { state: correctedState, correction } = correctLastTurn({
        state: afterTurn1,
        newScore: 140,
        reason: 'Misclick'
      });

      expect(correction.oldScore).toBe(100);
      expect(correction.newScore).toBe(140);
      expect(correction.reason).toBe('Misclick');

      // Check of de score daadwerkelijk is aangepast naar 501 - 140 = 361
      expect(correctedState.playerScores[0].remainingScore).toBe(361);
      // Speler is nog steeds gewisseld naar p2, want beurt1 is overschreven
      expect(correctedState.match.currentPlayerId).toBe('p2');
      expect(correctedState.corrections).toHaveLength(1);
    });
  });
});