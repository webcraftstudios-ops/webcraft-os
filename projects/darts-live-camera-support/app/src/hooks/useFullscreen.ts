'use client';

import { useCallback, useEffect, useState } from 'react';

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

export function useFullscreen(elementRef?: React.RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    const doc = document as FullscreenDocument;
    const supported = Boolean(
      document.documentElement.requestFullscreen ||
        (document.documentElement as FullscreenElement).webkitRequestFullscreen ||
        (document.documentElement as FullscreenElement).msRequestFullscreen,
    );
    setIsSupported(supported || Boolean(doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen));

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    setFallbackMessage(null);

    try {
      if (!document.fullscreenElement) {
        // Attempt to enter fullscreen on the provided element, fallback to document.documentElement
        const target = (elementRef?.current ?? document.documentElement) as FullscreenElement;

        if (target.requestFullscreen) {
          await target.requestFullscreen();
        } else if (target.webkitRequestFullscreen) {
          await target.webkitRequestFullscreen(); // iOS Safari fallback
        } else if (target.msRequestFullscreen) {
          await target.msRequestFullscreen(); // Edge fallback
        } else {
          setIsSupported(false);
          setFallbackMessage('Kiosk mode is not supported in this browser. Continuing in windowed mode.');
        }
      } else {
        // Exit fullscreen
        const doc = document as FullscreenDocument;

        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (error) {
      // Fail gracefully if blocked by browser policy (e.g., iframe without allowfullscreen)
      console.warn('Fullscreen API error:', error);
      setFallbackMessage('Kiosk mode could not be activated. The browser blocked the request.');
    }
  }, [elementRef]);

  return { isFullscreen, isSupported, fallbackMessage, toggleFullscreen };
}
