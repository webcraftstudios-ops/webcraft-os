export type DartNumber =
  | 1 | 2 | 3 | 4 | 5
  | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20;

export type DartMultiplier = 1 | 2 | 3;

export type NumberedDart = Readonly<{
  kind: 'number';
  value: DartNumber;
  multiplier: DartMultiplier;
}>;

export type DartThrow =
  | Readonly<{ kind: 'miss' }>
  | NumberedDart
  | Readonly<{ kind: 'outer-bull' }>
  | Readonly<{ kind: 'bullseye' }>;

export type DartSequence =
  | readonly [DartThrow]
  | readonly [DartThrow, DartThrow]
  | readonly [DartThrow, DartThrow, DartThrow];

export type PendingDartSequence = readonly [] | DartSequence;

export const DART_NUMBERS = [
  1, 2, 3, 4, 5,
  6, 7, 8, 9, 10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20,
] as const satisfies readonly DartNumber[];

export const DART_MULTIPLIERS = [1, 2, 3] as const satisfies readonly DartMultiplier[];

export const MISS = { kind: 'miss' } as const satisfies DartThrow;
export const OUTER_BULL = { kind: 'outer-bull' } as const satisfies DartThrow;
export const BULLSEYE = { kind: 'bullseye' } as const satisfies DartThrow;

export function isDartNumber(value: number): value is DartNumber {
  return Number.isInteger(value) && value >= 1 && value <= 20;
}

export function isDartMultiplier(value: number): value is DartMultiplier {
  return value === 1 || value === 2 || value === 3;
}

export function createNumberedDart(value: number, multiplier: number): NumberedDart {
  if (!isDartNumber(value)) {
    throw new Error('Dart number must be an integer from 1 through 20.');
  }

  if (!isDartMultiplier(multiplier)) {
    throw new Error('Dart multiplier must be 1, 2 or 3.');
  }

  return { kind: 'number', value, multiplier };
}

export function scoreDart(dart: DartThrow): number {
  switch (dart.kind) {
    case 'miss':
      return 0;
    case 'outer-bull':
      return 25;
    case 'bullseye':
      return 50;
    case 'number':
      return dart.value * dart.multiplier;
  }
}

export function scoreDarts(darts: readonly DartThrow[]): number {
  return darts.reduce((total, dart) => total + scoreDart(dart), 0);
}

export function formatDart(dart: DartThrow): string {
  switch (dart.kind) {
    case 'miss':
      return 'MISS';
    case 'outer-bull':
      return '25';
    case 'bullseye':
      return 'BULL';
    case 'number': {
      const prefix: Record<DartMultiplier, 'S' | 'D' | 'T'> = {
        1: 'S',
        2: 'D',
        3: 'T',
      };

      return `${prefix[dart.multiplier]}${dart.value}`;
    }
  }
}

export function appendDart(
  darts: PendingDartSequence,
  dart: DartThrow,
): PendingDartSequence {
  if (darts.length >= 3) {
    throw new Error('A turn cannot contain more than three darts.');
  }

  return [...darts, dart] as PendingDartSequence;
}

export function removeLastDart(darts: PendingDartSequence): PendingDartSequence {
  return darts.slice(0, -1) as PendingDartSequence;
}

export function clearDarts(): PendingDartSequence {
  return [];
}

export function requireDartSequence(darts: PendingDartSequence): DartSequence {
  if (darts.length === 0) {
    throw new Error('At least one dart is required to confirm a Per Dart turn.');
  }

  return darts as DartSequence;
}
