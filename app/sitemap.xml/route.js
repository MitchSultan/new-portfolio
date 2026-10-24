import { sitemapIndexXml } from "../../lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  const xml = await sitemapIndexXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
