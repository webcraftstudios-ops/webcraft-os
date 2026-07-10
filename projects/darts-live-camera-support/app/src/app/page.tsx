'use client';

import { useState } from 'react';
import { CorrectionControls } from '@/components/CorrectionControls';
import { MatchSetup } from '@/components/MatchSetup';
import { MockImagePanel } from '@/components/MockImagePanel';
import { ScoreInput } from '@/components/ScoreInput';
import { Scoreboard } from '@/components/Scoreboard';
import { TurnHistory } from '@/components/TurnHistory';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { MatchState } from '@/domain/types';

export default function HomePage() {
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pendingSnapshotId, setPendingSnapshotId] = useState<string | null>(null);
  const lastSnapshotId = matchState?.turns.at(-1)?.snapshotId ?? null;

  function handleStartMatch(state: MatchState) {
    setMatchState(state);
    setMessage(null);
    setPendingSnapshotId(null);
  }

  function handleCreateMockImage() {
    setPendingSnapshotId(`mock-${crypto.randomUUID().slice(0, 8)}`);
    setMessage('Mock image prepared for the next confirmed score.');
  }

  function handleTurnConfirmed() {
    setPendingSnapshotId(null);
  }

  return (
    <main className="min-h-screen px-4 py-6 text-[var(--dl-text)] md:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-6">
        {!matchState ? (
          <div className="mx-auto w-full max-w-3xl pt-10">
            <Card className="mb-6 p-8" tone="card">
              <SectionLabel>Darts Live Camera Support</SectionLabel>
              <h1 className="mt-4 text-5xl font-black uppercase tracking-tight text-[var(--dl-text)]">
                Scoreboard Prototype
              </h1>
              <p className="mt-4 text-lg text-[var(--dl-muted)]">
                Start a 301 or 501 demo match. Camera and image recognition stay out of scope for this prototype.
              </p>
            </Card>
            <MatchSetup onStartMatch={handleStartMatch} />
          </div>
        ) : (
          <>
            {message ? (
              <Card className="px-5 py-4 text-sm font-semibold text-[var(--dl-text)]" tone="panel">
                {message}
              </Card>
            ) : null}

            <Scoreboard state={matchState} />

            <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
              <div className="grid gap-5">
                <ScoreInput
                  state={matchState}
                  pendingSnapshotId={pendingSnapshotId}
                  onStateChange={setMatchState}
                  onMessageChange={setMessage}
                  onTurnConfirmed={handleTurnConfirmed}
                />
                <CorrectionControls
                  state={matchState}
                  onStateChange={setMatchState}
                  onMessageChange={setMessage}
                />
              </div>

              <div className="grid gap-5">
                <MockImagePanel
                  pendingSnapshotId={pendingSnapshotId}
                  lastSnapshotId={lastSnapshotId}
                  onCreateSnapshot={handleCreateMockImage}
                  onClearSnapshot={() => setPendingSnapshotId(null)}
                />
                <TurnHistory state={matchState} />
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
