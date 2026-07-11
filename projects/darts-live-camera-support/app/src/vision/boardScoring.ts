import { WARPED_CENTER, WARPED_RADIUS } from '@/vision/perspective';
import type { Point } from '@/domain/types';
import type { DartDetectionResult } from '@/vision/detection';

/**
 * Official sisal dartboard ring boundaries, expressed as a ratio of the
 * outer double-ring radius (1.0 = the double wire boundary itself).
 * Validated against real board proportions in Spike 4.1.
 */
export const BOARD_RINGS = {
  DOUBLE_OUTER: 1.0, // 170.0mm / 170.0mm
  DOUBLE_INNER: 162.0 / 170.0, // 8mm double ring width
  TREBLE_OUTER: 107.4 / 170.0,
  TREBLE_INNER: 99.4 / 170.0, // 8mm treble ring width
  OUTER_BULL_R: (31.8 / 2) / 170.0, // 31.8mm diameter
  INNER_BULL_R: (12.7 / 2) / 170.0, // 12.7mm diameter
} as const;

/** Segment numbers in clockwise order starting from the top (segment 20). */
export const BOARD_SEGMENTS = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
] as const;

/** Segment "20" is centered on the top of the warped board, i.e. -90 degrees. */
const WARPED_ANGLE_OFFSET = -Math.PI / 2;

export type RingType = 'Miss' | 'Single' | 'Double' | 'Treble' | 'OuterBull' | 'InnerBull';

export type DartScoreResult = {
  /** Board segment hit (1-20). `0` for a miss or a bullseye hit. */
  segment: number;
  /** Which ring the point fell into. */
  ring: RingType;
  /** Score multiplier: 0 (miss), 1 (single/outer bull), 2 (double/inner bull), 3 (treble). */
  multiplier: 0 | 1 | 2 | 3;
  /** Final numeric score for this single dart (e.g. Treble 20 = 60, Inner Bull = 50). */
  score: number;
  /** Human-readable label, e.g. "Treble 20", "Outer Bull", "Miss". */
  label: string;
};

/**
 * Converts a single X/Y pixel coordinate, expressed in the WARPED_SIZE
 * (perspective-corrected) coordinate space produced by `vision/perspective.ts`,
 * into a dart score using pure polar geometry. This is the same math
 * validated in Spike 4.1, now reusable across the app.
 *
 * This function is purely geometric and has no OpenCV dependency, so it can
 * run synchronously anywhere (including tests) without waiting for OpenCV.js.
 */
export function scoreWarpedPoint(point: Point): DartScoreResult {
  const dx = point.x - WARPED_CENTER.x;
  const dy = point.y - WARPED_CENTER.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const relativeDist = distance / WARPED_RADIUS;

  let angle = Math.atan2(dy, dx) - WARPED_ANGLE_OFFSET;
  while (angle < 0) angle += Math.PI * 2;
  while (angle >= Math.PI * 2) angle -= Math.PI * 2;

  const angleDeg = angle * (180 / Math.PI);
  const adjustedDeg = (angleDeg + 9) % 360;
  const segmentIndex = Math.floor(adjustedDeg / 18);
  const segmentValue = BOARD_SEGMENTS[segmentIndex];

  if (relativeDist > BOARD_RINGS.DOUBLE_OUTER) {
    return { segment: 0, ring: 'Miss', multiplier: 0, score: 0, label: 'Miss' };
  }

  if (relativeDist >= BOARD_RINGS.DOUBLE_INNER) {
    return {
      segment: segmentValue,
      ring: 'Double',
      multiplier: 2,
      score: segmentValue * 2,
      label: `Double ${segmentValue}`,
    };
  }

  if (relativeDist > BOARD_RINGS.TREBLE_OUTER) {
    return {
      segment: segmentValue,
      ring: 'Single',
      multiplier: 1,
      score: segmentValue,
      label: `Single ${segmentValue}`,
    };
  }

  if (relativeDist >= BOARD_RINGS.TREBLE_INNER) {
    return {
      segment: segmentValue,
      ring: 'Treble',
      multiplier: 3,
      score: segmentValue * 3,
      label: `Treble ${segmentValue}`,
    };
  }

  if (relativeDist > BOARD_RINGS.OUTER_BULL_R) {
    return {
      segment: segmentValue,
      ring: 'Single',
      multiplier: 1,
      score: segmentValue,
      label: `Single ${segmentValue}`,
    };
  }

  if (relativeDist >= BOARD_RINGS.INNER_BULL_R) {
    return { segment: 0, ring: 'OuterBull', multiplier: 1, score: 25, label: 'Outer Bull' };
  }

  return { segment: 0, ring: 'InnerBull', multiplier: 2, score: 50, label: 'Inner Bull' };
}

/**
 * Converts a raw `DartDetectionResult` (from `vision/detection.ts`) into a
 * dart score. The detection result's X/Y must already be in WARPED_SIZE
 * coordinate space (i.e. detection was run on perspective-corrected canvases).
 */
export function scoreDartDetection(detection: DartDetectionResult): DartScoreResult {
  return scoreWarpedPoint({ x: detection.x, y: detection.y });
}

/**
 * Convenience helper for scoring a full turn (up to 3 darts). Sums the
 * individual dart scores into a single turn total, ready to be proposed to
 * `ScoreInput` for human confirmation.
 */
export function scoreTurnDetections(detections: DartDetectionResult[]): {
  darts: DartScoreResult[];
  turnTotal: number;
} {
  const darts = detections.map(scoreDartDetection);
  const turnTotal = darts.reduce((sum, dart) => sum + dart.score, 0);
  return { darts, turnTotal };
}