import { SectionLabel } from '@/components/ui/SectionLabel';

export type CameraPreviewProps = {
  isLive?: boolean;
  snapshotUrl?: string | null;
};

export function CameraPreview({ isLive = true, snapshotUrl }: CameraPreviewProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-2 pb-3">
        <SectionLabel>{snapshotUrl ? 'Latest Snapshot' : 'Camera Feed'}</SectionLabel>
        {isLive && !snapshotUrl && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">Live</span>
          </div>
        )}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-[var(--dl-border)] bg-black shadow-inner">
        {/* Placeholder Dartboard Mock Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity"
          style={{
            backgroundImage: snapshotUrl ? `url(${snapshotUrl})` : 'radial-gradient(circle, #333 10%, #111 60%, #000 100%)',
          }}
        />
        
        {/* Wireframe overlay to make it look like a camera target */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full border-2 border-[var(--dl-primary)] opacity-30 md:h-64 md:w-64"></div>
          <div className="absolute h-full w-px bg-[var(--dl-primary)] opacity-20"></div>
          <div className="absolute h-px w-full bg-[var(--dl-primary)] opacity-20"></div>
        </div>
        
        {!snapshotUrl && (
          <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-mono text-white backdrop-blur">
            CAM_01 / 1080P_60FPS
          </div>
        )}
      </div>
    </div>
  );
}