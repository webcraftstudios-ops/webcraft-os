export type GameType = '301' | '501';

export type Point = {
  x: number;
  y: number;
};

export type CalibrationData = {
  baselineUrl: string; // The base64 empty board image
  sourcePoints: [Point, Point, Point, Point]; // The 4 corners clicked (Top, Right, Bottom, Left)
};

export type MatchStatus = 'setup' | 'active' | 'finished';

export type SnapshotSource = 'mock' | 'upload' | 'camera';

export type Player = {
  id: string;
  name: string;
};

export type Match = {
  id: string;
  gameType: GameType;
  startingScore: 301 | 501;
  status: MatchStatus;
  currentPlayerId: string;
  winnerPlayerId?: string;
  createdAt: string;
};

export type PlayerScore = {
  playerId: string;
  remainingScore: number;
};

export type Turn = {
  id: string;
  matchId: string;
  playerId: string;
  turnNumber: number;
  enteredScore: number;
  confirmedScore: number;
  scoreBefore: number;
  scoreAfter: number;
  isBust: boolean;
  snapshotId?: string;
  createdAt: string;
};

export type Snapshot = {
  id: string;
  matchId: string;
  turnId?: string;
  url: string;
  source: SnapshotSource;
  createdAt: string;
};

export type Correction = {
  id: string;
  matchId: string;
  turnId: string;
  oldScore: number;
  newScore: number;
  reason?: string;
  createdAt: string;
};

export type MatchState = {
  match: Match;
  players: Player[];
  playerScores: PlayerScore[];
  turns: Turn[];
  snapshots: Snapshot[];
  corrections: Correction[];
};
