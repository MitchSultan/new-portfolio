'use client';
import React from 'react';
import useCountUp from './useCountUp';

const stats = [
  {
    value: 98,
    suffix: '%',
    label: 'Mobile penetration',
    description: 'Nearly every customer browses on their phone first',
  },
  {
    value: 67,
    suffix: '%',
    label: 'SMEs without optimized sites',
    description:
      'Two-thirds of all small businesses have underperforming websites',
    highlight: true,
  },
  {
    value: 800,
    suffix: 'B+',
    prefix: 'KES ',
    label: 'Digital economy',
    description: 'The global online market is growing at 23% year-over-year',
  },
  {
    value: 340,
    suffix: '%',
    label: 'Search growth',
    description:
      "Google searches for 'near me' services grew 340% in the global market since 2023",
  },
  {
    value: 4.2,
    decimals: 1,
    suffix: 'M',
    label: 'Online shoppers',
    description:
      '4.2 million global residents purchase products and services online',
  },
  {
    value: 78,
    suffix: '%',
    label: 'Abandon without trust',
    description: 'Visitors leave websites that look outdated or load slowly',
  },
];

function StatCell({ stat }) {
  const [ref, display] = useCountUp(stat.value, { decimals: stat.decimals || 0 });

  return (
    <div
      className={`flex flex-col justify-between gap-12 border-t border-neutral-300 p-4 first:border-t-neutral-900 md:max-lg:[&:nth-child(2)]:border-t-neutral-900 lg:[&:nth-child(-n+3)]:border-t-neutral-900 md:border-r md:p-6 md:max-lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-0 ${
        stat.highlight ? 'bg-blaze-orange text-neutral-900' : ''
      }`}
    >
      <p
        ref={ref}
        className='font-display text-6xl font-semibold leading-none tracking-tighter tabular-nums md:text-7xl'
      >
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <div>
        <h3 className='text-lg font-semibold leading-tight'>{stat.label}</h3>
        <p
          className={`mt-2 max-w-[34ch] text-base leading-snug ${
            stat.highlight ? 'text-neutral-900' : 'text-neutral-600'
          }`}
        >
          {stat.description}
        </p>
      </div>
    </div>
  );
}

export default function MarketInsights() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Market intelligence
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            The global digital landscape in numbers
          </h2>
        </div>

        {/* Row 2 — intro */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='hidden md:col-span-3 md:block' aria-hidden />
          <p className='max-w-xl py-6 text-base leading-relaxed text-neutral-600 md:col-span-9 md:border-l md:border-neutral-300 md:pl-8'>
            The data is clear: businesses that invest in digital performance
            capture the lion&apos;s share of the global booming online market.
          </p>
        </div>

        {/* Stat grid */}
        <div className='grid border-b border-neutral-900 md:grid-cols-2 lg:grid-cols-3'>
          {stats.map((stat) => (
            <StatCell key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}