/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: '#FFFFFF',
        ink: '#1C1C1A',
        oxblood: {
          DEFAULT: '#6E1F2B',
          dark: '#541721',
          light: '#872736',
        },
        stone: {
          DEFAULT: '#E5E5E5',
          light: '#F5F5F5',
          dark: '#D4D4D4',
        },
        brass: {
          DEFAULT: '#A88B4A',
          light: '#C4A864',
          dark: '#8C7238',
        },
        warmgrey: {
          DEFAULT: '#737373',
          light: '#A3A3A3',
          dark: '#525252',
        },
      },
      fontFamily: {
        // Preserved font families for navbar
        navbarWordmark: ['"Bodoni Moda"', 'Georgia', 'serif'],
        navbarSans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        // Roboto and Montreal for the entire website
        montreal: ['"Neue Montreal"', 'Montreal', 'Roboto', 'sans-serif'],
        roboto: ['Roboto', '"Neue Montreal"', 'sans-serif'],
        display: ['"Neue Montreal"', 'Montreal', 'Roboto', 'sans-serif'],
        serif: ['"Neue Montreal"', 'Montreal', 'Roboto', 'sans-serif'],
        sans: ['Roboto', '"Neue Montreal"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '0px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.18em',
        ultra: '0.25em',
      },
    },
  },
  plugins: [],
}
