'use client';

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
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <p className="text-xs uppercase tracking-wide text-slate-500">Mock image panel</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-100">Assisted scoring image</h2>
      <p className="mt-2 text-sm text-slate-400">
        This simulates a camera snapshot. The next confirmed score can carry this image reference.
      </p>

      <div className="mt-5 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
        <div className="mx-auto flex h-40 max-w-md items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
          <div>
            <p className="text-sm text-slate-400">Simulated dartboard snapshot</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">
              {pendingSnapshotId ?? lastSnapshotId ?? 'No image reference yet'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <button
          className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-bold text-slate-950"
          onClick={onCreateSnapshot}
          type="button"
        >
          Create mock image
        </button>
        <button
          className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-bold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!pendingSnapshotId}
          onClick={onClearSnapshot}
          type="button"
        >
          Clear pending image
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-400">
        <p>Pending image: {pendingSnapshotId ?? '-'}</p>
        <p>Last linked image: {lastSnapshotId ?? '-'}</p>
      </div>
    </section>
  );
}
