import type { MatchState } from '@/domain/types';

export type ScoreboardProps = {
  state: MatchState;
};

export function Scoreboard({ state }: ScoreboardProps) {
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const winner = state.players.find((player) => player.id === state.match.winnerPlayerId);
  const lastTurn = state.turns.at(-1);

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-black shadow-2xl">
      <header className="flex flex-col gap-3 border-b border-zinc-800 bg-zinc-950 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Darts Live Camera Support
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-wide text-white md:text-4xl">
            {state.match.gameType} Live Scoreboard
          </h2>
        </div>
        <div className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-bold uppercase tracking-wide text-zinc-200">
          {state.match.status}
        </div>
      </header>

      <div className="grid min-h-[460px] gap-0 md:grid-cols-[1fr_280px_1fr]">
        {state.players.map((player) => {
          const score = state.playerScores.find((item) => item.playerId === player.id);
          const isCurrentPlayer = state.match.currentPlayerId === player.id;
          const isWinner = state.match.winnerPlayerId === player.id;

          return (
            <article
              className={`flex min-h-[360px] flex-col justify-between border-zinc-800 p-6 md:p-8 ${
                isCurrentPlayer ? 'bg-zinc-100 text-black' : 'bg-zinc-950 text-white'
              }`}
              key={player.id}
            >
              <div>
                <p className={`text-sm font-black uppercase tracking-[0.25em] ${isCurrentPlayer ? 'text-zinc-700' : 'text-zinc-500'}`}>
                  {isWinner ? 'Winner' : isCurrentPlayer ? 'Throwing' : 'Waiting'}
                </p>
                <h3 className="mt-4 truncate text-4xl font-black uppercase tracking-tight md:text-5xl">
                  {player.name}
                </h3>
              </div>

              <p className="mt-8 text-[7rem] font-black leading-none tracking-tighter md:text-[10rem]">
                {score?.remainingScore ?? state.match.startingScore}
              </p>
            </article>
          );
        })}

        <aside className="order-first flex flex-col justify-between border-y border-zinc-800 bg-zinc-900 p-6 text-center md:order-none md:border-x md:border-y-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Current turn</p>
            <p className="mt-3 text-3xl font-black uppercase text-white">
              {winner ? 'Finished' : currentPlayer?.name ?? 'Unknown'}
            </p>
          </div>

          <div className="my-8 rounded-2xl border border-zinc-700 bg-black p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">Last throw</p>
            <p className="mt-3 text-5xl font-black text-white">{lastTurn?.confirmedScore ?? '-'}</p>
            <p className="mt-2 text-sm text-zinc-400">
              {lastTurn ? (lastTurn.isBust ? 'Bust' : `After: ${lastTurn.scoreAfter}`) : 'No turns yet'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">Mode</p>
            <p className="mt-2 text-xl font-black text-white">TV Demo</p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Scoreboard prototype • Human-confirmed scoring • Camera-assisted later
      </footer>
    </section>
  );
}
