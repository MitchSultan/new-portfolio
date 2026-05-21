'use client';
import React, { useEffect, useRef } from 'react';

const mockClients = [
  { id: 1, name: "ToG" },
  { id: 2, name: "Luxury by Tina" },
  { id: 3, name: "CanvasPile" },
  { id: 4, name: "MadGraphix" },
  { id: 5, name: "Evolve Sphere" },
  { id: 6, name: "Inner Harbor" },
  { id: 7, name: "Nesh Collections" },
  { id: 8, name: "Reuben" },
];

export default function LogoMarquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Clone items for seamless loop
    const items = marquee.querySelectorAll('.marquee-item');
    items.forEach(item => {
      const clone = item.cloneNode(true);
      marquee.appendChild(clone);
    });
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-6 md:text-center">
          Trusted by leading brands
        </p>

        <div className="overflow-hidden">
          <div className="marquee-container" ref={marqueeRef}>
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="marquee-item flex-shrink-0 px-8 sm:px-12"
              >
                <div className="flex items-center justify-center h-16 bg-gray-50 rounded-lg border border-gray-100 px-6 min-w-max">
                  <span className="text-md font-extrabold text-gray-600">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
