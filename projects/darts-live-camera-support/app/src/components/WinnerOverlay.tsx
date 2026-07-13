import { Button } from '@/components/ui/Button';

export type WinnerOverlayProps = {
  winnerName: string;
  onReset?: () => void;
};

export function WinnerOverlay({ winnerName, onReset }: WinnerOverlayProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md transition-all duration-500 animate-in fade-in zoom-in-95">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-6xl font-black uppercase tracking-[0.2em] text-[var(--dl-gold,theme(colors.amber.400))] drop-shadow-xl md:text-8xl lg:text-[140px]">
          Game Shot
        </h2>
        <p className="text-4xl font-bold tracking-wider text-white md:text-5xl lg:text-7xl">
          {winnerName} Wins!
        </p>
        
        {onReset && (
          <div className="mt-12">
            <Button onClick={onReset} variant="primary" className="px-10 py-5 text-xl font-bold">
              Start New Match
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}