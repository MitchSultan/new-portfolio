import React from 'react';

const About = () => {
  return (
    <section className='w-full bg-white'>
      <div className='mx-auto w-full max-w-[1440px] px-4 pb-12 pt-20 md:px-8 lg:pb-[90px] lg:pt-[120px]'>
        {/* Row 1 — headline across the main columns */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            What about me?
          </p>
          <h2 className='pb-10 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-16 md:pl-8 md:text-6xl lg:text-7xl'>
            I make businesses a home online.
          </h2>
        </div>

        {/* Row 2 — media + copy */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          {/* Side column stays empty on desktop to hold the grid's left margin */}
          <div className='hidden md:col-span-3 md:block' aria-hidden />

          {/* Video */}
          <div className='md:col-span-5 md:border-l md:border-neutral-300 md:py-6 md:pl-8 md:pr-8'>
            <div className='hidden h-[500px] lg:block'>
              <video
                src='/images/Scene.webm'
                autoPlay
                loop
                muted
                playsInline
                preload='none'
                aria-hidden
                className='h-full w-full object-cover'
              />
            </div>
            <div className='py-6 lg:hidden'>
              <video
                src='/images/truy.webm'
                autoPlay
                loop
                muted
                playsInline
                preload='none'
                aria-hidden
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          {/* Copy + action */}
          <div className='flex flex-col justify-between border-t border-neutral-900 md:col-span-4 md:border-l md:border-t-0 md:border-neutral-900'>
            <div className='space-y-5 py-6 md:px-6 md:py-6'>
              <p className='text-lg leading-snug md:text-xl'>
                I have a background in Telecommunications Engineering with a
                passion for aviation.
              </p>
              <p className='max-w-md text-base leading-relaxed text-neutral-600'>
                I believe websites are not just an expense for you but could be
                an asset. I aim to make your website the best it could be and
                provide value.
              </p>
            </div>

            <a
              href='https://wa.me/254703666366'
              className='bg-blaze-orange flex min-h-[9rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900'
            >
              <span>Let&apos;s talk</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Closing rule */}
        <div className='border-t border-neutral-900' />
      </div>
    </section>
  );
};

export default About;