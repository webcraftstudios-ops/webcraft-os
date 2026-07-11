'use client';

import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { CameraPreview } from '@/components/CameraPreview';

export type MockImagePanelProps = {
  pendingSnapshotId: string | null;
  lastSnapshotId?: string | null;
  onCreateSnapshot: () => void;
  onClearSnapshot: () => void;
};

export function MockImagePanel({
  pendingSnapshotId,
  lastSnapshotId,
  onCreateSnapshot,
  onClearSnapshot,
}: MockImagePanelProps) {
  return (
    <Panel
      description="This simulates a camera snapshot. The next confirmed score can carry this image reference."
      kicker="Mock image panel"
      title="Assisted scoring image"
    >
      <div className="h-64 rounded-xl">
        <CameraPreview 
          isLive={!pendingSnapshotId && !lastSnapshotId} 
          snapshotUrl={pendingSnapshotId ? '/images/mock-dartboard-pending.jpg' : lastSnapshotId ? '/images/mock-dartboard-saved.jpg' : undefined} 
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <Button onClick={onCreateSnapshot} type="button">
          Capture Snapshot
        </Button>
        <Button disabled={!pendingSnapshotId} onClick={onClearSnapshot} type="button" variant="secondary">
          Discard Image
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[var(--dl-muted)]">
        <p>Pending image: <span className="font-mono text-[var(--dl-text)]">{pendingSnapshotId ?? '-'}</span></p>
        <p>Last linked image: <span className="font-mono text-[var(--dl-text)]">{lastSnapshotId ?? '-'}</span></p>
      </div>
    </Panel>
  );
}
