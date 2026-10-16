'use client';
import React from 'react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900';

export default function FinalCta({ onScrollToAudit }) {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        <div className='grid border-y border-neutral-900 md:grid-cols-12'>
          {/* Side label */}
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Don&apos;t get left behind
          </p>

          {/* Headline + copy */}
          <div className='pb-8 md:col-span-6 md:border-l md:border-neutral-300 md:py-6 md:pb-10 md:pl-8 md:pr-8'>
            <h2 className='font-display text-4xl font-semibold leading-[1] tracking-tighter md:text-6xl lg:text-7xl'>
              Your competitors are already optimizing. Are you?
            </h2>
            <p className='mt-6 max-w-lg text-base leading-relaxed text-neutral-600'>
              Every day you wait, potential customers in Nairobi choose your
              competitor because their site loaded faster, looked more
              trustworthy, or simply had a WhatsApp button.
            </p>
            <p className='mt-6 text-sm text-neutral-500'>
              Free audit. No credit card. Results in about 30 seconds.
            </p>
          </div>

          {/* Actions — stacked cells in the right 3 columns */}
          <div className='flex flex-col border-t border-neutral-900 md:col-span-3 md:border-l md:border-t-0 md:border-neutral-900'>
            <button
              type='button'
              onClick={onScrollToAudit}
              id='final-cta-audit'
              className={`bg-blaze-orange flex min-h-[9rem] flex-1 items-end justify-between px-6 py-6 text-left text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white ${focusRing}`}
            >
              <span>Run my free audit</span>
              <span aria-hidden>↑</span>
            </button>
            <a
              href='https://wa.me/254703666366?text=Hi%20Mitch!%20I%20just%20saw%20the%20Digital%20Landscape%20Report%20and%20I%20want%20to%20discuss%20a%20strategy%20for%20my%20business.'
              target='_blank'
              rel='noopener noreferrer'
              id='final-cta-whatsapp'
              className={`flex min-h-[6rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-lg font-semibold transition-colors hover:bg-neutral-900 hover:text-white ${focusRing}`}
            >
              <span>
                Book a strategy call
                <span className='sr-only'> (opens in a new tab)</span>
              </span>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}