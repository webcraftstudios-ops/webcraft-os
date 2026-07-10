import type { MatchState } from '@/domain/types';
import { Panel } from '@/components/ui/Panel';

export type TurnHistoryProps = {
  state: MatchState;
};

export function TurnHistory({ state }: TurnHistoryProps) {
  const turns = [...state.turns].reverse();

  return (
    <Panel
      headerRight={<p className="text-sm text-[var(--dl-muted)]">{state.turns.length} turns</p>}
      kicker="Turn history"
      title="Played turns"
    >
      {turns.length === 0 ? (
        <p className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-4 text-sm text-[var(--dl-muted)]">
          No turns yet. Confirm the first score to start the history.
        </p>
      ) : (
        <div className="grid gap-3">
          {turns.map((turn) => {
            const player = state.players.find((item) => item.id === turn.playerId);

            return (
              <article className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] p-4" key={turn.id}>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-[var(--dl-muted)]">Turn #{turn.turnNumber}</p>
                    <h3 className="text-lg font-semibold text-[var(--dl-text)]">{player?.name ?? 'Unknown player'}</h3>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-[var(--dl-muted)]">Score</p>
                    <p className="text-2xl font-bold text-[var(--dl-text)]">{turn.confirmedScore}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-[var(--dl-muted)] md:grid-cols-4">
                  <p>Before: {turn.scoreBefore}</p>
                  <p>After: {turn.scoreAfter}</p>
                  <p>Status: {turn.isBust ? 'Bust' : 'Valid'}</p>
                  <p>Image: {turn.snapshotId ?? '-'}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
