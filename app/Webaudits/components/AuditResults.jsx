'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RefreshCw, Lock, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

function CircularScore({ score, size = 120, strokeWidth = 8, delay = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(current);
        }
      }, 15);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, score, delay]);

  const offset = circumference - (animatedScore / 100) * circumference;
  const color = score >= 75 ? '#059669' : score >= 45 ? '#d97706' : '#ef4444';

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-gray-900">{animatedScore}</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  );
}

function ScoreBar({ score, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setWidth(score), delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, score, delay]);

  const color = score >= 75 ? 'bg-emerald-500' : score >= 45 ? 'bg-amber-500' : 'bg-rose-500';
  const StatusIcon = score >= 75 ? CheckCircle : score >= 45 ? AlertTriangle : XCircle;
  const statusColor = score >= 75 ? 'text-emerald-500' : score >= 45 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div ref={ref} className="flex items-center gap-3 w-full">
      <StatusIcon className={`w-4 h-4 ${statusColor} flex-shrink-0`} />
      <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-gray-900 font-bold text-sm w-8 text-right">{score}</span>
    </div>
  );
}

export default function AuditResults({ results, categories, onReAudit, onRequestLeadForm }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (key) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  const scoreColor = results.overall >= 75 ? 'text-emerald-600' : results.overall >= 45 ? 'text-amber-600' : 'text-rose-600';
  const scoreBg = results.overall >= 75 ? 'bg-emerald-50' : results.overall >= 45 ? 'bg-amber-50' : 'bg-rose-50';
  const scoreLabel = results.overall >= 75 ? 'Good' : results.overall >= 45 ? 'Needs Work' : 'Critical';

  return (
    <div className="space-y-8">
      {/* Overall score card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-center"
      >
        <p className="text-gray-500 text-sm mb-2">Overall Score for</p>
        <h3 className="text-gray-900 text-xl font-bold mb-6">{results.domain}</h3>

        <div className="flex justify-center mb-4">
          <CircularScore score={results.overall} size={160} strokeWidth={10} />
        </div>

        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${scoreColor} ${scoreBg}`}>
          {results.overall >= 75 ? <CheckCircle className="w-4 h-4" /> : results.overall >= 45 ? <AlertTriangle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {scoreLabel}
        </span>
      </motion.div>

      {/* Category breakdown */}
      <div className="space-y-3">
        {categories.map((cat, i) => {
          const data = results[cat.key];
          const isExpanded = expandedCategory === cat.key;

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(cat.key)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                id={`audit-category-${cat.key}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <cat.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 font-semibold text-sm">{cat.label}</h4>
                  <div className="mt-2">
                    <ScoreBar score={data.score} delay={0.2 + i * 0.1} />
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 border-t border-gray-100"
                >
                  <div className="pt-4 space-y-3">
                    <p className="text-primary-600 text-xs font-semibold uppercase tracking-wider">Recommendations</p>
                    {data.recommendations.map((rec, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="text-primary-500 mt-0.5">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4">
        <motion.button
          onClick={onRequestLeadForm}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange to-primary-600 text-white font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
          id="unlock-full-report-button"
        >
          <Lock className="w-5 h-5" />
          Unlock Full Report + Free Strategy Call
        </motion.button>
        <motion.button
          onClick={onReAudit}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
          id="re-audit-button"
        >
          <RefreshCw className="w-5 h-5" />
          Audit Another Site
        </motion.button>
      </div>
    </div>
  );
}
