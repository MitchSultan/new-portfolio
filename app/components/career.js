'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const careerData = [
  {
    id: 1,
    year: '2023 - 2024',
    company: 'Telsec .',
    role: 'Junior Frontend Developer',
    description: 'Started my journey building responsive web applications and learning modern frameworks.',
    metrics: [
      { label: 'Projects Delivered', value: '12+', icon: '🚀' },
      { label: 'Code Review Score', value: '95%', icon: '⭐' },
      { label: 'Performance Boost', value: '40%', icon: '⚡' },
      { label: 'Client Satisfaction', value: '4.8/5', icon: '😊' }
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    year: '2024 - 2025',
    company: 'Digital Oasis Ltd',
    role: 'Frontend Developer',
    description: 'Led frontend development for major client projects, mentored junior developers, and optimized workflows.',
    metrics: [
      { label: 'Team Members Mentored', value: '5', icon: '👥' },
      { label: 'Client Projects', value: '25+', icon: '💼' },
      { label: 'Load Time Reduction', value: '60%', icon: '🔥' },
      { label: 'Revenue Impact', value: '$120K+', icon: '💰' }
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    year: '2025 - Present',
    company: 'MAD Graphix',
    role: 'Mid-level Frontend Developer',
    description: 'Architecting scalable frontend solutions, leading technical decisions, and driving innovation in user experience.',
    metrics: [
      { label: 'Apps Architected', value: '8', icon: '🏗️' },
      { label: 'User Growth', value: '300%', icon: '📈' },
      { label: 'Code Quality Score', value: '98%', icon: '✨' },
      { label: 'Team Productivity', value: '+85%', icon: '🎯' }
    ],
    color: 'from-emerald-500 to-teal-500'
  }
];

export default function Career() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: 100,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Sticky Pinned */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-10rem)] flex flex-col justify-center md:pr-8">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold mb-4">
                  My Journey
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 ">
                  Career Trajectory
                </h2>
              </div>
              <p className="text-lg md:text-xl  leading-relaxed">
                From crafting my first components to architecting enterprise solutions, 
                each role has been a stepping stone in my journey to master frontend development.
              </p>
              <p className="text-base ">
                Scroll through my professional evolution and see the measurable impact 
                I've created at each stage of my career.
              </p>

              {/* Stats Summary - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-purple-400">45+</div>
                  <div className="text-sm text-gray-500">Total Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-400">3</div>
                  <div className="text-sm text-gray-500">Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">5+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">98%</div>
                  <div className="text-sm text-gray-500">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Scrollable Career Timeline */}
          <div className="space-y-12">
            {careerData.map((job, index) => (
              <div
                key={job.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative"
              >
                {/* Timeline Line */}
                {index !== careerData.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-gray-700 to-transparent hidden md:block" />
                )}

                {/* Career Card */}
                <div className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-2 top-6 w-4 h-4 rounded-full bg-gradient-to-r ${job.color} hidden md:block`}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-75 blur animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="md:ml-12  rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 font-medium">{job.year}</span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${job.color} rounded-full text-xs font-bold`}>
                          Role {job.id}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{job.role}</h3>
                      <p className="text-purple-400 font-semibold">{job.company}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {job.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-black/50 rounded-xl p-4 border border-gray-800 hover:border-gray-600 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-2xl">{metric.icon}</span>
                          </div>
                          <div className={`text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r ${job.color} bg-clip-text text-transparent`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End of Timeline */}
            <div className="md:ml-12 text-center py-8">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm font-medium">Journey continues...</span>
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
