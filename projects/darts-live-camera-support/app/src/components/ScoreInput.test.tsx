import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ScoreInput } from './ScoreInput';
import type { MatchState } from '@/domain/types';

function createState(remainingScore = 501): MatchState {
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
      { playerId: 'p1', remainingScore },
      { playerId: 'p2', remainingScore: 501 },
    ],
    turns: [],
    snapshots: [],
    corrections: [],
  };
}

function renderInput(state = createState()) {
  const onStateChange = vi.fn();
  const onMessageChange = vi.fn();
  const onTurnConfirmed = vi.fn();

  render(
    <ScoreInput
      state={state}
      onStateChange={onStateChange}
      onMessageChange={onMessageChange}
      onTurnConfirmed={onTurnConfirmed}
    />,
  );

  return { onStateChange, onMessageChange, onTurnConfirmed };
}

function selectPerDart() {
  fireEvent.click(screen.getByRole('button', { name: 'Per Dart' }));
}

function addNumberedDart(hitType: 'Single' | 'Double' | 'Triple', notation: string) {
  fireEvent.click(screen.getByRole('button', { name: hitType }));
  fireEvent.click(screen.getByRole('button', { name: `Add ${notation}` }));
}

describe('ScoreInput', () => {
  it('switches between Quick Total and Per Dart', () => {
    renderInput();

    expect(screen.getByRole('button', { name: 'Quick Total' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByPlaceholderText('Turn score')).toBeInTheDocument();

    selectPerDart();

    expect(screen.getByRole('button', { name: 'Per Dart' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Confirm turn' })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Turn score')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Quick Total' }));
    expect(screen.getByPlaceholderText('Turn score')).toBeInTheDocument();
  });

  it('keeps the existing Quick Total confirmation flow', () => {
    const { onStateChange } = renderInput();

    fireEvent.change(screen.getByPlaceholderText('Turn score'), { target: { value: '60' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirm score' }));

    const nextState = onStateChange.mock.calls[0][0] as MatchState;
    expect(nextState.turns[0].confirmedScore).toBe(60);
    expect(nextState.turns[0].entry).toEqual({ mode: 'quick-total' });
  });

  it('reveals numbers only after the operator chooses Single, Double or Triple', () => {
    renderInput();
    selectPerDart();

    expect(screen.getByText(/choose single, double or triple to reveal board numbers/i)).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add S20' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Double' }));

    expect(screen.getByRole('group', { name: 'Board numbers' })).toBeInTheDocument();
    for (let value = 1; value <= 20; value += 1) {
      expect(screen.getByRole('button', { name: `Add D${value}` })).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole('button', { name: 'Add D20' }));

    expect(screen.getByTestId('dart-position-1')).toHaveTextContent('D20');
    expect(screen.getByText('Live total: 40')).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();
    expect(screen.getByText(/choose single, double or triple to reveal board numbers/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Triple' }));
    expect(screen.getByRole('button', { name: 'Add T20' })).toBeInTheDocument();
  });

  it('supports direct MISS, 25 and BULL actions without revealing number controls', () => {
    renderInput();
    selectPerDart();

    fireEvent.click(screen.getByRole('button', { name: 'Add MISS' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add 25' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add BULL' }));

    expect(screen.getByText('Live total: 75')).toBeInTheDocument();
    expect(screen.getByTestId('dart-position-1')).toHaveTextContent('MISS');
    expect(screen.getByTestId('dart-position-2')).toHaveTextContent('25');
    expect(screen.getByTestId('dart-position-3')).toHaveTextContent('BULL');
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();
  });

  it('removes the last dart and clears the complete pending sequence', () => {
    renderInput();
    selectPerDart();

    addNumberedDart('Single', 'S20');
    addNumberedDart('Single', 'S5');
    expect(screen.getByText('Live total: 25')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove last dart' }));
    expect(screen.getByText('Live total: 20')).toBeInTheDocument();
    expect(screen.getByTestId('dart-position-2')).toHaveTextContent('Empty');
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear pending turn' }));
    expect(screen.getByText('Live total: 0')).toBeInTheDocument();
    expect(screen.getAllByText('Empty')).toHaveLength(3);
  });

  it.each([
    {
      name: 'one dart',
      add: () => addNumberedDart('Double', 'D10'),
      total: 20,
      dartCount: 1,
    },
    {
      name: 'two darts',
      add: () => {
        addNumberedDart('Single', 'S20');
        addNumberedDart('Double', 'D10');
      },
      total: 40,
      dartCount: 2,
    },
    {
      name: 'three darts',
      add: () => {
        addNumberedDart('Single', 'S20');
        addNumberedDart('Triple', 'T20');
        addNumberedDart('Double', 'D20');
      },
      total: 120,
      dartCount: 3,
    },
  ])('confirms a $name turn', ({ add, total, dartCount }) => {
    const { onStateChange, onTurnConfirmed } = renderInput();
    selectPerDart();
    add();

    fireEvent.click(screen.getByRole('button', { name: 'Confirm turn' }));

    const nextState = onStateChange.mock.calls[0][0] as MatchState;
    const turn = nextState.turns[0];
    expect(turn.confirmedScore).toBe(total);
    expect(turn.entry.mode).toBe('per-dart');
    if (turn.entry.mode === 'per-dart') {
      expect(turn.entry.darts).toHaveLength(dartCount);
    }
    expect(onTurnConfirmed).toHaveBeenCalledTimes(1);
  });

  it('prevents empty confirmation and a fourth dart', () => {
    renderInput();
    selectPerDart();

    expect(screen.getByRole('button', { name: 'Confirm turn' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Add MISS' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add 25' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add BULL' }));

    expect(screen.getByRole('button', { name: 'Single' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Double' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Triple' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Add MISS' })).toBeDisabled();
    expect(screen.queryAllByText('Empty')).toHaveLength(0);
  });

  it('clears hidden pending values and selected hit type when switching modes', () => {
    renderInput();

    fireEvent.change(screen.getByPlaceholderText('Turn score'), { target: { value: '60' } });
    selectPerDart();
    addNumberedDart('Single', 'S20');
    fireEvent.click(screen.getByRole('button', { name: 'Triple' }));
    expect(screen.getByRole('button', { name: 'Add T20' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Quick Total' }));
    expect(screen.getByPlaceholderText('Turn score')).toHaveValue('');

    selectPerDart();
    expect(screen.getByText('Live total: 0')).toBeInTheDocument();
    expect(screen.getAllByText('Empty')).toHaveLength(3);
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();
  });

  it('starts with clean pending state after unmount and remount', () => {
    const firstRender = render(
      <ScoreInput state={createState()} onStateChange={vi.fn()} />,
    );
    selectPerDart();
    addNumberedDart('Single', 'S20');
    firstRender.unmount();

    render(<ScoreInput state={createState()} onStateChange={vi.fn()} />);
    selectPerDart();

    expect(screen.getByText('Live total: 0')).toBeInTheDocument();
    expect(screen.getAllByText('Empty')).toHaveLength(3);
    expect(screen.queryByRole('group', { name: 'Board numbers' })).not.toBeInTheDocument();
  });
});
