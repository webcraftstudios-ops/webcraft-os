import { describe, it, expect, vi, beforeEach } from 'vitest';
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

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8089/snapshot', {
      method: 'GET',
      cache: 'no-store',
    });
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
});
