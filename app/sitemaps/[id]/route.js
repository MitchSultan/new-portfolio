import { sitemapUrlsXml } from "../../../lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id: rawId } = await params;
  const match = /^(\d+)\.xml$/.exec(rawId);
  const id = match ? Number(match[1]) : -1;
  const xml = await sitemapUrlsXml(id);
  if (!xml) return new Response("Sitemap not found", { status: 404 });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
