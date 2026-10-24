# Search and AI crawler operations

## Verified project context

- Brand: Made by Mitch / Mitch Sultan, inferred from the site header, footer, and existing social profiles.
- Canonical host: `https://madebymitch.com`, taken from the existing root canonical. The old hand-written sitemap used `www.madebymitch.com`; this implementation standardizes on the non-`www` host and redirects `www`.
- Business focus: Nairobi web development, with the homepage specifically targeting real-estate agents, developers, and property managers in Kenya.
- Language: English. No `hreflang` is configured because the site does not provide translated pages.
- No street address or public email is present. Therefore no LocalBusiness address or fabricated NAP is emitted. The schema identifies the business as an Organization/Person and describes service areas; WhatsApp is the visible contact channel.

## Route inventory

Rendering modes and bundle sizes below are from the successful Next.js 15.5.23 production build. First-load includes the 103 kB shared JavaScript. Internal-link counts are from a production crawl of the sitemap and linked HTML pages (14 pages, local CMS snapshot); private/unlinked routes are not crawl-discovered.

| Path | Build/render mode | Indexable? | In sitemap? | Inbound links | Route / first-load JS |
|---|---|---:|---:|---:|---:|
| `/` | Static | Yes | Yes | 13 | 1.97 / 113 kB |
| `/About` | Static | Yes | Yes | 13 | 7.82 / 124 kB |
| `/Services` | Static | Yes | Yes | 13 | 2.80 / 114 kB |
| `/Services/web-development` | Static | Yes | Yes | 13 | 2.82 / 114 kB |
| `/Services/web-design` | Static | Yes | Yes | 13 | 2.82 / 114 kB |
| `/Services/seo` | Static | Yes | Yes | 13 | 2.82 / 114 kB |
| `/Services/ads` | Static | Yes | Yes | 13 | 2.82 / 114 kB |
| `/Services/content-creation` | Static | Yes | Yes | 13 | 2.82 / 114 kB |
| `/Webaudits` | Static | Yes | Yes | 13 | 11.2 / 127 kB |
| `/Blog` | Static ISR, 1-hour revalidation | Yes | Yes | 13 | 8.28 / 193 kB |
| `/Blog/[slug]` | Dynamic SSR | Published posts only | Published posts only | 1 each for the two local posts | 15.9 / 200 kB |
| `/playground` | Static ISR, 1-hour revalidation | Yes | Yes | 13 | 3.59 / 175 kB |
| `/projects` | Static placeholder | No | No | Not crawl-discovered | 189 B / 103 kB |
| `/projects/[slug]` | Dynamic placeholder | No | No | Not crawl-discovered | 189 B / 103 kB |
| `/admin` | Static shell; client auth guard | No | No | Not crawl-discovered | 2.02 / 167 kB |
| `/admin/Blogs` | Static; client auth guard | No | No | Not crawl-discovered | 5.81 / 177 kB |
| `/admin/Blogs/editor` | Static; client auth guard | No | No | Not crawl-discovered | 147 / 312 kB |
| `/admin/affiliates` | Dynamic; client auth guard | No | No | Not crawl-discovered | 189 B / 103 kB |
| `/admin/projects` | Static; client auth guard | No | No | Not crawl-discovered | 2.58 / 171 kB |
| `/admin/projects/create` | Static; client auth guard | No | No | Not crawl-discovered | 464 B / 172 kB |
| `/admin/projects/[id]` | Dynamic; client auth guard | No | No | Not crawl-discovered | 702 B / 172 kB |
| `/login` | Static client form | No | No | Not crawl-discovered | 1.51 / 161 kB |
| `/api` | Static data-demo page | No | No | Not crawl-discovered | 486 B / 108 kB |
| `/colorPalette` | Static client demo | No | No | 13 | 40.8 / 159 kB |
| `/deadline` | Static client demo | No | No | Not crawl-discovered | 1.19 / 104 kB |
| `/hero` | Static client demo | No | No | Not crawl-discovered | 22.2 / 158 kB |
| `/testimonial` | Static showcase | No | No | Not crawl-discovered | 8.28 / 116 kB |
| `/wet` | Static weather demo | No | No | Not crawl-discovered | 19.3 / 122 kB |
| `/sitemap.xml` | Static ISR, 1-hour revalidation | N/A | N/A | N/A | 189 B / 103 kB |
| `/sitemaps/[id].xml` | Dynamic XML shard | N/A | N/A | N/A | 189 B / 103 kB |
| `/robots.txt` | Static metadata route | N/A | N/A | N/A | 189 B / 103 kB |
| `/opengraph-image` | Static image route | N/A | N/A | N/A | 189 B / 103 kB |
| `/favicon.ico` | Static icon metadata route | N/A | N/A | N/A | Metadata asset |
| `/_not-found` | Static 404 | No | No | N/A | 189 B / 103 kB |
| `/api/generate-reports`, `/api/pagespeed`, `/api/pagespeed/[jobId]`, `/api/pagespeed/[jobId]/run`, `/reports/[id]` | Dynamic API/response routes | No | No | N/A | 189 B / 103 kB |

