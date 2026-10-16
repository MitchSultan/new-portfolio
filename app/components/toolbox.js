import React from 'react';

const toolGroups = [
  {
    title: 'Languages',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Front end',
    tools: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Motion',
    tools: ['GSAP', 'Framer Motion'],
  },
  {
    title: 'Back end and hosting',
    tools: ['Node.js', 'Supabase', 'Vercel'],
  },
  {
    title: 'Workflow and design',
    tools: ['Git', 'npm', 'VS Code', 'Figma'],
  },
];

export default function Toolbox() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Technologies and tools
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            My toolbox
          </h2>
        </div>

        {/* Row 2 — intro */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='hidden md:col-span-3 md:block' aria-hidden />
          <p className='max-w-xl py-6 text-base leading-relaxed text-neutral-600 md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pl-8'>
            Technologies and tools I use daily to craft beautiful, performant
            web experiences.
          </p>
        </div>

        {/* Tool groups — one ruled row per group */}
        <div className='border-b border-neutral-900'>
          {toolGroups.map((group) => (
            <div
              key={group.title}
              className='grid border-t border-neutral-900 md:grid-cols-12'
            >
              <h3 className='py-4 text-sm font-semibold md:col-span-3 md:py-6'>
                {group.title}
              </h3>

              <ul className='grid grid-cols-2 border-t border-neutral-300 md:col-span-9 md:grid-cols-4 md:border-t-0'>
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className='border-neutral-300 px-4 py-6 text-xl font-medium tracking-tight even:border-l md:border-l md:px-8 md:py-6 md:text-2xl [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0'
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}