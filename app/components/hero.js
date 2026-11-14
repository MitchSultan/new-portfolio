'use client';

import { useEffect, useRef, useState } from 'react';

const audiences = [
  { title: 'land sellers', scene: 'land' },
  { title: 'architects', scene: 'architect' },
  { title: 'contractors', scene: 'contractor' },
  { title: 'interior designers', scene: 'interior' },
  { title: 'property managers', scene: 'property' },
  { title: 'landscapers', scene: 'landscape' },
];

function AnimatedText({ text }) {
  return Array.from(text).map((letter, index) => (
    <span
      key={`${letter}-${index}`}
      aria-hidden='true'
      className='hero-intro-letter'
      style={{ animationDelay: `${index * 24}ms` }}
    >
      {letter === ' ' ? '\u00a0' : letter}
    </span>
  ));
}

function HeroDoodle({ scene }) {
  return (
    <svg
      key={scene}
      viewBox='0 0 480 320'
      role='img'
      aria-label={`A hand-drawn illustration representing ${scene}`}
      className='hero-doodle-scene h-auto w-full'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2.5'
    >
      <path d='M28 270c46-8 71 4 113-2 48-7 76 1 124-3 50-4 102 7 187-3' />
      <path d='M44 277c61 9 115 3 165 8 68 6 136-5 225 1' className='hero-doodle-accent' />

      {scene === 'land' && (
        <>
          <path d='M72 241c20-46 61-57 105-54 31-31 81-34 119-13 30-10 73 4 89 32 26 6 43 20 53 38' />
          <path d='m89 238 26-46 25 46m-25-46v-24m0 11 13-9m-13 21-12-9' />
          <path d='M198 238v-61h61v61m-61-48h61m-41-13v61m21-61v61' />
          <path d='M287 239h79v-56h-79zm12-44h15v16h-15zm38 0h17v16h-17z' />
          <path d='M385 238v-65h48v65m-48-50h48m-31-15v65m16-65v65' />
          <path d='m152 251 27-16 24 16m-51 0h51' className='hero-doodle-accent' />
          <path d='M344 159h59v-28h-59zm10-17h39m-20-10v18' className='hero-doodle-accent' />
        </>
      )}

      {scene === 'architect' && (
        <>
          <path d='M106 236v-69l76-47 78 47v69' />
          <path d='m94 170 88-56 91 56m-91-56v122m-76-69h152' />
          <path d='M145 236v-42h29v42m46 0v-42h30v42' />
          <path d='M304 236v-87h92v87m-92-64h92m-66-23v87m40-87v87' />
          <path d='M64 258h351m-323-16 34-11 38 11m-20-33 42 13' className='hero-doodle-accent' />
          <path d='m302 113 48-43 48 43m-70 0h44' className='hero-doodle-accent' />
          <path d='M324 99h48v31h-48z' className='hero-doodle-accent' />
        </>
      )}

      {scene === 'contractor' && (
        <>
          <path d='M104 237V128h211v109m-211-81h211m-211 43h211m-154-79v117m61-117v117m62-117v117' />
          <path d='M83 128h253m-211 0 18-21h82l18 21m-77-21V73m0 0h168m-14-12 14 12-14 12m-154-12h53' />
          <path d='M315 237V156h85v81m-85-52h85m-60-29v81m34-81v81' />
          <path d='M85 259h330m-290-14-8 14m50-14-8 14m49-14-8 14m50-14-8 14m50-14-8 14' className='hero-doodle-accent' />
          <path d='M84 128v109m224-109v109' className='hero-doodle-accent' />
        </>
      )}

      {scene === 'interior' && (
        <>
          <path d='M95 237V102h290v135M95 132h290' />
          <path d='M135 237v-46h128v46m-128-29h128m-108-17v46m88-46v46' />
          <path d='M297 237v-75h58v75m-58-53h58m-30-22v75' />
          <path d='M110 237h260m-218-73c-13-20-11-40 1-56m0 56c15-16 20-36 13-56m-13 56c-19-9-27-24-25-42m14 116v-28h23v28' />
          <path d='M271 244h100m-93 0v-9h86v9m-71-9v-13h56v13' className='hero-doodle-accent' />
          <path d='m344 110 16-21 16 21m-16-21v39m-10 0h20' className='hero-doodle-accent' />
        </>
      )}

      {scene === 'property' && (
        <>
          <path d='M109 237V102h263v135m-263-94h263M109 190h263' />
          <path d='M131 120h25v25h-25zm48 0h25v25h-25zm48 0h25v25h-25zm48 0h25v25h-25zm48 0h25v25h-25z' />
          <path d='M131 166h25v24h-25zm48 0h25v24h-25zm48 0h25v24h-25zm48 0h25v24h-25zm48 0h25v24h-25z' />
          <path d='M220 237v-35h42v35m-133 0h263' />
          <path d='M74 230c4-26 24-37 45-31m-45 31c18 10 39 5 49-9m-49 9h48' className='hero-doodle-accent' />
          <circle cx='399' cy='216' r='18' className='hero-doodle-accent' />
          <path d='m393 216 5 5 10-12' className='hero-doodle-accent' />
        </>
      )}

      {scene === 'landscape' && (
        <>
          <path d='M123 237V133l58-39 59 39v104m-117-79h117m-117 42h117m-75-67v104m35-104v104' />
          <path d='M261 237V129h114v108m-114-76h114m-75-32v108m37-108v108' />
          <path d='M155 237v-42h34v42m90 0v-31h30v31' />
          <path d='M67 239c0-22 13-38 31-38 20 0 32 16 32 38m-63 0h63m-56-14 49-10' className='hero-doodle-accent' />
          <path d='M391 237c0-30 17-49 37-49 18 0 29 20 29 49m-66 0h66m-52-28 39-12m-29 31 39-13' className='hero-doodle-accent' />
          <path d='M83 229v-28m-15 17 15-12 14 11m-15-9-9-15m10 11 10-18' />
          <path d='M420 231v-43m-23 23 23-19 22 17m-23-14-13-20m14 14 13-23' />
        </>
      )}
    </svg>
  );
}

