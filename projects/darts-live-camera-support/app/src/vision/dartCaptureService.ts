import { drawImageUrlToCanvas, warpBoardImage } from '@/vision/perspective';
import { isOpenCvReady } from '@/vision/opencv';
import { detectDarts, type DartDetectionResult, type DetectDartsOptions } from '@/vision/detection';
import { scoreTurnDetections, type DartScoreResult } from '@/vision/boardScoring';
import type { CalibrationData } from '@/domain/types';

/** A dart turn is at most 3 darts by the rules of the game. */
const MAX_DARTS_PER_TURN = 3;

export type DartCaptureInput = {
  /** The saved calibration (baseline empty-board photo + 4 perspective points). */
  calibration: CalibrationData;
  /** The freshly captured snapshot (base64 URL) taken after the player's turn. */
  currentSnapshotUrl: string;
  /** Optional tuning for the absdiff-based detection sensitivity. */
  detectionOptions?: DetectDartsOptions;
};

export type DartCaptureSuccess = {
  success: true;
  /** Raw detected impact points, in WARPED_SIZE coordinate space. */
  detections: DartDetectionResult[];
  /** Per-dart score breakdown (segment, ring, multiplier, score). */
  darts: DartScoreResult[];
  /** Sum of all detected darts' scores for this turn. */
  turnTotal: number;
};

export type DartCaptureFailure = {
  success: false;
  /** Human-readable reason the automated capture could not run or produced no result. */
  error: string;
};

export type DartCaptureResult = DartCaptureSuccess | DartCaptureFailure;

/**
 * Runs the complete "Fase 5" computer-vision pipeline for a single turn:
 *
 *   1. Draw the calibration baseline + the new snapshot onto offscreen canvases.
 *   2. Perspective-warp both into the perfect WARPED_SIZE circle (vision/perspective.ts).
 *   3. Detect newly-appeared darts via grayscale absdiff (vision/detection.ts).
 *   4. Convert each detected impact point into a segment/multiplier/score (vision/boardScoring.ts).
 *
 * This function NEVER throws: any failure (OpenCV not loaded, bad image data,
 * no darts detected, etc.) resolves to a `DartCaptureFailure` so the calling
 * UI can safely fall back to manual score entry, per the project's
 * "human-confirmed" workflow requirement. The result is always a *proposal*
 * for the operator to confirm — it must not be applied to match state directly.
 */
export async function captureDartTurn(input: DartCaptureInput): Promise<DartCaptureResult> {
  if (!isOpenCvReady()) {
    return { success: false, error: 'OpenCV is not ready yet. Please try again in a moment.' };
  }

  try {
    // 1. Draw the baseline (empty board) and the new snapshot onto offscreen canvases.
    const baselineSourceCanvas = document.createElement('canvas');
    const currentSourceCanvas = document.createElement('canvas');
    await drawImageUrlToCanvas(input.calibration.baselineUrl, baselineSourceCanvas);
    await drawImageUrlToCanvas(input.currentSnapshotUrl, currentSourceCanvas);

    // 2. Perspective-correct both frames so they share the same circular coordinate space.
    const warpedBaselineCanvas = document.createElement('canvas');
    const warpedCurrentCanvas = document.createElement('canvas');
    warpBoardImage(baselineSourceCanvas, warpedBaselineCanvas, input.calibration);
    warpBoardImage(currentSourceCanvas, warpedCurrentCanvas, input.calibration);

    // 3. Detect newly-appeared darts between the two warped frames.
    const allDetections = detectDarts(warpedBaselineCanvas, warpedCurrentCanvas, input.detectionOptions);

    if (allDetections.length === 0) {
      return { success: false, error: 'No darts detected. The board may be unchanged or the throw was missed.' };
    }

    // A turn is at most 3 darts; keep the largest (most confident) contours.
    const detections = allDetections.slice(0, MAX_DARTS_PER_TURN);

    // 4. Convert each impact point into a score.
    const { darts, turnTotal } = scoreTurnDetections(detections);

    return { success: true, detections, darts, turnTotal };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error during dart capture pipeline.',
    };
  }
}