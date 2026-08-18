import { describe, expect, it } from 'vitest';
import {
  BULLSEYE,
  DART_NUMBERS,
  MISS,
  OUTER_BULL,
  appendDart,
  clearDarts,
  createNumberedDart,
  formatDart,
  removeLastDart,
  requireDartSequence,
  scoreDart,
  scoreDarts,
  type DartSequence,
  type DartThrow,
} from './darts';

function numbered(value: number, multiplier: number) {
  return createNumberedDart(value, multiplier);
}

describe('dart domain model', () => {
  it('exposes every numbered board value from 1 through 20', () => {
    expect(DART_NUMBERS).toEqual([
      1, 2, 3, 4, 5,
      6, 7, 8, 9, 10,
      11, 12, 13, 14, 15,
      16, 17, 18, 19, 20,
    ]);
  });

  it('calculates S20 + T20 + D20 as 120', () => {
    const darts = [numbered(20, 1), numbered(20, 3), numbered(20, 2)] as const satisfies DartSequence;
    expect(scoreDarts(darts)).toBe(120);
  });

  it('calculates 25 + 25 + 25 as 75', () => {
    expect(scoreDarts([OUTER_BULL, OUTER_BULL, OUTER_BULL])).toBe(75);
  });

  it('calculates BULL + BULL + BULL as 150', () => {
    expect(scoreDarts([BULLSEYE, BULLSEYE, BULLSEYE])).toBe(150);
  });

  it('calculates T20 + T20 + T20 as 180', () => {
    expect(scoreDarts([numbered(20, 3), numbered(20, 3), numbered(20, 3)])).toBe(180);
  });

  it('calculates MISS + S5 + D10 as 25', () => {
    expect(scoreDarts([MISS, numbered(5, 1), numbered(10, 2)])).toBe(25);
  });

  it('derives notation for every dart kind', () => {
    expect(formatDart(MISS)).toBe('MISS');
    expect(formatDart(numbered(20, 1))).toBe('S20');
    expect(formatDart(numbered(16, 2))).toBe('D16');
    expect(formatDart(numbered(19, 3))).toBe('T19');
    expect(formatDart(OUTER_BULL)).toBe('25');
    expect(formatDart(BULLSEYE)).toBe('BULL');
  });

  it('keeps bull variants multiplier-free', () => {
    expect('multiplier' in OUTER_BULL).toBe(false);
    expect('multiplier' in BULLSEYE).toBe(false);

    // @ts-expect-error Bullseye intentionally has no multiplier field.
    const invalidBull: DartThrow = { kind: 'bullseye', multiplier: 3 };
    expect(invalidBull.kind).toBe('bullseye');
  });

  it('rejects invalid numbered segments and multipliers at runtime boundaries', () => {
    expect(() => createNumberedDart(0, 1)).toThrow('1 through 20');
    expect(() => createNumberedDart(21, 1)).toThrow('1 through 20');
    expect(() => createNumberedDart(20, 4)).toThrow('1, 2 or 3');
  });

  it('rejects a fourth dart', () => {
    const threeDarts = [MISS, OUTER_BULL, BULLSEYE] as const satisfies DartSequence;
    expect(() => appendDart(threeDarts, numbered(20, 3))).toThrow('more than three darts');
  });

  it('rejects an empty confirmed sequence', () => {
    expect(() => requireDartSequence([])).toThrow('At least one dart');
  });

  it('appends, removes and clears pending darts safely', () => {
    const one = appendDart([], numbered(20, 1));
    const two = appendDart(one, OUTER_BULL);

    expect(scoreDarts(two)).toBe(45);
    expect(removeLastDart(two)).toEqual([numbered(20, 1)]);
    expect(clearDarts()).toEqual([]);
    expect(scoreDart(MISS)).toBe(0);
  });
});
