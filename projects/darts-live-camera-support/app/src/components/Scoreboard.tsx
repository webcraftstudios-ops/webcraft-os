import type { MatchState } from '@/domain/types';
import { BigNumber } from '@/components/ui/BigNumber';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatBadge } from '@/components/ui/StatBadge';
import { Button } from '@/components/ui/Button';
import { useFullscreen } from '@/hooks/useFullscreen';
import { WinnerOverlay } from '@/components/WinnerOverlay';
import { CameraPreview } from '@/components/CameraPreview';

export type ScoreboardProps = {
  state: MatchState;
  onResetMatch: () => void;
};

export function Scoreboard({ state, onResetMatch }: ScoreboardProps) {
  const currentPlayer = state.players.find((player) => player.id === state.match.currentPlayerId);
  const winner = state.players.find((player) => player.id === state.match.winnerPlayerId);
  const lastTurn = state.turns.at(-1);
  const { isFullscreen, isSupported, fallbackMessage, toggleFullscreen } = useFullscreen();

  return (
    <Card className="overflow-hidden" tone="card">
      <header className="flex flex-col gap-4 border-b border-[var(--dl-border)] bg-[var(--dl-surface-strong)] px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <SectionLabel>Darts Live Camera Support</SectionLabel>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-wide text-[var(--dl-text)] lg:text-4xl xl:text-5xl">
            {state.match.gameType} Live Scoreboard
          </h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <StatBadge>{state.match.status}</StatBadge>
            <Button
              disabled={!isSupported}
              onClick={toggleFullscreen}
              title={isSupported ? undefined : 'Kiosk mode is not supported in this browser.'}
              type="button"
              variant="secondary"
              className="px-4 py-2 text-sm"
            >
              {isFullscreen ? 'Exit Kiosk' : 'Kiosk Mode'}
            </Button>
          </div>
          {fallbackMessage ? (
            <p className="max-w-xs text-right text-xs font-semibold text-[var(--dl-muted)]">{fallbackMessage}</p>
          ) : null}
        </div>
      </header>

      <div className="grid min-h-[500px] gap-0 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)]">
        {state.players.map((player, index) => {
          const score = state.playerScores.find((item) => item.playerId === player.id);
          const isCurrentPlayer = state.match.currentPlayerId === player.id;
          const isWinner = state.match.winnerPlayerId === player.id;
          const columnClassName = index === 0 ? 'lg:col-start-1' : 'lg:col-start-3';

          return (
            <article
              className={`relative flex min-h-[300px] min-w-0 flex-col justify-between overflow-hidden border-[var(--dl-border)] p-6 transition-all duration-500 lg:row-start-1 lg:min-h-[400px] xl:min-h-[500px] lg:p-8 ${columnClassName} ${
                isCurrentPlayer && !isWinner
                  ? 'bg-gradient-to-b from-[var(--dl-primary-glow)] to-transparent text-[var(--dl-text)] ring-2 ring-[var(--dl-primary)] shadow-[0_0_40px_var(--dl-primary-glow)] z-10 scale-[1.02]'
                  : 'bg-[var(--dl-surface-strong)] text-[var(--dl-muted)] opacity-80 scale-100'
              } ${isWinner ? 'bg-gradient-to-b from-[var(--dl-gold-glow)] to-transparent ring-4 ring-[var(--dl-gold)] shadow-[0_0_60px_var(--dl-gold-glow)] z-20 scale-[1.05] opacity-100' : ''}`}
              key={player.id}
            >
              {isCurrentPlayer && !isWinner && (
                <div className="absolute inset-x-0 top-0 h-1.5 bg-[var(--dl-primary)] shadow-[0_0_20px_var(--dl-primary)] animate-pulse" />
              )}
              {isWinner && (
                <div className="absolute inset-x-0 top-0 h-2 bg-[var(--dl-gold)] shadow-[0_0_30px_var(--dl-gold)]" />
              )}
              <div className="relative z-10">
                <p className={`text-sm font-black uppercase tracking-[0.25em] transition-colors duration-300 ${isWinner ? 'text-[var(--dl-gold)]' : isCurrentPlayer ? 'text-[var(--dl-primary)]' : 'text-[var(--dl-muted)]'}`}>
                  {isWinner ? 'Winner' : isCurrentPlayer ? 'Throwing' : 'Waiting'}
                </p>
                <h3 className={`mt-4 truncate text-4xl font-black uppercase tracking-tight md:text-5xl xl:text-6xl transition-colors duration-300 ${isCurrentPlayer || isWinner ? 'text-[var(--dl-text)]' : 'text-[var(--dl-muted)]'}`}>
                  {player.name}
                </h3>
              </div>

              <BigNumber className="relative z-10 mt-6 tracking-tighter" size="lg" value={score?.remainingScore ?? state.match.startingScore} />
            </article>
          );
        })}

        <aside className="order-first flex flex-col justify-between border-y border-[var(--dl-border)] bg-[var(--dl-surface)] p-6 text-center lg:order-none lg:col-start-2 lg:row-start-1 lg:border-x lg:border-y-0">
          <div>
            <SectionLabel>Current turn</SectionLabel>
            <p className="mt-3 text-3xl font-black uppercase text-[var(--dl-text)]">
              {winner ? 'Finished' : currentPlayer?.name ?? 'Unknown'}
            </p>
          </div>

          <div className="my-6 rounded-xl border border-[var(--dl-border)] bg-[var(--dl-bg)] p-5">
            <SectionLabel>Last throw</SectionLabel>
            <BigNumber className="mt-3" size="md" value={lastTurn?.confirmedScore ?? '-'} />
            <p className="mt-2 text-sm font-semibold text-[var(--dl-muted)]">
              {lastTurn ? (lastTurn.isBust ? 'Bust' : `After: ${lastTurn.scoreAfter}`) : 'No turns yet'}
            </p>
          </div>

          <div className="flex-1 mt-4">
            <CameraPreview isLive={true} />
          </div>
        </aside>
      </div>

      <footer className="border-t border-[var(--dl-border)] bg-[var(--dl-surface-strong)] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-[var(--dl-muted)] sm:text-sm">
        Scoreboard prototype • Human-confirmed scoring • Camera-assisted later
      </footer>

      {winner && (
        <WinnerOverlay 
          winnerName={winner.name} 
          onReset={onResetMatch} 
        />
      )}
    </Card>
  );
}
