module.exports = {
  content: [
    './index.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Neue Haas Grotesk Display Pro"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        base: ['1rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        lg: ['1.125rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        xl: ['1.25rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '5xl': ['3rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '8xl': ['6rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
        '9xl': ['8rem', { lineHeight: '1.3', letterSpacing: '.025em' }],
      }
    },
  },
  plugins: [],
}
