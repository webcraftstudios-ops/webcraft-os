import type { DartSequence } from './darts';

export type GameType = '301' | '501';

export type MatchStatus = 'setup' | 'active' | 'finished';

export type SnapshotSource = 'mock' | 'upload' | 'camera' | 'rtsp';

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

export type TurnEntry =
  | Readonly<{
      mode: 'quick-total';
    }>
  | Readonly<{
      mode: 'per-dart';
      darts: DartSequence;
    }>;

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
  entry: TurnEntry;
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
