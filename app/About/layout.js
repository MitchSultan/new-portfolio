import { pageMetadata } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { SITE_URL } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "About Mitch Sultan, Nairobi Web Developer",
  description:
    "Learn about Mitch Sultan's experience, approach and tools for building digital products and business websites.",
  path: "/About",
});

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/About#webpage`,
          url: `${SITE_URL}/About`,
          name: "About Mitch Sultan, Nairobi Web Developer",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: {
            "@type": "Person",
            "@id": `${SITE_URL}/About#person`,
            name: "Mitch Sultan",
            url: `${SITE_URL}/About`,
            jobTitle: "Web Developer",
            homeLocation: {
              "@type": "Place",
              name: "Nairobi, Kenya",
              address: {
                "@type": "PostalAddress",
              addressLocality: "Nairobi",
              addressCountry: "KE",
              },
            },
            sameAs: [
              "https://github.com/MitchSultan",
              "https://x.com/MadebyMitch23",
              "https://www.instagram.com/mitch.sultan/",
            ],
          },
          inLanguage: "en",
        }}
      />
      {children}
    </>
  );
}
