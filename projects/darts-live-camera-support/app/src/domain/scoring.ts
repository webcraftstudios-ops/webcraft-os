// Phase 1.3 will implement the pure score engine here.

export function isValidTurnScore(score: number): boolean {
  return Number.isInteger(score) && score >= 0 && score <= 180;
}
