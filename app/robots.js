import { SITE_URL } from "../lib/seo";

const privatePaths = ["/admin", "/reports/", "/api/"];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...[
        "GPTBot",
        "OAI-SearchBot",
        "ChatGPT-User",
        "ClaudeBot",
        "Claude-Web",
        "PerplexityBot",
        "Google-Extended",
        "Applebot-Extended",
        "CCBot",
      ].map((userAgent) => ({
        userAgent,
        allow: ["/", "/Blog/", "/Services/", "/Webaudits"],
        disallow: privatePaths,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
