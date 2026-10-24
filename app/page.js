import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/skill";
import NewTest from "./components/new-test";
import Footer from "./components/footer";
import HomeBelowFold from "./components/HomeBelowFold";
import JsonLd from "./components/JsonLd";
import { pageMetadata } from "../lib/seo";
import { SITE_URL } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Nairobi Web Developer for Real Estate | Mitch Sultan",
  description:
    "I build fast, search-optimised websites for real estate agents, developers and property managers in Kenya. Explore web development, design and SEO services.",
  path: "/",
});

export default function Page() {
  return (
    <div className=" ">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: "Nairobi Web Developer for Real Estate | Mitch Sultan",
          description:
            "Web design and development for real estate agents, developers and property managers across Kenya.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en",
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <NewTest />
      <HomeBelowFold />
      <Footer />
    </div>
  );
}
