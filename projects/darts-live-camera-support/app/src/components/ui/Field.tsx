import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes } from 'react';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const fieldClassName =
  'min-w-0 flex-1 rounded-lg border border-[var(--dl-border)] bg-[var(--dl-bg)] px-4 py-3 text-[var(--dl-text)] placeholder:text-[var(--dl-muted)] disabled:cursor-not-allowed disabled:opacity-50';

const labelClassName = 'grid gap-2 text-sm font-medium text-[var(--dl-muted)]';

/**
 * Shared text input. Replaces the repeated
 * `rounded-lg border border-slate-700 bg-slate-950 ...` input cluster.
 */
export function TextField({ label, className = '', ...props }: TextFieldProps) {
  const input = <input className={`${fieldClassName} ${className}`.trim()} {...props} />;

  if (!label) {
    return input;
  }

  return (
    <label className={labelClassName}>
      {label}
      {input}
    </label>
  );
}

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

/** Shared select input, sharing the same visual language as `TextField`. */
export function SelectField({ label, className = '', ...props }: SelectFieldProps) {
  const select = <select className={`${fieldClassName} ${className}`.trim()} {...props} />;

  if (!label) {
    return select;
  }

  return (
    <label className={labelClassName}>
      {label}
      {select}
    </label>
  );
}

export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
