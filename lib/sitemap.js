import { getPublishedPostsForSitemap } from "./seo-data";
import { SITE_URL } from "./seo";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/About", changeFrequency: "monthly", priority: 0.8 },
  { path: "/Services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/Services/web-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/Services/web-design", changeFrequency: "monthly", priority: 0.8 },
  { path: "/Services/seo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/Services/ads", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Services/content-creation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Webaudits", changeFrequency: "monthly", priority: 0.8 },
  { path: "/Blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/playground", changeFrequency: "monthly", priority: 0.7 },
];

const MAX_URLS_PER_SITEMAP = 50000;
const FIRST_SITEMAP_POST_CAPACITY = MAX_URLS_PER_SITEMAP - routes.length;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getValidPosts(posts) {
  return posts.filter(
    (post) => typeof post.slug === "string" && post.slug.trim()
  );
}

function getSitemapCount(postCount) {
  if (postCount <= FIRST_SITEMAP_POST_CAPACITY) return 1;
  return (
    1 +
    Math.ceil(
      (postCount - FIRST_SITEMAP_POST_CAPACITY) / MAX_URLS_PER_SITEMAP
    )
  );
}

function postRangeForSitemap(id) {
  if (id === 0) return [0, FIRST_SITEMAP_POST_CAPACITY];
  const start =
    FIRST_SITEMAP_POST_CAPACITY + (id - 1) * MAX_URLS_PER_SITEMAP;
  return [start, start + MAX_URLS_PER_SITEMAP];
}

function postUrl(post) {
  const url = new URL(`/Blog/${encodeURIComponent(post.slug)}`, SITE_URL);
  const lastModified =
    post.updated_at && !Number.isNaN(Date.parse(post.updated_at))
      ? `<lastmod>${new Date(post.updated_at).toISOString()}</lastmod>`
      : "";
  return `<url><loc>${escapeXml(url.toString())}</loc>${lastModified}<changefreq>yearly</changefreq><priority>0.6</priority></url>`;
}

export async function sitemapIndexXml() {
  const posts = getValidPosts(await getPublishedPostsForSitemap());
  const count = getSitemapCount(posts.length);
  const sitemaps = Array.from({ length: count }, (_, id) => {
    const url = new URL(`/sitemaps/${id}.xml`, SITE_URL);
    return `<sitemap><loc>${escapeXml(url.toString())}</loc></sitemap>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps.join("")}</sitemapindex>`;
}

export async function sitemapUrlsXml(id) {
  const posts = getValidPosts(await getPublishedPostsForSitemap());
  const count = getSitemapCount(posts.length);
  if (!Number.isInteger(id) || id < 0 || id >= count) return null;

  const [start, end] = postRangeForSitemap(id);
  const staticUrls =
    id === 0
      ? routes.map((route) => {
          const url = new URL(route.path, SITE_URL);
          return `<url><loc>${escapeXml(url.toString())}</loc><changefreq>${route.changeFrequency}</changefreq><priority>${route.priority}</priority></url>`;
        })
      : [];
  const postUrls = posts.slice(start, end).map(postUrl);

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls.join("")}${postUrls.join("")}</urlset>`;
}
