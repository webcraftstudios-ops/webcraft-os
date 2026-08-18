export type BigNumberSize = 'md' | 'lg' | 'xl';

export type BigNumberProps = {
  value: number | string;
  size?: BigNumberSize;
  className?: string;
};

const sizeClassName: Record<BigNumberSize, string> = {
  md: 'text-score-md',
  lg: 'text-score-lg md:text-score-xl',
  xl: 'text-score-lg md:text-score-xl',
};

/**
 * TV-readable numeric display used for remaining scores and last-throw totals.
 * Centralizes the score typography (font, tracking, leading, size scale) so
 * every scoreboard number stays visually consistent and easy to extend with
 * future transition/animation work.
 */
export function BigNumber({ value, size = 'lg', className = '' }: BigNumberProps) {
  return (
    <p className={`dl-score-font font-black leading-none ${sizeClassName[size]} ${className}`.trim()}>
      {value}
    </p>
  );
}
