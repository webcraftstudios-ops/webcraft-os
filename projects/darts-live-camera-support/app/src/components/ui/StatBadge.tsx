import type { ReactNode } from 'react';

export type StatBadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Rounded pill badge for status/mode indicators (e.g. match status, "TV Demo"). */
export function StatBadge({ children, className = '' }: StatBadgeProps) {
  return (
    <span
      className={`rounded-full border border-[var(--dl-border)] bg-[var(--dl-surface)] px-5 py-2 text-sm font-black uppercase tracking-wide2 text-[var(--dl-text)] ${className}`.trim()}
    >
      {children}
    </span>
  );
}
