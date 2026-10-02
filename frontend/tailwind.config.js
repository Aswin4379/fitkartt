/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fit: {
          bg: 'rgb(var(--fit-bg) / <alpha-value>)',
          surface: 'rgb(var(--fit-surface) / <alpha-value>)',
          surface2: 'rgb(var(--fit-surface2) / <alpha-value>)',
          border: 'rgb(var(--fit-border) / <alpha-value>)',
          primary: 'rgb(var(--fit-primary) / <alpha-value>)',
          'primary-dark': 'rgb(var(--fit-primary-dark) / <alpha-value>)',
          primaryDark: 'rgb(var(--fit-primary-dark) / <alpha-value>)',
          accent: 'rgb(var(--fit-accent) / <alpha-value>)',
          text: 'rgb(var(--fit-text) / <alpha-value>)',
          muted: 'rgb(var(--fit-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(34, 197, 94, 0.35)',
        glowLg: '0 0 40px rgba(34, 197, 94, 0.45)',
        glowAccent: '0 0 25px rgba(163, 230, 53, 0.35)',
        card: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
        cardHover: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(34, 197, 94, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '24px',
      },
      borderRadius: {
        xl2: '1.25rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        floatUp: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        pulseSlow: 'pulseSlow 2.5s ease-in-out infinite',
        floatUp: 'floatUp 4s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
}