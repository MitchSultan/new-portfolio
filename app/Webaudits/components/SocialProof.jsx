'use client';
import React from 'react';
import useCountUp from './useCountUp';

const proofStats = [
  { value: 47, suffix: '+', label: 'Global sites audited this month' },
  { value: 92, suffix: '%', label: 'Client satisfaction rate' },
  { value: 3.2, decimals: 1, suffix: 'x', label: 'Average conversion improvement' },
  { value: 24, suffix: 'hr', label: 'Average turnaround time' },
];

function ProofCell({ stat, index }) {
  const [ref, display] = useCountUp(stat.value, {
    decimals: stat.decimals || 0,
    duration: 1800,
  });

  return (
    <div
      className={`flex flex-col justify-between gap-12 border-neutral-300 p-4 md:p-6 ${
        index % 2 === 1 ? 'border-l' : ''
      } ${index > 1 ? 'border-t md:border-t-0' : ''} ${
        index > 0 ? 'md:border-l' : ''
      }`}
    >
      <p
        ref={ref}
        className='font-display text-5xl font-semibold leading-none tracking-tighter tabular-nums md:text-7xl'
      >
        {display}
        {stat.suffix}
      </p>
      <p className='text-sm text-neutral-500'>{stat.label}</p>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Proof of results
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            Businesses growing with funnels
          </h2>
        </div>

        {/* Figures */}
        <div className='grid grid-cols-2 border-y border-neutral-900 md:grid-cols-4'>
          {proofStats.map((stat, i) => (
            <ProofCell key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}