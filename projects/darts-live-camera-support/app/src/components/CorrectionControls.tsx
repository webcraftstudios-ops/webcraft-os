'use client';

import { FormEvent, useState } from 'react';
import type { MatchState } from '@/domain/types';
import { correctLastTurn, undoLastTurn, validateTurnScore } from '@/domain/scoring';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { TextField } from '@/components/ui/Field';

export type CorrectionControlsProps = {
  state: MatchState;
  onStateChange: (state: MatchState) => void;
  onMessageChange?: (message: string | null) => void;
};

export function CorrectionControls({ state, onStateChange, onMessageChange }: CorrectionControlsProps) {
  const [newScore, setNewScore] = useState('');
  const hasTurns = state.turns.length > 0;
  const lastTurn = state.turns.at(-1);

  function handleUndoLastTurn() {
    if (!hasTurns) {
      onMessageChange?.('No turn available to undo.');
      return;
    }

    const nextState = undoLastTurn(state);
    onStateChange(nextState);
    onMessageChange?.('Last turn was undone.');
  }

  function handleCorrectLastTurn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasTurns) {
      onMessageChange?.('No turn available to correct.');
      return;
    }

    const score = Number(newScore);
    const validation = validateTurnScore(score);

    if (!validation.valid) {
      onMessageChange?.(validation.reason ?? 'Invalid correction score.');
      return;
    }

    try {
      const result = correctLastTurn({
        state,
        newScore: score,
        reason: 'Manual correction from scoreboard UI',
      });

      onStateChange(result.state);
      onMessageChange?.(`Last turn corrected from ${result.correction.oldScore} to ${result.correction.newScore}.`);
      setNewScore('');
    } catch (error) {
      onMessageChange?.(error instanceof Error ? error.message : 'Could not correct turn.');
    }
  }

  return (
    <Panel
      description="Correct or undo the most recent confirmed turn. This keeps the demo flow simple and auditable."
      kicker="Corrections"
      title="Fix the last turn"
    >
      <div className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-4 text-sm text-[var(--dl-muted)]">
        {lastTurn ? (
          <p>
            Last turn: #{lastTurn.turnNumber}, score {lastTurn.confirmedScore}, after {lastTurn.scoreAfter}
          </p>
        ) : (
          <p>No turns entered yet.</p>
        )}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[auto_1fr]">
        <Button disabled={!hasTurns} onClick={handleUndoLastTurn} type="button" variant="secondary">
          Undo last turn
        </Button>

        <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleCorrectLastTurn}>
          <TextField
            disabled={!hasTurns}
            inputMode="numeric"
            onChange={(event) => setNewScore(event.target.value)}
            placeholder="New score for last turn"
            value={newScore}
          />
          <Button disabled={!hasTurns} type="submit">
            Correct score
          </Button>
        </form>
      </div>
    </Panel>
  );
}
