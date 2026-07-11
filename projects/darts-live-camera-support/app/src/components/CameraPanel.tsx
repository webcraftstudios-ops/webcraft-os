'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { CameraPreview, type CameraPreviewRef } from '@/components/CameraPreview';
import { fetchRtspSnapshot } from '@/vision/rtspCameraSource';
import type { SnapshotSource } from '@/domain/types';

const TAPO_BRIDGE_URL = process.env.NEXT_PUBLIC_TAPO_BRIDGE_URL ?? '';

export type CameraPanelProps = {
  pendingSnapshotUrl: string | null;
  lastSnapshotUrl?: string | null;
  onCreateSnapshot: (base64Url: string, source?: SnapshotSource) => void;
  onClearSnapshot: () => void;
};

type CameraMode = 'browser' | 'rtsp';

export function CameraPanel({
  pendingSnapshotUrl,
  lastSnapshotUrl,
  onCreateSnapshot,
  onClearSnapshot,
}: CameraPanelProps) {
  const previewRef = useRef<CameraPreviewRef>(null);
  const [mode, setMode] = useState<CameraMode>('browser');
  const [isFetchingRtsp, setIsFetchingRtsp] = useState(false);
  const [rtspError, setRtspError] = useState<string | null>(null);

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
    const result = await fetchRtspSnapshot(TAPO_BRIDGE_URL);
    setIsFetchingRtsp(false);

    if (!result.success) {
      setRtspError(result.error);
      return;
    }
    onCreateSnapshot(result.dataUrl, 'rtsp');
  }

  const isRtspMode = mode === 'rtsp';

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
        {isRtspMode && !pendingSnapshotUrl ? (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-[var(--dl-border)] bg-black p-4 text-center">
            {rtspError ? (
              <p className="text-sm text-[var(--dl-muted)]">{rtspError}</p>
            ) : (
              <p className="text-sm text-[var(--dl-muted)]">
                Press &ldquo;Capture Snapshot&rdquo; to pull a fresh frame from the IP camera bridge.
              </p>
            )}
          </div>
        ) : (
          <CameraPreview
            ref={previewRef}
            isLive={!pendingSnapshotUrl && !isRtspMode}
            snapshotUrl={pendingSnapshotUrl ?? lastSnapshotUrl}
          />
        )}
      </div>

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
