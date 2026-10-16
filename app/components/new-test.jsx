import React from 'react';

/*
  PLACEHOLDER CONTENT — replace every quote, name, role and project below
  with real client feedback before this goes live. The first item is the
  featured quote (set large); the rest sit in a three-column row.
*/
const featured = {
  quote:
    'Working with Mitch was a game-changer for our business. The project was completed on time and exceeded our expectations.',
  name: 'Geoffrey ',
  role: 'MD., Teeside Management Ltd',
  project: 'Website design and development',
};

const testimonials = [
  {
    quote:
      'A detailed oriented person and easy to work with. Would recommend him',
    name: 'Joshua',
    role: 'CEO, Theother Guys',
    project: 'NGO web',
  },
  {
    quote:
      'Mitch build my dream website to my specifications and I am very happy with the results. He is very professional and easy to work with.',
    name: 'Tina',
    role: 'Owner, Luxury by Tina',
    project: 'WooCommerce store',
  },
  {
    quote:
      'Mitch is a talented web developer who delivered a high-quality website for my business. He was responsive, communicative, and went above and beyond to ensure that the project was a success.',
    name: 'Prof Gatobu',
    role: 'CEO, Evolve Sphere Consulting',
    project: 'Custom consulting platform',
  },
];

export default function NewTest() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Client feedback
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            What clients say
          </h2>
        </div>

        {/* Row 2 — featured quote: attribution in the side column, quote in the main one */}
        <figure className='grid border-t border-neutral-900 md:grid-cols-12'>
          <figcaption className='order-2 border-t border-neutral-300 py-6 md:order-1 md:col-span-3 md:border-t-0 md:py-8 md:pr-6'>
            <p className='text-base font-semibold'>{featured.name}</p>
            <p className='mt-1 text-sm text-neutral-500'>{featured.role}</p>
            <p className='mt-4 text-sm text-neutral-500'>{featured.project}</p>
          </figcaption>
          <blockquote className='order-1 py-8 md:order-2 md:col-span-9 md:border-l md:border-neutral-300 md:py-12 md:pl-8'>
            <p className='max-w-[32ch] font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl'>
              {featured.quote}
            </p>
          </blockquote>
        </figure>

        {/* Row 3 — three supporting quotes aligned to the main columns */}
        <div className='grid border-y border-neutral-900 md:grid-cols-12'>
          <div className='hidden md:col-span-3 md:block' aria-hidden />
          <div className='grid md:col-span-9 md:grid-cols-3'>
            {testimonials.map((item, i) => (
              <figure
                key={i}
                className={`flex flex-col justify-between gap-10 border-neutral-300 py-6 md:py-8 md:pl-8 md:pr-6 ${
                  i === 0 ? 'md:border-l' : 'border-t md:border-l md:border-t-0'
                } md:border-neutral-300`}
              >
                <blockquote>
                  <p className='text-lg leading-snug'>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <p className='text-base font-semibold'>{item.name}</p>
                  <p className='mt-1 text-sm text-neutral-500'>{item.role}</p>
                  <p className='mt-4 text-sm text-neutral-500'>{item.project}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}