import { describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { CameraPreview } from './CameraPreview';

describe('CameraPreview resource lifecycle', () => {
  it('stops every browser-camera media track when the component unmounts', async () => {
    const stopVideoTrack = vi.fn();
    const stopAudioTrack = vi.fn();
    const getTracks = vi.fn(() => [
      { stop: stopVideoTrack },
      { stop: stopAudioTrack },
    ]);
    const mediaStream = { getTracks } as unknown as MediaStream;
    const getUserMedia = vi.fn().mockResolvedValue(mediaStream);
    const originalMediaDevices = Object.getOwnPropertyDescriptor(navigator, 'mediaDevices');

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia },
    });

    try {
      const { container, unmount } = render(<CameraPreview isLive />);
      const video = container.querySelector('video') as HTMLVideoElement & {
        srcObject: MediaStream | null;
      };

      await waitFor(() => {
        expect(getUserMedia).toHaveBeenCalledWith({
          video: { facingMode: 'environment' },
        });
        expect(video.srcObject).toBe(mediaStream);
      });

      unmount();

      expect(getTracks).toHaveBeenCalledTimes(1);
      expect(stopVideoTrack).toHaveBeenCalledTimes(1);
      expect(stopAudioTrack).toHaveBeenCalledTimes(1);
    } finally {
      if (originalMediaDevices) {
        Object.defineProperty(navigator, 'mediaDevices', originalMediaDevices);
      } else {
        Reflect.deleteProperty(navigator, 'mediaDevices');
      }
    }
  });
});
