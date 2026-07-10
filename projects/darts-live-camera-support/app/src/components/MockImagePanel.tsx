'use client';

import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';

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
      <div className="rounded-xl border border-dashed border-[var(--dl-border)] bg-[var(--dl-bg)] p-6 text-center">
        <div className="mx-auto flex h-40 max-w-md items-center justify-center rounded-lg border border-[var(--dl-border)] bg-[var(--dl-surface)]">
          <div>
            <p className="text-sm text-[var(--dl-muted)]">Simulated dartboard snapshot</p>
            <p className="mt-2 text-lg font-semibold text-[var(--dl-text)]">
              {pendingSnapshotId ?? lastSnapshotId ?? 'No image reference yet'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <Button onClick={onCreateSnapshot} type="button">
          Create mock image
        </Button>
        <Button disabled={!pendingSnapshotId} onClick={onClearSnapshot} type="button" variant="secondary">
          Clear pending image
        </Button>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-[var(--dl-muted)]">
        <p>Pending image: {pendingSnapshotId ?? '-'}</p>
        <p>Last linked image: {lastSnapshotId ?? '-'}</p>
      </div>
    </Panel>
  );
}
