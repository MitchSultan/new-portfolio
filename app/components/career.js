import React from 'react';

const careerData = [
  {
    id: 1,
    year: '2023 – 2024',
    company: 'Telsec',
    role: 'Junior Frontend Developer',
    description:
      'Started building responsive web applications and learning modern frameworks.',
    metrics: [
      { label: 'Projects delivered', value: '12+' },
      { label: 'Code review score', value: '95%' },
      { label: 'Performance boost', value: '40%' },
      { label: 'Client satisfaction', value: '4.8/5' },
    ],
  },
  {
    id: 2,
    year: '2024 – 2025',
    company: 'Digital Oasis Ltd',
    role: 'Frontend Developer',
    description:
      'Led frontend development for major client projects, mentored junior developers, and optimized workflows.',
    metrics: [
      { label: 'Developers mentored', value: '5' },
      { label: 'Client projects', value: '25+' },
      { label: 'Load time reduction', value: '60%' },
      { label: 'Revenue impact', value: '$120K+' },
    ],
  },
  {
    id: 3,
    year: '2025 – Present',
    company: 'MAD Graphix',
    role: 'Mid-level Frontend Developer',
    description:
      'Architecting scalable frontend solutions, leading technical decisions, and driving innovation in user experience.',
    metrics: [
      { label: 'Apps architected', value: '8' },
      { label: 'User growth', value: '300%' },
      { label: 'Code quality score', value: '98%' },
      { label: 'Team productivity', value: '+85%' },
    ],
  },
];

const summary = [
  { value: '35+', label: 'Projects' },
  { value: '3', label: 'Companies' },
  { value: '3+', label: 'Years of experience' },
  { value: '98%', label: 'Client satisfaction' },
];

export default function Career() {
  return (
    <section className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Career, 2023 – present
          </p>
          <h2 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            Career trajectory
          </h2>
        </div>

        {/* Row 2 — current role block + intro */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='bg-blaze-orange flex min-h-[9rem] flex-col justify-between p-4 text-neutral-900 md:col-span-3 md:min-h-[12rem] md:p-6'>
            <span className='text-sm font-semibold'>Now</span>
            <span className='text-lg font-semibold leading-tight md:text-xl'>
              Mid-level Frontend Developer, MAD Graphix
            </span>
          </div>
          <div className='py-6 md:col-span-9 md:border-l md:border-neutral-900 md:py-8 md:pl-8'>
            <p className='max-w-[32ch] text-xl font-medium leading-snug md:text-3xl'>
              From first components to scalable architecture, each role has
              widened what I build and how I lead.
            </p>
            <p className='mt-4 max-w-[44ch] text-base leading-relaxed text-neutral-600'>
              Below: where I worked, what I did, and the measurable results at
              each stage.
            </p>
          </div>
        </div>

        {/* Row 3 — summary figures */}
        <dl
          aria-label='Career summary'
          className='grid grid-cols-2 border-t border-neutral-900 md:grid-cols-4'
        >
          {summary.map((s, i) => (
            <div
              key={s.label}
              className={`border-neutral-300 p-4 md:p-6 ${
                i % 2 === 1 ? 'border-l' : ''
              } ${i > 1 ? 'border-t md:border-t-0' : ''} ${
                i > 0 ? 'md:border-l' : ''
              } ${i === 0 ? 'md:pl-0' : ''} ${i === 2 ? 'max-md:border-l-0' : ''}`}
            >
              <dd className='font-display text-5xl font-semibold leading-none tracking-tighter md:text-6xl'>
                {s.value}
              </dd>
              <dt className='mt-3 text-sm text-neutral-500'>{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* Roles — one ruled row each */}
        <div>
          {careerData.map((job) => (
            <article
              key={job.id}
              className='grid border-t border-neutral-900 md:grid-cols-12'
            >
              <p className='py-4 text-sm font-semibold md:col-span-3 md:py-8 md:pr-6'>
                {job.year}
              </p>

              <div className='pb-8 md:col-span-5 md:border-l md:border-neutral-300 md:py-8 md:pl-8 md:pr-8'>
                <h2 className='font-display text-3xl font-semibold leading-[1] tracking-tighter md:text-4xl'>
                  {job.role}
                </h2>
                <p className='mt-3 text-lg font-medium'>{job.company}</p>
                <p className='mt-5 max-w-[42ch] text-base leading-relaxed text-neutral-600'>
                  {job.description}
                </p>
              </div>

              <dl className='grid grid-cols-2 border-t border-neutral-300 md:col-span-4 md:border-l md:border-t-0 md:border-neutral-300'>
                {job.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`border-neutral-300 p-4 md:p-6 ${
                      i % 2 === 1 ? 'border-l' : ''
                    } ${i > 1 ? 'border-t' : ''}`}
                  >
                    <dd className='font-display text-3xl font-semibold leading-none tracking-tighter md:text-4xl'>
                      {m.value}
                    </dd>
                    <dt className='mt-2 text-sm text-neutral-500'>{m.label}</dt>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        {/* Closing rule */}
        <div className='grid border-y border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-4 md:col-start-9 md:pl-8'>
            Current role ongoing.
          </p>
        </div>
      </div>
    </section>
  );
}