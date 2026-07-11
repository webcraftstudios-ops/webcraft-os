'use client';

import { useCallback, useEffect, useState } from 'react';

export function useFullscreen(elementRef?: React.RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        // Attempt to enter fullscreen on the provided element, fallback to document.documentElement
        const target = elementRef?.current ?? document.documentElement;
        if (target.requestFullscreen) {
          await target.requestFullscreen();
        } else if ((target as any).webkitRequestFullscreen) {
          await (target as any).webkitRequestFullscreen(); // iOS Safari fallback
        } else if ((target as any).msRequestFullscreen) {
          await (target as any).msRequestFullscreen(); // Edge fallback
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.warn('Fullscreen API error:', error);
      // Fail gracefully if blocked by browser policy (e.g., iframe without allowfullscreen)
    }
  }, [elementRef]);

  return { isFullscreen, toggleFullscreen };
}
