'use client';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/next";

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <Analytics />
      {children}
    </ThemeProvider>
  );
}
