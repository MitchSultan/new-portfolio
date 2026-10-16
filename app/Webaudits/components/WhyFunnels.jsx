import React from 'react';

const painPoints = [
  'High bounce rates: visitors leave in under 8 seconds',
  'No clear path from browsing to buying',
  'Wasted ad spend driving traffic to pages that do not convert',
  'Zero follow-up system: lost leads never return',
];

// `width` narrows the rule above each step, so the list reads as a funnel.
const funnelSteps = [
  {
    title: 'Attract',
    description:
      'SEO-optimized content and local targeting bring the right global audience to you',
    width: '100%',
  },
  {
    title: 'Engage',
    description:
      'Value-driven pages, lead magnets, and interactive tools build trust and capture leads',
    width: '85%',
  },
  {
    title: 'Convert',
    description:
      'Strategic CTAs, personalized follow-ups, and WhatsApp automation close the deal',
    width: '70%',
    accent: true,
  },
  {
    title: 'Retain',
    description:
      'Automated sequences turn one-time buyers into repeat customers and referrals',
    width: '55%',
  },
];

export default function WhyFunnels() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            The missing piece
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            A website alone isn&apos;t enough
          </h2>
        </div>

        {/* Row 2 — intro */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='hidden md:col-span-3 md:block' aria-hidden />
          <p className='max-w-xl py-6 text-base leading-relaxed text-neutral-600 md:col-span-9 md:border-l md:border-neutral-300 md:pl-8'>
            Most businesses have a website. Very few have a system that
            consistently turns strangers into customers. That system is a
            content funnel.
          </p>
        </div>

        {/* Row 3 — problem | solution */}
        <div className='grid border-y border-neutral-900 md:grid-cols-12'>
          {/* Problem */}
          <div className='py-8 md:col-span-6 md:pr-8'>
            <h3 className='font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl'>
              What a basic website gets you
            </h3>
            <ul className='mt-8'>
              {painPoints.map((text, i) => (
                <li
                  key={text}
                  className='grid grid-cols-[3rem_1fr] border-t border-neutral-300 py-4'
                >
                  <span className='text-sm tabular-nums text-neutral-500'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className='text-base leading-snug'>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className='border-t border-neutral-900 py-8 md:col-span-6 md:border-l md:border-t-0 md:border-neutral-900 md:pl-8'>
            <h3 className='font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl'>
              What a content funnel delivers
            </h3>
            <ol className='mt-8 space-y-6'>
              {funnelSteps.map((step, i) => (
                <li key={step.title}>
                  <div
                    aria-hidden
                    className={`h-1 ${
                      step.accent ? 'bg-blaze-orange' : 'bg-neutral-900'
                    }`}
                    style={{ width: step.width }}
                  />
                  <div className='mt-3 grid grid-cols-[3rem_1fr]'>
                    <span className='text-sm tabular-nums text-neutral-500'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className='text-xl font-semibold tracking-tight'>
                        {step.title}
                      </h4>
                      <p className='mt-1 max-w-[46ch] text-base leading-snug text-neutral-600'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}