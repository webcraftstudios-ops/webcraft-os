import { describe, it, expect } from 'vitest';
import { scoreWarpedPoint, scoreDartDetection, scoreTurnDetections } from './boardScoring';

describe('scoreWarpedPoint', () => {
  it('scores a dead-center hit as Inner Bull', () => {
    const result = scoreWarpedPoint({ x: 400, y: 400 });
    expect(result.ring).toBe('InnerBull');
    expect(result.score).toBe(50);
    expect(result.multiplier).toBe(2);
  });

  it('scores a point just outside the double ring as a Miss', () => {
    const result = scoreWarpedPoint({ x: 400, y: -50 });
    expect(result.ring).toBe('Miss');
    expect(result.score).toBe(0);
  });

  it('scores the top of the board (segment 20) correctly for each ring', () => {
    // Directly above center = segment 20's axis (angle -90deg / top).
    const single = scoreWarpedPoint({ x: 400, y: 400 - 300 }); // well within single area
    expect(single.segment).toBe(20);
    expect(single.ring).toBe('Single');
    expect(single.score).toBe(20);

    const double = scoreWarpedPoint({ x: 400, y: 400 - 390 }); // near outer edge
    expect(double.segment).toBe(20);
    expect(double.ring).toBe('Double');
    expect(double.score).toBe(40);
  });

  it('scores a treble hit with correct multiplier', () => {
    // ~61% of radius sits inside the treble ring (0.5847 - 0.6317).
    const result = scoreWarpedPoint({ x: 400, y: 400 - 400 * 0.61 });
    expect(result.ring).toBe('Treble');
    expect(result.segment).toBe(20);
    expect(result.score).toBe(60);
  });

  it('scores the outer bull ring separately from the inner bull', () => {
    const result = scoreWarpedPoint({ x: 400, y: 400 - 400 * 0.06 });
    expect(result.ring).toBe('OuterBull');
    expect(result.score).toBe(25);
    expect(result.multiplier).toBe(1);
  });
});

describe('scoreDartDetection', () => {
  it('maps a detection result X/Y into a dart score', () => {
    const result = scoreDartDetection({
      x: 400,
      y: 400,
      boundingBox: { x: 390, y: 390, width: 20, height: 20 },
      area: 400,
    });
    expect(result.ring).toBe('InnerBull');
  });
});

describe('scoreTurnDetections', () => {
  it('sums multiple darts into a turn total', () => {
    const { darts, turnTotal } = scoreTurnDetections([
      { x: 400, y: 400, boundingBox: { x: 0, y: 0, width: 1, height: 1 }, area: 1 }, // Inner Bull = 50
      { x: 400, y: 400 - 300, boundingBox: { x: 0, y: 0, width: 1, height: 1 }, area: 1 }, // Single 20
    ]);

    expect(darts).toHaveLength(2);
    expect(turnTotal).toBe(70);
  });

  it('returns a zero total for an empty detection list', () => {
    const { darts, turnTotal } = scoreTurnDetections([]);
    expect(darts).toHaveLength(0);
    expect(turnTotal).toBe(0);
  });
});
