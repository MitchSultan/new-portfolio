'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, ShoppingCart, TrendingUp, Users, AlertTriangle, BarChart3 } from 'lucide-react';

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
    description: 'Nearly every Nairobi customer browses on their phone first',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: AlertTriangle,
    value: 67,
    suffix: '%',
    label: 'SMEs Without Optimized Sites',
    description: 'Two-thirds of Nairobi small businesses have underperforming websites',
    color: 'text-orange',
    bg: 'bg-orange/5',
    border: 'border-orange/20',
  },
  {
    icon: ShoppingCart,
    value: 800,
    suffix: 'B+',
    prefix: 'KES ',
    label: 'Digital Economy',
    description: "Nairobi's online market is growing at 23% year-over-year",
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
  },
  {
    icon: TrendingUp,
    value: 340,
    suffix: '%',
    label: 'Search Growth',
    description: "Google searches for 'near me' services grew 340% in Nairobi since 2023",
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
  {
    icon: Users,
    value: 4.2,
    suffix: 'M',
    label: 'Online Shoppers',
    description: '4.2 million Nairobi residents purchase products and services online',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    icon: BarChart3,
    value: 78,
    suffix: '%',
    label: 'Abandon Without Trust',
    description: 'Visitors leave websites that look outdated or load slowly',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
];

export default function MarketInsights() {
  return (
    <section className="py-24 px-6 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-widest">Market Intelligence</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Nairobi&apos;s Digital Landscape in{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            The data is clear — businesses that invest in digital performance capture
            the lion&apos;s share of Nairobi&apos;s booming online market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative p-6 rounded-2xl bg-white border ${stat.border} hover:shadow-lg transition-all duration-500`}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-extrabold ${stat.color} mb-1`}>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ''}
                />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">{stat.label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
