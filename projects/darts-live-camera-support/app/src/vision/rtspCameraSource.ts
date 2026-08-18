/**
 * Client for the local RTSP-to-JPEG bridge (see `tools/rtsp-snapshot-bridge/`).
 *
 * Browsers cannot speak RTSP directly, so a small local companion process
 * pulls one JPEG frame from the camera (e.g. a TP-Link Tapo C110) and serves
 * it over plain HTTP. This module only talks to that HTTP endpoint — it has
 * no knowledge of RTSP, camera credentials, or vendor-specific stream URLs.
 *
 * Mirrors the shape of `CameraPreview.capture()`: it never throws, and on
 * failure returns `null` plus a human-readable reason so the UI can show an
 * error state instead of crashing, per the project's "human-confirmed"
 * workflow requirement.
 */

export type RtspSnapshotResult =
  | { success: true; dataUrl: string }
  | { success: false; error: string };

/** Default time to wait for the local bridge to respond before giving up. */
const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Fetches one snapshot frame from the local RTSP bridge and returns it as a
 * base64 data URL, in the same shape the app already uses for browser-camera
 * and mock snapshots.
 *
 * @param bridgeUrl Base URL of the local bridge, e.g. `http://localhost:8089`.
 * @param timeoutMs Maximum time to wait for a response before aborting and
 *   reporting a timeout error, instead of hanging indefinitely (e.g. when the
 *   camera is on but the network path is silently dropping packets). Defaults
 *   to 8 seconds.
 */
export async function fetchRtspSnapshot(
  bridgeUrl: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<RtspSnapshotResult> {
  if (!bridgeUrl) {
    return { success: false, error: 'No IP camera bridge URL configured.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${bridgeUrl.replace(/\/$/, '')}/snapshot`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return { success: false, error: `IP camera bridge returned an error (HTTP ${response.status}).` };
    }

    const blob = await response.blob();
    if (!blob.type.startsWith('image/')) {
      return { success: false, error: 'IP camera bridge did not return an image.' };
    }

    const dataUrl = await blobToDataUrl(blob);
    return { success: true, dataUrl };
  } catch (err) {
    if (isAbortError(err)) {
      return {
        success: false,
        error: `IP camera bridge did not respond within ${Math.round(timeoutMs / 1000)}s. Check the camera and bridge are running.`,
      };
    }
    // Covers network failures (fetch rejects) as well as a corrupted/partial
    // response (blob()/FileReader rejecting) - either way this must resolve
    // to a graceful error result, never throw, so the UI can always fall
    // back to manual score entry instead of getting stuck.
    return { success: false, error: 'Could not reach the IP camera bridge. Is it running on the local network?' };
  } finally {
    clearTimeout(timeoutId);
  }
}

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
