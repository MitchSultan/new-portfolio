"use client";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { motion } from "framer-motion";
import { Palette, Layout, Smartphone, PenTool, ArrowRight, CheckCircle } from "lucide-react";

export default function WebDesignPage() {
  const features = [
    {
      title: "UI/UX Design",
      description: "Intuitive and engaging user experiences that keep visitors on your site.",
      icon: <Layout className="text-purple-500" size={24} />,
    },
    {
      title: "Responsive Layouts",
      description: "Pixel-perfect designs that look amazing on mobile, tablet, and desktop.",
      icon: <Smartphone className="text-purple-500" size={24} />,
    },
    {
      title: "Brand Identity",
      description: "Cohesive visual systems including color palettes, typography, and logos.",
      icon: <Palette className="text-purple-500" size={24} />,
    },
    {
      title: "Prototyping",
      description: "Interactive mockups to visualize the flow before development begins.",
      icon: <PenTool className="text-purple-500" size={24} />,
    },
  ];

  const tools = ["Figma", "Adobe XD", "Photoshop", "Illustrator"];

  return (
    <div className="min-h-screen bg-background dark:bg-black flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 mb-4"
          >
            <Palette size={40} className="text-purple-600 dark:text-purple-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            Web Design
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            I craft visually stunning, user-centric designs that captivate your audience. 
            From initial concept to final polish, I ensure every pixel serves a purpose.
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
              <div className="mb-4 bg-purple-50 dark:bg-purple-900/10 w-12 h-12 rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Role & Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <span key={index} className="px-6 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-purple-600 dark:bg-purple-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to design your masterpiece?</h2>
            <p className="text-purple-100 max-w-xl mx-auto">
              Let's accept the challenge and build something that stands out.
            </p>
            <a 
              href="https://wa.me/254703666366"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors"
            >
              Start Designing <ArrowRight size={20} />
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
