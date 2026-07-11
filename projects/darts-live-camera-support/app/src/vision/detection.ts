import { getCv } from '@/vision/opencv';

export type DartDetectionResult = {
  /** X coordinate (in source canvas pixel space) of the estimated impact point. */
  x: number;
  /** Y coordinate (in source canvas pixel space) of the estimated impact point. */
  y: number;
  /** Bounding box of the detected contour, useful for debug overlays. */
  boundingBox: { x: number; y: number; width: number; height: number };
  /** Contour area in pixels; larger areas generally mean higher confidence. */
  area: number;
};

export type DetectDartsOptions = {
  /**
   * Binary threshold applied to the grayscale absolute difference. Higher
   * values require a bigger pixel change to be considered "new" (less
   * sensitive to lighting flicker/noise, but may miss faint dart shafts).
   * Defaults to 30, matching the value validated in Spike 4.2.
   */
  threshold?: number;
  /** Minimum contour area (px) to be considered a dart, filters out sensor noise. Defaults to 50. */
  minArea?: number;
  /** Maximum contour area (px) to be considered a dart, filters out large scene changes (e.g. a person walking by). Defaults to 5000. */
  maxArea?: number;
};

const DEFAULT_OPTIONS: Required<DetectDartsOptions> = {
  threshold: 30,
  minArea: 50,
  maxArea: 5000,
};

/**
 * Detects newly-appeared darts on the board by comparing a `baseline` canvas
 * (an empty/known-good board state) against a `current` canvas (the latest
 * snapshot) using OpenCV's grayscale absolute difference (`absdiff`).
 *
 * Both canvases must be the same size and, ideally, already perspective
 * corrected (see `vision/perspective.ts`) so the returned X/Y coordinates
 * map directly onto the WARPED_SIZE scoring space.
 *
 * Returns all candidate contours found (there may be more than one dart in
 * a single turn), sorted by area descending (largest = most likely a real dart).
 * Returns an empty array if nothing new was detected (e.g. the player missed
 * the board entirely, or the throw fell outside `minArea`/`maxArea`).
 */
export function detectDarts(
  baselineCanvas: HTMLCanvasElement,
  currentCanvas: HTMLCanvasElement,
  options: DetectDartsOptions = {},
): DartDetectionResult[] {
  const cv = getCv();
  const { threshold, minArea, maxArea } = { ...DEFAULT_OPTIONS, ...options };

  const matBaseline = cv.imread(baselineCanvas);
  const matCurrent = cv.imread(currentCanvas);
  const grayBaseline = new cv.Mat();
  const grayCurrent = new cv.Mat();
  const diff = new cv.Mat();
  const mask = new cv.Mat();
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  try {
    // 1. Grayscale conversion (color is irrelevant for detecting change).
    cv.cvtColor(matBaseline, grayBaseline, cv.COLOR_RGBA2GRAY);
    cv.cvtColor(matCurrent, grayCurrent, cv.COLOR_RGBA2GRAY);

    // 2. Blur to suppress camera sensor noise / minor lighting flicker.
    const blurSize = new cv.Size(5, 5);
    cv.GaussianBlur(grayBaseline, grayBaseline, blurSize, 0, 0, cv.BORDER_DEFAULT);
    cv.GaussianBlur(grayCurrent, grayCurrent, blurSize, 0, 0, cv.BORDER_DEFAULT);

    // 3. Absolute difference between the two frames.
    cv.absdiff(grayBaseline, grayCurrent, diff);

    // 4. Binary threshold: anything that changed "enough" becomes white.
    cv.threshold(diff, mask, threshold, 255, cv.THRESH_BINARY);

    // 5. Find contours (connected white blobs) in the difference mask.
    cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    const results: DartDetectionResult[] = [];

    for (let i = 0; i < contours.size(); i += 1) {
      const contour = contours.get(i);
      const area = cv.contourArea(contour);

      if (area >= minArea && area <= maxArea) {
        const rect = cv.boundingRect(contour);
        results.push({
          // Approximate the impact point as the horizontal center, bottom of
          // the bounding box (the dart tip typically points "into" the board,
          // i.e. downward/away from the camera in a front-mounted setup).
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height,
          boundingBox: rect,
          area,
        });
      }

      contour.delete();
    }

    // Largest area first: the biggest contour is the most likely real dart,
    // smaller ones are more likely to be noise or partial shadows.
    return results.sort((a, b) => b.area - a.area);
  } finally {
    matBaseline.delete();
    matCurrent.delete();
    grayBaseline.delete();
    grayCurrent.delete();
    diff.delete();
    mask.delete();
    contours.delete();
    hierarchy.delete();
  }
}

/**
 * Convenience helper: returns only the single most likely dart impact point
 * (the largest valid contour), or `null` if nothing was detected.
 */
export function detectSingleDart(
  baselineCanvas: HTMLCanvasElement,
  currentCanvas: HTMLCanvasElement,
  options: DetectDartsOptions = {},
): DartDetectionResult | null {
  const results = detectDarts(baselineCanvas, currentCanvas, options);
  return results[0] ?? null;
}