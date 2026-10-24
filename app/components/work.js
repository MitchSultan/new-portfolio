'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '../lib/supabase/server';

const ProjectModal = dynamic(() => import('./projectmodal'), { ssr: false });

const asText = (value) =>
  Array.isArray(value) ? value.join(' ') : String(value ?? '');

const Work = ({ initialProjects }) => {
  const hasInitialProjects = Array.isArray(initialProjects);
  const [projects, setProjects] = useState(initialProjects ?? []);
  const [loading, setLoading] = useState(!hasInitialProjects);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState('All');

  // { project, rect } — rect is the clicked card image's position, used for the transition
  const [selected, setSelected] = useState(null);

  const imageRefs = useRef({});
  const openerRef = useRef(null);

  useEffect(() => {
    if (hasInitialProjects) return;

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(
            'id, title, niche, image, liveUrl:live_url, description, technologies, features, timeline, teamSize:team_size, challenges, results'
          )
          .order('id');

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [hasInitialProjects]);

  const niches = useMemo(() => {
    const unique = [];
    projects.forEach((p) => {
      if (p.niche && !unique.includes(p.niche)) unique.push(p.niche);
    });
    return ['All', ...unique];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (niche !== 'All' && p.niche !== niche) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.niche,
        p.description,
        asText(p.technologies),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, query, niche]);

  const hasActiveFilters = query.trim() !== '' || niche !== 'All';

  const clearFilters = () => {
    setQuery('');
    setNiche('All');
  };

  const openProject = (project, event) => {
    const el = imageRefs.current[project.id];
    const r = el?.getBoundingClientRect();
    openerRef.current = event.currentTarget;
    setSelected({
      project,
      rect: r
        ? { left: r.left, top: r.top, width: r.width, height: r.height }
        : null,
    });
  };

  const closeProject = () => {
    setSelected(null);
    // Return focus to the button that opened the modal
    requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
  };

  const getOriginRect = () =>
    selected
      ? imageRefs.current[selected.project.id]?.getBoundingClientRect() ?? null
      : null;

  return (
    <main className='w-full bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8 lg:py-[90px]'>
        {/* Row 1 — headline */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'>
            Projects
          </p>
          <h1 className='pb-8 font-display text-4xl font-semibold leading-[1] tracking-tighter md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pb-12 md:pl-8 md:text-6xl lg:text-7xl'>
            My work
          </h1>
        </div>

        {/* Row 2 — intro + count */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <p
            className='py-4 text-sm text-neutral-500 md:col-span-3 md:py-6'
            aria-live='polite'
          >
            {loading
              ? 'Loading'
              : `${filtered.length} ${filtered.length === 1 ? 'project' : 'projects'}`}
          </p>
          <p className='max-w-xl pb-6 text-base leading-relaxed text-neutral-600 md:col-span-9 md:border-l md:border-neutral-300 md:py-6 md:pl-8'>
            A showcase of my recent projects and the impact they&apos;ve made.
          </p>
        </div>

        {/* Row 3 — search + filters */}
        <div className='grid border-t border-neutral-900 md:grid-cols-12'>
          <div className='relative flex items-center md:col-span-3'>
            <label htmlFor='project-search' className='sr-only'>
              Search projects
            </label>
            <input
              id='project-search'
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search projects'
              autoComplete='off'
              className='h-14 w-full appearance-none bg-transparent pr-16 text-base placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900 [&::-webkit-search-cancel-button]:hidden'
            />
            {query && (
              <button
                type='button'
                onClick={() => setQuery('')}
                className='absolute right-0 h-14 px-3 text-sm text-neutral-500 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900'
              >
                Clear
              </button>
            )}
          </div>

          <div
            role='group'
            aria-label='Filter by niche'
            className='flex overflow-x-auto border-t border-neutral-300 [-ms-overflow-style:none] [scrollbar-width:none] md:col-span-9 md:border-l md:border-t-0 [&::-webkit-scrollbar]:hidden'
          >
            {niches.map((n) => {
              const active = niche === n;
              return (
                <button
                  key={n}
                  type='button'
                  aria-pressed={active}
                  onClick={() => setNiche(n)}
                  className={`h-14 flex-none whitespace-nowrap border-neutral-300 px-5 text-sm font-medium transition-colors first:border-l-0 [&:not(:first-child)]:border-l focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 ${
                    active
                      ? 'bg-neutral-900 text-white'
                      : 'hover:bg-neutral-100'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project grid */}
        <div className='border-b border-neutral-900'>
          <h2 className='sr-only'>Portfolio project examples</h2>
          {error ? (
            <p className='border-t border-neutral-900 px-4 py-16 text-lg md:px-8'>
              The projects couldn&apos;t be loaded. Refresh the page to try
              again.
            </p>
          ) : loading ? (
            <div
              className='grid border-t border-neutral-900 md:grid-cols-2 lg:grid-cols-3'
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className='border-neutral-300 p-4 md:p-6 [&:not(:last-child)]:border-b md:border-b-0 md:[&:not(:last-child)]:border-r'
                >
                  <div className='aspect-[4/3] w-full bg-neutral-100 motion-safe:animate-pulse' />
                  <div className='mt-5 h-6 w-2/3 bg-neutral-100 motion-safe:animate-pulse' />
                  <div className='mb-10 mt-3 h-6 w-1/3 bg-neutral-100 motion-safe:animate-pulse' />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className='flex flex-col items-start gap-6 border-t border-neutral-900 px-4 py-16 md:px-8'>
              <p className='text-lg'>
                No projects match
                {query.trim() ? ` “${query.trim()}”` : ''}
                {niche !== 'All' ? ` in ${niche}` : ''}.
              </p>
              {hasActiveFilters && (
                <button
                  type='button'
                  onClick={clearFilters}
                  className='border border-neutral-900 px-5 py-3 text-sm font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
                >
                  Clear search and filter
                </button>
              )}
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
              {filtered.map((project) => (
                <article
                  key={project.id}
                  className='flex flex-col border-t border-neutral-300 first:border-t-neutral-900 md:border-r md:max-lg:[&:nth-child(2)]:border-t-neutral-900 md:max-lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(-n+3)]:border-t-neutral-900 lg:[&:nth-child(3n)]:border-r-0'
                >
                  <p className='px-4 pt-4 text-sm text-neutral-500 md:px-6 md:pt-6'>
                    {project.niche}
                  </p>

                  <div
                    ref={(el) => {
                      imageRefs.current[project.id] = el;
                    }}
                    className='mx-4 mt-4 aspect-[4/3] overflow-hidden bg-neutral-100 md:mx-6'
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      width='800'
                      height='600'
                      loading='lazy'
                      decoding='async'
                      className={`h-full w-full object-cover ${
                        selected?.project.id === project.id ? 'invisible' : ''
                      }`}
                    />
                  </div>

                  <h3 className='flex-1 px-4 py-5 text-xl font-semibold leading-tight tracking-tight md:px-6'>
                    {project.title}
                  </h3>

                  <div
                    className={`grid border-t border-neutral-900 ${
                      project.liveUrl ? 'grid-cols-2' : 'grid-cols-1'
                    }`}
                  >
                    <button
                      type='button'
                      onClick={(e) => openProject(project, e)}
                      aria-haspopup='dialog'
                      className='flex items-end justify-between px-4 py-4 text-left text-base font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:px-6'
                    >
                      <span>Learn more</span>
                      <span aria-hidden>→</span>
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-end justify-between border-l border-neutral-900 px-4 py-4 text-base font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900 md:px-6'
                      >
                        <span>
                          Visit site
                          <span className='sr-only'> (opens in a new tab)</span>
                        </span>
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected.project}
          isOpen
          onClose={closeProject}
          originRect={selected.rect}
          getOriginRect={getOriginRect}
        />
      )}
    </main>
  );
};

export default Work;