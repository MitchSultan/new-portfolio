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
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.5rem',     // 24px
        '2xl': '2rem',      // 32px
        '3xl': '2.5rem',    // 40px
      },
      colors: {
        primary: "#111111",
        secondary: "#8B5CF6",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        surface: "#FFFFFF",
        text: "#111827",
        neutral: "#FFFFFF",
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-pt-mono)', 'ui-monospace', 'monospace'],
      },
      spacing: {
        sm: '4px',
        md: '8px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
      },
      boxShadow: {
        'paper': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};
