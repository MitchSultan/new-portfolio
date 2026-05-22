import { AUDIT_CATEGORY_CONFIG, PAGESPEED_CATEGORIES } from './lighthouse-categories';

const PAGESPEED_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export function normalizeAuditUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('Please enter a website URL.');
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let parsed;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error('That does not look like a valid website URL.');
  }

  if (!parsed.hostname.includes('.')) {
    throw new Error('Please enter a full domain (e.g. example.co.ke).');
  }

  return parsed.toString();
}

export function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];
  }
}

async function fetchPageSpeed(targetUrl, strategy, apiKey) {
  const url = new URL(PAGESPEED_ENDPOINT);
  url.searchParams.set('url', targetUrl);
  url.searchParams.set('strategy', strategy);
  url.searchParams.set('key', apiKey);
  // PageSpeed only runs Performance when category is omitted — request all Lighthouse categories.
  for (const category of PAGESPEED_CATEGORIES) {
    url.searchParams.append('category', category);
  }

  const response = await fetch(url.toString(), { next: { revalidate: 0 } });

  if (!response.ok) {
    const body = await response.text();
    let message = `PageSpeed API returned ${response.status}`;
    try {
      const errJson = JSON.parse(body);
      message = errJson?.error?.message || message;
    } catch {
      // use default message
    }
    throw new Error(message);
  }

  return response.json();
}

function lighthouseCategoryTitle(lighthouse, categoryId, labelSuffix) {
  const title = lighthouse?.categories?.[categoryId]?.title;
  if (!title) {
    return categoryId;
  }
  return labelSuffix ? `${title} (${labelSuffix})` : title;
}

function categoryScore(lighthouse, categoryId) {
  const score = lighthouse?.categories?.[categoryId]?.score;
  return typeof score === 'number' ? Math.round(score * 100) : null;
}

function auditIdsForLighthouseCategory(lighthouse, categoryId) {
  return (lighthouse?.categories?.[categoryId]?.auditRefs || [])
    .map((ref) => ref.id)
    .filter(Boolean);
}

function recommendationsFromAudits(lighthouse, auditIds, fallbackRecs) {
  const fromApi = auditIds
    .map((id) => lighthouse?.audits?.[id])
    .filter((audit) => audit && typeof audit.score === 'number' && audit.score < 0.9)
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map((audit) => {
      const value = audit.displayValue ? ` — ${audit.displayValue}` : '';
      return `${audit.title}${value}`;
    });

  return fromApi.length > 0 ? fromApi : fallbackRecs;
}

function cruxRecommendations(loadingExperience) {
  const metrics = loadingExperience?.metrics;
  if (!metrics) return [];

  const recs = [];
  const fcp = metrics.FIRST_CONTENTFUL_PAINT_MS?.category;
  const inp = metrics.INTERACTION_TO_NEXT_PAINT?.category;

  if (fcp && fcp !== 'FAST') {
    recs.push(
      `Chrome UX Report: First Contentful Paint is ${fcp.toLowerCase()} for real users visiting this site`
    );
  }
  if (inp && inp !== 'FAST') {
    recs.push(
      `Chrome UX Report: Interaction to Next Paint is ${inp.toLowerCase()} for real users`
    );
  }

  return recs;
}

function fallbackRecommendations(categoryTitle, score, domain) {
  const level = score < 45 ? 'low' : score < 75 ? 'mid' : 'high';
  const templates = {
    low: [`${domain} has issues in Lighthouse "${categoryTitle}" — review the audits below`],
    mid: [`${categoryTitle} is improving — address remaining Lighthouse audits for ${domain}`],
    high: [`${domain} scores well on Lighthouse "${categoryTitle}"`],
  };
  return templates[level];
}

function buildCategoryResult({ key, label, score, lighthouse, domain, extraRecs = [] }) {
  const auditIds = auditIdsForLighthouseCategory(
    lighthouse,
    key === 'mobile' ? 'performance' : key
  );
  const recommendations = [
    ...extraRecs,
    ...recommendationsFromAudits(
      lighthouse,
      auditIds,
      fallbackRecommendations(label, score, domain)
    ),
  ].slice(0, 4);

  return { key, label, score, recommendations };
}

export async function runPageSpeedAudit(rawUrl, apiKey) {
  if (!apiKey) {
    throw new Error('PageSpeed API key is not configured.');
  }

  const targetUrl = normalizeAuditUrl(rawUrl);
  const domain = extractDomain(targetUrl);

  const [desktop, mobile] = await Promise.all([
    fetchPageSpeed(targetUrl, 'desktop', apiKey),
    fetchPageSpeed(targetUrl, 'mobile', apiKey),
  ]);

  const desktopLh = desktop.lighthouseResult;
  const mobileLh = mobile.lighthouseResult;

  if (!desktopLh || !mobileLh) {
    throw new Error('PageSpeed did not return Lighthouse results for this URL.');
  }

  const cruxRecs = cruxRecommendations(desktop.loadingExperience || mobile.loadingExperience);

  const results = {
    domain,
    testedUrl: desktop.id || mobile.id || targetUrl,
    categories: [],
    metrics: {
      desktop: extractCoreMetrics(desktopLh),
      mobile: extractCoreMetrics(mobileLh),
      crux: extractCruxMetrics(desktop.loadingExperience || mobile.loadingExperience),
    },
  };

  for (const config of AUDIT_CATEGORY_CONFIG) {
    const lighthouse = config.strategy === 'mobile' ? mobileLh : desktopLh;
    const label = lighthouseCategoryTitle(lighthouse, config.lighthouseId, config.labelSuffix);
    const score =
      categoryScore(lighthouse, config.lighthouseId) ??
      0;
    const extra = config.key === 'performance' ? cruxRecs : [];

    results.categories.push({
      key: config.key,
      label,
      weight: config.weight,
    });

    results[config.key] = buildCategoryResult({
      key: config.key,
      label,
      score,
      lighthouse,
      domain,
      extraRecs: extra,
    });
  }

  let overall = 0;
  for (const { key, weight } of AUDIT_CATEGORY_CONFIG) {
    overall += results[key].score * weight;
  }
  results.overall = Math.round(overall);

  return results;
}

function extractCoreMetrics(lighthouse) {
  const audits = lighthouse?.audits || {};
  return {
    'First Contentful Paint': audits['first-contentful-paint']?.displayValue,
    'Speed Index': audits['speed-index']?.displayValue,
    'Largest Contentful Paint': audits['largest-contentful-paint']?.displayValue,
    'Total Blocking Time': audits['total-blocking-time']?.displayValue,
    'Time to Interactive': audits['interactive']?.displayValue,
  };
}

function extractCruxMetrics(loadingExperience) {
  const metrics = loadingExperience?.metrics || {};
  return {
    'First Contentful Paint': metrics.FIRST_CONTENTFUL_PAINT_MS?.category,
    'Interaction to Next Paint': metrics.INTERACTION_TO_NEXT_PAINT?.category,
  };
}
