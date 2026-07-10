import type { ReactNode } from 'react';

export type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Uppercase, letter-spaced eyebrow label. Shares styling with `.dl-kicker`. */
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return <p className={`dl-kicker ${className}`.trim()}>{children}</p>;
}
