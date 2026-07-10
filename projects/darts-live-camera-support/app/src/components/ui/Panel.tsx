import type { ReactNode } from 'react';
import { Card } from './Card';

export type PanelProps = {
  kicker?: string;
  title: string;
  description?: string;
  headerRight?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Standard operator-console panel: kicker + title + description header,
 * optional right-aligned slot (e.g. a counter), then arbitrary content.
 * Centralizes the card/kicker/heading cluster that was duplicated across
 * ScoreInput, MatchSetup, CorrectionControls, TurnHistory and MockImagePanel.
 */
export function Panel({ kicker, title, description, headerRight, children, className = '' }: PanelProps) {
  return (
    <Card className={`p-6 ${className}`.trim()} tone="panel">
      <div className="flex items-end justify-between gap-4">
        <div>
          {kicker ? <p className="dl-kicker">{kicker}</p> : null}
          <h2 className="mt-2 text-2xl font-bold text-[var(--dl-text)]">{title}</h2>
          {description ? <p className="mt-2 text-sm text-[var(--dl-muted)]">{description}</p> : null}
        </div>
        {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </Card>
  );
}
