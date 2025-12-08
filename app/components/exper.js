'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Evolve Sphere Consulting",
    client: "Prof. Purity Karimi",
    tags: ["Design", "Build", "Consultancy"],
    image: "/evol.png",
    link: "https://evolvesphereconsulting.com",
    bgGradient: "from-pink-400 via-orange-300 to-yellow-300"
  },
  {
    id: 2,
    title: "Canvas Pile, Curated arts",
    client: "Vacature Vla",
    tags: ["Design", "Build", "Shopify"],
    image: "/just.png",
    link: "https://canvaspile.com",
    bgGradient: "from-indigo-600 via-purple-600 to-blue-500"
  },
  {
    id: 3,
    title: "The Other Guys Kenya",
    client: "The Other Guys Kenya",
    tags: ["Design", "Build","NGO"],
    image: "/etog.png",
    link: "https://theotherguyskenya.org",
    bgGradient: "from-gray-900 via-black to-gray-800"
  },
  {
    id: 4,
    title: "Luxury by Tina",
    client: "Tina",
    tags: ["Design", "Build","E-commerce"],
    image: "/f1r.png",
    link: "https://luxurybytina.com",
    bgGradient: "from-indigo-900 via-blue-900 to-purple-900"
  }
];

export default function Exper() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Some of my work
            </h2>
            <p className="text-gray-400 max-w-md">
              I have created a variety of projects, including websites, applications, and more. 
              Here are some of my favorites.
            </p>
          </div>
          <a href="/playground">
            <button className="px-6 py-3 rounded-lg bg-transparent border border-purple-500 text-white hover:bg-purple-500/10 transition-all duration-300">
              All Projects
            </button>
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {/* Card Background with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content Container */}
                <div className="relative h-[450px] flex flex-col justify-between p-6">
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap z-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Image - Centered */}
                  <div className="flex-1 flex items-center justify-center py-8 z-10">
                    <div className="relative w-full h-full max-w-[280px] max-h-[280px] transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="z-10">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/70 font-light">
                      {project.client}
                    </p>
                  </div>

                  {/* Hover Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
