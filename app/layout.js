import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Mitch's portfolio",
  description: "Need to know more about me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}
     suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="8oWQjXaNYE-izREtHoHC5J0xHLTRLBnyFOQrE_mbfKw" />
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
