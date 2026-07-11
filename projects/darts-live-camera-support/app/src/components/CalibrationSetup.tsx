'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { CameraPreview, type CameraPreviewRef } from '@/components/CameraPreview';
import { isOpenCvReady, warpBoardImage } from '@/vision/perspective';
import type { CalibrationData, Point } from '@/domain/types';

type CalibrationSetupProps = {
  onComplete: (data: CalibrationData) => void;
  onCancel: () => void;
};

export function CalibrationSetup({ onComplete, onCancel }: CalibrationSetupProps) {
  const cameraRef = useRef<CameraPreviewRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [step, setStep] = useState<1 | 2>(1);
  const [baselineUrl, setBaselineUrl] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [warpError, setWarpError] = useState<string | null>(null);
  const [cvReady, setCvReady] = useState(false);

  // Poll for OpenCV readiness since the script loads lazily and asynchronously.
  useEffect(() => {
    if (cvReady) return;
    const interval = setInterval(() => {
      if (isOpenCvReady()) {
        setCvReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [cvReady]);

  // Re-run the warp preview automatically whenever we have all 4 points.
  useEffect(() => {
    if (points.length !== 4) return;
    if (!cvReady) {
      setWarpError('OpenCV is still loading. The preview will appear automatically once ready.');
      return;
    }

    const sourceCanvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!sourceCanvas || !previewCanvas) return;

    try {
      warpBoardImage(sourceCanvas, previewCanvas, {
        baselineUrl: baselineUrl ?? '',
        sourcePoints: points as [Point, Point, Point, Point],
      });
      setWarpError(null);
    } catch (err) {
      setWarpError(err instanceof Error ? err.message : 'Failed to warp the board preview.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, cvReady]);

  function handleCaptureBaseline() {
    if (cameraRef.current) {
      const url = cameraRef.current.capture();
      if (url) {
        setBaselineUrl(url);
        setStep(2);
        // Draw image on canvas after a short delay so ref is populated
        setTimeout(() => drawImageToCanvas(url), 50);
      }
    }
  }

  function drawImageToCanvas(url: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const img = new Image();
    img.onload = () => {
      // Set canvas intrinsic size to image size for exact coordinate mapping
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
    };
    img.src = url;
  }

  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (step !== 2 || points.length >= 4) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    // Calculate click coordinates relative to the intrinsic image size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const newPoints = [...points, { x, y }];
    setPoints(newPoints);
    
    // Draw the point
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(String(newPoints.length), x - 5, y + 5);
      
      // If we have 4 points, draw the shape
      if (newPoints.length === 4) {
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(newPoints[0].x, newPoints[0].y);
        ctx.lineTo(newPoints[1].x, newPoints[1].y);
        ctx.lineTo(newPoints[2].x, newPoints[2].y);
        ctx.lineTo(newPoints[3].x, newPoints[3].y);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  function handleReset() {
    setPoints([]);
    setWarpError(null);
    if (baselineUrl) drawImageToCanvas(baselineUrl);
    const previewCanvas = previewCanvasRef.current;
    if (previewCanvas) {
      const ctx = previewCanvas.getContext('2d');
      ctx?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    }
  }

  function handleFinish() {
    if (baselineUrl && points.length === 4) {
      onComplete({
        baselineUrl,
        sourcePoints: points as [Point, Point, Point, Point]
      });
    }
  }

  return (
    <Card className="flex flex-col p-6" tone="card">
      <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-[var(--dl-text)]">
        Camera Calibration (Phase 5.1)
      </h2>
      
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <p className="text-[var(--dl-muted)]">
            Step 1: Point the camera at the empty dartboard and ensure the board is fully visible and stationary.
          </p>
          <div className="h-64 sm:h-96">
            <CameraPreview ref={cameraRef} isLive={true} />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCaptureBaseline}
              className="flex-1 rounded-lg bg-[var(--dl-primary)] py-3 font-bold uppercase text-[var(--dl-bg)] transition-colors hover:brightness-110"
            >
              Capture Empty Board
            </button>
            <button
              onClick={onCancel}
              className="rounded-lg bg-[var(--dl-panel)] px-6 py-3 font-bold uppercase text-[var(--dl-text)] transition-colors hover:brightness-110"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <p className="text-[var(--dl-muted)]">
            Step 2: Click the 4 outer edges of the <b>Double Ring</b> in exactly this order:
            <br />
            <span className={points.length === 0 ? 'text-[var(--dl-primary)] font-bold' : ''}>1. Top (D20)</span> &rarr;{' '}
            <span className={points.length === 1 ? 'text-[var(--dl-primary)] font-bold' : ''}>2. Right (D6)</span> &rarr;{' '}
            <span className={points.length === 2 ? 'text-[var(--dl-primary)] font-bold' : ''}>3. Bottom (D3)</span> &rarr;{' '}
            <span className={points.length === 3 ? 'text-[var(--dl-primary)] font-bold' : ''}>4. Left (D11)</span>
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--dl-muted)]">
                Source (Click here)
              </span>
              <div className="relative overflow-hidden rounded-xl border border-[var(--dl-border)] bg-black shadow-inner">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="block h-auto w-full cursor-crosshair"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--dl-muted)]">
                Warped Preview (Perspective Corrected)
              </span>
              <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-[var(--dl-border)] bg-black shadow-inner aspect-square">
                {points.length < 4 ? (
                  <p className="p-4 text-center text-sm text-[var(--dl-muted)]">
                    Click all 4 points on the left to see the corrected, perfectly circular board here.
                  </p>
                ) : warpError ? (
                  <p className="p-4 text-center text-sm text-amber-400">{warpError}</p>
                ) : null}
                <canvas
                  ref={previewCanvasRef}
                  className={`absolute inset-0 h-full w-full object-contain ${points.length === 4 && !warpError ? '' : 'hidden'}`}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            {points.length === 4 ? (
              <button
                onClick={handleFinish}
                className="flex-1 rounded-lg bg-green-500 py-3 font-bold uppercase text-white transition-colors hover:brightness-110"
              >
                Save Calibration
              </button>
            ) : (
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg bg-[var(--dl-panel)] py-3 font-bold uppercase text-[var(--dl-text)] transition-colors hover:brightness-110"
              >
                Retake Photo
              </button>
            )}
            
            <button
              onClick={handleReset}
              disabled={points.length === 0}
              className="rounded-lg bg-[var(--dl-panel)] px-6 py-3 font-bold uppercase text-[var(--dl-text)] disabled:opacity-50 transition-colors hover:brightness-110"
            >
              Reset Points
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}