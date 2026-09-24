/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#08090a',
        surface: '#111316',
        'surface-elevated': '#181b1f',
        chalk: '#f4f3ee',
        mist: '#9ca3af',
        cadmium: '#ff4d00',
        'cadmium-hover': '#ff6b2b',
        'accent-soft': 'rgba(255, 77, 0, 0.12)',
        'border-hairline': 'rgba(255, 255, 255, 0.08)',
        'border-subtle': 'rgba(255, 255, 255, 0.14)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
};
