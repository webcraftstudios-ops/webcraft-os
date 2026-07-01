'use client';

import { useState } from 'react';
import { CorrectionControls } from '@/components/CorrectionControls';
import { MatchSetup } from '@/components/MatchSetup';
import { ScoreInput } from '@/components/ScoreInput';
import { Scoreboard } from '@/components/Scoreboard';
import { TurnHistory } from '@/components/TurnHistory';
import type { MatchState } from '@/domain/types';

export default function HomePage() {
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleStartMatch(state: MatchState) {
    setMatchState(state);
    setMessage(null);
  }

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

        {message ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-sm text-slate-200">
            {message}
          </div>
        ) : null}

        {matchState ? (
          <>
            <Scoreboard state={matchState} />
            <ScoreInput
              state={matchState}
              onStateChange={setMatchState}
              onMessageChange={setMessage}
            />
            <CorrectionControls
              state={matchState}
              onStateChange={setMatchState}
              onMessageChange={setMessage}
            />
            <TurnHistory state={matchState} />
          </>
        ) : (
          <MatchSetup onStartMatch={handleStartMatch} />
        )}
      </section>
    </main>
  );
}
