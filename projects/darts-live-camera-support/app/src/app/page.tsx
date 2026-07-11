'use client';

import { useState } from 'react';
import { CorrectionControls } from '@/components/CorrectionControls';
import { MatchSetup, type MatchSetupData } from '@/components/MatchSetup';
import { CalibrationSetup } from '@/components/CalibrationSetup';
import { CameraPanel } from '@/components/CameraPanel';
import { ScoreInput } from '@/components/ScoreInput';
import { Scoreboard } from '@/components/Scoreboard';
import { TurnHistory } from '@/components/TurnHistory';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { MatchState, Snapshot, CalibrationData } from '@/domain/types';

export default function HomePage() {
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [calibrationData, setCalibrationData] = useState<CalibrationData | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  // These represent the locally taken snapshot waiting to be attached to the next score
  const [pendingSnapshotId, setPendingSnapshotId] = useState<string | null>(null);
  const [pendingSnapshotUrl, setPendingSnapshotUrl] = useState<string | null>(null);
  
  // Find the URL of the last confirmed turn to display in the CameraPanel
  const lastTurn = matchState?.turns.at(-1);
  const lastSnapshotId = lastTurn?.snapshotId ?? null;
  const lastSnapshotUrl = lastSnapshotId ? matchState?.snapshots.find(s => s.id === lastSnapshotId)?.url : null;

  function handleStartMatch(data: MatchSetupData) {
    const initialState: MatchState = {
      match: {
        id: crypto.randomUUID(),
        status: 'active',
        gameType: String(data.gameType) as '301' | '501',
        startingScore: data.gameType,
        currentPlayerId: 'p1',
        createdAt: new Date().toISOString(),
      },
      players: [
        { id: 'p1', name: data.player1 },
        { id: 'p2', name: data.player2 },
      ],
      playerScores: [
        { playerId: 'p1', remainingScore: data.gameType },
        { playerId: 'p2', remainingScore: data.gameType },
      ],
      turns: [],
      corrections: [],
      snapshots: [],
    };

    setMatchState(initialState);
    setMessage(null);
    setPendingSnapshotId(null);
    setPendingSnapshotUrl(null);
  }

  function handleCaptureSnapshot(base64Url: string) {
    setPendingSnapshotId(`snap-${crypto.randomUUID().slice(0, 8)}`);
    setPendingSnapshotUrl(base64Url);
    setMessage('Camera image captured for the next confirmed score.');
  }

  function handleDiscardSnapshot() {
    setPendingSnapshotId(null);
    setPendingSnapshotUrl(null);
  }

  function handleStateChange(newState: MatchState) {
    // If a new turn was added and we had a pending snapshot, save the snapshot into state
    if (pendingSnapshotId && pendingSnapshotUrl && newState.turns.length > (matchState?.turns.length ?? 0)) {
      const newTurn = newState.turns[newState.turns.length - 1];
      const snapshot: Snapshot = {
        id: pendingSnapshotId,
        matchId: newState.match.id,
        turnId: newTurn.id,
        url: pendingSnapshotUrl,
        source: 'camera',
        createdAt: new Date().toISOString(),
      };
      
      setMatchState({
        ...newState,
        snapshots: [...newState.snapshots, snapshot],
      });
    } else {
      setMatchState(newState);
    }
  }

  function handleTurnConfirmed() {
    setPendingSnapshotId(null);
    setPendingSnapshotUrl(null);
  }

  return (
    <main className="min-h-screen px-4 py-6 text-[var(--dl-text)] md:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-6">
        {!matchState ? (
          isCalibrating ? (
            <div className="mx-auto w-full max-w-3xl pt-10">
              <CalibrationSetup 
                onComplete={(data) => {
                  setCalibrationData(data);
                  setIsCalibrating(false);
                }} 
                onCancel={() => setIsCalibrating(false)} 
              />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl pt-10">
              <Card className="mb-6 p-8" tone="card">
                <SectionLabel>Darts Live Camera Support</SectionLabel>
                <div className="flex justify-between items-start">
                  <h1 className="mt-4 text-5xl font-black uppercase tracking-tight text-[var(--dl-text)]">
                    Scoreboard Prototype
                  </h1>
                  <button 
                    onClick={() => setIsCalibrating(true)}
                    className="mt-4 rounded bg-[var(--dl-panel)] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[var(--dl-primary)] transition-colors hover:brightness-110"
                  >
                    {calibrationData ? 'Recalibrate Camera' : 'Calibrate Camera'}
                  </button>
                </div>
                <p className="mt-4 text-lg text-[var(--dl-muted)]">
                  Start a 301 or 501 demo match. Real browser camera capture is active. 
                  {calibrationData 
                    ? ' OpenCV Calibration is configured.' 
                    : ' Calibrate the camera first for OpenCV dart detection.'}
                </p>
              </Card>
              <MatchSetup onStartMatch={handleStartMatch} />
            </div>
          )
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
                  onStateChange={handleStateChange}
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
                <CameraPanel
                  pendingSnapshotUrl={pendingSnapshotUrl}
                  lastSnapshotUrl={lastSnapshotUrl}
                  onCreateSnapshot={handleCaptureSnapshot}
                  onClearSnapshot={handleDiscardSnapshot}
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
