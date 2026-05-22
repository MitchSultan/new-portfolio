/** Categories requested on each PageSpeed API call (required — API defaults to performance only). */
export const PAGESPEED_CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

/** Lighthouse categories shown in Web Audits (labels on results come from the API). */
export const AUDIT_CATEGORY_CONFIG = [
  { key: 'performance', lighthouseId: 'performance', strategy: 'desktop', weight: 0.25 },
  { key: 'mobile', lighthouseId: 'performance', strategy: 'mobile', weight: 0.25, labelSuffix: 'Mobile' },
  { key: 'accessibility', lighthouseId: 'accessibility', strategy: 'desktop', weight: 0.2 },
  { key: 'best-practices', lighthouseId: 'best-practices', strategy: 'desktop', weight: 0.15 },
  { key: 'seo', lighthouseId: 'seo', strategy: 'desktop', weight: 0.15 },
];

const DEFAULT_LIGHTHOUSE_TITLES = {
  performance: 'Performance',
  mobile: 'Performance (Mobile)',
  accessibility: 'Accessibility',
  'best-practices': 'Best Practices',
  seo: 'SEO',
};

export const LIGHTHOUSE_LOADING_LABELS = AUDIT_CATEGORY_CONFIG.map(
  (config) => DEFAULT_LIGHTHOUSE_TITLES[config.key] || config.key
);
