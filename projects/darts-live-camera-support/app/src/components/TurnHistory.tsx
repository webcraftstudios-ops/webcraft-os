import type { MatchState } from '@/domain/types';

export type TurnHistoryProps = {
  state: MatchState;
};

export function TurnHistory({ state }: TurnHistoryProps) {
  const turns = [...state.turns].reverse();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Turn history</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">Played turns</h2>
        </div>
        <p className="text-sm text-slate-400">{state.turns.length} turns</p>
      </div>

      {turns.length === 0 ? (
        <p className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          No turns yet. Confirm the first score to start the history.
        </p>
      ) : (
        <div className="mt-5 grid gap-3">
          {turns.map((turn) => {
            const player = state.players.find((item) => item.id === turn.playerId);

            return (
              <article className="rounded-xl border border-slate-800 bg-slate-950 p-4" key={turn.id}>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Turn #{turn.turnNumber}</p>
                    <h3 className="text-lg font-semibold text-slate-100">{player?.name ?? 'Unknown player'}</h3>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-slate-400">Score</p>
                    <p className="text-2xl font-bold text-slate-100">{turn.confirmedScore}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-4">
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
    </section>
  );
}
