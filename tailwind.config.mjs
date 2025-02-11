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
        primary: '#e63946', // red
        secondary: '#457b9d', // blue
        accent: '#a8dadc', // ltblue
        dark: '#1d3557', // dkblue
        light: '#f1faee', // honeydew
      },
    },
  },
  plugins: [],
};
