import type { MatchState } from '@/domain/types';

export type ScoreboardProps = {
  state: MatchState;
};

export function Scoreboard({ state }: ScoreboardProps) {
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const winner = state.players.find((player) => player.id === state.match.winnerPlayerId);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Live scoreboard</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">
            {state.match.gameType} leg
          </h2>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
          Status: <span className="font-semibold text-slate-100">{state.match.status}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {state.players.map((player) => {
          const score = state.playerScores.find((item) => item.playerId === player.id);
          const isCurrentPlayer = state.match.currentPlayerId === player.id;
          const isWinner = state.match.winnerPlayerId === player.id;

          return (
            <article
              className={`rounded-2xl border p-6 ${
                isCurrentPlayer
                  ? 'border-slate-200 bg-slate-100 text-slate-950'
                  : 'border-slate-800 bg-slate-950 text-slate-100'
              }`}
              key={player.id}
            >
              <p className={`text-sm ${isCurrentPlayer ? 'text-slate-700' : 'text-slate-400'}`}>
                {isWinner ? 'Winner' : isCurrentPlayer ? 'Current player' : 'Waiting'}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{player.name}</h3>
              <p className="mt-5 text-7xl font-black tracking-tight">
                {score?.remainingScore ?? state.match.startingScore}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
        {winner ? (
          <p>{winner.name} has finished the leg.</p>
        ) : (
          <p>Current player: {currentPlayer?.name ?? 'Unknown'}</p>
        )}
      </div>
    </section>
  );
}
