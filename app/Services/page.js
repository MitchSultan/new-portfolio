import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Breadcrumbs from '../components/Breadcrumbs';
import JsonLd from '../components/JsonLd';
import { pageMetadata } from '../../lib/seo';
import { SITE_URL } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Web Design, Development and SEO Services in Nairobi',
  description:
    'Explore web design, web development, SEO, ads management and content creation services for businesses in Kenya.',
  path: '/Services',
});

const WHATSAPP = 'https://wa.me/254703666366';

const services = [
  {
    title: 'Web design',
    description:
      'Visually stunning, user-centric designs that captivate your audience. I create modern, aesthetic interfaces that feel premium and intuitive.',
    color: 'bg-amber-gold',
    link: '/Services/web-design',
  },
  {
    title: 'Web development',
    description:
      'Robust, scalable, and high-performance websites built with the latest technologies like Next.js and React. Expect fast load times and clean code.',
    color: 'bg-blaze-orange',
    link: '/Services/web-development',
  },
  {
    title: 'SEO optimization',
    description:
      'Climb the search rankings and get found. I implement strategic SEO practices to increase your visibility and drive organic traffic to your site.',
    color: 'bg-neon-pink',
    link: '/Services/seo',
  },
  {
    title: 'Ads management',
    description:
      'Targeted campaigns that convert. I manage Google and Social Media ads to ensure you get the best ROI for your marketing budget.',
    color: 'bg-blue-violet',
    link: '/Services/ads',
  },
  {
    title: 'Content creation',
    description:
      "Compelling narratives that tell your brand's story. From website copy to social media posts, I create content that engages and inspires.",
    color: 'bg-azure-blue',
    link: '/Services/content-creation',
  },
];

const rowFocus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900';

export default function ServicesPage() {
  return (
    <div className='flex min-h-screen flex-col bg-white text-neutral-900'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/Services#webpage`,
          url: `${SITE_URL}/Services`,
          name: 'Web Design, Development and SEO Services in Nairobi',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          inLanguage: 'en',
        }}
      />
      <Navbar />
      <Breadcrumbs items={[{ name: 'Services', href: '/Services' }]} />

      <main className='flex-1'>
        <div className='mx-auto w-full max-w-[1440px] px-4 pb-16 pt-12 md:px-8 md:pt-16 lg:pb-[90px] lg:pt-20'>
          {/* Row 1 — headline */}
          <div className='grid border-t border-neutral-900 md:grid-cols-12'>
            <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
              Services
            </p>
            <h1 className='pb-8 font-display text-5xl font-semibold leading-[0.98] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-14 md:pl-8 md:text-7xl lg:text-[7.5rem]'>
              Services that{' '}
              <span className='text-neutral-400'>scale your vision</span>
            </h1>
          </div>

          {/* Row 2 — intro */}
          <div className='grid border-t border-neutral-900 md:grid-cols-12'>
            <div className='hidden md:col-span-3 md:block' aria-hidden />
            <p className='max-w-2xl py-6 text-lg leading-snug md:col-span-9 md:border-l md:border-neutral-300 md:py-8 md:pl-8 md:text-2xl'>
              I offer a comprehensive suite of digital services designed to
              elevate your brand. From pixel-perfect designs to powerful code,
              I&apos;ve got you covered.
            </p>
          </div>

          {/* Service list */}
          <ul className='border-y border-neutral-900'>
            {services.map((service, i) => (
              <li
                key={service.title}
                className='border-t border-neutral-300 first:border-t-0'
              >
                <a
                  href={service.link}
                  className={`group grid gap-4 py-6 transition-colors hover:bg-neutral-900 hover:text-white md:grid-cols-12 md:gap-0 md:py-8 ${rowFocus}`}
                >
                  <span className='flex items-center gap-3 text-sm tabular-nums text-neutral-500 group-hover:text-neutral-300 md:col-span-3 md:pl-4'>
                    <span aria-hidden className={`size-3 ${service.color}`} />
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className='md:col-span-6 md:border-l md:border-neutral-300 md:px-8 md:group-hover:border-neutral-700'>
                    <span className='block font-display text-3xl font-semibold leading-none tracking-tighter md:text-5xl'>
                      {service.title}
                    </span>
                    <span className='mt-4 block max-w-xl text-base leading-snug text-neutral-600 group-hover:text-neutral-300'>
                      {service.description}
                    </span>
                  </span>

                  <span className='flex items-end justify-between text-lg font-semibold md:col-span-3 md:border-l md:border-neutral-300 md:px-6 md:group-hover:border-neutral-700'>
                    <span>Explore {service.title}</span>
                    <span aria-hidden className='md:pr-2'>
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}

            {/* Custom work */}
            <li className='border-t border-neutral-300'>
              <a
                href={WHATSAPP}
                className={`group grid gap-4 py-6 transition-colors hover:bg-neutral-900 hover:text-white md:grid-cols-12 md:gap-0 md:py-8 ${rowFocus}`}
              >
                <span className='flex items-center gap-3 text-sm tabular-nums text-neutral-500 group-hover:text-neutral-300 md:col-span-3 md:pl-4'>
                  <span aria-hidden className='size-3 border border-neutral-900 group-hover:border-white' />
                  {String(services.length + 1).padStart(2, '0')}
                </span>

                <span className='md:col-span-6 md:border-l md:border-neutral-300 md:px-8 md:group-hover:border-neutral-700'>
                  <span className='block font-display text-3xl font-semibold leading-none tracking-tighter md:text-5xl'>
                    Need something custom?
                  </span>
                  <span className='mt-4 block max-w-xl text-base leading-snug text-neutral-600 group-hover:text-neutral-300'>
                    Have a unique project in mind? Let&apos;s discuss your
                    specific requirements.
                  </span>
                </span>

                <span className='flex items-end justify-between text-lg font-semibold md:col-span-3 md:border-l md:border-neutral-300 md:px-6 md:group-hover:border-neutral-700'>
                  <span>
                    Contact me
                    <span className='sr-only'> on WhatsApp (opens in a new tab)</span>
                  </span>
                  <span aria-hidden className='md:pr-2'>
                    ↗
                  </span>
                </span>
              </a>
            </li>
          </ul>

          {/* Global CTA */}
          <div className='mt-16 grid border-y border-neutral-900 md:grid-cols-12'>
            <div className='py-8 md:col-span-9 md:py-12'>
              <h2 className='max-w-[20ch] font-display text-4xl font-semibold leading-[1] tracking-tighter md:text-6xl'>
                Ready to start your project?
              </h2>
              <p className='mt-5 max-w-lg text-base leading-relaxed text-neutral-600'>
                Let&apos;s turn your ideas into reality. Reach out today and
                let&apos;s build something amazing together.
              </p>
            </div>
            <a
              href={WHATSAPP}
              className={`bg-blaze-orange flex min-h-[9rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white md:col-span-3 md:border-l md:border-t-0 ${rowFocus}`}
            >
              <span>Get a quote</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}