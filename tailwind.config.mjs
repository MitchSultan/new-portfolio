/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Custom colors
        black: '#262626', // void black
        lavender: '#b287fd', // bright lavender
        background: 'd8d9dd', // light gray
        dark: '#212121', // raisin black
        light: '#eae1ff', // lavender mist
        green: '#b2f142', //lime green
      },
    },
  },
  plugins: [],
};
