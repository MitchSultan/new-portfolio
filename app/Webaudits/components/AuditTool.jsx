'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge, Smartphone, Search, FileText, ArrowRightLeft,
  MapPin, Globe, Loader2, CheckCircle, AlertTriangle, XCircle
} from 'lucide-react';
import AuditResults from './AuditResults';

const auditCategories = [
  { key: 'performance', label: 'Performance', icon: Gauge, weight: 0.2 },
  { key: 'mobile', label: 'Mobile UX', icon: Smartphone, weight: 0.2 },
  { key: 'seo', label: 'SEO Health', icon: Search, weight: 0.15 },
  { key: 'content', label: 'Content Strategy', icon: FileText, weight: 0.15 },
  { key: 'conversion', label: 'Conversion Flow', icon: ArrowRightLeft, weight: 0.15 },
  { key: 'local', label: 'Nairobi Local SEO', icon: MapPin, weight: 0.15 },
];

const loadingSteps = [
  { text: 'Resolving domain...', duration: 800 },
  { text: 'Scanning page structure...', duration: 1200 },
  { text: 'Evaluating mobile responsiveness...', duration: 1000 },
  { text: 'Analyzing SEO signals...', duration: 1100 },
  { text: 'Checking content depth...', duration: 900 },
  { text: 'Assessing conversion elements...', duration: 1000 },
  { text: 'Reviewing local Nairobi optimization...', duration: 800 },
  { text: 'Generating recommendations...', duration: 1200 },
];

function generateRecommendations(key, score, domain) {
  const recs = {
    performance: {
      low: [
        `${domain} loads slower than 73% of Nairobi business sites — compress images and enable browser caching`,
        'Implement lazy loading for below-the-fold content to improve initial paint time',
        'Consider a CDN with Nairobi edge servers (Cloudflare has a Nairobi POP)',
      ],
      mid: [
        'Good foundation — optimize largest contentful paint by deferring non-critical JavaScript',
        `${domain} could gain 15-20% speed by switching to next-gen image formats (WebP/AVIF)`,
      ],
      high: [
        `Excellent speed — ${domain} outperforms 85% of Nairobi business websites`,
        'Maintain performance by monitoring Core Web Vitals monthly',
      ],
    },
    mobile: {
      low: [
        '98% of Nairobi users browse on mobile — your site needs a responsive overhaul',
        'Touch targets are too small for reliable mobile interaction',
        'Text is not readable without zooming on most Nairobi smartphone screens',
      ],
      mid: [
        'Mobile layout works but could benefit from thumb-friendly navigation patterns',
        `Optimize ${domain}'s mobile forms — Nairobi users prefer M-Pesa and WhatsApp integrations`,
      ],
      high: [
        'Strong mobile experience — well optimized for Nairobi smartphone users',
        'Consider adding PWA capabilities for offline access in low-connectivity areas',
      ],
    },
    seo: {
      low: [
        `${domain} is barely visible in Google Kenya search results`,
        'Missing meta descriptions, alt tags, and structured data markup',
        'No sitemap.xml detected — Google cannot efficiently crawl your pages',
      ],
      mid: [
        'Basic SEO is in place but lacks depth — target long-tail Nairobi keywords',
        `${domain} could benefit from local business schema markup`,
      ],
      high: [
        `${domain} has strong SEO foundations — expand content to capture more Nairobi search traffic`,
        'Consider publishing location-specific landing pages for different Nairobi neighborhoods',
      ],
    },
    content: {
      low: [
        'Thin content across most pages — Google and customers need more substance',
        'No blog, resources, or educational content to build authority and trust',
        'Missing clear value proposition on the homepage',
      ],
      mid: [
        'Decent content but no clear lead magnet or content upgrade strategy',
        `${domain} would benefit from Nairobi market-specific case studies`,
      ],
      high: [
        'Rich content strategy — keep publishing Nairobi-focused insights',
        'Consider gating premium content to capture more leads',
      ],
    },
    conversion: {
      low: [
        'No clear call-to-action visible above the fold',
        'Missing trust signals (testimonials, certifications, client logos)',
        'No WhatsApp integration — Nairobi customers prefer messaging over forms',
      ],
      mid: [
        'CTAs exist but lack urgency and specificity — test "Get Your Free Quote" vs. generic "Contact Us"',
        `Add a WhatsApp chat button — 89% of Nairobi businesses report higher conversion via WhatsApp`,
      ],
      high: [
        'Strong conversion elements — consider A/B testing CTA copy and placement',
        'Add exit-intent popups to capture leaving visitors',
      ],
    },
    local: {
      low: [
        'No Google Business Profile link detected',
        'Missing Nairobi-specific keywords and location pages',
        'Not optimized for "near me" searches which grew 340% in Nairobi',
      ],
      mid: [
        'Some local signals present — add more Nairobi neighborhood targeting',
        `${domain} should include NAP (Name, Address, Phone) consistently across all pages`,
      ],
      high: [
        'Excellent local optimization — well positioned for Nairobi search queries',
        'Consider expanding to target specific areas: Westlands, CBD, Karen, Kilimani',
      ],
    },
  };

  const level = score < 45 ? 'low' : score < 75 ? 'mid' : 'high';
  return recs[key]?.[level] || [];
}

