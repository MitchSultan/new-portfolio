'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Smartphone, Globe, Zap } from 'lucide-react';

const floatingStats = [
  { icon: Smartphone, label: '98% Mobile Penetration', x: '5%', y: '20%', delay: 0 },
  { icon: TrendingUp, label: 'KES 800B+ Economy', x: '75%', y: '15%', delay: 0.3 },
  { icon: Globe, label: '4.2M Online Shoppers', x: '80%', y: '70%', delay: 0.6 },
  { icon: Zap, label: '340% Search Growth', x: '8%', y: '75%', delay: 0.9 },
];

export default function AuditHero({ onStartAudit }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onStartAudit(url.trim());
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden ">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(104,31,195,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(104,31,195,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary-200/30 blur-[120px]"
        style={{ top: '10%', left: '20%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-orange/10 blur-[100px]"
        style={{ bottom: '10%', right: '15%' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating stat badges */}
      {floatingStats.map((stat, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium shadow-sm"
          style={{ left: stat.x, top: stat.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + stat.delay, duration: 0.6 }}
        >
          <stat.icon className="w-3.5 h-3.5 text-primary-600" />
          {stat.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
          </span>
          2026 Nairobi Digital Report — Free Access
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
        >
          Is Your Website{' '}
          <span className="bg-gradient-to-r from-orange via-primary-600 to-primary-500 bg-clip-text text-transparent">
            Losing Customers
          </span>{' '}
          in Nairobi&apos;s KES 800B+ Digital Economy?
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Get a free, instant website audit and discover what top-performing
          Nairobi businesses do differently to turn visitors into paying customers.
        </motion.p>

        {/* URL Input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto"
        >
          <div className="relative flex-1 w-full">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-base"
              id="audit-url-input"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange to-primary-600 text-white font-bold text-base shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all flex items-center justify-center gap-2"
            id="audit-start-button"
          >
            <Search className="w-5 h-5" />
            Audit My Site
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 text-sm text-gray-400"
        >
          Free — No signup required — Results in 30 seconds
        </motion.p>
      </div>
    </section>
  );
}
