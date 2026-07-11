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

/**
 * Fetches one snapshot frame from the local RTSP bridge and returns it as a
 * base64 data URL, in the same shape the app already uses for browser-camera
 * and mock snapshots.
 *
 * @param bridgeUrl Base URL of the local bridge, e.g. `http://localhost:8089`.
 */
export async function fetchRtspSnapshot(bridgeUrl: string): Promise<RtspSnapshotResult> {
  if (!bridgeUrl) {
    return { success: false, error: 'No IP camera bridge URL configured.' };
  }

  let response: Response;
  try {
    response = await fetch(`${bridgeUrl.replace(/\/$/, '')}/snapshot`, {
      method: 'GET',
      cache: 'no-store',
    });
  } catch {
    return { success: false, error: 'Could not reach the IP camera bridge. Is it running on the local network?' };
  }

  if (!response.ok) {
    return { success: false, error: `IP camera bridge returned an error (HTTP ${response.status}).` };
  }

  const blob = await response.blob();
  if (!blob.type.startsWith('image/')) {
    return { success: false, error: 'IP camera bridge did not return an image.' };
  }

  const dataUrl = await blobToDataUrl(blob);
  return { success: true, dataUrl };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
