'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HEADING_SELECTOR = 'h1, h2, h3';
const TEXT_SELECTOR = 'p, blockquote, li, label, figcaption, summary';
const REVEAL_SELECTOR = `${HEADING_SELECTOR}, ${TEXT_SELECTOR}`;

export default function ScrollTextReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return;
    if (pathname.startsWith('/Blog/')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const initialized = new WeakSet();
    const context = gsap.context(() => {});

    const revealHeadings = (root) => {
      const headings = [];
      if (root instanceof Element && root.matches(REVEAL_SELECTOR)) {
        headings.push(root);
      }
      if (root.querySelectorAll) {
        headings.push(...root.querySelectorAll(REVEAL_SELECTOR));
      }

      headings.forEach((heading) => {
        if (
          initialized.has(heading) ||
          heading.hasAttribute('data-scroll-reveal') ||
          heading.closest('nav, [role="navigation"], [aria-hidden="true"]') ||
          (!heading.matches(HEADING_SELECTOR) && heading.querySelector(TEXT_SELECTOR))
        ) {
          return;
        }
        initialized.add(heading);

        context.add(() => {
          gsap.fromTo(
            heading,
            {
              yPercent: 18,
              clipPath: 'inset(0 0 100% 0)',
            },
            {
              yPercent: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 50%',
                once: true,
              },
            }
          );
        });
      });
    };

    revealHeadings(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node instanceof Element) revealHeadings(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [pathname]);

  return null;
}
