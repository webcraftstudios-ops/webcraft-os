'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { CameraPreview, type CameraPreviewRef } from '@/components/CameraPreview';

export type CameraPanelProps = {
  pendingSnapshotUrl: string | null;
  lastSnapshotUrl?: string | null;
  onCreateSnapshot: (base64Url: string) => void;
  onClearSnapshot: () => void;
};

export function CameraPanel({
  pendingSnapshotUrl,
  lastSnapshotUrl,
  onCreateSnapshot,
  onClearSnapshot,
}: CameraPanelProps) {
  const previewRef = useRef<CameraPreviewRef>(null);

  function handleCapture() {
    const dataUrl = previewRef.current?.capture();
    if (dataUrl) {
      onCreateSnapshot(dataUrl);
    }
  }

  return (
    <Panel
      description="Capture a live image from your camera to attach to the next score."
      kicker="Camera panel"
      title="Assisted scoring image"
    >
      <div className="h-64 rounded-xl">
        <CameraPreview
          ref={previewRef}
          isLive={!pendingSnapshotUrl}
          snapshotUrl={pendingSnapshotUrl ?? lastSnapshotUrl}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <Button disabled={!!pendingSnapshotUrl} onClick={handleCapture} type="button">
          Capture Snapshot
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
