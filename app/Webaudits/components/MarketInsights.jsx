'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, ShoppingCart, TrendingUp, Users, AlertTriangle, BarChart3 } from '@/lib/lucide';

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Smartphone,
    value: 98,
    suffix: '%',
    label: 'Mobile Penetration',
    description: 'Nearly every  customer browses on their phone first',
    color: 'text-white',
    bg: 'azure-blue',
    border: 'azure-blue',
  },
  {
    icon: AlertTriangle,
    value: 67,
    suffix: '%',
    label: 'SMEs Without Optimized Sites',
    description: 'Two-thirds of all small businesses have underperforming websites',
    color: 'text-orange',
    bg: 'blaze-orange',
    border: 'blaze-orange',
  },
  {
    icon: ShoppingCart,
    value: 800,
    suffix: 'B+',
    prefix: 'KES ',
    label: 'Digital Economy',
    description: "The global online market is growing at 23% year-over-year",
    color: 'text-primary-600',
    bg: 'azure-blue',
    border: 'azure-blue',
  },
  {
    icon: TrendingUp,
    value: 340,
    suffix: '%',
    label: 'Search Growth',
    description: "Google searches for 'near me' services grew 340% in the global market since 2023",
    color: 'text-teal-600',
    bg: 'neon-pink',
    border: 'neon-pink',
  },
  {
    icon: Users,
    value: 4.2,
    suffix: 'M',
    label: 'Online Shoppers',
    description: '4.2 million global residents purchase products and services online',
    color: 'text-blue-violet',
    bg: 'azure-blue',
    border: 'azure-blue',
  },
  {
    icon: BarChart3,
    value: 78,
    suffix: '%',
    label: 'Abandon Without Trust',
    description: 'Visitors leave websites that look outdated or load slowly',
    color: 'text-rose-600',
    bg: 'amber-gold',
    border: 'amber-gold',
  },
];

export default function MarketInsights() {
  return (
    <section className="py-24 px-6  relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-widest">Market Intelligence</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            The Global Digital Landscape in{' '}
            <span className="bg-azure-blue bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            The data is clear — businesses that invest in digital performance capture
            the lion&apos;s share of the global booming online market.
          </p>
        </motion.div>

        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 md:pb-0 hide-scrollbar">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex-none w-[85vw] sm:w-[350px] md:w-auto snap-center md:snap-align-none group relative p-6 rounded-2xl bg-${stat.bg} border border-${stat.border} hover:shadow-lg transition-all duration-500`}
            >
              <div className={`w-12 h-12 rounded-xl  flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-extrabold ${stat.bg} mb-1`}>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ''}
                />
              </div>
              <h3 className="text-white font-medium text-sm mb-2">{stat.label}</h3>
              <p className="text-[#E5E5E5] text-sm leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
