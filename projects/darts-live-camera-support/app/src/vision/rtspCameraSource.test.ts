import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchRtspSnapshot } from './rtspCameraSource';

describe('fetchRtspSnapshot', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns an error immediately when no bridge URL is configured', async () => {
    const result = await fetchRtspSnapshot('');

    expect(result).toEqual({
      success: false,
      error: 'No IP camera bridge URL configured.',
    });
  });

  it('fetches /snapshot from the bridge and resolves a base64 data URL on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => new Blob(['fake-jpeg-bytes'], { type: 'image/jpeg' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchRtspSnapshot('http://localhost:8089');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8089/snapshot',
      expect.objectContaining({
        method: 'GET',
        cache: 'no-store',
        signal: expect.any(AbortSignal),
      })
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.dataUrl.startsWith('data:image/jpeg;base64,')).toBe(true);
    }
  });

  it('strips a trailing slash from the configured bridge URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => new Blob(['fake-jpeg-bytes'], { type: 'image/jpeg' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetchRtspSnapshot('http://localhost:8089/');

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8089/snapshot', expect.anything());
  });

  it('returns an error when the bridge process is unreachable', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('ECONNREFUSED'));
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchRtspSnapshot('http://localhost:8089');

    expect(result).toEqual({
      success: false,
      error: 'Could not reach the IP camera bridge. Is it running on the local network?',
    });
  });

  it('returns an error when the bridge responds with a non-OK HTTP status', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
      blob: async () => new Blob([]),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchRtspSnapshot('http://localhost:8089');

    expect(result).toEqual({
      success: false,
      error: 'IP camera bridge returned an error (HTTP 502).',
    });
  });

  it('returns an error when the bridge response is not an image', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => new Blob(['<html></html>'], { type: 'text/html' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchRtspSnapshot('http://localhost:8089');

    expect(result).toEqual({
      success: false,
      error: 'IP camera bridge did not return an image.',
    });
  });

  it('recovers gracefully (instead of rejecting) when the response body is corrupted mid-transfer', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => {
        throw new Error('network read failed');
      },
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchRtspSnapshot('http://localhost:8089')).resolves.toEqual({
      success: false,
      error: 'Could not reach the IP camera bridge. Is it running on the local network?',
    });
  });

  it('recovers gracefully when fetch rejects with a non-Error value', async () => {
    const fetchMock = vi.fn().mockRejectedValue('connection reset');
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchRtspSnapshot('http://localhost:8089')).resolves.toEqual({
      success: false,
      error: 'Could not reach the IP camera bridge. Is it running on the local network?',
    });
  });

  it('allows a retry to succeed right after a failed attempt (no lingering broken state)', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('ECONNREFUSED'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        blob: async () => new Blob(['fake-jpeg-bytes'], { type: 'image/jpeg' }),
      });
    vi.stubGlobal('fetch', fetchMock);

    const firstAttempt = await fetchRtspSnapshot('http://localhost:8089');
    expect(firstAttempt.success).toBe(false);

    const secondAttempt = await fetchRtspSnapshot('http://localhost:8089');
    expect(secondAttempt.success).toBe(true);
    if (secondAttempt.success) {
      expect(secondAttempt.dataUrl.startsWith('data:image/jpeg;base64,')).toBe(true);
    }
  });

  describe('timeout handling', () => {
    // Only fake the timer APIs our own timeout logic uses; jsdom's FileReader
    // relies on real async scheduling internally to fire its load events.
    const fakeTimerOptions = { toFake: ['setTimeout', 'clearTimeout'] } as const;

    afterEach(() => {
      vi.useRealTimers();
    });

    it('aborts and returns a timeout error when the bridge does not respond in time', async () => {
      vi.useFakeTimers(fakeTimerOptions);
      const fetchMock = vi.fn((_url: string, options: { signal: AbortSignal }) => {
        return new Promise((_resolve, reject) => {
          options.signal.addEventListener('abort', () => {
            reject(new DOMException('The operation was aborted.', 'AbortError'));
          });
        });
      });
      vi.stubGlobal('fetch', fetchMock);

      const resultPromise = fetchRtspSnapshot('http://localhost:8089', 5000);
      await vi.advanceTimersByTimeAsync(5000);
      const result = await resultPromise;

      expect(result).toEqual({
        success: false,
        error: 'IP camera bridge did not respond within 5s. Check the camera and bridge are running.',
      });
    });

    it('passes an abort signal to fetch so a slow bridge can actually be cancelled', async () => {
      vi.useFakeTimers(fakeTimerOptions);
      const fetchMock = vi.fn((_url: string, options: { signal: AbortSignal }) => {
        return new Promise((_resolve, reject) => {
          options.signal.addEventListener('abort', () => {
            reject(new DOMException('The operation was aborted.', 'AbortError'));
          });
        });
      });
      vi.stubGlobal('fetch', fetchMock);

      const resultPromise = fetchRtspSnapshot('http://localhost:8089', 3000);
      await vi.advanceTimersByTimeAsync(3000);
      await resultPromise;

      const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;
      expect(signal.aborted).toBe(true);
    });

    it('resolves normally without a timeout error when the bridge responds well within the deadline', async () => {
      vi.useFakeTimers(fakeTimerOptions);
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        blob: async () => new Blob(['fake-jpeg-bytes'], { type: 'image/jpeg' }),
      });
      vi.stubGlobal('fetch', fetchMock);

      const result = await fetchRtspSnapshot('http://localhost:8089', 5000);

      expect(result.success).toBe(true);

      // Advancing time after a successful response must not retroactively
      // trigger an abort/timeout error - the internal timer should already
      // have been cleared.
      await vi.advanceTimersByTimeAsync(10000);
      expect(result.success).toBe(true);
    });

    it('uses an 8 second default timeout when none is specified', async () => {
      vi.useFakeTimers(fakeTimerOptions);
      const fetchMock = vi.fn((_url: string, options: { signal: AbortSignal }) => {
        return new Promise((_resolve, reject) => {
          options.signal.addEventListener('abort', () => {
            reject(new DOMException('The operation was aborted.', 'AbortError'));
          });
        });
      });
      vi.stubGlobal('fetch', fetchMock);

      const resultPromise = fetchRtspSnapshot('http://localhost:8089');
      await vi.advanceTimersByTimeAsync(8000);
      const result = await resultPromise;

      expect(result).toEqual({
        success: false,
        error: 'IP camera bridge did not respond within 8s. Check the camera and bridge are running.',
      });
    });
  });
});
