"use client";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { motion } from "framer-motion";
import { Code, Server, Database, Zap, ArrowRight } from "lucide-react";

export default function WebDevPage() {
  const features = [
    {
      title: "Modern Frontend",
      description: "Built with React, Next.js, and Tailwind CSS for lightning-fast performance.",
      icon: <Code className="text-blue-500" size={24} />,
    },
    {
      title: "Scalable Backend",
      description: "Secure and robust server-side solutions using Node.js and Supabase.",
      icon: <Server className="text-blue-500" size={24} />,
    },
    {
      title: "Database Design",
      description: "Efficient schema design and data management for your application's needs.",
      icon: <Database className="text-blue-500" size={24} />,
    },
    {
      title: "Performance",
      description: "Optimized for Core Web Vitals, ensuring your site loads in milliseconds.",
      icon: <Zap className="text-blue-500" size={24} />,
    },
  ];

  const techStack = ["Next.js", "React", "Node.js", "Supabase", "Tailwind CSS", "TypeScript"];

  return (
    <div className="min-h-screen bg-background dark:bg-black flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-4"
          >
            <Code size={40} className="text-blue-600 dark:text-blue-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            Web Development
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Robust, scalable, and high-performance websites built with the latest technologies. 
            I write clean, maintainable code that powers your business growth.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 bg-blue-50 dark:bg-blue-900/10 w-12 h-12 rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
           <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <span key={index} className="px-6 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium font-mono text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 dark:bg-blue-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Need a powerful website?</h2>
            <p className="text-blue-100 max-w-xl mx-auto">
              Let's build a solution that scales with your ambition.
            </p>
            <a 
              href="https://wa.me/254703666366"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              Start Building <ArrowRight size={20} />
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
