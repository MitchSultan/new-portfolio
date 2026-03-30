'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Grace Mwangi',
    role: 'Founder, Savanna Interiors',
    text: "Before working with Mitch, our website was just a digital brochure. He built a content funnel that now brings in 12-15 qualified leads every week — and most of them come through WhatsApp, which is exactly how Nairobi customers prefer to talk.",
    stars: 5,
    metric: '15 leads/week',
  },
  {
    name: 'David Ochieng',
    role: 'CEO, NairobiEats Delivery',
    text: "Our old site had a 78% bounce rate. Mitch redesigned the whole flow — from the landing page to checkout. In 3 months, conversions went up 240% and our cost per acquisition dropped by half. The ROI speaks for itself.",
    stars: 5,
    metric: '240% more conversions',
  },
  {
    name: 'Amina Hassan',
    role: 'Marketing Director, KiliTech Solutions',
    text: "Mitch doesn't just build websites — he builds revenue systems. The funnel he created for us ranks on Google Kenya for 6 high-intent keywords and generates more leads than our entire paid ads budget used to.",
    stars: 5,
    metric: '6 keywords ranked',
  },
  {
    name: 'Peter Kamau',
    role: 'Owner, Westlands Auto Care',
    text: "I was skeptical about investing in a 'funnel' when I just wanted a website. But the numbers don't lie. We went from zero online bookings to 40+ per month. Best business decision I've made in 5 years.",
    stars: 5,
    metric: '40+ bookings/month',
  },
];

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
}

const proofStats = [
  { value: 47, suffix: '+', label: 'Nairobi Sites Audited This Month' },
  { value: 92, suffix: '%', label: 'Client Satisfaction Rate' },
  { value: 3.2, suffix: 'x', label: 'Average Conversion Improvement' },
  { value: 24, suffix: 'hr', label: 'Average Turnaround Time' },
];

export default function SocialProof() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-widest">Proof of Results</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Nairobi Businesses{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Growing With Funnels
            </span>
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {proofStats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-center"
            >
              <div className="text-3xl font-extrabold text-gray-900 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
            <Quote className="w-8 h-8 text-primary-200 mb-4" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-bold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 justify-end mb-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-primary-600 text-sm font-semibold">{t.metric}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              id="testimonial-prev"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-primary-500 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              id="testimonial-next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
