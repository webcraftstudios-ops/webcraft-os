import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--dl-bg)',
        surface: 'var(--dl-surface)',
        'surface-strong': 'var(--dl-surface-strong)',
        border: 'var(--dl-border)',
        ink: 'var(--dl-text)',
        muted: 'var(--dl-muted)',
        primary: 'var(--dl-primary)',
        success: 'var(--dl-success)',
        warning: 'var(--dl-warning)',
        danger: 'var(--dl-danger)',
        gold: 'var(--dl-gold)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        score: ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--dl-radius-lg)',
        xl: 'var(--dl-radius-xl)',
        '2xl': 'var(--dl-radius-2xl)',
      },
      boxShadow: {
        tv: 'var(--dl-shadow-tv)',
      },
      fontSize: {
        'score-sm': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'score-md': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'score-lg': ['7.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'score-xl': ['11rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        kicker: '0.26em',
        wide2: '0.14em',
      },
    },
  },
  plugins: [],
};

export default config;
