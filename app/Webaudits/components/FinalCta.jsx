'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, MessageCircle, Zap } from 'lucide-react';

export default function FinalCta({ onScrollToAudit }) {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gray-900">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[150px]"
        style={{ top: '-20%', right: '-10%' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-orange/10 blur-[130px]"
        style={{ bottom: '-20%', left: '-10%' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-medium"
        >
          <Zap className="w-4 h-4" />
          Don&apos;t Get Left Behind
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
        >
          Your Competitors Are Already{' '}
          <span className="bg-gradient-to-r from-orange via-primary-400 to-primary-300 bg-clip-text text-transparent">
            Optimizing
          </span>
          . Are You?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-400 max-w-xl mx-auto"
        >
          Every day you wait, potential customers in Nairobi choose your competitor because
          their site loaded faster, looked more trustworthy, or simply had a WhatsApp button.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onScrollToAudit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange to-primary-500 text-white font-bold text-base shadow-lg shadow-orange/20 hover:shadow-orange/40 transition-all flex items-center justify-center gap-2"
            id="final-cta-audit"
          >
            <ArrowUp className="w-5 h-5" />
            Run My Free Audit
          </motion.button>

          <motion.a
            href="https://wa.me/254703666366?text=Hi%20Mitch!%20I%20just%20saw%20the%20Digital%20Landscape%20Report%20and%20I%20want%20to%20discuss%20a%20strategy%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            id="final-cta-whatsapp"
          >
            <MessageCircle className="w-5 h-5" />
            Book a Strategy Call
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-gray-500"
        >
          Free audit — No credit card — Results in 30 seconds
        </motion.p>
      </div>
    </section>
  );
}
