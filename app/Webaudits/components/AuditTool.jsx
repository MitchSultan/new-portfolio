'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  AUDIT_CATEGORY_CONFIG,
  LIGHTHOUSE_LOADING_LABELS,
} from '../../../lib/lighthouse-categories';
import AuditResults from './AuditResults';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 40;

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900';

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
          throw new Error(
            data.error || `Audit status check failed (${response.status}).`
          );
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
          setJobError(
            'The audit is taking longer than expected. Please try again later.'
          );
        }
      } catch (err) {
        if (!cancelled) {
          setJobError(
            err instanceof Error ? err.message : 'Failed to poll audit status.'
          );
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
          fetch(`/api/pagespeed/${data.jobId}/run`, { method: 'POST' }).catch(
            console.error
          );

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
          setJobError(
            err instanceof Error ? err.message : 'Failed to start the audit.'
          );
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

  const domain = url.replace(/^https?:\/\//, '').split('/')[0];

  return (
    <section id='audit-tool' className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Interactive audit
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            See how your website really performs
          </h2>
        </div>

        {/* Row 2 — intro */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='hidden md:col-span-3 md:block' aria-hidden />
          <p className='max-w-xl py-6 text-base leading-relaxed text-neutral-600 md:col-span-9 md:border-l md:border-neutral-300 md:pl-8'>
            Enter any URL below. We run a live Google PageSpeed Insights audit
            using official Lighthouse category scores and recommendations.
          </p>
        </div>

        {/* Idle — URL form */}
        {phase === 'idle' && (
          <form
            onSubmit={handleSubmit}
            className='grid border-y border-neutral-900 md:grid-cols-12'
          >
            <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:flex md:items-center md:py-0'>
              Enter a URL
            </p>
            <div className='md:col-span-6 md:border-l md:border-neutral-300'>
              <label htmlFor='audit-tool-url-input' className='sr-only'>
                Website address to audit
              </label>
              <input
                id='audit-tool-url-input'
                type='text'
                inputMode='url'
                autoComplete='off'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='e.g. mywebsite.co.ke'
                className='h-20 w-full bg-transparent px-0 text-xl placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900 md:px-8 md:text-2xl'
              />
            </div>
            <button
              type='submit'
              id='audit-tool-run-button'
              className={`bg-blaze-orange flex min-h-[5rem] items-center justify-between border-t border-neutral-900 px-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white md:col-span-3 md:border-l md:border-t-0 ${focusRing}`}
            >
              <span>Run audit</span>
              <span aria-hidden>→</span>
            </button>
          </form>
        )}

        {/* Queued — progress */}
        {phase === 'queued' && (
          <div className='grid border-y border-neutral-900 md:grid-cols-12'>
            <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
              Audit in progress
            </p>

            <div className='pb-8 md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pl-8'>
              <h3 className='font-display text-2xl font-semibold leading-tight tracking-tight md:text-4xl'>
                Queued audit for {domain}
              </h3>
              {jobId && (
                <p className='mt-3 text-sm text-neutral-500'>
                  Audit job ID:{' '}
                  <span className='font-mono text-xs text-neutral-700'>
                    {jobId}
                  </span>
                </p>
              )}
              <p className='mt-2 text-sm text-neutral-600'>
                Waiting for results. We check the job status every few seconds.
                {pollAttempts > 0 &&
                  ` Attempt ${pollAttempts} of ${MAX_POLL_ATTEMPTS}.`}
              </p>

              <div
                className='mt-8 h-1 w-full bg-neutral-200'
                role='progressbar'
                aria-label='Audit progress'
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className='h-full bg-neutral-900'
                  style={{ width: `${progress}%` }}
                />
              </div>

              <ol className='mt-8' aria-live='polite'>
                {loadingSteps.map((step, i) => {
                  const done = i < currentStep;
                  const active = i === currentStep;
                  return (
                    <li
                      key={i}
                      aria-current={active ? 'step' : undefined}
                      className='grid grid-cols-[2rem_1fr] items-center border-t border-neutral-300 py-3'
                    >
                      <span
                        aria-hidden
                        className={`size-3 border ${
                          done
                            ? 'border-neutral-900 bg-neutral-900'
                            : active
                              ? 'bg-blaze-orange border-neutral-900 motion-safe:animate-pulse'
                              : 'border-neutral-300'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          i <= currentStep
                            ? 'text-neutral-900'
                            : 'text-neutral-400'
                        }`}
                      >
                        {step.text}
                        <span className='sr-only'>
                          {done ? ' (done)' : active ? ' (running)' : ' (waiting)'}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        {/* Error */}
        {phase === 'error' && (
          <div
            role='alert'
            className='grid border-y border-neutral-900 md:grid-cols-12'
          >
            <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
              Something went wrong
            </p>
            <div className='pb-8 md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pl-8'>
              <h3 className='font-display text-2xl font-semibold leading-tight tracking-tight md:text-4xl'>
                Audit could not complete
              </h3>
              <p className='mt-3 max-w-xl text-base text-neutral-600'>{error}</p>
              <button
                type='button'
                onClick={() => setPhase('idle')}
                className='mt-6 border border-neutral-900 px-6 py-3 text-sm font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {phase === 'results' && results && (
          <AuditResults
            results={results}
            categories={buildDisplayCategories(results)}
            onReAudit={() => {
              setPhase('idle');
              setResults(null);
            }}
            onRequestLeadForm={onRequestLeadForm}
          />
        )}
      </div>
    </section>
  );
}