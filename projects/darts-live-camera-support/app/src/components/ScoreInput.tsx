'use client';

import { FormEvent, useState } from 'react';
import type { MatchState } from '@/domain/types';
import { applyTurn, validateTurnScore } from '@/domain/scoring';

export type ScoreInputProps = {
  state: MatchState;
  onStateChange: (state: MatchState) => void;
  onMessageChange?: (message: string | null) => void;
};

export function ScoreInput({ state, onStateChange, onMessageChange }: ScoreInputProps) {
  const [scoreInput, setScoreInput] = useState('');
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const isFinished = state.match.status === 'finished';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const score = Number(scoreInput);
    const validation = validateTurnScore(score);

    if (!validation.valid) {
      onMessageChange?.(validation.reason ?? 'Invalid score.');
      return;
    }

    try {
      const result = applyTurn({ state, score });
      const message = result.turn.isBust
        ? `Bust: ${currentPlayer?.name ?? 'Player'} stays on ${result.turn.scoreAfter}.`
        : result.state.match.status === 'finished'
          ? `${currentPlayer?.name ?? 'Player'} finished the leg.`
          : null;

      onStateChange(result.state);
      onMessageChange?.(message);
      setScoreInput('');
    } catch (error) {
      onMessageChange?.(error instanceof Error ? error.message : 'Could not apply score.');
    }
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <p className="text-xs uppercase tracking-wide text-slate-500">Score input</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-100">
        {isFinished ? 'Match finished' : `${currentPlayer?.name ?? 'Player'} to throw`}
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Enter the total score for one turn. Valid range: 0 to 180.
      </p>

      <form className="mt-6 flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
        <input
          className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          disabled={isFinished}
          inputMode="numeric"
          onChange={(event) => setScoreInput(event.target.value)}
          placeholder="Turn score"
          value={scoreInput}
        />
        <button
          className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isFinished}
          type="submit"
        >
          Confirm score
        </button>
      </form>
    </section>
  );
}
