import JsonLd from "../../components/JsonLd";
import { getPublishedPostBySlug } from "../../../lib/seo-data";
import { SITE_URL } from "../../../lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const path = `/Blog/${post.slug}`;
  const description =
    post.excerpt || `Read ${post.title} on web development and digital growth.`;
  const image = post.cover_image_url
    ? new URL(post.cover_image_url, SITE_URL).toString()
    : undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: path,
      publishedTime: post.published_at || undefined,
      ...(image ? { images: [{ url: image, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function BlogPostLayout({ children, params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  const path = `/Blog/${slug}`;
  const image = post?.cover_image_url
    ? new URL(post.cover_image_url, SITE_URL).toString()
    : undefined;

  return (
    <>
      {post && (
        <>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `${SITE_URL}${path}#article`,
              headline: post.title,
              description: post.excerpt || undefined,
              url: `${SITE_URL}${path}`,
              datePublished: post.published_at || undefined,
              dateModified: post.updated_at || undefined,
              image,
              articleSection: post.category || undefined,
              keywords: Array.isArray(post.tags) ? post.tags : undefined,
              author: {
                "@type": "Person",
                "@id": `${SITE_URL}/About#person`,
                name: "Mitch Sultan",
                url: `${SITE_URL}/About`,
              },
              publisher: { "@id": `${SITE_URL}/#organization` },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}${path}`,
              },
              inLanguage: "en",
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
