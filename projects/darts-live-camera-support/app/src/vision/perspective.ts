import { getCv } from '@/vision/opencv';
import type { CalibrationData, Point } from '@/domain/types';

/**
 * The size (in pixels) of the perfectly warped square output.
 * The dartboard's outer double-ring will always sit exactly on this bounding circle.
 */
export const WARPED_SIZE = 800;
export const WARPED_CENTER: Point = { x: WARPED_SIZE / 2, y: WARPED_SIZE / 2 };
export const WARPED_RADIUS = WARPED_SIZE / 2;

export { isOpenCvReady, OpenCvNotReadyError } from '@/vision/opencv';

/**
 * Builds the destination points (a perfect square aligned to the outer double
 * ring) that the calibration source points should be warped onto.
 * Order must match CalibrationData.sourcePoints: [Top, Right, Bottom, Left].
 */
function getDestinationPoints(): [Point, Point, Point, Point] {
  return [
    { x: WARPED_CENTER.x, y: 0 }, // Top (D20)
    { x: WARPED_SIZE, y: WARPED_CENTER.y }, // Right (D6)
    { x: WARPED_CENTER.x, y: WARPED_SIZE }, // Bottom (D3)
    { x: 0, y: WARPED_CENTER.y }, // Left (D11)
  ];
}

function pointsToArray(points: Point[]): number[] {
  return points.flatMap((p) => [p.x, p.y]);
}

/**
 * Computes the OpenCV perspective transform matrix for a given calibration.
 * Caller is responsible for calling `.delete()` on the returned matrix once done,
 * to free the WASM heap memory (OpenCV.js does not garbage collect Mats).
 */
export function computePerspectiveMatrix(sourcePoints: [Point, Point, Point, Point]) {
  const cv = getCv();
  const dstPoints = getDestinationPoints();

  const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, pointsToArray(sourcePoints));
  const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, pointsToArray(dstPoints));

  try {
    return cv.getPerspectiveTransform(srcTri, dstTri);
  } finally {
    srcTri.delete();
    dstTri.delete();
  }
}

/**
 * Warps a source canvas (containing the raw, distorted camera frame) into a
 * destination canvas containing a perfectly circular, perspective-corrected
 * dartboard image (WARPED_SIZE x WARPED_SIZE).
 *
 * The destination canvas element must already exist in the DOM (or be
 * detached) with an id, since OpenCV.js's `cv.imshow` writes to it directly.
 */
export function warpBoardImage(
  sourceCanvas: HTMLCanvasElement,
  destinationCanvas: HTMLCanvasElement,
  calibration: CalibrationData,
): void {
  const cv = getCv();

  destinationCanvas.width = WARPED_SIZE;
  destinationCanvas.height = WARPED_SIZE;

  const m = computePerspectiveMatrix(calibration.sourcePoints);
  const srcMat = cv.imread(sourceCanvas);
  const dstMat = new cv.Mat();

  try {
    cv.warpPerspective(
      srcMat,
      dstMat,
      m,
      new cv.Size(WARPED_SIZE, WARPED_SIZE),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar(),
    );
    cv.imshow(destinationCanvas, dstMat);
  } finally {
    srcMat.delete();
    dstMat.delete();
    m.delete();
  }
}

/**
 * Draws an image (e.g. a base64 data URL) onto a canvas at its intrinsic
 * resolution, resolving once the draw has completed. Useful to prep a
 * hidden/offscreen canvas before calling `warpBoardImage`.
 */
export function drawImageUrlToCanvas(url: string, canvas: HTMLCanvasElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not acquire 2D context for canvas.'));
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve();
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}