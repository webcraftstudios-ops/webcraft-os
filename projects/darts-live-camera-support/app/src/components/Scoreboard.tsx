import type { MatchState } from '@/domain/types';
import { BigNumber } from '@/components/ui/BigNumber';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatBadge } from '@/components/ui/StatBadge';

export type ScoreboardProps = {
  state: MatchState;
};

export function Scoreboard({ state }: ScoreboardProps) {
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const winner = state.players.find((player) => player.id === state.match.winnerPlayerId);
  const lastTurn = state.turns.at(-1);

  return (
    <Card className="overflow-hidden" tone="card">
      <header className="flex flex-col gap-4 border-b border-[var(--dl-border)] bg-[var(--dl-surface-strong)] px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <SectionLabel>Darts Live Camera Support</SectionLabel>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-wide text-[var(--dl-text)] md:text-5xl">
            {state.match.gameType} Live Scoreboard
          </h2>
        </div>
        <StatBadge>{state.match.status}</StatBadge>
      </header>

      <div className="grid min-h-[500px] gap-0 md:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)]">
        {state.players.map((player, index) => {
          const score = state.playerScores.find((item) => item.playerId === player.id);
          const isCurrentPlayer = state.match.currentPlayerId === player.id;
          const isWinner = state.match.winnerPlayerId === player.id;
          const columnClassName = index === 0 ? 'md:col-start-1' : 'md:col-start-3';

          return (
            <article
              className={`relative flex min-h-[380px] min-w-0 flex-col justify-between overflow-hidden border-[var(--dl-border)] p-6 transition-all duration-200 md:row-start-1 md:p-8 ${columnClassName} ${
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

              <BigNumber className="mt-8 tracking-tighter" size="lg" value={score?.remainingScore ?? state.match.startingScore} />
            </article>
          );
        })}

        <aside className="order-first flex flex-col justify-between border-y border-[var(--dl-border)] bg-[var(--dl-surface)] p-6 text-center md:order-none md:col-start-2 md:row-start-1 md:border-x md:border-y-0">
          <div>
            <SectionLabel>Current turn</SectionLabel>
            <p className="mt-3 text-3xl font-black uppercase text-[var(--dl-text)]">
              {winner ? 'Finished' : currentPlayer?.name ?? 'Unknown'}
            </p>
          </div>

          <div className="my-8 rounded-xl border border-[var(--dl-border)] bg-[var(--dl-bg)] p-5">
            <SectionLabel>Last throw</SectionLabel>
            <BigNumber className="mt-3" size="md" value={lastTurn?.confirmedScore ?? '-'} />
            <p className="mt-2 text-sm font-semibold text-[var(--dl-muted)]">
              {lastTurn ? (lastTurn.isBust ? 'Bust' : `After: ${lastTurn.scoreAfter}`) : 'No turns yet'}
            </p>
          </div>

          <div className="rounded-lg border border-[var(--dl-border)] bg-[var(--dl-surface-strong)] p-4">
            <SectionLabel>Mode</SectionLabel>
            <p className="mt-2 text-xl font-black text-[var(--dl-text)]">TV Demo</p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-[var(--dl-border)] bg-[var(--dl-surface-strong)] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-[var(--dl-muted)]">
        Scoreboard prototype • Human-confirmed scoring • Camera-assisted later
      </footer>
    </Card>
  );
}
