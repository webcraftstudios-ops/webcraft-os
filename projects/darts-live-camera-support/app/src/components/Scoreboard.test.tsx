import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scoreboard } from './Scoreboard';
import type { MatchState } from '@/domain/types';

vi.mock('@/components/CameraPreview', () => ({
  CameraPreview: () => <div data-testid="scoreboard-camera-preview" />,
}));

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

describe('Scoreboard presentation boundary', () => {
  it('remains free of Quick Total and Per Dart operator controls', () => {
    render(<Scoreboard state={createState()} onResetMatch={vi.fn()} />);

    expect(screen.getByRole('heading', { name: '501 Live Scoreboard' })).toBeInTheDocument();
    expect(screen.getByTestId('scoreboard-camera-preview')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Quick Total' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Per Dart' })).not.toBeInTheDocument();
  });
});
