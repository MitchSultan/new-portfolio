'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from '@/lib/lucide';

const faqs = [
  {
    question: 'What does the website audit actually measure?',
    answer: 'Our audit runs Google PageSpeed Insights and reports official Lighthouse categories: Performance (desktop and mobile), Accessibility, Best Practices, and SEO. Each score and recommendation comes from real Lighthouse audits on your URL.',
  },
  {
    question: 'How is this different from Google PageSpeed or Lighthouse?',
    answer: 'This tool uses the same PageSpeed Insights / Lighthouse engine. We present the results in a business-friendly breakdown with category scores, failed audit titles from Lighthouse, and Chrome UX Report data when available — without needing to read the raw Lighthouse JSON report.',
  },
  {
    question: 'What exactly is a content funnel?',
    answer: 'A content funnel is a strategic system that guides potential customers through a journey: from discovering your brand (through SEO, social, or ads) → engaging with valuable content that builds trust → taking action (buying, booking, or contacting you) → becoming a loyal repeat customer. Unlike a static website, a funnel actively works to convert visitors 24/7 using automated follow-ups, lead magnets, and personalized CTAs.',
  },
  {
    question: 'How much does it cost to build a content funnel?',
    answer: 'Every business is unique, so funnels are custom-priced based on your goals, industry, and complexity. Most Nairobi SME funnels start from KES 85,000 for a core funnel and scale up based on the number of pages, automations, and integrations needed. We offer a free strategy call to scope your project and provide a fixed quote — no surprises.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Most clients see measurable improvements within 2-4 weeks of launch: more leads, lower bounce rates, and increased engagement. SEO-driven traffic typically starts compounding around month 2-3. We provide monthly performance reports so you can track exactly how your funnel is performing against your Nairobi market benchmarks.',
  },
  {
    question: 'Can you work with my existing website?',
    answer: 'Absolutely. We can either enhance your existing site by adding funnel elements (landing pages, lead magnets, automated sequences) or build a completely new high-converting platform. During your free strategy call, we will assess which approach gives you the best ROI based on your current setup and goals.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-widest">Common Questions</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Got Questions?{' '}
            <span className="bg-azure-blue bg-clip-text text-transparent">
              We Have Answers
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                  id={`faq-item-${i}`}
                >
                  <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="flex-1 text-gray-900 font-semibold text-sm md:text-base">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-14">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
