import type { Correction, MatchState, PlayerScore, Turn } from './types';

export type ScoreValidationResult = {
  valid: boolean;
  reason?: string;
};

export type ApplyTurnInput = {
  state: MatchState;
  score: number;
  snapshotId?: string;
  now?: string;
};

export type ApplyTurnResult = {
  state: MatchState;
  turn: Turn;
};

export type CorrectLastTurnInput = {
  state: MatchState;
  newScore: number;
  reason?: string;
  now?: string;
};

export type CorrectLastTurnResult = {
  state: MatchState;
  correction: Correction;
};

export function validateTurnScore(score: number): ScoreValidationResult {
  if (!Number.isInteger(score)) {
    return { valid: false, reason: 'Score must be an integer.' };
  }

  if (score < 0) {
    return { valid: false, reason: 'Score cannot be negative.' };
  }

  if (score > 180) {
    return { valid: false, reason: 'Score cannot exceed 180.' };
  }

  return { valid: true };
}

export function isValidTurnScore(score: number): boolean {
  return validateTurnScore(score).valid;
}

export function getCurrentPlayerScore(state: MatchState): PlayerScore {
  const currentScore = state.playerScores.find(
    (playerScore) => playerScore.playerId === state.match.currentPlayerId,
  );

  if (!currentScore) {
    throw new Error('Current player score was not found.');
  }

  return currentScore;
}

export function getNextPlayerId(state: MatchState): string {
  const currentPlayerIndex = state.players.findIndex(
    (player) => player.id === state.match.currentPlayerId,
  );

  if (currentPlayerIndex === -1) {
    throw new Error('Current player was not found.');
  }

  const nextPlayer = state.players[(currentPlayerIndex + 1) % state.players.length];

  if (!nextPlayer) {
    throw new Error('Next player was not found.');
  }

  return nextPlayer.id;
}

export function applyTurn(input: ApplyTurnInput): ApplyTurnResult {
  const validation = validateTurnScore(input.score);

  if (!validation.valid) {
    throw new Error(validation.reason ?? 'Invalid score.');
  }

  if (input.state.match.status !== 'active') {
    throw new Error('Cannot apply a turn when the match is not active.');
  }

  const now = input.now ?? new Date().toISOString();
  const currentPlayerScore = getCurrentPlayerScore(input.state);
  const scoreBefore = currentPlayerScore.remainingScore;
  const rawScoreAfter = scoreBefore - input.score;
  const isBust = rawScoreAfter < 0;
  const isFinished = rawScoreAfter === 0;
  const scoreAfter = isBust ? scoreBefore : rawScoreAfter;

  const turn: Turn = {
    id: createId('turn'),
    matchId: input.state.match.id,
    playerId: input.state.match.currentPlayerId,
    turnNumber: input.state.turns.length + 1,
    enteredScore: input.score,
    confirmedScore: input.score,
    scoreBefore,
    scoreAfter,
    isBust,
    snapshotId: input.snapshotId,
    createdAt: now,
  };

  const playerScores = input.state.playerScores.map((playerScore) => {
    if (playerScore.playerId !== input.state.match.currentPlayerId) {
      return playerScore;
    }

    return {
      ...playerScore,
      remainingScore: scoreAfter,
    };
  });

  const match = {
    ...input.state.match,
    status: isFinished ? 'finished' as const : input.state.match.status,
    winnerPlayerId: isFinished ? input.state.match.currentPlayerId : input.state.match.winnerPlayerId,
    currentPlayerId: isFinished ? input.state.match.currentPlayerId : getNextPlayerId(input.state),
  };

  return {
    turn,
    state: {
      ...input.state,
      match,
      playerScores,
      turns: [...input.state.turns, turn],
    },
  };
}

export function undoLastTurn(state: MatchState): MatchState {
  const lastTurn = state.turns.at(-1);

  if (!lastTurn) {
    return state;
  }

  const playerScores = state.playerScores.map((playerScore) => {
    if (playerScore.playerId !== lastTurn.playerId) {
      return playerScore;
    }

    return {
      ...playerScore,
      remainingScore: lastTurn.scoreBefore,
    };
  });

  return {
    ...state,
    match: {
      ...state.match,
      status: 'active',
      winnerPlayerId: undefined,
      currentPlayerId: lastTurn.playerId,
    },
    playerScores,
    turns: state.turns.slice(0, -1),
  };
}

export function correctLastTurn(input: CorrectLastTurnInput): CorrectLastTurnResult {
  const lastTurn = input.state.turns.at(-1);

  if (!lastTurn) {
    throw new Error('No turn available to correct.');
  }

  const correction: Correction = {
    id: createId('correction'),
    matchId: input.state.match.id,
    turnId: lastTurn.id,
    oldScore: lastTurn.confirmedScore,
    newScore: input.newScore,
    reason: input.reason,
    createdAt: input.now ?? new Date().toISOString(),
  };

  const revertedState = undoLastTurn(input.state);
  const correctedResult = applyTurn({
    state: revertedState,
    score: input.newScore,
    snapshotId: lastTurn.snapshotId,
    now: lastTurn.createdAt,
  });

  return {
    correction,
    state: {
      ...correctedResult.state,
      corrections: [...input.state.corrections, correction],
    },
  };
}

function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
