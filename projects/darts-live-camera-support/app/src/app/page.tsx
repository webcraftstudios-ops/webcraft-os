'use client';

import { useState } from 'react';
import { MatchSetup } from '@/components/MatchSetup';
import type { MatchState } from '@/domain/types';

export default function HomePage() {
  const [matchState, setMatchState] = useState<MatchState | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Darts Live Camera Support
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Scoreboard Prototype
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Phase 1 starts with a browser-based 301/501 scoreboard. Camera and image recognition stay out of scope until the scoreboard flow is demoable.
          </p>
        </div>

        {matchState ? (
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-slate-500">Active match</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">
              {matchState.match.gameType} leg started
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {matchState.players.map((player) => {
                const score = matchState.playerScores.find((item) => item.playerId === player.id);
                const isCurrentPlayer = matchState.match.currentPlayerId === player.id;

                return (
                  <div
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                    key={player.id}
                  >
                    <p className="text-sm text-slate-400">{isCurrentPlayer ? 'Current player' : 'Player'}</p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-100">{player.name}</h3>
                    <p className="mt-3 text-4xl font-bold text-slate-100">{score?.remainingScore}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <MatchSetup onStartMatch={setMatchState} />
        )}
      </section>
    </main>
  );
}
