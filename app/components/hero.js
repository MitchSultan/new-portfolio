'use client';

import { useEffect, useRef } from 'react';
import LogoMarquee from './logo-marquee';

export default function Hero() {
  const timeRef = useRef(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Nairobi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const updateTime = () => {
      if (timeRef.current) {
        timeRef.current.textContent = formatter.format(new Date());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative flex min-h-screen bg-white w-full flex-col  '>
      <div className='mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 md:px-8'>
        {/* Row 1 — masthead */}
        <header className='grid grid-cols-2 border-b border-neutral-900 text-sm md:grid-cols-12'>
          <p className='col-span-2 py-4 font-semibold md:col-span-3'>MadeByMitch</p>
          <p className='border-neutral-300 py-4 pr-4 text-neutral-600 md:col-span-3 md:border-l md:pl-4'>
            Web design and custom software
          </p>
          <p className='border-neutral-300 py-4 pl-4 text-neutral-600 md:col-span-3 md:border-l'>
            Clients in Kenya, Australia and the US
          </p>
          <p className='col-span-2 border-neutral-300 pb-4 text-neutral-600 md:col-span-3 md:border-l md:py-4 md:pl-4'>
            Based in Nairobi
          </p>
        </header>

        {/* Row 2 — main grid */}
        <div className='grid flex-1 animate-fadeIn md:grid-cols-12'>
          {/* Side column: live clock */}
          <aside className='order-2 flex flex-row items-end justify-between border-t border-neutral-300 py-6 md:order-1 md:col-span-3 md:flex-col md:items-start md:justify-end md:border-r md:border-t-0 md:border-neutral-300 md:pr-6'>
            <div>
              <p className='text-sm text-neutral-500'>Nairobi time (UTC+3)</p>
              <p
                ref={timeRef}
                suppressHydrationWarning
                className='font-display text-3xl tabular-nums tracking-tight md:text-4xl'
              >
                00:00:00
              </p>
            </div>
          </aside>

          {/* Main column: headline + actions */}
          <div className='order-1 flex flex-col md:order-2 md:col-span-9'>
            <div className='flex flex-1 items-end py-10 md:py-16 md:pl-8'>
              <h1 className='font-display text-5xl font-semibold leading-[0.95] tracking-tighter md:text-7xl lg:text-[7.5rem]'>
                Agency-level quality{' '}
                <span className='text-neutral-400'>
                  with freelancer-level attention.
                </span>
              </h1>
            </div>

            <div className='grid border-t border-neutral-900 md:grid-cols-9'>
              <p className='max-w-md py-6 text-lg leading-snug text-neutral-700 md:col-span-5 md:py-8 md:pl-8 md:text-xl'>
                I build high-converting websites and custom software for growing
                brands.
              </p>

              <a
                href='https://wa.me/254703666366'
                className='bg-blaze-orange flex items-end justify-between px-4 py-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:col-span-2 md:min-h-[9rem]'
              >
                <span>Let&apos;s talk</span>
                <span aria-hidden>→</span>
              </a>

              <a
                href='/playground'
                className='flex items-end justify-between border-t border-neutral-900 px-4 py-6 text-lg font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:col-span-2 md:min-h-[9rem] md:border-l md:border-t-0'
              >
                <span>See my work</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — client marquee, ruled off from the grid */}
      <div className='border-t border-neutral-900'>
        <LogoMarquee />
      </div>
    </section>
  );
}