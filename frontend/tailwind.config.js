/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Dark theme colors
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          card: '#262626',
          border: '#404040',
          text: {
            primary: '#ffffff',
            secondary: '#a3a3a3',
            muted: '#737373',
          }
        },
        // Light theme colors
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          card: '#ffffff',
          border: '#e5e5e5',
          text: {
            primary: '#0a0a0a',
            secondary: '#525252',
            muted: '#737373',
          }
        },
        // Brand colors
        primary: {
          DEFAULT: '#ea580c',
          light: '#f97316',
          dark: '#c2410c',
        },
        secondary: {
          DEFAULT: '#ec4899',
          light: '#f472b6',
          dark: '#be185d',
        }
      },
    },
  },
  plugins: [],
};
