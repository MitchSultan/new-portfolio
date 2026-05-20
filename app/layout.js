import { Montserrat, Roboto, PT_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";
import Tracker from "./components/Tracker";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pt-mono",
  display: "swap",
});

export const metadata = {
  title: "Mitch's portfolio",
  description: "Need to know more about me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="8oWQjXaNYE-izREtHoHC5J0xHLTRLBnyFOQrE_mbfKw" />
        <meta name="p:domain_verify" content="f86266286b27ae5d70773ff19b0102ec"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://madebymitch.com/"/>
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} ${ptMono.variable} bg-surface text-text antialiased font-sans`}>
        <ClientProviders>
          <Tracker />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
