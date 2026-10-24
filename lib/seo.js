export const SITE_URL = "https://www.madebymitch.com";
export const SITE_NAME = "Made by Mitch";
export const noIndexMetadata = {
  robots: { index: false, follow: false },
};

export function pageMetadata({ title, description, path, image }) {
  const metadata = {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [{ url: image || "/opengraph-image", alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  metadata.twitter.images = [image || "/opengraph-image"];

  return metadata;
}
