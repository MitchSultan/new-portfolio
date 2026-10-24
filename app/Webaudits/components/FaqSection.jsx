'use client';
import React, { useState } from 'react';
import JsonLd from '../../components/JsonLd';

export const faqs = [
  {
    question: 'What does the website audit actually measure?',
    answer:
      'Our audit runs Google PageSpeed Insights and reports official Lighthouse categories: Performance (desktop and mobile), Accessibility, Best Practices, and SEO. Each score and recommendation comes from real Lighthouse audits on your URL.',
  },
  {
    question: 'How is this different from Google PageSpeed or Lighthouse?',
    answer:
      'This tool uses the same PageSpeed Insights / Lighthouse engine. We present the results in a business-friendly breakdown with category scores, failed audit titles from Lighthouse, and Chrome UX Report data when available — without needing to read the raw Lighthouse JSON report.',
  },
  {
    question: 'What exactly is a content funnel?',
    answer:
      'A content funnel is a strategic system that guides potential customers through a journey: from discovering your brand (through SEO, social, or ads) → engaging with valuable content that builds trust → taking action (buying, booking, or contacting you) → becoming a loyal repeat customer. Unlike a static website, a funnel actively works to convert visitors 24/7 using automated follow-ups, lead magnets, and personalized CTAs.',
  },
  {
    question: 'How much does it cost to build a content funnel?',
    answer:
      'Every business is unique, so funnels are custom-priced based on your goals, industry, and complexity. Most Nairobi SME funnels start from KES 85,000 for a core funnel and scale up based on the number of pages, automations, and integrations needed. We offer a free strategy call to scope your project and provide a fixed quote — no surprises.',
  },
  {
    question: 'How long does it take to see results?',
    answer:
      'Most clients see measurable improvements within 2-4 weeks of launch: more leads, lower bounce rates, and increased engagement. SEO-driven traffic typically starts compounding around month 2-3. We provide monthly performance reports so you can track exactly how your funnel is performing against your Nairobi market benchmarks.',
  },
  {
    question: 'Can you work with my existing website?',
    answer:
      'Absolutely. We can either enhance your existing site by adding funnel elements (landing pages, lead magnets, automated sequences) or build a completely new high-converting platform. During your free strategy call, we will assess which approach gives you the best ROI based on your current setup and goals.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id='faq' className='w-full bg-white text-neutral-900'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Common questions
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            Got questions? We have answers
          </h2>
        </div>

        {/* Questions */}
        <div className='border-y border-neutral-900'>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className='border-t border-neutral-300 first:border-t-0'
              >
                <h3>
                  <button
                    type='button'
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-item-${i}`}
                    className='grid w-full grid-cols-[2.5rem_1fr_2rem] items-start gap-2 py-5 text-left transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:grid-cols-12 md:gap-0'
                  >
                    <span className='pt-1 text-sm tabular-nums text-neutral-500 md:col-span-3'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className='text-lg font-semibold leading-snug md:col-span-8 md:border-l md:border-neutral-300 md:pl-8 md:text-xl'>
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className='text-right text-xl md:col-span-1 md:pr-2'
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role='region'
                  aria-labelledby={`faq-item-${i}`}
                  className={`md:grid-cols-12 ${isOpen ? 'grid' : 'hidden'}`}
                >
                  <div className='hidden md:col-span-3 md:block' aria-hidden />
                  <p className='max-w-[60ch] pb-6 pl-[2.75rem] text-base leading-relaxed text-neutral-600 md:col-span-8 md:border-l md:border-neutral-300 md:pl-8'>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}