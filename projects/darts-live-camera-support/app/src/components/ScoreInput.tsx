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
  const activeDartNumber = Math.min(pendingDarts.length + 1, 3);
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

  function handleResetTurn() {
    setPendingDarts(clearDarts());
    setSelectedMultiplier(null);
    onMessageChange?.(null);
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

          <section
            aria-label={selectedMultiplier === null ? 'Choose hit type' : 'Choose board number'}
            className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-4"
          >
            {selectedMultiplier === null ? (
              <>
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--dl-text)] px-2 text-xs font-black text-[var(--dl-bg)]">
                    1
                  </span>
                  <div>
                    <h3 className="text-base font-black text-[var(--dl-text)]">
                      {isDartLimitReached ? 'Three darts entered' : 'Choose a hit type'}
                    </h3>
                    {isDartLimitReached ? (
                      <p className="mt-0.5 text-sm text-[var(--dl-muted)]">Confirm the turn or remove a dart.</p>
                    ) : (
                      <>
                        <p className="mt-0.5 text-sm font-bold text-[var(--dl-text)]">Dart {activeDartNumber} of 3</p>
                        <p className="mt-0.5 text-sm text-[var(--dl-muted)]">
                          Start with Single, Double or Triple.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Hit type">
                  {DART_MULTIPLIERS.map((value) => (
                    <Button
                      className="min-h-11 px-3 py-2.5"
                      disabled={isFinished || isDartLimitReached}
                      key={value}
                      onClick={() => setSelectedMultiplier(value)}
                      type="button"
                    >
                      {MULTIPLIER_LABELS[value]}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-bold uppercase tracking-wider text-[var(--dl-muted)]">
                    Or record directly
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Direct hits">
                    <Button
                      aria-label="Add MISS"
                      className="min-h-11 px-3 py-2 text-xs"
                      disabled={isFinished || isDartLimitReached}
                      onClick={() => addDart(MISS)}
                      type="button"
                      variant="secondary"
                    >
                      MISS
                    </Button>
                    <Button
                      aria-label="Add 25"
                      className="min-h-11 px-3 py-2 text-xs"
                      disabled={isFinished || isDartLimitReached}
                      onClick={() => addDart(OUTER_BULL)}
                      type="button"
                      variant="secondary"
                    >
                      25
                    </Button>
                    <Button
                      aria-label="Add BULL"
                      className="min-h-11 px-3 py-2 text-xs"
                      disabled={isFinished || isDartLimitReached}
                      onClick={() => addDart(BULLSEYE)}
                      type="button"
                      variant="secondary"
                    >
                      BULL
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--dl-text)] px-2 text-xs font-black text-[var(--dl-bg)]">
                      2
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--dl-muted)]">
                        {MULTIPLIER_LABELS[selectedMultiplier]} selected
                      </p>
                      <h3 className="mt-0.5 text-base font-black text-[var(--dl-text)]">Choose a number</h3>
                      <p className="mt-0.5 text-sm text-[var(--dl-muted)]">Dart {activeDartNumber} of 3</p>
                    </div>
                  </div>
                  <Button
                    className="min-h-11 px-3 py-2 text-xs"
                    onClick={() => setSelectedMultiplier(null)}
                    type="button"
                    variant="secondary"
                  >
                    Back
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10" role="group" aria-label="Board numbers">
                  {DART_NUMBERS.map((value) => (
                    <Button
                      aria-label={`Add ${MULTIPLIER_PREFIXES[selectedMultiplier]}${value}`}
                      className="inline-flex h-11 w-11 items-center justify-center justify-self-center p-0 tabular-nums"
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
              </>
            )}
          </section>

          <div className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                <Button disabled={isFinished || pendingDarts.length === 0} type="submit">
                  Confirm turn
                </Button>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <Button
                className="px-3 py-2 text-xs"
                disabled={isFinished || pendingDarts.length === 0}
                onClick={handleResetTurn}
                type="button"
                variant="secondary"
              >
                Reset turn
              </Button>
            </div>
          </div>
        </form>
      )}
    </Panel>
  );
}
