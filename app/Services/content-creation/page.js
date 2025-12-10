"use client";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { motion } from "framer-motion";
import { PenTool, Feather, Share2, Video, ArrowRight } from "lucide-react";

export default function ContentCreationPage() {
  const features = [
    {
      title: "Copywriting",
      description: "Persuasive website copy, landing pages, and email sequences that drive action.",
      icon: <Feather className="text-pink-500" size={24} />,
    },
    {
      title: "Social Media Content",
      description: "Engagement-focused posts, threads, and captions for Twitter, LinkedIn, and Instagram.",
      icon: <Share2 className="text-pink-500" size={24} />,
    },
    {
      title: "Blog Writing",
      description: "SEO-rich articles that establish your authority and educate your customer base.",
      icon: <PenTool className="text-pink-500" size={24} />,
    },
    {
      title: "Creative Strategy",
      description: "Developing a consistent voice and content calendar for your brand.",
      icon: <Video className="text-pink-500" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-black flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-pink-100 dark:bg-pink-900/30 mb-4"
          >
            <PenTool size={40} className="text-pink-600 dark:text-pink-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            Content Creation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Compelling narratives that tell your brand's story. From website copy to social media posts, 
            I create content that engages, inspires, and coverts.
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
              <div className="mb-4 bg-pink-50 dark:bg-pink-900/10 w-12 h-12 rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-pink-600 dark:bg-pink-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Need words that work?</h2>
            <p className="text-pink-100 max-w-xl mx-auto">
              Your story deserves to be heard. Let's write it together.
            </p>
            <a 
              href="https://wa.me/254703666366"
              className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors"
            >
              Start Creating <ArrowRight size={20} />
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
