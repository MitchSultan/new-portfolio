'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Supabase columns may arrive as arrays or as plain strings — accept both.
const toList = (value, separator) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(separator)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const itemText = (item) =>
  item && typeof item === 'object' ? Object.values(item).join(': ') : String(item);

function Block({ title, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <section className='border-neutral-300 p-4 md:p-6 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0'>
      <h3 className='mb-4 text-sm font-semibold'>{title}</h3>
      {Array.isArray(value) ? (
        <ul className='space-y-3 text-base text-neutral-700'>
          {value.map((item, i) => (
            <li
              key={i}
              className='border-t border-neutral-300 pt-3 first:border-t-0 first:pt-0'
            >
              {itemText(item)}
            </li>
          ))}
        </ul>
      ) : (
        <p className='whitespace-pre-line text-base leading-relaxed text-neutral-700'>
          {value}
        </p>
      )}
    </section>
  );
}

/**
 * Props
 *  project        — the project row
 *  isOpen         — kept for API compatibility with the old modal
 *  onClose        — called once the close animation has finished
 *  originRect     — {left, top, width, height} of the clicked card image
 *  getOriginRect  — returns that card image's rect right now (for the return trip)
 */
export default function ProjectModal({
  project,
  isOpen = true,
  onClose,
  originRect,
  getOriginRect,
}) {
  const rootRef = useRef(null);
  const scrollRef = useRef(null);
  const imageRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closingRef = useRef(false);

  const technologies = toList(project.technologies, ',');
  const features = toList(project.features, '\n');
  const challenges = Array.isArray(project.challenges)
    ? project.challenges.filter(Boolean)
    : project.challenges;
  const results = Array.isArray(project.results)
    ? project.results.filter(Boolean)
    : project.results;

  /* ---------- Open: the card image travels to its place in the panel ---------- */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const flip = imageRef.current;
    if (!root || !flip) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion() || !originRect) return;

      const fades = root.querySelectorAll('[data-fade]');
      const bg = root.querySelector('[data-panel-bg]');
      const backdrop = root.querySelector('[data-backdrop]');

      const final = flip.getBoundingClientRect();
      const dx = originRect.left - final.left;
      const dy = originRect.top - final.top;
      const sx = originRect.width / final.width;
      const sy = originRect.height / final.height;

      gsap.set([backdrop, bg, fades], { opacity: 0 });
      gsap.set(flip, {
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        transformOrigin: '0 0',
      });

      gsap
        .timeline()
        .to(backdrop, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0)
        .to(
          flip,
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.6, ease: 'expo.out' },
          0
        )
        .to(bg, { opacity: 1, duration: 0.25, ease: 'power1.out' }, 0.1)
        .to(fades, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0.28);
    }, root);

    return () => ctx.revert();
    // Runs once per mount — the modal is mounted fresh for each project.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Close: the image travels back to its card ---------- */
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const root = rootRef.current;
    const flip = imageRef.current;
    if (!root || !flip) {
      onClose?.();
      return;
    }

    const fades = root.querySelectorAll('[data-fade]');
    const bg = root.querySelector('[data-panel-bg]');
    const backdrop = root.querySelector('[data-backdrop]');
    const target = getOriginRect?.();

    if (prefersReducedMotion() || !target) {
      gsap.to([backdrop, bg, fades, flip], {
        opacity: 0,
        duration: 0.2,
        onComplete: () => onClose?.(),
      });
      return;
    }

    // Bring the image back into view first so the return path is clean
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    const current = flip.getBoundingClientRect();

    gsap
      .timeline({ onComplete: () => onClose?.() })
      .to([fades, bg], { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0)
      .to(backdrop, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 0.1)
      .to(
        flip,
        {
          x: target.left - current.left,
          y: target.top - current.top,
          scaleX: target.width / current.width,
          scaleY: target.height / current.height,
          transformOrigin: '0 0',
          duration: 0.5,
          ease: 'expo.inOut',
        },
        0
      );
  }, [getOriginRect, onClose]);

  /* ---------- Scroll lock, focus, keyboard ---------- */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      requestClose();
      return;
    }
    if (e.key !== 'Tab') return;

    // Keep focus inside the dialog
    const focusable = rootRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={rootRef}
      role='dialog'
      aria-modal='true'
      aria-labelledby='project-modal-title'
      onKeyDown={handleKeyDown}
      className='fixed inset-0 z-50 text-neutral-900'
    >
      <div data-backdrop aria-hidden className='fixed inset-0 bg-neutral-900/60' />

      <div
        ref={scrollRef}
        className='fixed inset-0 overflow-y-auto overscroll-contain'
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) requestClose();
        }}
      >
        <div className='relative mx-auto my-4 w-[calc(100%-2rem)] max-w-[1200px] md:my-10'>
          <div
            data-panel-bg
            aria-hidden
            className='absolute inset-0 border border-neutral-900 bg-white'
          />

          <div className='relative'>
            {/* Top bar */}
            <div
              data-fade
              className='flex items-center justify-between border-b border-neutral-900'
            >
              <p className='px-4 py-4 text-sm text-neutral-500 md:px-6'>
                {project.niche}
              </p>
              <button
                ref={closeButtonRef}
                type='button'
                onClick={requestClose}
                className='border-l border-neutral-900 px-5 py-4 text-sm font-semibold transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900'
              >
                Close
              </button>
            </div>

            {/* Image + details */}
            <div className='grid md:grid-cols-12'>
              <div className='p-4 md:col-span-7 md:p-6'>
                {/* This element is the one that travels from the card */}
                <div
                  ref={imageRef}
                  className='relative z-10 aspect-[4/3] w-full overflow-hidden bg-neutral-100'
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>

              <div
                data-fade
                className='flex flex-col border-t border-neutral-900 md:col-span-5 md:border-l md:border-t-0'
              >
                <div className='p-4 md:p-6'>
                  <h2
                    id='project-modal-title'
                    className='font-display text-3xl font-semibold leading-[1] tracking-tighter md:text-4xl'
                  >
                    {project.title}
                  </h2>
                  {project.description && (
                    <p className='mt-5 whitespace-pre-line text-base leading-relaxed text-neutral-600'>
                      {project.description}
                    </p>
                  )}
                </div>

                {(project.timeline || project.teamSize) && (
                  <dl className='mt-auto grid grid-cols-2 border-t border-neutral-300'>
                    {project.timeline && (
                      <div className='p-4 md:p-6'>
                        <dt className='text-sm text-neutral-500'>Timeline</dt>
                        <dd className='mt-1 text-base font-medium'>
                          {project.timeline}
                        </dd>
                      </div>
                    )}
                    {project.teamSize && (
                      <div className='border-l border-neutral-300 p-4 md:p-6'>
                        <dt className='text-sm text-neutral-500'>Team size</dt>
                        <dd className='mt-1 text-base font-medium'>
                          {project.teamSize}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                {technologies.length > 0 && (
                  <div className='border-t border-neutral-300 p-4 md:p-6'>
                    <h3 className='mb-3 text-sm text-neutral-500'>Built with</h3>
                    <ul className='flex flex-wrap gap-2'>
                      {technologies.map((tech) => (
                        <li
                          key={tech}
                          className='border border-neutral-300 px-2 py-1 text-sm'
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Features / challenges / results */}
            {(features.length > 0 || challenges || results) && (
              <div
                data-fade
                className='grid border-t border-neutral-900 md:auto-cols-fr md:grid-flow-col'
              >
                <Block title='Key features' value={features} />
                <Block title='Challenges' value={challenges} />
                <Block title='Results' value={results} />
              </div>
            )}

            {/* Live site */}
            {project.liveUrl && (
              <a
                data-fade
                href={project.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-blaze-orange flex min-h-[6rem] items-end justify-between border-t border-neutral-900 px-6 py-6 text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900'
              >
                <span>
                  Visit live site
                  <span className='sr-only'> (opens in a new tab)</span>
                </span>
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}