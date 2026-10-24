import { pageMetadata } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { SITE_URL } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Web Development and Digital Growth Insights",
  description:
    "Practical articles and tutorials about web development, website performance and digital growth.",
  path: "/Blog",
});

export default function BlogLayout({ children }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/Blog#webpage`,
          url: `${SITE_URL}/Blog`,
          name: "Web Development and Digital Growth Insights",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en",
        }}
      />
      {children}
    </>
  );
}
