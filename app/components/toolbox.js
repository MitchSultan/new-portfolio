'use client';
import React from 'react';

const tools = [
  { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js', icon: '▲', color: 'from-gray-800 to-black' },
  { name: 'JavaScript', icon: 'JS', color: 'from-yellow-400 to-yellow-600' },
  { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-700' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-400 to-blue-600' },
  { name: 'GSAP', icon: '💚', color: 'from-green-400 to-emerald-600' },
  { name: 'Git', icon: '📦', color: 'from-orange-500 to-red-600' },
  { name: 'Figma', icon: '🎯', color: 'from-purple-400 to-pink-600' },
  { name: 'VS Code', icon: '💻', color: 'from-blue-600 to-indigo-700' },
  { name: 'HTML5', icon: '🌐', color: 'from-orange-500 to-red-500' },
  { name: 'CSS3', icon: '🎪', color: 'from-blue-400 to-blue-600' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-700' },
  { name: 'Framer Motion', icon: '🎬', color: 'from-pink-500 to-purple-600' },
  { name: 'Supabase', icon: '⚡', color: 'from-emerald-400 to-green-600' },
  { name: 'Vercel', icon: '▲', color: 'from-black to-gray-900' },
  { name: 'npm', icon: '📦', color: 'from-red-500 to-red-700' }
];

export default function Toolbox() {
  // Duplicate tools for seamless infinite scroll
  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <div className="w-full bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 overflow-hidden">
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
                <span className="text-white font-semibold text-sm text-center px-2">
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
                <span className="text-white font-semibold text-sm text-center px-2">
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
