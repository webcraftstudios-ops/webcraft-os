'use client';

import { FormEvent, useState } from 'react';
import type { GameType, MatchState } from '@/domain/types';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { SelectField, TextField } from '@/components/ui/Field';

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
    <Panel description="Two players. 501 default. 301 optional." kicker="Match setup" title="Start a new leg">
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <TextField
          label="Player 1"
          onChange={(event) => setPlayerOneName(event.target.value)}
          placeholder="Player 1"
          value={playerOneName}
        />

        <TextField
          label="Player 2"
          onChange={(event) => setPlayerTwoName(event.target.value)}
          placeholder="Player 2"
          value={playerTwoName}
        />

        <SelectField
          label="Starting score"
          onChange={(event) => setGameType(event.target.value as GameType)}
          value={gameType}
        >
          <option value="501">501</option>
          <option value="301">301</option>
        </SelectField>

        <Button type="submit">Start match</Button>
      </form>
    </Panel>
  );
}

function normalizeName(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}
