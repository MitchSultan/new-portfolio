import "./globals.css";
import ClientProviders from "./providers";

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
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