The production crawl found 14 HTML pages, no orphaned sitemap URLs, no routes deeper than three clicks, no broken internal links, and no internal redirects. Most indexable destinations receive 13 distinct referring pages through shared navigation/footer links; each of the two published blog posts has one inbound link from the blog listing. Admin pages are intentionally not reached by the public crawler. Client-side admin guards are not server authorization; verify every admin/API operation independently on the server.

The CMS-backed blog now server-renders its initial post cards and article text; client-side filters and rich-text sanitization run after hydration. The project listing fetches its initial records in the server component and renders the resulting cards in the initial HTML; client-side filters remain interactive. The project detail routes are placeholders and are intentionally excluded rather than presenting thin pages as portfolio content.

## Search topics and answer-focused questions

Grounded in the visible services and homepage, likely target topics include:

- Nairobi web developer for real-estate companies
- real-estate website design and development in Kenya
- website SEO services in Nairobi
- website performance and SEO audit
- how to improve website performance, accessibility and SEO scores
- web design, Google Ads, and content creation for Kenyan businesses
- how much a content funnel costs and how long it takes to produce results

The Webaudits page FAQ has visible answers for its audit and funnel questions. Do not add FAQ schema to other pages unless their answers are visibly present.

## Hub-and-spoke internal links

| Source page | Target page | Recommended anchor text | Reason |
|---|---|---|---|
| `/` | `/Services` | Web design, development and SEO services | Connect the homepage's real-estate web-development topic to the service hub. |
| `/Services` | Each `/Services/*` page | Specific service name (for example, “SEO optimization”) | Creates a clear service hub and avoids repeated generic anchor text. |
| Every `/Services/*` page | `/Services` | All services | Breadcrumb and return path to the service hub. |
| `/Services/web-development` | `/Services/web-design` | Website design | Connects design and implementation intent. |
| `/Services/seo` | `/Webaudits` | Free website audit | Connects technical SEO services to the audit tool. |
| `/Webaudits` | `/Services/seo` | SEO optimization services | Moves users from diagnosis to the relevant service. |
| `/Blog` | `/Services/web-development`, `/Services/seo` | Web development and SEO services | Adds a relevant commercial next step to educational content. |
| `/` and `/` footer | `/playground` | Selected website projects | Adds proof and work samples from high-visibility hubs. |
| `/Blog` | Published `/Blog/[slug]` URLs | The article title | Descriptive, stable paths from the blog hub to each article. |

## AI crawler access policy

The generated `robots.txt` allows the listed crawlers to access public pages and blocks admin, report, and API paths. The public sign-in page is crawlable so search engines can see its `noindex` directive. Robots directives are requests, not access control. Keep authorization on the server; `noindex` and `robots.txt` must not be treated as protection for private data.

| Crawler | Current policy | Tradeoff to consider |
|---|---|---|
| GPTBot | Allowed on public pages | OpenAI training/data collection crawler; block if content should not be used for model training. |
| OAI-SearchBot | Allowed | Supports OpenAI search discovery/citations; allow for visibility, block to opt out. |
| ChatGPT-User | Allowed | User-triggered fetches for answers; allowing improves link retrieval, but permits fetches initiated by users. |
| ClaudeBot | Allowed | Anthropic crawler; may be used for model improvement depending on its current policy. |
| Claude-Web | Allowed | Legacy/alternate Claude fetch identity; redundant in some deployments, harmless to leave explicitly listed. |
| PerplexityBot | Allowed | Search/citation discovery; block if you do not want Perplexity crawling public pages. |
| Google-Extended | Allowed | Controls certain Gemini model-training uses, not ordinary Google Search indexing; block if training use is unwanted. |
| Applebot-Extended | Allowed | Controls certain Apple generative-AI uses, separate from standard Applebot search crawling. |
| CCBot | Allowed | Common Crawl dataset collection; block if broad third-party dataset reuse is unwanted. |

