import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mitch's portfolio",
  description: "Need to know more about me",
};

export default function RootLayout({ children }) {
  return (
    <StrictMode>
    <Analytics />
    <html lang="en">
      <body
      suppressHydrationWarning={true}
        className= 'bg-background {`${geistSans.variable} ${geistMono.variable} antialiased`} '
      >
        {children}
      </body>
    </html>
    </StrictMode>
  );
}
