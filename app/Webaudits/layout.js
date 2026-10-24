import JsonLd from "../components/JsonLd";
import { pageMetadata, SITE_URL } from "../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Free Website Audit for Businesses in Nairobi",
    description:
      "Run a free website audit to review Lighthouse performance, accessibility, best practices and SEO scores for your website.",
    path: "/Webaudits",
  }),
  description:
    "Run a free website audit to review Lighthouse performance, accessibility, best practices and SEO scores for your website.",
  keywords: [
    "Nairobi website audit",
    "Kenya web development",
    "content funnel Nairobi",
    "website performance Kenya",
    "digital marketing Nairobi",
    "SEO Kenya",
  ],
  openGraph: {
    title: "Free Website Audit for Businesses in Nairobi",
    description:
      "Review your website's Lighthouse performance, accessibility, best practices and SEO scores.",
    type: "website",
    url: `${SITE_URL}/Webaudits`,
    images: [{ url: "/opengraph-image", alt: "Free website audit for businesses in Nairobi" }],
  },
};

export default function WebAuditsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/Webaudits#webpage`,
          url: `${SITE_URL}/Webaudits`,
          name: "Free Website Audit for Businesses in Nairobi",
          description:
            "Run a free website audit to review Lighthouse performance, accessibility, best practices and SEO scores.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en",
        }}
      />
      {children}
    </>
  );
}
