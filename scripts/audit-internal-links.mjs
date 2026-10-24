const base = new URL(process.argv[2] || "http://localhost:3000");
const maxPages = Number(process.env.SEO_CRAWL_MAX_PAGES || 5000);
const queued = new Set();
const queue = [new URL("/", base).toString()];
const pages = new Map();
const htmlPages = new Set();
const inbound = new Map();
const brokenLinks = [];
const redirectingLinks = [];

function normalizePageUrl(href, source) {
  let url;
  try {
    url = new URL(href, source);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(url.protocol) || url.origin !== base.origin) {
    return null;
  }

  url.hash = "";
  url.search = "";
  if (!/\.[a-z0-9]{2,8}$/i.test(url.pathname)) {
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  }
  return url;
}

function extractLinks(html) {
  return [...html.matchAll(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)]
    .map((match) => match[1] ?? match[2])
    .filter(Boolean);
}

async function addSitemapUrls() {
  const sitemapQueue = [new URL("/sitemap.xml", base).toString()];
  const visitedSitemaps = new Set();

  while (sitemapQueue.length) {
    const sitemapUrl = sitemapQueue.shift();
    if (visitedSitemaps.has(sitemapUrl)) continue;
    visitedSitemaps.add(sitemapUrl);

    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      throw new Error(`Unable to read sitemap ${sitemapUrl}: HTTP ${response.status}`);
    }

    const xml = await response.text();
    const locations = [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gis)]
      .map((match) => match[1].replaceAll("&amp;", "&"));
    const isIndex = /<sitemapindex[\s>]/i.test(xml);

    for (const location of locations) {
      let url = new URL(location);
      if (url.origin !== base.origin) {
        if (!["madebymitch.com", "www.madebymitch.com"].includes(url.hostname)) {
          continue;
        }
        url = new URL(`${url.pathname}${url.search}`, base);
      }
      if (isIndex) sitemapQueue.push(url.toString());
      else if (!queued.has(url.toString())) {
        queued.add(url.toString());
        queue.push(url.toString());
      }
    }
  }
}

await addSitemapUrls();

while (queue.length && pages.size < maxPages) {
  const current = queue.shift();
  if (pages.has(current)) continue;

  let response;
  try {
    response = await fetch(current, { redirect: "follow" });
  } catch (error) {
    brokenLinks.push({ url: current, status: String(error) });
    pages.set(current, []);
    continue;
  }

  if (response.url !== current) {
    redirectingLinks.push({ from: current, to: response.url });
  }
  if (!response.ok) {
    brokenLinks.push({ url: current, status: response.status });
    pages.set(current, []);
    continue;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    pages.set(current, []);
    continue;
  }

  htmlPages.add(current);
  const html = await response.text();
  const targets = new Set();
  for (const href of extractLinks(html)) {
    const target = normalizePageUrl(href, current);
    if (!target) continue;

    const targetUrl = target.toString();
    if (targetUrl === current) continue;
    targets.add(targetUrl);
    if (!inbound.has(targetUrl)) inbound.set(targetUrl, new Set());
    inbound.get(targetUrl).add(current);

    if (!queued.has(targetUrl) && !pages.has(targetUrl)) {
      queued.add(targetUrl);
      queue.push(targetUrl);
    }
  }

  pages.set(current, [...targets]);
}

const distances = new Map([[new URL("/", base).toString(), 0]]);
const breadthFirst = [new URL("/", base).toString()];
while (breadthFirst.length) {
  const source = breadthFirst.shift();
  const nextDepth = distances.get(source) + 1;
  for (const target of pages.get(source) || []) {
    if (distances.has(target)) continue;
    distances.set(target, nextDepth);
    breadthFirst.push(target);
  }
}

const routeReport = [...htmlPages]
  .filter((url) => new URL(url).origin === base.origin)
  .map((url) => ({
    path: new URL(url).pathname,
    inboundLinks: inbound.get(url)?.size || 0,
    depth: distances.get(url) ?? null,
  }))
  .sort((a, b) => a.path.localeCompare(b.path));

const report = {
  baseUrl: base.origin,
  crawledPages: htmlPages.size,
  truncated: queue.length > 0,
  orphans: routeReport.filter(
    (route) => route.path !== "/" && route.inboundLinks === 0
  ),
  deeperThanThreeClicks: routeReport.filter(
    (route) => route.depth !== null && route.depth > 3
  ),
  brokenInternalLinks: brokenLinks,
  redirectingInternalLinks: redirectingLinks,
  routes: routeReport,
};

console.log(JSON.stringify(report, null, 2));
if (brokenLinks.length || report.truncated) process.exitCode = 1;