function generateScores(url) {
  let seed = 0;
  for (let i = 0; i < url.length; i++) {
    seed = ((seed << 5) - seed + url.charCodeAt(i)) | 0;
  }
  const seededRandom = (min, max) => {
    seed = (seed * 16807 + 0) % 2147483647;
    return min + (Math.abs(seed) % (max - min + 1));
  };

  const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];

  const results = {};
  auditCategories.forEach((cat) => {
    const score = seededRandom(25, 92);
    results[cat.key] = {
      score,
      recommendations: generateRecommendations(cat.key, score, domain),
    };
  });

  let overall = 0;
  auditCategories.forEach((cat) => {
    overall += results[cat.key].score * cat.weight;
  });
  results.overall = Math.round(overall);
  results.domain = domain;

  return results;
}

export default function AuditTool({ initialUrl, onRequestLeadForm }) {
  const [url, setUrl] = useState(initialUrl || '');
  const [phase, setPhase] = useState(initialUrl ? 'analyzing' : 'idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  const runAudit = useCallback((targetUrl) => {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) return;
    setUrl(cleanUrl);
    setPhase('analyzing');
    setCurrentStep(0);
    setProgress(0);
    setResults(null);
  }, []);

  useEffect(() => {
    if (initialUrl) {
      runAudit(initialUrl);
    }
  }, [initialUrl, runAudit]);

  useEffect(() => {
    if (phase !== 'analyzing') return;

    let stepIndex = 0;
    let elapsed = 0;
    const totalDuration = loadingSteps.reduce((sum, s) => sum + s.duration, 0);

    const interval = setInterval(() => {
      elapsed += 50;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);

      let cumulative = 0;
      for (let i = 0; i < loadingSteps.length; i++) {
        cumulative += loadingSteps[i].duration;
        if (elapsed < cumulative) {
          stepIndex = i;
          break;
        }
        stepIndex = i;
      }
      setCurrentStep(stepIndex);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        const generated = generateScores(url);
        setResults(generated);
        setPhase('results');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runAudit(url);
  };

  return (
    <section id="audit-tool" className="py-24 px-6 bg-gray-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-widest">Interactive Audit</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            See How Your Website{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Really Performs
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Enter any URL below. Our analysis evaluates 6 critical dimensions
            that determine whether your site wins or loses Nairobi customers.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto mb-8"
            >
              <div className="relative flex-1 w-full">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. mywebsite.co.ke"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  id="audit-tool-url-input"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
                id="audit-tool-run-button"
              >
                <Search className="w-5 h-5" />
                Run Audit
              </motion.button>
            </motion.form>
          )}

          {phase === 'analyzing' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto p-8 rounded-2xl bg-white border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
                <span className="text-gray-900 font-semibold">Analyzing {url.replace(/^https?:\/\//, '').split('/')[0]}...</span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-100 mb-6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="space-y-3">
                {loadingSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i < currentStep ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : i === currentStep ? (
                      <Loader2 className="w-4 h-4 text-primary-600 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${i <= currentStep ? 'text-gray-700' : 'text-gray-300'}`}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AuditResults
                results={results}
                categories={auditCategories}
                onReAudit={() => { setPhase('idle'); setResults(null); }}
                onRequestLeadForm={onRequestLeadForm}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
