import { useRef } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function BentoGrid() {
  const itemRefs = useRef([]);

  const handleHover = (index) => {
    gsap.to(itemRefs.current[index], {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleHoverExit = (index) => {
    gsap.to(itemRefs.current[index], {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    gsap.utils.toArray('.parallax').forEach((item) => {
      gsap.from(item, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {['About Me', 'Projects', 'Skills', 'Contact'].map((section, index) => (
        <div
          key={section}
          ref={(el) => (itemRefs.current[index] = el)}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={() => handleHoverExit(index)}
          className="parallax bento-item bg-blue-500 p-6 rounded-lg cursor-pointer"
        >
          <h2 className="text-2xl font-bold">{section}</h2>
          <p>Content for {section} goes here.</p>
        </div>
      ))}
    </div>
  );
}