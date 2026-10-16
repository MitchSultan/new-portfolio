'use client';
import React, { useState } from 'react';

const stats = [
  { value: '98%', label: 'Mobile penetration' },
  { value: 'KES 800B+', label: 'Economy' },
  { value: '4.2M', label: 'Online shoppers' },
  { value: '340%', label: 'Search growth' },
];

export default function AuditHero({ onStartAudit }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onStartAudit(url.trim());
    }
  };

  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 pt-12 md:px-8 md:pt-16 lg:pt-20'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Free website audit
          </p>
          <h1 className='pb-8 font-display text-4xl font-semibold leading-[0.98] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-14 md:pl-8 md:text-6xl lg:text-[6.5rem]'>
            Is your website losing customers{' '}
            <span className='text-neutral-400'>
              in today&apos;s $2.3 trillion digital economy?
            </span>
          </h1>
        </div>

        {/* Row 2 — intro */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Free. No signup required.
          </p>
          <p className='max-w-xl pb-6 text-lg leading-snug md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pl-8 md:text-xl'>
            Get a free, instant website audit and discover what top-performing
            businesses do differently to turn visitors into paying customers.
          </p>
        </div>

        {/* Row 3 — URL form */}
        <form
          onSubmit={handleSubmit}
          className='grid border-t border-neutral-900 md:grid-cols-12'
        >
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-0 md:flex md:items-center'>
            Powered by Google PageSpeed Insights
          </p>

          <div className='md:col-span-6 md:border-l md:border-neutral-300'>
            <label htmlFor='audit-url-input' className='sr-only'>
              Your website address
            </label>
            <input
              id='audit-url-input'
              type='text'
              inputMode='url'
              autoComplete='off'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='madebymitch.com'
              className='h-20 w-full bg-transparent px-0 text-xl placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900 md:px-8 md:text-2xl'
            />
          </div>

          <button
            type='submit'
            id='audit-start-button'
            className='bg-blaze-orange flex min-h-[5rem] items-center justify-between border-t border-neutral-900 px-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:col-span-3 md:border-l md:border-t-0'
          >
            <span>Audit my site</span>
            <span aria-hidden>→</span>
          </button>
        </form>

        {/* Row 4 — market figures */}
        <dl className='grid grid-cols-2 border-y border-neutral-900 md:grid-cols-4'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-neutral-300 p-4 md:p-6 ${
                i % 2 === 1 ? 'border-l' : ''
              } ${i > 1 ? 'border-t md:border-t-0' : ''} ${
                i > 0 ? 'md:border-l' : ''
              }`}
            >
              <dd className='font-display text-2xl font-semibold leading-none tracking-tighter md:text-4xl'>
                {s.value}
              </dd>
              <dt className='mt-2 text-sm text-neutral-500'>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}