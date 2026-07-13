'use client';

import { FormEvent, useState } from 'react';
import type { MatchState } from '@/domain/types';
import {
  BULLSEYE,
  DART_MULTIPLIERS,
  DART_NUMBERS,
  MISS,
  OUTER_BULL,
  appendDart,
  clearDarts,
  createNumberedDart,
  formatDart,
  removeLastDart,
  requireDartSequence,
  scoreDarts,
  type DartMultiplier,
  type DartThrow,
  type PendingDartSequence,
} from '@/domain/darts';
import { applyTurn, validateTurnScore, type ApplyTurnResult } from '@/domain/scoring';
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

type ScoreInputMode = 'quick-total' | 'per-dart';

const MULTIPLIER_LABELS: Record<DartMultiplier, string> = {
  1: 'Single',
  2: 'Double',
  3: 'Triple',
};

const MULTIPLIER_PREFIXES: Record<DartMultiplier, 'S' | 'D' | 'T'> = {
  1: 'S',
  2: 'D',
  3: 'T',
};

const DART_POSITIONS = [0, 1, 2] as const;

export function ScoreInput({
  state,
  pendingSnapshotId,
  onStateChange,
  onMessageChange,
  onTurnConfirmed,
}: ScoreInputProps) {
  const [mode, setMode] = useState<ScoreInputMode>('quick-total');
  const [scoreInput, setScoreInput] = useState('');
  const [pendingDarts, setPendingDarts] = useState<PendingDartSequence>([]);
  const [selectedMultiplier, setSelectedMultiplier] = useState<DartMultiplier | null>(null);
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const isFinished = state.match.status === 'finished';
  const isDartLimitReached = pendingDarts.length >= 3;
  const liveTotal = scoreDarts(pendingDarts);

  function resetPendingInput() {
    setScoreInput('');
    setPendingDarts(clearDarts());
    setSelectedMultiplier(null);
  }

  function handleModeChange(nextMode: ScoreInputMode) {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
    resetPendingInput();
    onMessageChange?.(null);
  }

  function publishTurn(result: ApplyTurnResult) {
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
  }

  function handleQuickTotalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const score = Number(scoreInput);
    const validation = validateTurnScore(score);

    if (!validation.valid) {
      onMessageChange?.(validation.reason ?? 'Invalid score.');
      return;
    }

    try {
      const result = applyTurn({ state, score, snapshotId: pendingSnapshotId ?? undefined });
      publishTurn(result);
      setScoreInput('');
    } catch (error) {
      onMessageChange?.(error instanceof Error ? error.message : 'Could not apply score.');
    }
  }

  function addDart(dart: DartThrow) {
    try {
      setPendingDarts((current) => appendDart(current, dart));
      setSelectedMultiplier(null);
      onMessageChange?.(null);
    } catch (error) {
      onMessageChange?.(error instanceof Error ? error.message : 'Could not add dart.');
    }
  }

  function handleRemoveLastDart() {
    setPendingDarts((current) => removeLastDart(current));
    setSelectedMultiplier(null);
  }

  function handleClearPendingTurn() {
    setPendingDarts(clearDarts());
    setSelectedMultiplier(null);
  }

  function handlePerDartSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const darts = requireDartSequence(pendingDarts);
      const result = applyTurn({
        state,
        entry: { mode: 'per-dart', darts },
        snapshotId: pendingSnapshotId ?? undefined,
      });

      publishTurn(result);
      setPendingDarts(clearDarts());
      setSelectedMultiplier(null);
    } catch (error) {
      onMessageChange?.(error instanceof Error ? error.message : 'Could not apply darts.');
    }
  }

  return (
    <Panel
      description="Enter a complete turn as a quick total or record one to three individual darts."
      kicker="Score input"
      title={isFinished ? 'Match finished' : `${currentPlayer?.name ?? 'Player'} to throw`}
    >
      <p className="text-sm text-[var(--dl-muted)]">Pending image: {pendingSnapshotId ?? '-'}</p>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Score entry mode">
        <Button
          aria-pressed={mode === 'quick-total'}
          disabled={isFinished}
          onClick={() => handleModeChange('quick-total')}
          type="button"
          variant={mode === 'quick-total' ? 'primary' : 'secondary'}
        >
          Quick Total
        </Button>
        <Button
          aria-pressed={mode === 'per-dart'}
          disabled={isFinished}
          onClick={() => handleModeChange('per-dart')}
          type="button"
          variant={mode === 'per-dart' ? 'primary' : 'secondary'}
        >
          Per Dart
        </Button>
      </div>

      {mode === 'quick-total' ? (
        <form className="mt-6 flex flex-col gap-3 md:flex-row" onSubmit={handleQuickTotalSubmit}>
          <TextField
            aria-label="Turn score"
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
      ) : (
        <form className="mt-6 grid gap-5" onSubmit={handlePerDartSubmit}>
          <div className="grid grid-cols-3 gap-3" aria-label="Pending darts">
            {DART_POSITIONS.map((position) => {
              const dart = pendingDarts[position];
              return (
                <div
                  className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-3 text-center"
                  data-testid={`dart-position-${position + 1}`}
                  key={position}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--dl-muted)]">
                    Dart {position + 1}
                  </p>
                  <p className="mt-2 text-lg font-black text-[var(--dl-text)]">
                    {dart ? formatDart(dart) : 'Empty'}
                  </p>
                </div>
              );
            })}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--dl-muted)]">Choose hit type</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Hit type">
              {DART_MULTIPLIERS.map((value) => (
                <Button
                  aria-pressed={selectedMultiplier === value}
                  disabled={isFinished || isDartLimitReached}
                  key={value}
                  onClick={() => setSelectedMultiplier((current) => current === value ? null : value)}
                  type="button"
                  variant={selectedMultiplier === value ? 'primary' : 'secondary'}
                >
                  {MULTIPLIER_LABELS[value]}
                </Button>
              ))}
            </div>
          </div>

          {selectedMultiplier === null ? (
            <p className="rounded-lg border border-dashed border-[var(--dl-border)] px-4 py-3 text-sm text-[var(--dl-muted)]">
              Choose Single, Double or Triple to reveal board numbers 1–20.
            </p>
          ) : (
            <div>
              <p className="mb-2 text-sm font-semibold text-[var(--dl-muted)]">
                {MULTIPLIER_LABELS[selectedMultiplier]} — choose number
              </p>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10" role="group" aria-label="Board numbers">
                {DART_NUMBERS.map((value) => (
                  <Button
                    aria-label={`Add ${MULTIPLIER_PREFIXES[selectedMultiplier]}${value}`}
                    className="min-h-11 px-2 py-2"
                    disabled={isFinished || isDartLimitReached}
                    key={value}
                    onClick={() => addDart(createNumberedDart(value, selectedMultiplier))}
                    type="button"
                    variant="secondary"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--dl-muted)]">Direct hits</p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Special darts">
              <Button
                aria-label="Add MISS"
                disabled={isFinished || isDartLimitReached}
                onClick={() => addDart(MISS)}
                type="button"
                variant="secondary"
              >
                MISS
              </Button>
              <Button
                aria-label="Add 25"
                disabled={isFinished || isDartLimitReached}
                onClick={() => addDart(OUTER_BULL)}
                type="button"
                variant="secondary"
              >
                25
              </Button>
              <Button
                aria-label="Add BULL"
                disabled={isFinished || isDartLimitReached}
                onClick={() => addDart(BULLSEYE)}
                type="button"
                variant="secondary"
              >
                BULL 50
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="text-lg font-black text-[var(--dl-text)]">
              Live total: {liveTotal}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                disabled={isFinished || pendingDarts.length === 0}
                onClick={handleRemoveLastDart}
                type="button"
                variant="secondary"
              >
                Remove last dart
              </Button>
              <Button
                disabled={isFinished || pendingDarts.length === 0}
                onClick={handleClearPendingTurn}
                type="button"
                variant="secondary"
              >
                Clear pending turn
              </Button>
            </div>
          </div>

          <Button disabled={isFinished || pendingDarts.length === 0} type="submit">
            Confirm turn
          </Button>
        </form>
      )}
    </Panel>
  );
}
