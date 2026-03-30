'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ArrowRight, Globe, Users, Target, Repeat, TrendingDown, DollarSign } from 'lucide-react';

const painPoints = [
  { icon: TrendingDown, text: 'High bounce rates — visitors leave in under 8 seconds' },
  { icon: XCircle, text: 'No clear path from browsing to buying' },
  { icon: DollarSign, text: 'Wasted ad spend driving traffic to pages that do not convert' },
  { icon: Users, text: 'Zero follow-up system — lost leads never return' },
];

const funnelSteps = [
  {
    icon: Globe,
    title: 'Attract',
    description: 'SEO-optimized content and local targeting bring the right Nairobi audience to you',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconColor: 'text-emerald-600',
    width: 'w-full',
  },
  {
    icon: Users,
    title: 'Engage',
    description: 'Value-driven pages, lead magnets, and interactive tools build trust and capture leads',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    iconColor: 'text-primary-600',
    width: 'w-[85%]',
  },
  {
    icon: Target,
    title: 'Convert',
    description: 'Strategic CTAs, personalized follow-ups, and WhatsApp automation close the deal',
    bg: 'bg-orange/5',
    border: 'border-orange/20',
    iconColor: 'text-orange',
    width: 'w-[70%]',
  },
  {
    icon: Repeat,
    title: 'Retain',
    description: 'Automated sequences turn one-time buyers into repeat customers and referrals',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    iconColor: 'text-sky-600',
    width: 'w-[55%]',
  },
];

export default function WhyFunnels() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange text-sm font-semibold uppercase tracking-widest">The Missing Piece</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            A Website Alone{' '}
            <span className="bg-gradient-to-r from-orange to-rose-500 bg-clip-text text-transparent">
              Isn&apos;t Enough
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Most Nairobi businesses have a website. Very few have a system that consistently
            turns strangers into customers. That system is a content funnel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Pain points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              What a Basic Website Gets You
            </h3>
            <div className="space-y-4">
              {painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-rose-50 border border-rose-200"
                >
                  <point.icon className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{point.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center my-8 lg:hidden">
              <ArrowRight className="w-8 h-8 text-primary-500 rotate-90" />
            </div>
          </motion.div>

          {/* Funnel visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              What a Content Funnel Delivers
            </h3>
            <div className="space-y-3 flex flex-col items-center">
              {funnelSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className={`${step.width} p-5 rounded-2xl ${step.bg} border ${step.border}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-base">{step.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
