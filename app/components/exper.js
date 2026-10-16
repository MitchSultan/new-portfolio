'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Evolve Sphere Consulting',
    client: 'Prof. Purity Karimi',
    tags: ['Design', 'Build', 'Consultancy'],
    image: '/projects/evolve.webp',
    link: 'https://evolvesphereconsulting.com',
    bgGradient: 'bg-azure-blue',
  },
  {
    id: 2,
    title: 'Teeside Management Ltd',
    client: 'Teeside',
    tags: ['Design', 'Build', 'Nextjs'],
    image: '/projects/canvaspile.webp',
    link: 'https://teesidemanagementltd.co.ke',
    bgGradient: 'bg-blue-violet',
  },
  {
    id: 3,
    title: 'The Other Guys Kenya',
    client: 'The Other Guys Kenya',
    tags: ['Design', 'Build', 'NGO'],
    image: '/projects/tog.webp',
    link: 'https://theotherguyske.org',
    bgGradient: 'bg-blaze-orange',
  },
  {
    id: 4,
    title: 'Luxury by Tina',
    client: 'Tina',
    tags: ['Design', 'Build', 'E-commerce'],
    image: '/projects/luxurybytina.webp',
    link: 'https://luxurybytina.com',
    bgGradient: 'bg-neon-pink',
  },
];

export default function Exper() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Respect reduced-motion: show everything, animate nothing.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx;

    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // One reveal for the whole row: cards fade in together, left to right.
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
              once: true,
            },
          }
        );
      }, sectionRef);
    };

    initAnimations();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Websites and applications
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            Some of my work
          </h2>
        </div>

        {/* Row 2 — intro + all-projects link */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='hidden md:col-span-3 md:block' aria-hidden />
          <p className='max-w-md py-6 text-base leading-relaxed text-neutral-600 md:col-span-6 md:border-l md:border-neutral-300 md:py-6 md:pl-8'>
            I have created a variety of projects, including websites,
            applications, and more. Here are some of my favorites.
          </p>
          <a
            href='/playground'
            className='flex min-h-[6rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-lg font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:col-span-3 md:border-l md:border-t-0'
          >
            <span>All projects</span>
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Row 3 — project grid */}
        <div className='hide-scrollbar flex snap-x snap-mandatory overflow-x-auto border-y border-neutral-900 md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:grid-cols-4'>
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className='w-[80vw] flex-none snap-start border-r border-neutral-300 last:border-r-0 sm:w-[340px] md:w-auto md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-neutral-300 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:nth-child(2n)]:border-r'
            >
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${project.title} (opens in a new tab)`}
                className='group flex h-full flex-col p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:p-6'
              >
                {/* Tags */}
                <p className='mb-4 text-sm text-neutral-500'>
                  {project.tags.join(', ')}
                </p>

                {/* Image cell — takes the project colour on hover */}
                <div className='relative aspect-square w-full bg-neutral-100'>
                  <div
                    aria-hidden
                    className={`absolute inset-0 ${project.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100`}
                  />
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={280}
                    height={280}
                    sizes='(max-width: 768px) 80vw, 280px'
                    className='relative h-full w-full object-contain p-6'
                  />
                </div>

                {/* Title + client */}
                <div className='mt-6 flex flex-1 items-start justify-between gap-4'>
                  <div>
                    <h3 className='text-lg font-semibold leading-tight'>
                      {project.title}
                    </h3>
                    <p className='mt-1 text-sm text-neutral-500'>
                      {project.client}
                    </p>
                  </div>
                  <span aria-hidden className='text-lg'>
                    ↗
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}