'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge, Smartphone, Search, ShieldCheck, Accessibility,
  Globe, Loader2, CheckCircle, XCircle
} from '@/lib/lucide';
import { AUDIT_CATEGORY_CONFIG, LIGHTHOUSE_LOADING_LABELS } from '../../../lib/lighthouse-categories';
import AuditResults from './AuditResults';

const categoryIcons = {
  performance: Gauge,
  mobile: Smartphone,
  accessibility: Accessibility,
  'best-practices': ShieldCheck,
  seo: Search,
};

const loadingSteps = [
  { text: 'Resolving domain...', duration: 700 },
  ...LIGHTHOUSE_LOADING_LABELS.map((label, i) => ({
    text: `Running Lighthouse: ${label}...`,
    duration: 1100 + i * 100,
  })),
  { text: 'Compiling audit recommendations...', duration: 900 },
];

function buildDisplayCategories(results) {
  return AUDIT_CATEGORY_CONFIG.map((config) => {
    const data = results[config.key];
    const fromApi = results.categories?.find((c) => c.key === config.key);
    return {
      key: config.key,
      label: data?.label || fromApi?.label || config.key,
      icon: categoryIcons[config.key] || Gauge,
    };
  });
}

export default function AuditTool({ initialUrl, onRequestLeadForm }) {
  const [url, setUrl] = useState(initialUrl || '');
  const [phase, setPhase] = useState(initialUrl ? 'queued' : 'idle');
  const [jobId, setJobId] = useState(null);
  const [pollAttempts, setPollAttempts] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runAudit = useCallback((targetUrl) => {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) return;
    setUrl(cleanUrl);
    setPhase('queued');
    setJobId(null);
    setPollAttempts(0);
    setCurrentStep(0);
    setProgress(0);
    setResults(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (initialUrl) {
      runAudit(initialUrl);
    }
  }, [initialUrl, runAudit]);

  useEffect(() => {
    if (phase !== 'queued' || !url) return;

    let cancelled = false;
    let elapsed = 0;
    let pollTimer = null;
    let attemptCount = 0;
    const totalDuration = loadingSteps.reduce((sum, s) => sum + s.duration, 0);
    const POLL_INTERVAL_MS = 3000;
    const MAX_POLL_ATTEMPTS = 40;

    const stopPolling = () => {
      if (pollTimer) {
        clearInterval(pollTimer);
      }
    };

    const setJobError = (message) => {
      if (cancelled) return;
      setError(message);
      setPhase('error');
      stopPolling();
    };

    const pollJob = async (id) => {
      try {
        const response = await fetch(`/api/pagespeed/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Audit status check failed (${response.status}).`);
        }

        if (cancelled) return;

        if (data.status === 'completed') {
          setResults(data.result);
          setPhase('results');
          stopPolling();
          return;
        }

        if (data.status === 'failed') {
          setJobError(data.error || 'The audit failed. Please try again.');
          return;
        }

        attemptCount += 1;
        setPollAttempts(attemptCount);

        if (attemptCount >= MAX_POLL_ATTEMPTS) {
          setJobError('The audit is taking longer than expected. Please try again later.');
        }
      } catch (err) {
        if (!cancelled) {
          setJobError(err instanceof Error ? err.message : 'Failed to poll audit status.');
        }
      }
    };

    const startJob = async () => {
      try {
        const response = await fetch('/api/pagespeed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();

        if (response.status === 202 && data?.jobId) {
          if (cancelled) return;
          setJobId(data.jobId);
          
          // Fire and forget the actual run request so it processes in the background
          fetch(`/api/pagespeed/${data.jobId}/run`, { method: 'POST' }).catch(console.error);

          await pollJob(data.jobId);
          if (!cancelled) {
            pollTimer = setInterval(() => {
              if (cancelled) return;
              (async () => {
                try {
                  await pollJob(data.jobId);
                } catch (err) {
                  console.error('Poll error:', err);
                }
              })();
            }, POLL_INTERVAL_MS);
          }
          return;
        }

        if (response.ok && data?.result) {
          if (!cancelled) {
            setResults(data.result);
            setPhase('results');
          }
          return;
        }

        throw new Error(data.error || 'Failed to start the audit.');
      } catch (err) {
        if (!cancelled) {
          setJobError(err instanceof Error ? err.message : 'Failed to start the audit.');
        }
      }
    };

    const interval = setInterval(() => {
      elapsed += 50;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);

      let cumulative = 0;
      let stepIndex = 0;
      for (let i = 0; i < loadingSteps.length; i++) {
        cumulative += loadingSteps[i].duration;
        if (elapsed < cumulative) {
          stepIndex = i;
          break;
        }
        stepIndex = i;
      }
      setCurrentStep(stepIndex);
    }, 50);

    startJob();

    return () => {
      cancelled = true;
      clearInterval(interval);
      stopPolling();
    };
  }, [phase, url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runAudit(url);
  };

  return (
    <section id="audit-tool" className="py-24 px-6  relative overflow-hidden">
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
            <span className="bg-azure-blue bg-clip-text text-transparent">
              Really Performs
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Enter any URL below. We run a live Google PageSpeed Insights audit
            using official Lighthouse category scores and recommendations.
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
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-black font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
                id="audit-tool-run-button"
              >
                <Search className="w-5 h-5" />
                Run Audit
              </motion.button>
            </motion.form>
          )}

          {phase === 'queued' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto p-8 rounded-2xl bg-white border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
                  <span className="text-gray-900 font-semibold">
                    Queued audit for {url.replace(/^https?:\/\//, '').split('/')[0]}...
                  </span>
                </div>
                {jobId && (
                  <p className="text-sm text-gray-500">
                    Audit job ID: <span className="font-mono text-xs text-gray-700">{jobId}</span>
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  Waiting for results. We will poll the job status every few seconds.
                  {pollAttempts > 0 && ` Attempt ${pollAttempts}/${20}.`}
                </p>
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

          {phase === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto p-8 rounded-2xl bg-white border border-rose-200 shadow-sm text-center"
            >
              <XCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Audit could not complete</h3>
              <p className="text-gray-600 text-sm mb-6">{error}</p>
              <button
                type="button"
                onClick={() => setPhase('idle')}
                className="px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
              >
                Try again
              </button>
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
                categories={buildDisplayCategories(results)}
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
