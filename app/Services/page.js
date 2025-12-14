"use client";
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { Palette, Code, LineChart, Megaphone, PenTool, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Palette size={40} className="text-purple-500" />,
    title: "Web Design",
    description: "Visually stunning, user-centric designs that captive your audience. I create modern, aesthetic interfaces that feel premium and intuitive.",
    color: "bg-purple-100 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    link: "/Services/web-design",
  },
  {
    icon: <Code size={40} className="text-blue-500" />,
    title: "Web Development",
    description: "Robust, scalable, and high-performance websites built with the latest technologies like Next.js and React. Expect fast load times and clean code.",
    color: "bg-blue-100 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    link: "/Services/web-development",
  },
  {
    icon: <LineChart size={40} className="text-green-500" />,
    title: "SEO Optimization",
    description: "Climb the search rankings and get found. I implement strategic SEO practices to increase your visibility and drive organic traffic to your site.",
    color: "bg-green-100 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    link: "/Services/seo",
  },
  {
    icon: <Megaphone size={40} className="text-orange-500" />,
    title: "Ads Management",
    description: "Targeted campaigns that convert. I manage Google and Social Media ads to ensure you get the best ROI for your marketing budget.",
    color: "bg-orange-100 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    link: "/Services/ads",
  },
  {
    icon: <PenTool size={40} className="text-pink-500" />,
    title: "Content Creation",
    description: "Compelling narratives that tell your brand's story. From website copy to social media posts, I create content that engages and inspires.",
    color: "bg-pink-100 dark:bg-pink-900/20",
    border: "border-pink-200 dark:border-pink-800",
    link: "/Services/content-creation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen   flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold  tracking-tight leading-tight"
          >
            Services that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Scale Your Vision
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className=" text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            I offer a comprehensive suite of digital services designed to elevate your brand. 
            From pixel-perfect designs to powerful code, I've got you covered.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.a
              href={service.link}
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border ${service.border} ${service.color} bg-opacity-50 dark:bg-opacity-10 backdrop-blur-sm transition-all duration-300 hover:shadow-xl block`}
            >
              <div className="bg-white dark:bg-neutral-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                {service.description}
              </p>
               <span className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1 group">
                Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
          
          {/* Custom CTA Card within Grid that spans depending on layout or just sits as last item */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-center items-center text-center space-y-6 hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-300 group"
          >
            <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
              Need something custom?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Have a unique project in mind? Let's discuss your specific requirements.
            </p>
            <a 
              href="https://wa.me/254703666366"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all"
            >
              Contact Me <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Global CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 relative rounded-[2.5rem] overflow-hidden bg-black dark:bg-white text-white dark:text-black py-24 px-6 md:px-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 dark:from-purple-400/10 dark:to-blue-400/10" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Ready to start your project?
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 dark:text-neutral-600 max-w-2xl mx-auto">
              Let's turn your ideas into reality. Reach out today and let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               <a
                href="https://wa.me/254703666366"
                className="bg-white dark:bg-black text-black dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shadow-lg"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
