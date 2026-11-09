'use client';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/next";
import ScrollTextReveal from './components/ScrollTextReveal';

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <Analytics />
      <ScrollTextReveal />
      {children}
    </ThemeProvider>
  );
}
