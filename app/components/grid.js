import React from 'react';

const facts = [
  { term: 'Role', detail: 'Full stack developer' },
  { term: 'Learning path', detail: 'Self-taught' },
  { term: 'Tools', detail: 'HTML, CSS, JavaScript, React' },
  { term: 'Background', detail: 'Telecommunications Engineering' },
  { term: 'Outside work', detail: 'Aviation' },
];

export default function About() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            About
          </p>
          <h1 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            Hi, I&apos;m Mitch Sultan, a full stack developer.
          </h1>
        </div>

        {/* Row 2 — facts | portrait | story */}
        <div className='grid border-y border-neutral-900 md:grid-cols-12'>
          {/* Facts */}
          <dl className='order-3 border-t border-neutral-300 py-6 md:order-1 md:col-span-3 md:border-t-0 md:py-8 md:pr-6'>
            {facts.map((fact) => (
              <div
                key={fact.term}
                className='border-t border-neutral-300 py-3 first:border-t-0 first:pt-0'
              >
                <dt className='text-sm text-neutral-500'>{fact.term}</dt>
                <dd className='mt-1 text-base font-medium'>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          {/* Portrait */}
          <div className='order-1 py-6 md:order-2 md:col-span-4 md:border-l md:border-neutral-300 md:px-8 md:py-8'>
            <img
              src='/images/hor.webp'
              alt='Portrait of Mitch Sultan'
              width='800'
              height='1000'
              className='aspect-[4/5] w-full object-cover'
            />
          </div>

          {/* Story */}
          <div className='order-2 md:order-3 md:col-span-5 md:border-l md:border-neutral-300 md:py-8 md:pl-8'>
            <p className='max-w-[55ch] pb-8 text-lg leading-relaxed md:text-xl md:leading-snug'>
              I am self taught with a passion for creating beautiful and
              functional websites. I have experience in HTML, CSS, JavaScript,
              and React. I am always learning new technologies and techniques to
              improve my skills. I also have a background in Telecommunications
              Engineering with a passion for aviation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}