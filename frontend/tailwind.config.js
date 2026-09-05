export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07090d',
          900: '#0b0e14',
          800: '#12161f',
          700: '#1a2030',
          600: '#262d40',
          500: '#3a4460',
        },
        crema: {
          50: '#fdf6ea',
          100: '#f9e8c8',
          200: '#f4d9a6',
          300: '#f0c98a',
          400: '#e9b56a',
          500: '#e39b4a',
          600: '#c97f31',
        },
        mist: '#8ad0cf',
        bone: '#efe9df',
        muted: '#8b93a7',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tag: '0.18em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(233,181,106,0.25), 0 20px 60px -20px rgba(233,181,106,0.35)',
        card: '0 30px 80px -30px rgba(0,0,0,0.8)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
