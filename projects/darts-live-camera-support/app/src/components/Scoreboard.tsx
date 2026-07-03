import type { MatchState } from '@/domain/types';

export type ScoreboardProps = {
  state: MatchState;
};

export function Scoreboard({ state }: ScoreboardProps) {
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const winner = state.players.find((player) => player.id === state.match.winnerPlayerId);
  const lastTurn = state.turns.at(-1);

  return (
    <section className="dl-card overflow-hidden">
      <header className="flex flex-col gap-4 border-b border-[var(--dl-border)] bg-[var(--dl-surface-strong)] px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="dl-kicker">Darts Live Camera Support</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-wide text-[var(--dl-text)] md:text-5xl">
            {state.match.gameType} Live Scoreboard
          </h2>
        </div>
        <div className="rounded-full border border-[var(--dl-border)] bg-[var(--dl-surface)] px-5 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--dl-text)]">
          {state.match.status}
        </div>
      </header>

      <div className="grid min-h-[500px] gap-0 md:grid-cols-[1fr_300px_1fr]">
        {state.players.map((player) => {
          const score = state.playerScores.find((item) => item.playerId === player.id);
          const isCurrentPlayer = state.match.currentPlayerId === player.id;
          const isWinner = state.match.winnerPlayerId === player.id;

          return (
            <article
              className={`relative flex min-h-[380px] flex-col justify-between overflow-hidden border-[var(--dl-border)] p-6 transition-all duration-200 md:p-8 ${
                isCurrentPlayer
                  ? 'bg-[var(--dl-text)] text-[var(--dl-bg)] ring-4 ring-[var(--dl-primary)]'
                  : 'bg-[var(--dl-surface-strong)] text-[var(--dl-text)]'
              } ${isWinner ? 'ring-4 ring-[var(--dl-gold)]' : ''}`}
              key={player.id}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[var(--dl-primary)] opacity-80" />
              <div>
                <p className={`text-sm font-black uppercase tracking-[0.25em] ${isCurrentPlayer ? 'text-zinc-700' : 'text-[var(--dl-muted)]'}`}>
                  {isWinner ? 'Winner' : isCurrentPlayer ? 'Throwing' : 'Waiting'}
                </p>
                <h3 className="mt-4 truncate text-4xl font-black uppercase tracking-tight md:text-6xl">
                  {player.name}
                </h3>
              </div>

              <p className="dl-score-font mt-8 text-[7.5rem] font-black leading-none tracking-tighter md:text-[11rem]">
                {score?.remainingScore ?? state.match.startingScore}
              </p>
            </article>
          );
        })}

        <aside className="order-first flex flex-col justify-between border-y border-[var(--dl-border)] bg-[var(--dl-surface)] p-6 text-center md:order-none md:border-x md:border-y-0">
          <div>
            <p className="dl-kicker">Current turn</p>
            <p className="mt-3 text-3xl font-black uppercase text-[var(--dl-text)]">
              {winner ? 'Finished' : currentPlayer?.name ?? 'Unknown'}
            </p>
          </div>

          <div className="my-8 rounded-[var(--dl-radius-xl)] border border-[var(--dl-border)] bg-[var(--dl-bg)] p-5">
            <p className="dl-kicker">Last throw</p>
            <p className="dl-score-font mt-3 text-6xl font-black text-[var(--dl-text)]">
              {lastTurn?.confirmedScore ?? '-'}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--dl-muted)]">
              {lastTurn ? (lastTurn.isBust ? 'Bust' : `After: ${lastTurn.scoreAfter}`) : 'No turns yet'}
            </p>
          </div>

          <div className="rounded-[var(--dl-radius-lg)] border border-[var(--dl-border)] bg-[var(--dl-surface-strong)] p-4">
            <p className="dl-kicker">Mode</p>
            <p className="mt-2 text-xl font-black text-[var(--dl-text)]">TV Demo</p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-[var(--dl-border)] bg-[var(--dl-surface-strong)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-[var(--dl-muted)]">
        Scoreboard prototype • Human-confirmed scoring • Camera-assisted later
      </footer>
    </section>
  );
}
