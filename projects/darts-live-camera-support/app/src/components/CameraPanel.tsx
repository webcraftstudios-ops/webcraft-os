'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { CameraPreview, type CameraPreviewRef } from '@/components/CameraPreview';
import { fetchRtspSnapshot } from '@/vision/rtspCameraSource';
import type { SnapshotSource } from '@/domain/types';

const TAPO_BRIDGE_URL = process.env.NEXT_PUBLIC_TAPO_BRIDGE_URL ?? '';

export type CameraPanelProps = {
  pendingSnapshotUrl: string | null;
  lastSnapshotUrl?: string | null;
  /**
   * Number of confirmed turns so far (e.g. `matchState.turns.length`). Used
   * only to detect whether a score was confirmed while an IP-camera fetch
   * was still in flight, so a late-arriving snapshot isn't silently attached
   * to the wrong (next) turn. Optional/defaulted so existing callers and
   * tests that don't care about this edge case are unaffected.
   */
  turnCount?: number;
  onCreateSnapshot: (base64Url: string, source?: SnapshotSource) => void;
  onClearSnapshot: () => void;
};

type CameraMode = 'browser' | 'rtsp';

export function CameraPanel({
  pendingSnapshotUrl,
  lastSnapshotUrl,
  turnCount = 0,
  onCreateSnapshot,
  onClearSnapshot,
}: CameraPanelProps) {
  const previewRef = useRef<CameraPreviewRef>(null);
  const [mode, setMode] = useState<CameraMode>('browser');
  const [isFetchingRtsp, setIsFetchingRtsp] = useState(false);
  const [rtspError, setRtspError] = useState<string | null>(null);

  // Always-current turn count, readable from inside the async
  // handleCaptureRtsp closure after it has already started awaiting.
  const turnCountRef = useRef(turnCount);
  useEffect(() => {
    turnCountRef.current = turnCount;
  }, [turnCount]);

  function handleModeChange(nextMode: CameraMode) {
    setMode(nextMode);
    setRtspError(null);
  }

  function handleCapture() {
    const dataUrl = previewRef.current?.capture();
    if (dataUrl) {
      onCreateSnapshot(dataUrl, 'camera');
    }
  }

  async function handleCaptureRtsp() {
    setIsFetchingRtsp(true);
    setRtspError(null);
    const requestedAtTurnCount = turnCountRef.current;
    try {
      const result = await fetchRtspSnapshot(TAPO_BRIDGE_URL);
      if (!result.success) {
        setRtspError(result.error);
        return;
      }
      if (turnCountRef.current !== requestedAtTurnCount) {
        // A score was confirmed (and the turn advanced) while this fetch was
        // still in flight. Attaching it now would silently associate this
        // photo with the *next* turn instead of the one it was actually
        // taken for, so discard it and let the operator recapture manually.
        setRtspError('A new turn was confirmed before this IP camera image arrived; snapshot discarded to avoid attaching it to the wrong turn.');
        return;
      }
      onCreateSnapshot(result.dataUrl, 'rtsp');
    } catch {
      // Defense in depth: fetchRtspSnapshot is designed to never throw, but
      // if it unexpectedly does, still recover gracefully instead of leaving
      // the capture button stuck on "Fetching...".
      setRtspError('Unexpected error while capturing from the IP camera.');
    } finally {
      setIsFetchingRtsp(false);
    }
  }

  const isRtspMode = mode === 'rtsp';
  const showRtspPlaceholder = isRtspMode && !pendingSnapshotUrl && !lastSnapshotUrl;

  return (
    <Panel
      description="Capture a live image from your camera to attach to the next score."
      kicker="Camera panel"
      title="Assisted scoring image"
    >
      <div className="mb-4 flex gap-2">
        <Button
          disabled={!!pendingSnapshotUrl}
          onClick={() => handleModeChange('browser')}
          type="button"
          variant={mode === 'browser' ? 'primary' : 'secondary'}
        >
          Browser Camera
        </Button>
        <Button
          disabled={!!pendingSnapshotUrl}
          onClick={() => handleModeChange('rtsp')}
          type="button"
          variant={mode === 'rtsp' ? 'primary' : 'secondary'}
        >
          IP Camera (Tapo C110)
        </Button>
      </div>

      <div className="h-64 rounded-xl">
        {showRtspPlaceholder ? (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-[var(--dl-border)] bg-black p-4 text-center">
            <p className="text-sm text-[var(--dl-muted)]">
              Press &ldquo;Capture Snapshot&rdquo; to pull a fresh frame from the IP camera bridge.
            </p>
          </div>
        ) : (
          <CameraPreview
            ref={previewRef}
            isLive={!pendingSnapshotUrl && !isRtspMode}
            snapshotUrl={pendingSnapshotUrl ?? lastSnapshotUrl}
          />
        )}
      </div>

      {isRtspMode && rtspError ? (
        <p className="mt-3 text-sm font-semibold text-red-400" role="alert">
          {rtspError}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <Button
          disabled={!!pendingSnapshotUrl || isFetchingRtsp}
          onClick={isRtspMode ? handleCaptureRtsp : handleCapture}
          type="button"
        >
          {isFetchingRtsp ? 'Fetching...' : 'Capture Snapshot'}
        </Button>
        <Button disabled={!pendingSnapshotUrl} onClick={onClearSnapshot} type="button" variant="secondary">
          Discard Image
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[var(--dl-muted)]">
        <p>Pending: <span className="font-mono text-[var(--dl-text)]">{pendingSnapshotUrl ? 'Yes' : 'No'}</span></p>
        <p>Last image: <span className="font-mono text-[var(--dl-text)]">{lastSnapshotUrl ? 'Yes' : 'No'}</span></p>
      </div>
    </Panel>
  );
}
