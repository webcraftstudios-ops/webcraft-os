'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { TextField } from '@/components/ui/Field';

export type MatchSetupData = {
  player1: string;
  player2: string;
  gameType: 301 | 501;
};

export type MatchSetupProps = {
  onStartMatch: (data: MatchSetupData) => void;
};

export function MatchSetup({ onStartMatch }: MatchSetupProps) {
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');
  const [gameType, setGameType] = useState<301 | 501>(501);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onStartMatch({
      player1: player1.trim() || 'Player 1',
      player2: player2.trim() || 'Player 2',
      gameType,
    });
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-xl">
      <Panel
        description="Enter player names and select the game type to begin."
        kicker="Setup"
        title="Start New Match"
      >
        <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit}>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="player1-input" className="mb-2 block text-sm font-semibold uppercase tracking-wider text-[var(--dl-muted)]">
                Player 1
              </label>
              <TextField
                id="player1-input"
                onChange={(e) => setPlayer1(e.target.value)}
                placeholder="Name"
                value={player1}
                required
                className="w-full text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="player2-input" className="mb-2 block text-sm font-semibold uppercase tracking-wider text-[var(--dl-muted)]">
                Player 2
              </label>
              <TextField
                id="player2-input"
                onChange={(e) => setPlayer2(e.target.value)}
                placeholder="Name"
                value={player2}
                required
                className="w-full text-lg"
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-[var(--dl-muted)]">
              Game Type
            </label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={gameType === 301 ? 'primary' : 'secondary'}
                className="flex-1 py-4 text-xl font-bold"
                onClick={() => setGameType(301)}
              >
                301
              </Button>
              <Button
                type="button"
                variant={gameType === 501 ? 'primary' : 'secondary'}
                className="flex-1 py-4 text-xl font-bold"
                onClick={() => setGameType(501)}
              >
                501
              </Button>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--dl-border)] pt-8">
            <Button type="submit" variant="primary" className="w-full py-5 text-2xl font-black uppercase tracking-widest">
              Let's Play Darts
            </Button>
          </div>

        </form>
      </Panel>
    </div>
  );
}