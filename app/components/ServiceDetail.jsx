import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Breadcrumbs from './Breadcrumbs';
import JsonLd from './JsonLd';
import RelatedContent from './RelatedContent';
import { SITE_URL } from '../../lib/seo';

const WHATSAPP = 'https://wa.me/254703666366';

/**
 * Shared layout for every individual service page.
 *
 * Props
 *  title      — page heading, e.g. "Web development"
 *  intro      — one short paragraph under the heading
 *  features   — [{ title, description }] (4 reads best)
 *  toolsTitle — optional label for the tools list, e.g. "Tech stack"
 *  tools      — optional array of strings
 *  cta        — { heading, text, label }
 */
export default function ServiceDetail({
  title,
  intro,
  features,
  slug,
  toolsTitle,
  tools,
  cta,
}) {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-900'>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${SITE_URL}/Services/${slug}#service`,
            name: title,
            description: intro,
            serviceType: title,
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: ['Nairobi', 'Kenya'],
            url: `${SITE_URL}/Services/${slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${SITE_URL}/Services/${slug}#webpage`,
            url: `${SITE_URL}/Services/${slug}`,
            name: `${title} | Made by Mitch`,
            description: intro,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/Services/${slug}#service` },
            inLanguage: 'en',
          },
        ]}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: 'Services', href: '/Services' },
          { name: title, href: `/Services/${slug}` },
        ]}
      />

      <main className='flex-1'>
        <div className='mx-auto w-full max-w-[1440px] px-4 pb-16 pt-12 md:px-8 md:pt-16 lg:pb-[90px] lg:pt-20'>
          {/* Row 1 — headline */}
          <div className='grid border-t border-neutral-900 md:grid-cols-12'>
            <p className='py-4 text-sm md:col-span-3 md:py-6'>
              <a
                href='/Services'
                className='text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
              >
                ← All services
              </a>
            </p>
            <h1 className='pb-8 font-display text-5xl font-semibold leading-[0.98] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-14 md:pl-8 md:text-7xl lg:text-[7.5rem]'>
              {title}
            </h1>
          </div>

          {/* Row 2 — intro */}
          <div className='grid border-t border-neutral-900 md:grid-cols-12'>
            <div className='hidden md:col-span-3 md:block' aria-hidden />
            <p className='max-w-2xl py-6 text-lg leading-snug md:col-span-9 md:border-l md:border-neutral-300 md:py-8 md:pl-8 md:text-2xl'>
              {intro}
            </p>
          </div>

          {/* Row 3 — what's included */}
          <div className='grid border-t border-neutral-900 md:grid-cols-12'>
            <p className='py-4 text-sm text-neutral-500 md:col-span-12 md:py-4'>
              What I deliver
            </p>
          </div>
          <div className='grid border-b border-neutral-900 md:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className='flex flex-col justify-between gap-12 border-t border-neutral-300 p-4 first:border-t-neutral-900 md:border-r md:p-6 md:max-lg:[&:nth-child(2)]:border-t-neutral-900 md:max-lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(-n+4)]:border-t-neutral-900 lg:[&:nth-child(4n)]:border-r-0'
              >
                <span className='text-sm tabular-nums text-neutral-500'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className='font-display text-2xl font-semibold leading-tight tracking-tight'>
                    {feature.title}
                  </h2>
                  <p className='mt-3 text-base leading-snug text-neutral-600'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Optional tools / stack */}
          {tools && tools.length > 0 && (
            <div className='mt-16 grid border-y border-neutral-900 md:grid-cols-12'>
              <h2 className='py-4 text-sm font-semibold md:col-span-3 md:py-6'>
                {toolsTitle}
              </h2>
              <ul className='grid grid-cols-2 border-t border-neutral-300 md:col-span-9 md:grid-cols-4 md:border-t-0'>
                {tools.map((tool) => (
                  <li
                    key={tool}
                    className='border-t border-neutral-300 px-4 py-6 text-xl font-medium tracking-tight even:border-l [&:nth-child(-n+2)]:border-t-0 md:border-l md:px-8 md:text-2xl md:[&:nth-child(-n+4)]:border-t-0'
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className='mt-16 grid border-y border-neutral-900 md:grid-cols-12'>
            <div className='py-8 md:col-span-9 md:py-12'>
              <h2 className='max-w-[20ch] font-display text-4xl font-semibold leading-[1] tracking-tighter md:text-6xl'>
                {cta.heading}
              </h2>
              <p className='mt-5 max-w-lg text-base leading-relaxed text-neutral-600'>
                {cta.text}
              </p>
            </div>
            <a
              href={WHATSAPP}
              className='bg-blaze-orange flex min-h-[9rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:col-span-3 md:border-l md:border-t-0'
            >
              <span>{cta.label}</span>
              <span aria-hidden>→</span>
            </a>
          </div>

          <RelatedContent
            links={[
              {
                title: 'Web development',
                href: '/Services/web-development',
                description: 'Build a fast, responsive website for your business.',
              },
              {
                title: 'Website SEO',
                href: '/Services/seo',
                description: 'Improve technical and on-page search visibility.',
              },
              {
                title: 'Free website audit',
                href: '/Webaudits',
                description: 'Review performance, accessibility and SEO signals.',
              },
            ].filter((link) => link.href !== `/Services/${slug}`)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}