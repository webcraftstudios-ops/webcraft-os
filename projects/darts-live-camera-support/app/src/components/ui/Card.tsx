import type { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: 'card' | 'panel';
};

/**
 * Base surface primitive for all panels/cards in the app.
 * `tone="card"` uses the elevated gradient + TV shadow (hero/scoreboard level).
 * `tone="panel"` uses the flatter operator-console surface (forms/lists).
 */
export function Card({ tone = 'panel', className = '', ...props }: CardProps) {
  const toneClassName = tone === 'card' ? 'dl-card' : 'dl-panel';

  return <div className={`${toneClassName} ${className}`.trim()} {...props} />;
}
