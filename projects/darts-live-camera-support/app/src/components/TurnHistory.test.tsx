import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TurnHistory } from './TurnHistory';
import { createNumberedDart, type DartSequence } from '@/domain/darts';
import { applyTurn, correctLastTurn } from '@/domain/scoring';
import type { MatchState } from '@/domain/types';

function createState(): MatchState {
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
      { playerId: 'p1', remainingScore: 501 },
      { playerId: 'p2', remainingScore: 501 },
    ],
    turns: [],
    snapshots: [],
    corrections: [],
  };
}

describe('TurnHistory', () => {
  it('shows Per Dart notation while keeping the total prominent', () => {
    const darts = [
      createNumberedDart(20, 1),
      createNumberedDart(20, 3),
      createNumberedDart(20, 2),
    ] as const satisfies DartSequence;
    const { state } = applyTurn({
      state: createState(),
      entry: { mode: 'per-dart', darts },
    });

    render(<TurnHistory state={state} />);

    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('Darts: S20 · T20 · D20')).toBeInTheDocument();
  });

  it('keeps the existing numeric fallback for Quick Total', () => {
    const { state } = applyTurn({ state: createState(), score: 60 });

    render(<TurnHistory state={state} />);

    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.queryByText(/^Darts:/)).not.toBeInTheDocument();
  });

  it('removes obsolete dart notation after a total correction and keeps the snapshot visible', () => {
    const darts = [
      createNumberedDart(20, 3),
      createNumberedDart(20, 3),
      createNumberedDart(20, 3),
    ] as const satisfies DartSequence;
    const applied = applyTurn({
      state: createState(),
      entry: { mode: 'per-dart', darts },
      snapshotId: 'snapshot-1',
    });
    const stateWithSnapshot: MatchState = {
      ...applied.state,
      snapshots: [
        {
          id: 'snapshot-1',
          matchId: 'match-1',
          turnId: applied.turn.id,
          url: 'data:image/jpeg;base64,SNAPSHOT',
          source: 'camera',
          createdAt: '2026-07-13T00:00:01.000Z',
        },
      ],
    };
    const { state: correctedState } = correctLastTurn({ state: stateWithSnapshot, newScore: 140 });

    render(<TurnHistory state={correctedState} />);

    expect(screen.getByText('140')).toBeInTheDocument();
    expect(screen.queryByText('Darts: T20 · T20 · T20')).not.toBeInTheDocument();
    expect(screen.queryByText(/^Darts:/)).not.toBeInTheDocument();
    expect(screen.getByAltText('Turn 1 snapshot')).toHaveAttribute(
      'src',
      'data:image/jpeg;base64,SNAPSHOT',
    );
  });
});
