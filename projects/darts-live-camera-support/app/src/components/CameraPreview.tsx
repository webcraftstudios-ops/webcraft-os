'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

export type CameraPreviewProps = {
  isLive?: boolean;
  snapshotUrl?: string | null;
};

export type CameraPreviewRef = {
  capture: () => string | null;
};

export const CameraPreview = forwardRef<CameraPreviewRef, CameraPreviewProps>(
  ({ isLive = true, snapshotUrl }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      let activeStream: MediaStream | null = null;
      if (isLive && !snapshotUrl) {
        setError(null);
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then((mediaStream) => {
            activeStream = mediaStream;
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
          })
          .catch((err) => {
            console.error('Camera access error:', err);
            setError('Camera access denied or unavailable.');
          });
      }

      return () => {
        if (activeStream) {
          activeStream.getTracks().forEach((track) => track.stop());
        }
      };
    }, [isLive, snapshotUrl]);

    useImperativeHandle(ref, () => ({
      capture: () => {
        if (!videoRef.current || !stream) return null;
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/jpeg', 0.8);
        }
        return null;
      },
    }));

    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-2 pb-3">
          <SectionLabel>{snapshotUrl ? 'Latest Snapshot' : 'Camera Feed'}</SectionLabel>
          {isLive && !snapshotUrl && !error && (
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
          {snapshotUrl ? (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${snapshotUrl})` }}
            />
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-[var(--dl-muted)]">
              {error}
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          
          {/* Wireframe overlay to make it look like a camera target */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full border-2 border-[var(--dl-primary)] opacity-30 md:h-64 md:w-64"></div>
            <div className="absolute h-full w-px bg-[var(--dl-primary)] opacity-20"></div>
            <div className="absolute h-px w-full bg-[var(--dl-primary)] opacity-20"></div>
          </div>
          
          {!snapshotUrl && !error && (
            <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-mono text-white backdrop-blur">
              CAM_01
            </div>
          )}
        </div>
      </div>
    );
  }
);

CameraPreview.displayName = 'CameraPreview';
