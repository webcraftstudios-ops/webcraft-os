import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

/**
 * Shared pill button. `primary` is the solid high-contrast action,
 * `secondary` is the outlined lower-emphasis action. Replaces the
 * repeated `rounded-lg bg-slate-100 ...` / `rounded-lg border ...` clusters.
 */
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const variantClassName = variant === 'primary' ? 'dl-primary-button' : 'dl-secondary-button';

  return (
    <button
      className={`${variantClassName} text-sm disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
      {...props}
    />
  );
}
