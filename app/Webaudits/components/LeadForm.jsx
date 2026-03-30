'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, MessageSquare, User, Mail, Phone, Building, Globe } from 'lucide-react';

export default function LeadForm({ isOpen, onClose, prefilledUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    website: prefilledUrl || '',
    whatsapp: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden"
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-orange via-primary-500 to-primary-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors z-10"
            id="lead-form-close"
          >
            <X className="w-4 h-4" />
          </button>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/10 to-primary-100 border border-primary-200 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Get Your Full Report</h3>
                  <p className="text-gray-500 mt-2 text-sm">
                    Plus a free 15-minute strategy call to walk through your results
                    and build a custom growth plan for your Nairobi business.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm transition-all"
                      id="lead-form-name"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm transition-all"
                      id="lead-form-email"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone (e.g. 0712 345 678)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm transition-all"
                      id="lead-form-phone"
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="business"
                      type="text"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Business Name (optional)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm transition-all"
                      id="lead-form-business"
                    />
                  </div>

                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Website URL"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm transition-all"
                      id="lead-form-website"
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group" htmlFor="lead-form-whatsapp">
                    <div className="relative">
                      <input
                        name="whatsapp"
                        type="checkbox"
                        checked={formData.whatsapp}
                        onChange={handleChange}
                        className="sr-only"
                        id="lead-form-whatsapp"
                      />
                      <div className={`w-5 h-5 rounded border ${formData.whatsapp ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'} flex items-center justify-center transition-all`}>
                        {formData.whatsapp && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      Send me the report via WhatsApp too
                    </div>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange to-primary-600 text-white font-bold text-base shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    id="lead-form-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get My Full Report + Free Strategy Call
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-gray-400">
                    No spam ever. Your data is used solely to deliver your report.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </motion.div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">You&apos;re In</h3>
                <p className="text-gray-500 mb-6">
                  Your full report is being prepared. Expect a WhatsApp message within 2 hours
                  with your detailed analysis and a link to book your free strategy call.
                </p>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
                  <strong>Next step:</strong> Check your WhatsApp for a message from Mitch
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                >
                  Close this window
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
