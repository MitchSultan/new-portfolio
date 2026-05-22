'use client';
import React from 'react';

const tools = [
  { name: 'React', icon: '⚛️', color: 'bg-azure-blue' },
  { name: 'Next.js', icon: '▲', color: 'blue-violet' },
  { name: 'JavaScript', icon: 'JS', color: 'azure-blue' },
  { name: 'TypeScript', icon: 'TS', color: 'blaze-orange' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'azure-blue' },
  { name: 'GSAP', icon: '💚', color: 'neon-pink' },
  { name: 'Git', icon: '📦', color: 'azure-blue' },
  { name: 'Figma', icon: '🎯', color: 'blue-violet' },
  { name: 'VS Code', icon: '💻', color: 'blaze-orange' },
  { name: 'HTML5', icon: '🌐', color: 'neon-pink' },
  { name: 'CSS3', icon: '🎪', color: 'azure-blue' },
  { name: 'Node.js', icon: '🟢', color: 'blue-violet' },
  { name: 'Framer Motion', icon: '🎬', color: 'neon-pink' },
  { name: 'Supabase', icon: '⚡', color: 'azure-blue' },
  { name: 'Vercel', icon: '▲', color: 'blaze-orange' },
  { name: 'npm', icon: '📦', color: 'azure-blue' }
];

export default function Toolbox() {
  // Duplicate tools for seamless infinite scroll
  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <div className="w-full  py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-left flex flex-col">
          <h2 className="font-display">
            My Toolbox
          </h2>
          <p className="">
            Technologies and tools I use daily to craft beautiful, performant web experiences
          </p>
        </div>
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative mb-8">
        <div className="flex gap-6 animate-marquee-left">
          {duplicatedTools.map((tool, index) => (
            <div
              key={`left-${index}`}
              className="flex-shrink-0 group"
            >
              <div className={`
                relative w-32 h-32 rounded-2xl 
                bg-gradient-to-br ${tool.color}
                flex flex-col items-center justify-center
                transform transition-all duration-300
                group-hover:scale-110 group-hover:rotate-3
                shadow-xl group-hover:shadow-2xl
                cursor-pointer
              `}>
                <span className="text-4xl mb-2 transform group-hover:scale-125 transition-transform">
                  {tool.icon}
                </span>
                <span className="text-black font-thin text-sm text-center px-2">
                  {tool.name}
                </span>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee-right">
          {duplicatedTools.map((tool, index) => (
            <div
              key={`right-${index}`}
              className="flex-shrink-0 group"
            >
              <div className={`
                relative w-32 h-32 rounded-2xl 
                bg-gradient-to-br ${tool.color}
                flex flex-col items-center justify-center
                transform transition-all duration-300
                group-hover:scale-110 group-hover:-rotate-3
                shadow-xl group-hover:shadow-2xl
                cursor-pointer
              `}>
                <span className="text-4xl mb-2 transform group-hover:scale-125 transition-transform">
                  {tool.icon}
                </span>
                <span className="text-black font-thin text-sm text-center px-2">
                  {tool.name}
                </span>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
