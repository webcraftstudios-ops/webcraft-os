'use client';

import { FormEvent, useState } from 'react';
import type { MatchState } from '@/domain/types';
import { applyTurn, validateTurnScore } from '@/domain/scoring';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { TextField } from '@/components/ui/Field';

export type ScoreInputProps = {
  state: MatchState;
  pendingSnapshotId?: string | null;
  onStateChange: (state: MatchState) => void;
  onMessageChange?: (message: string | null) => void;
  onTurnConfirmed?: () => void;
};

export function ScoreInput({ state, pendingSnapshotId, onStateChange, onMessageChange, onTurnConfirmed }: ScoreInputProps) {
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
      const result = applyTurn({ state, score, snapshotId: pendingSnapshotId ?? undefined });
      const message = result.turn.isBust
        ? `Bust: ${currentPlayer?.name ?? 'Player'} stays on ${result.turn.scoreAfter}.`
        : result.state.match.status === 'finished'
          ? `${currentPlayer?.name ?? 'Player'} finished the leg.`
          : pendingSnapshotId
            ? `Score confirmed with image ${pendingSnapshotId}.`
            : null;

      onStateChange(result.state);
      onMessageChange?.(message);
      onTurnConfirmed?.();
      setScoreInput('');
    } catch (error) {
      onMessageChange?.(error instanceof Error ? error.message : 'Could not apply score.');
    }
  }

  return (
    <Panel
      description="Enter the total score for one turn. Valid range: 0 to 180."
      kicker="Score input"
      title={isFinished ? 'Match finished' : `${currentPlayer?.name ?? 'Player'} to throw`}
    >
      <p className="text-sm text-[var(--dl-muted)]">Pending image: {pendingSnapshotId ?? '-'}</p>

      <form className="mt-6 flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
        <TextField
          disabled={isFinished}
          inputMode="numeric"
          onChange={(event) => setScoreInput(event.target.value)}
          placeholder="Turn score"
          value={scoreInput}
        />
        <Button disabled={isFinished} type="submit">
          Confirm score
        </Button>
      </form>
    </Panel>
  );
}