Revisit this table against each provider's current crawler documentation and your content/licensing preferences. A `robots.txt` allow rule does not guarantee crawling, indexing, or citation.

## Search Console and Bing setup

1. Deploy the canonical host and verify `https://madebymitch.com/robots.txt` and `https://madebymitch.com/sitemap.xml`.
2. In Google Search Console, add the Domain property (or URL-prefix property), complete DNS/site verification, then submit `https://madebymitch.com/sitemap.xml` under **Sitemaps**.
3. In Bing Webmaster Tools, import the verified Search Console property or verify the domain, then submit the same sitemap under **Sitemaps**.
4. Inspect the homepage, an important service URL, and a published blog post with each tool's URL inspection/live test. Resolve canonical, crawl, and rendering reports before requesting indexing.
5. Sitemap submission is a discovery hint, not an indexing guarantee. Do not ping deprecated sitemap-ping endpoints.

### IndexNow setup

Generate an unpredictable 128-bit key and publish a plain-text verification file at the public root. Keep the key in a local environment variable; do not commit `.env.local`.

```powershell
$bytes = New-Object byte[] 16
$rng = [Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$key = [BitConverter]::ToString($bytes).Replace("-", "").ToLowerInvariant()
Set-Content -NoNewline -Encoding ascii "public\$key.txt" $key
$env:INDEXNOW_KEY = $key
```

Deploy the key file, then notify IndexNow after publishing or materially updating URLs:

```powershell
npm run seo:indexnow -- https://madebymitch.com/Blog/your-updated-slug https://madebymitch.com/Services/seo
```

The script verifies the public key file exists and matches `INDEXNOW_KEY`, sends URLs only for one host per request, and fails explicitly on rejected responses. Remove a generated key file from the repository if you do not want to use IndexNow.

## Internal-link and crawl checks

Run the production server in one PowerShell terminal and crawl it in another:

```powershell
npm run build
npm run start
```

```powershell
npm run seo:crawl -- https://madebymitch.com
```

For local validation, use `http://localhost:3000`. The report lists inbound links, orphaned sitemap URLs, routes deeper than three internal clicks, broken internal URLs, and redirecting internal URLs. The crawler follows internal HTML links and reads sitemap entries; it does not authenticate into admin areas.

## Audit findings to keep in view

- The root canonical used to apply the homepage URL to every route. It has been removed and route canonicals are now set through page metadata.
- The old XML sitemap had stale/demo routes, manually dated entries, and the `www` hostname. It has been replaced by a CMS-aware sitemap index at `/sitemap.xml` and public shards at `/sitemaps/{id}.xml`; published blog URLs are sharded without exceeding the 50,000-URL limit. The `www` redirect is permanent (Next.js serves 308); no public path segments were renamed.
- Existing routes use uppercase path segments (`/About`, `/Services`, `/Blog`). They are retained to avoid changing existing public URLs; do not lowercase these without a complete redirect and internal-link migration.
- No multilingual content was found, so `hreflang` is not applicable.
- Remote CMS images in blog views use ordinary `<img>` tags with intrinsic dimensions and lazy loading below the fold; review loading priority before switching to `next/image` (which needs a constrained remote-host policy).
- The blog listing, article body, and portfolio grid are server-rendered; browser interactions hydrate on top of the initial content.
- The final `npm run build` passes compilation, lint/type validation, static generation, and trace collection. It logs a non-fatal `Drivers fetch failed: 401` while prerendering the noindex `/api` demo; repair that demo's upstream credentials/endpoint if it is meant to display live data.
- The route bundles share 103 kB of first-load JavaScript. Public first-load sizes are 113–200 kB; the Blog and Playground are 193 kB and 175 kB, respectively. Removing the Blog's GSAP entrance effect reduced its first-load JS by 27 kB and avoids hiding server-rendered cards during hydration. The Playground's project modal now code-splits its GSAP animation and loads only on interaction, reducing first-load JS by 28 kB. The private Blog editor is largest at 312 kB. No Lighthouse/Core Web Vitals lab run was available, so confirm LCP, INP, and CLS on production field data rather than inferring them from bundle size.
- Montserrat, Roboto, and PT Mono use `next/font` with `display: swap`, avoiding render-blocking third-party font CSS on public pages.
- A Person/Organization and Service graph is used instead of LocalBusiness because the codebase has no public street address or verified local NAP. Do not add review or offer schema without matching visible evidence.
- Review existing outcome statements and portfolio/career statistics (including satisfaction, conversion, revenue, and delivery metrics) against documented evidence before presenting them as independently verifiable trust claims.
