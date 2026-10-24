import { Montserrat, Roboto, PT_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";
import Tracker from "./components/Tracker";
import JsonLd from "./components/JsonLd";
import { SITE_NAME, SITE_URL } from "../lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "700"],
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mitch Sultan | Nairobi Web Developer",
    template: "%s | Made by Mitch",
  },
  description:
    "Mitch Sultan is a Nairobi web developer building fast, search-optimised websites for real estate agents, developers and property managers across Kenya.",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_KE",
    title: "Mitch Sultan | Nairobi Web Developer",
    description:
      "Fast, search-optimised websites for real estate agents, developers and property managers across Kenya.",
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Made by Mitch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitch Sultan | Nairobi Web Developer",
    description:
      "Fast, search-optimised websites for real estate agents, developers and property managers across Kenya.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="8oWQjXaNYE-izREtHoHC5J0xHLTRLBnyFOQrE_mbfKw" />
        <meta name="p:domain_verify" content="f86266286b27ae5d70773ff19b0102ec"/>
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} ${ptMono.variable} bg-surface text-text antialiased font-sans`}>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logos/favicon.svg`,
              sameAs: [
                "https://web.facebook.com/mitch.sultan.7",
                "https://www.instagram.com/mitch.sultan/",
                "https://x.com/MadebyMitch23",
                "https://github.com/MitchSultan",
                "https://dribbble.com/mitchsultan",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://wa.me/254703666366",
                availableLanguage: ["English"],
              },
              areaServed: ["Kenya", "Australia", "United States"],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: SITE_URL,
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: "en",
            },
          ]}
        />
        <ClientProviders>
          <Tracker />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
