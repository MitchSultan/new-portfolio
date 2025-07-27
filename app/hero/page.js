'use client';
import { Plus, ArrowRight, Code, Palette, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  // Dummy project data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      status: 'Completed',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      image: '/placeholder-project.jpg',
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com'
    },
    {
      id: 2,
      title: 'AI Task Manager',
      description: 'An intelligent task management application that uses AI to prioritize tasks and suggest optimal schedules. Built with Next.js and OpenAI API.',
      status: 'In Progress',
      technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Prisma', 'PostgreSQL'],
      image: '/placeholder-project.jpg',
      githubUrl: 'https://github.com'
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description: 'A comprehensive dashboard for managing multiple social media accounts with analytics, scheduling, and engagement tracking.',
      status: 'Planning',
      technologies: ['Vue.js', 'Firebase', 'Chart.js', 'Social APIs'],
      image: '/placeholder-project.jpg'
    },
    {
      id: 4,
      title: 'Cryptocurrency Tracker',
      description: 'Real-time cryptocurrency tracking application with portfolio management, price alerts, and market analysis tools.',
      status: 'Completed',
      technologies: ['React', 'Redux', 'CoinGecko API', 'Chart.js'],
      image: '/placeholder-project.jpg',
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com'
    },
    {
      id: 5,
      title: 'Learning Management System',
      description: 'A modern LMS platform for online education with video streaming, progress tracking, and interactive quizzes.',
      status: 'In Progress',
      technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'Video.js'],
      image: '/placeholder-project.jpg',
      githubUrl: 'https://github.com'
    },
    {
      id: 6,
      title: 'Weather Forecast App',
      description: 'A beautiful weather application with detailed forecasts, weather maps, and location-based alerts.',
      status: 'Completed',
      technologies: ['React Native', 'OpenWeather API', 'AsyncStorage'],
      image: '/placeholder-project.jpg',
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com'
    }
  ];

  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code'
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: 'Modern Design',
      description: 'Creating beautiful, user-friendly interfaces with attention to detail'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: 'Performance',
      description: 'Building fast, optimized applications that deliver great user experiences'
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    // Calculate the total width needed for horizontal scrolling
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation
    const horizontalScroll = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Hero section animations
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.6 }
    );

    gsap.fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1 }
    );

    // Features animation with stagger
    gsap.fromTo(featuresRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 1.4 }
    );

    // Floating animation for feature icons
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        const icon = feature.querySelector('.feature-icon');
        if (icon) {
          gsap.to(icon, {
            y: -10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.5
          });
        }
      }
    });

    // Cleanup function
    return () => {
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <Header />
      
      {/* Horizontal Scroll Container for entire website */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-0 bg-gray-50"
          style={{ width: 'max-content', height: '100vh' }}
        >
          {/* Hero Section */}
          <section ref={heroRef} className="flex-shrink-0 w-screen h-full flex items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center py-20">
                <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mitchel Sultan.
                  </span>
                </h1>
                <p ref={subtitleRef} className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Full-Stack Developer crafting exceptional digital experiences with modern technologies
                </p>
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center gap-2 group"
                    onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
                  >
                    View My Work
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  <button 
                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
                    onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
                  >
                    Get In Touch
                  </button>
                </div>
              </div>

              {/* Features */}
              
            </div>
          </section>
          <section className="flex-shrink-0 w-screen h-full flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">

            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    ref={el => featuresRef.current[index] = el}
                    className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onMouseEnter={(e) => gsap.to(e.target, { y: -5, duration: 0.3 })}
                    onMouseLeave={(e) => gsap.to(e.target, { y: 0, duration: 0.3 })}
                  >
                    <div className="flex justify-center mb-4 feature-icon">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
          </section>

          {/* Projects Section Header */}
          <section className="flex-shrink-0 w-96 h-full flex items-center justify-center bg-white px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                A collection of projects I've built, each showcasing different skills and technologies
              </p>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800">All Projects</h3>
                <p className="text-gray-600">{projects.length} projects total</p>
              </div>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center gap-2 mx-auto group"
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                New Project
              </button>
            </div>
          </section>

          {/* Project Cards */}
          {projects.map((project) => (
            <section key={project.id} className="flex-shrink-0 w-96 h-full flex items-center bg-white px-4">
              <ProjectCard project={project} />
            </section>
          ))}

          {/* Footer */}
          <section className="flex-shrink-0 w-screen h-full flex items-center bg-gradient-to-r from-gray-900 to-blue-900 text-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center w-full">
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-gray-300 mb-6">Ready to start your next project? Get in touch!</p>
              <button 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
              >
                Contact Me
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;