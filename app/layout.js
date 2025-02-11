import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";

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
    <html lang="en">
      <body
      suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </StrictMode>
  );
}
