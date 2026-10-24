'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Projects',
    href: '/playground',
    children: [
      { label: 'Evolve Sphere', href: 'https://evolvesphereconsulting.com' },
      { label: 'Teeside Ltd', href: 'https://teesidemanagementltd.co.ke' },
      { label: 'The Other Guys', href: 'https://theotherguyske.org' },
      { label: 'Luxury by Tina', href: 'https://luxurybytina.com' },
    ],
  },
  { title: 'Mitch', href: '/About' },
  { title: 'Blog', href: '/Blog' },
  {
    title: 'Services',
    href: '/Services',
    children: [
      { label: 'Web development', href: '/Services/web-development' },
      { label: 'Web design', href: '/Services/web-design' },
      { label: 'Content creation', href: '/Services/content-creation' },
      { label: 'SEO & audits', href: '/Services/seo' },
    ],
  },
  { title: 'Web audits', href: '/Webaudits' },
];

const isExternal = (href) => /^https?:\/\//.test(href);

const linkFocus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className='relative z-50 w-full border-b border-neutral-900 bg-white text-neutral-900'>
      <div className='mx-auto w-full max-w-[1440px] px-4 md:px-8'>
        <div className='flex h-16 items-stretch justify-between lg:grid lg:h-20 lg:grid-cols-12'>
          {/* Logo — sits in the grid's side column */}
          <a
            href='/'
            className={`flex items-center gap-3 pr-6 lg:col-span-3 ${linkFocus}`}
          >
            <Image
              src='/logos/favicon.svg'
              alt=''
              width={64}
              height={48}
              className='h-auto w-12'
              priority
            />
            <span className='text-sm font-semibold'>MadeByMitch</span>
          </a>

          {/* Desktop nav — cells across the main columns */}
          <nav
            aria-label='Main'
            className='hidden lg:col-span-9 lg:block'
          >
            <ul className='flex h-full'>
              {navItems.map((item) => (
                <li
                  key={item.title}
                  className='group relative border-l border-neutral-300'
                >
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`relative flex h-full items-center gap-2 px-6 text-sm font-medium transition-colors hover:bg-neutral-100 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-[2px] aria-[current=page]:after:bg-neutral-900 ${linkFocus}`}
                  >
                    {item.title}
                    {item.children && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                  </a>

                  {item.children && (
                    <ul className='absolute left-[-1px] top-full hidden min-w-[240px] border border-neutral-900 bg-white group-focus-within:block group-hover:block'>
                      {item.children.map((child) => (
                        <li
                          key={child.label}
                          className='border-t border-neutral-300 first:border-t-0'
                        >
                          <a
                            href={child.href}
                            {...(isExternal(child.href)
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className={`flex items-center justify-between px-6 py-4 text-sm transition-colors hover:bg-neutral-900 hover:text-white ${linkFocus}`}
                          >
                            <span>
                              {child.label}
                              {isExternal(child.href) && (
                                <span className='sr-only'>
                                  {' '}
                                  (opens in a new tab)
                                </span>
                              )}
                            </span>
                            {isExternal(child.href) && (
                              <span aria-hidden>↗</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            type='button'
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls='mobile-menu'
            className={`-mr-4 border-l border-neutral-300 px-5 text-sm font-semibold transition-colors hover:bg-neutral-100 md:-mr-8 md:px-8 lg:hidden ${linkFocus}`}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id='mobile-menu'
          aria-label='Mobile'
          className='absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-neutral-900 bg-white lg:hidden'
        >
          <ul className='mx-auto max-w-[1440px] px-4 md:px-8'>
            {navItems.map((item) => (
              <li
                key={item.title}
                className='border-t border-neutral-300 first:border-t-0'
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex items-center justify-between py-4 text-2xl font-semibold tracking-tight aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4 ${linkFocus}`}
                >
                  <span>{item.title}</span>
                  <span aria-hidden>→</span>
                </a>

                {item.children && (
                  <ul className='pb-4'>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={() => setOpen(false)}
                          {...(isExternal(child.href)
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className={`flex items-center justify-between border-t border-neutral-300 py-3 pl-4 text-base text-neutral-600 hover:text-neutral-900 ${linkFocus}`}
                        >
                          <span>
                            {child.label}
                            {isExternal(child.href) && (
                              <span className='sr-only'> (opens in a new tab)</span>
                            )}
                          </span>
                          {isExternal(child.href) && <span aria-hidden>↗</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;