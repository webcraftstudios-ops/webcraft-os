'use client';

import { FormEvent, useState } from 'react';
import type { GameType, MatchState } from '@/domain/types';

export type MatchSetupProps = {
  onStartMatch: (state: MatchState) => void;
};

export function MatchSetup({ onStartMatch }: MatchSetupProps) {
  const [playerOneName, setPlayerOneName] = useState('Player 1');
  const [playerTwoName, setPlayerTwoName] = useState('Player 2');
  const [gameType, setGameType] = useState<GameType>('501');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const playerOne = {
      id: 'player-1',
      name: normalizeName(playerOneName, 'Player 1'),
    };

    const playerTwo = {
      id: 'player-2',
      name: normalizeName(playerTwoName, 'Player 2'),
    };

    const startingScore = gameType === '501' ? 501 : 301;
    const now = new Date().toISOString();

    onStartMatch({
      match: {
        id: `match-${crypto.randomUUID()}`,
        gameType,
        startingScore,
        status: 'active',
        currentPlayerId: playerOne.id,
        createdAt: now,
      },
      players: [playerOne, playerTwo],
      playerScores: [
        { playerId: playerOne.id, remainingScore: startingScore },
        { playerId: playerTwo.id, remainingScore: startingScore },
      ],
      turns: [],
      snapshots: [],
      corrections: [],
    });
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <p className="text-xs uppercase tracking-wide text-slate-500">Match setup</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-100">Start a new leg</h2>
      <p className="mt-2 text-sm text-slate-400">Two players. 501 default. 301 optional.</p>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-slate-300">
          Player 1
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
            value={playerOneName}
            onChange={(event) => setPlayerOneName(event.target.value)}
            placeholder="Player 1"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-300">
          Player 2
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
            value={playerTwoName}
            onChange={(event) => setPlayerTwoName(event.target.value)}
            placeholder="Player 2"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-300">
          Starting score
          <select
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
            value={gameType}
            onChange={(event) => setGameType(event.target.value as GameType)}
          >
            <option value="501">501</option>
            <option value="301">301</option>
          </select>
        </label>

        <button className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-bold text-slate-950" type="submit">
          Start match
        </button>
      </form>
    </section>
  );
}

function normalizeName(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}
