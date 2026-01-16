/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontSize: {
        // Custom font sizes
        'xs': '0.75rem',    // Extra Small
        'sm': '0.875rem',   // Small
        'base': '1rem',     // Base
        'lg': '1.125rem',   // Large
        'xl': '1.25rem',    // Extra Large
        '2xl': '1.5rem',    // 2X Large
        '3xl': '1.875rem',  // 3X Large
        '4xl': '2.25rem',   // 4X Large
        '5xl': '3rem',      // 5X Large
        '6xl': '4rem',      // 6X Large
      },
      colors: {
        // Custom colors with dark mode support
        black: '#262626', // void black
        lavender: '#b287fd', // bright lavender
        background: '#d8d9dd', // light gray
        dark: '#212121', // raisin black
        light: '#eae1ff', // lavender mist
        green: '#b2f142', //lime green
        
        // Theme colors
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#b287fd', // lavender
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9f1239',
          900: '#831843',
        },
      },
      fontFamily: {
        sans: ['Keiner', 'Inter', 'system-ui', 'sans-serif'],
        display: ['DiamondGrotesk', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
