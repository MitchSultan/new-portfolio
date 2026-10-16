'use client';
import React, { useEffect, useState } from 'react';
import useCountUp from './useCountUp';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900';

// Status is always shown as a word as well as a colour.
const getStatus = (score) =>
  score >= 75
    ? { label: 'Good', bar: 'bg-emerald-600' }
    : score >= 45
      ? { label: 'Needs work', bar: 'bg-amber-500' }
      : { label: 'Critical', bar: 'bg-rose-600' };

function ScoreBar({ score, height = 'h-2', delay = 0 }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 50 + delay * 1000);
    return () => clearTimeout(timer);
  }, [score, delay]);

  const { bar } = getStatus(score);

  return (
    <div
      className={`w-full bg-neutral-200 ${height}`}
      role='img'
      aria-label={`Score ${score} out of 100`}
    >
      <div
        className={`h-full ${bar} transition-[width] duration-1000 ease-out motion-reduce:transition-none`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function MetricList({ title, data }) {
  const entries = Object.entries(data || {}).filter(([, value]) => value);
  if (entries.length === 0) return null;

  return (
    <div className='p-4 md:p-6'>
      <h4 className='mb-3 text-sm font-semibold'>{title}</h4>
      <dl>
        {entries.map(([label, value]) => (
          <div
            key={label}
            className='flex items-baseline justify-between gap-4 border-t border-neutral-300 py-2 text-sm'
          >
            <dt className='text-neutral-500'>{label}</dt>
            <dd className='text-right font-medium'>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function AuditResults({
  results,
  categories,
  onReAudit,
  onRequestLeadForm,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (key) =>
    setExpandedCategory(expandedCategory === key ? null : key);

  const performanceScore = results.performance?.score ?? 0;
  const performanceTitle = results.performance?.label || 'Performance';
  const status = getStatus(performanceScore);
  const [scoreRef, scoreDisplay] = useCountUp(performanceScore);

  const hasCrux =
    results.metrics?.crux && Object.values(results.metrics.crux).some(Boolean);

  return (
    <div>
      {/* Headline score */}
      <div className='grid border-t border-neutral-900 md:grid-cols-12'>
        <div className='py-6 md:col-span-3 md:pr-6'>
          <p className='text-sm text-neutral-500'>
            {performanceTitle} (desktop) for
          </p>
          <p className='mt-1 break-all text-lg font-semibold'>
            {results.domain}
          </p>
        </div>

        <div className='pb-8 md:col-span-9 md:border-l md:border-neutral-300 md:py-8 md:pl-8'>
          <p
            ref={scoreRef}
            className='font-display text-[7rem] font-semibold leading-[0.85] tracking-tighter tabular-nums md:text-[11rem]'
          >
            {scoreDisplay}
            <span className='text-4xl md:text-6xl'>%</span>
          </p>
          <div className='mt-8'>
            <ScoreBar score={performanceScore} height='h-3' />
          </div>
          <p className='mt-4 flex items-center gap-3 text-lg font-semibold'>
            <span
              aria-hidden
              className={`inline-block size-3 ${status.bar}`}
            />
            {status.label}
          </p>
        </div>
      </div>

      {/* Live metrics */}
      {results.metrics?.desktop && (
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6 md:pr-6'>
            Live Lighthouse metrics (Google PageSpeed)
          </p>
          <div
            className={`grid border-t border-neutral-300 md:col-span-9 md:border-l md:border-t-0 ${
              hasCrux ? 'md:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            <MetricList title='Desktop' data={results.metrics.desktop} />
            <div className='border-t border-neutral-300 md:border-l md:border-t-0'>
              <MetricList title='Mobile' data={results.metrics.mobile} />
            </div>
            {hasCrux && (
              <div className='border-t border-neutral-300 md:border-l md:border-t-0'>
                <MetricList
                  title='Chrome UX Report (real users)'
                  data={results.metrics.crux}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category breakdown */}
      <div className='border-y border-neutral-900'>
        {categories.map((cat, i) => {
          const data = results[cat.key];
          if (!data) return null;

          const isExpanded = expandedCategory === cat.key;
          const recommendations = data.recommendations || [];

          return (
            <div
              key={cat.key}
              className='border-t border-neutral-300 first:border-t-0'
            >
              <h4>
                <button
                  type='button'
                  onClick={() => toggleCategory(cat.key)}
                  aria-expanded={isExpanded}
                  aria-controls={`audit-panel-${cat.key}`}
                  id={`audit-category-${cat.key}`}
                  className={`grid w-full items-center gap-4 py-5 text-left transition-colors hover:bg-neutral-50 md:grid-cols-12 md:gap-0 ${focusRing}`}
                >
                  <span className='text-base font-semibold md:col-span-3'>
                    {data.label || cat.label}
                  </span>
                  <span className='md:col-span-7 md:border-l md:border-neutral-300 md:px-8'>
                    <ScoreBar score={data.score} delay={0.1 + i * 0.1} />
                  </span>
                  <span className='flex items-center justify-between md:col-span-2 md:border-l md:border-neutral-300 md:px-6'>
                    <span className='font-display text-3xl font-semibold leading-none tracking-tighter tabular-nums'>
                      {data.score}
                    </span>
                    <span aria-hidden className='text-xl'>
                      {isExpanded ? '−' : '+'}
                    </span>
                  </span>
                </button>
              </h4>

              {isExpanded && (
                <div
                  id={`audit-panel-${cat.key}`}
                  role='region'
                  aria-labelledby={`audit-category-${cat.key}`}
                  className='grid border-t border-neutral-300 md:grid-cols-12'
                >
                  <p className='py-4 text-sm text-neutral-500 md:col-span-3'>
                    Recommendations
                  </p>
                  <ul className='pb-6 md:col-span-9 md:border-l md:border-neutral-300 md:py-4 md:pl-8'>
                    {recommendations.length === 0 ? (
                      <li className='text-base text-neutral-600'>
                        No recommendations for this category.
                      </li>
                    ) : (
                      recommendations.map((rec, j) => (
                        <li
                          key={j}
                          className='grid grid-cols-[3rem_1fr] border-t border-neutral-300 py-3 text-base leading-snug first:border-t-0 first:pt-0'
                        >
                          <span className='text-sm tabular-nums text-neutral-500'>
                            {String(j + 1).padStart(2, '0')}
                          </span>
                          <span className='text-neutral-700'>{rec}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className='grid border-b border-neutral-900 md:grid-cols-12'>
        <button
          type='button'
          onClick={onRequestLeadForm}
          id='unlock-full-report-button'
          className={`bg-blaze-orange flex min-h-[8rem] items-end justify-between px-6 py-6 text-left text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white md:col-span-8 ${focusRing}`}
        >
          <span>Unlock full report + free strategy call</span>
          <span aria-hidden>→</span>
        </button>
        <button
          type='button'
          onClick={onReAudit}
          id='re-audit-button'
          className={`flex min-h-[6rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-left text-lg font-semibold transition-colors hover:bg-neutral-900 hover:text-white md:col-span-4 md:min-h-[8rem] md:border-l md:border-t-0 ${focusRing}`}
        >
          <span>Audit another site</span>
          <span aria-hidden>↺</span>
        </button>
      </div>
    </div>
  );
}