export default function Hero() {
  const timeRef = useRef(null);
  const [audienceIndex, setAudienceIndex] = useState(0);

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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = setInterval(() => {
      setAudienceIndex((current) => (current + 1) % audiences.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const audience = audiences[audienceIndex];

  return (
    <section className='relative flex min-h-screen w-full flex-col bg-white'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 md:px-8'>
        {/* Row 1 — masthead */}
        <header className='border-b border-neutral-900 text-sm'>
          <div className='masthead-viewport md:hidden'>
            <div className='masthead-track'>
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className='masthead-group'
                  aria-hidden={copy === 1 ? 'true' : undefined}
                >
                  <p className='py-4 pr-8 text-neutral-600'>
                    Web design and custom software
                  </p>
                  <p className='border-l border-neutral-300 py-4 pl-8 pr-8 text-neutral-600'>
                    Clients in Kenya, Australia and the US
                  </p>
                  <p className='border-l border-neutral-300 py-4 pl-8 pr-8 text-neutral-600'>
                    Based in Nairobi
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='hidden grid-cols-12 md:grid'>
            <p className='border-neutral-300 py-4 pr-4 text-neutral-600 md:col-span-3 md:border-l md:pl-4'>
              Web design and custom software
            </p>
            <p className='border-neutral-300 py-4 pl-4 text-neutral-600 md:col-span-3 md:border-l'>
              Clients in Kenya, Australia and the US
            </p>
            <p className='border-neutral-300 py-4 pl-4 text-neutral-600 md:col-span-3 md:border-l'>
              Based in Nairobi
            </p>
          </div>
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
            <div className='grid min-h-[40rem] flex-1 items-end gap-8 py-10 md:py-14 md:pl-8 lg:grid-cols-12 lg:gap-5'>
              <h1
                aria-label={`I help ${audience.title}. Get seen and sell online.`}
                className='font-display text-5xl font-semibold leading-[0.95] tracking-tighter md:text-7xl lg:col-span-7 lg:text-7xl xl:text-8xl'
              >
                <span aria-hidden='true' className='block'>
                  <AnimatedText text='I help' />
                </span>
                <span
                  key={audience.title}
                  aria-live='polite'
                  aria-hidden='true'
                  className='block text-blaze-orange'
                >
                  <AnimatedText text={audience.title} />
                </span>
                <span aria-hidden='true' className='block'>
                  <AnimatedText text='Get seen and' />
                </span>
                <span aria-hidden='true' className='block'>
                  <AnimatedText text='sell online.' />
                </span>
              </h1>

              <div className='lg:col-span-5 lg:pb-2'>
                <div className='overflow-hidden border border-neutral-300 bg-[#f8f6f1] p-3 text-neutral-900 md:p-5'>
                  <HeroDoodle scene={audience.scene} />
                </div>
                <p className='mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500'>
                  {audience.title} · from ground up
                </p>
              </div>
            </div>

            <div className='grid border-t border-neutral-900 md:grid-cols-9'>
              <p className='max-w-md py-6 text-lg leading-snug text-neutral-700 md:col-span-5 md:py-8 md:pl-8 md:text-xl'>
                I’m Mitch, a Nairobi web developer who builds fast, search-optimised websites for real estate agents, developers and property managers across Kenya. Your listings get found on Google, buyers enquire by WhatsApp or form, and you get qualified leads.
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
      {/* <div className='border-t border-neutral-900'>
        <LogoMarquee />
      </div> */}
    </section>
  );
}