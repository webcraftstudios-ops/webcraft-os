'use client';

import { FormEvent, useState } from 'react';
import type { MatchState } from '@/domain/types';
import { correctLastTurn, undoLastTurn, validateTurnScore } from '@/domain/scoring';

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
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <p className="text-xs uppercase tracking-wide text-slate-500">Corrections</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-100">Fix the last turn</h2>
      <p className="mt-2 text-sm text-slate-400">
        Correct or undo the most recent confirmed turn. This keeps the demo flow simple and auditable.
      </p>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
        {lastTurn ? (
          <p>
            Last turn: #{lastTurn.turnNumber}, score {lastTurn.confirmedScore}, after {lastTurn.scoreAfter}
          </p>
        ) : (
          <p>No turns entered yet.</p>
        )}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[auto_1fr]">
        <button
          className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-bold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!hasTurns}
          onClick={handleUndoLastTurn}
          type="button"
        >
          Undo last turn
        </button>

        <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleCorrectLastTurn}>
          <input
            className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
            disabled={!hasTurns}
            inputMode="numeric"
            onChange={(event) => setNewScore(event.target.value)}
            placeholder="New score for last turn"
            value={newScore}
          />
          <button
            className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasTurns}
            type="submit"
          >
            Correct score
          </button>
        </form>
      </div>
    </section>
  );
}
