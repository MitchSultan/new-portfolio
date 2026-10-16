'use client';
import React, { useEffect, useRef, useState } from 'react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neutral-900';

const fieldClass =
  'h-14 w-full bg-transparent text-base placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900';

function Field({ id, label, optional, children }) {
  return (
    <div className='border-t border-neutral-300 px-4 pt-3 md:px-6'>
      <label htmlFor={id} className='block text-sm text-neutral-500'>
        {label}
        {optional && <span> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

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

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Pick up the audited URL each time the form opens; reset the success state when it closes
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, website: prev.website || prefilledUrl || '' }));
    } else {
      setSubmitted(false);
    }
  }, [isOpen, prefilledUrl]);

  // Scroll lock, initial focus, Escape + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

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
    // TODO: this is simulated. Nothing is sent anywhere yet — post `formData`
    // to your backend / WhatsApp / CRM here before shipping.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50'>
      <div aria-hidden className='fixed inset-0 bg-neutral-900/60' />

      <div
        className='fixed inset-0 overflow-y-auto overscroll-contain'
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role='dialog'
          aria-modal='true'
          aria-labelledby='lead-form-title'
          className='relative mx-auto my-4 w-[calc(100%-2rem)] max-w-[640px] animate-fadeIn border border-neutral-900 bg-white text-neutral-900 md:my-10'
        >
          {/* Top bar */}
          <div className='flex items-center justify-between'>
            <p className='px-4 py-4 text-sm text-neutral-500 md:px-6'>
              {submitted ? 'Request received' : 'Full report'}
            </p>
            <button
              type='button'
              onClick={onClose}
              id='lead-form-close'
              className={`border-l border-neutral-900 px-5 py-4 text-sm font-semibold transition-colors hover:bg-neutral-900 hover:text-white ${focusRing}`}
            >
              Close
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className='border-t border-neutral-900 px-4 py-8 md:px-6'>
                <h2
                  id='lead-form-title'
                  className='font-display text-3xl font-semibold leading-[1] tracking-tighter md:text-4xl'
                >
                  Get your full report
                </h2>
                <p className='mt-4 max-w-md text-base leading-relaxed text-neutral-600'>
                  Plus a free 15-minute strategy call to walk through your
                  results and build a custom growth plan for your Nairobi
                  business.
                </p>
              </div>

              <Field id='lead-form-name' label='Full name'>
                <input
                  ref={firstFieldRef}
                  id='lead-form-name'
                  name='name'
                  type='text'
                  required
                  autoComplete='name'
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>

              <Field id='lead-form-email' label='Email address'>
                <input
                  id='lead-form-email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>

              <Field id='lead-form-phone' label='Phone'>
                <input
                  id='lead-form-phone'
                  name='phone'
                  type='tel'
                  required
                  autoComplete='tel'
                  placeholder='e.g. 0712 345 678'
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>

              <Field id='lead-form-business' label='Business name' optional>
                <input
                  id='lead-form-business'
                  name='business'
                  type='text'
                  autoComplete='organization'
                  value={formData.business}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>

              <Field id='lead-form-website' label='Website URL'>
                <input
                  id='lead-form-website'
                  name='website'
                  type='text'
                  inputMode='url'
                  value={formData.website}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>

              <label
                htmlFor='lead-form-whatsapp'
                className='flex cursor-pointer items-center gap-3 border-t border-neutral-300 px-4 py-5 text-base md:px-6'
              >
                <input
                  id='lead-form-whatsapp'
                  name='whatsapp'
                  type='checkbox'
                  checked={formData.whatsapp}
                  onChange={handleChange}
                  className='size-5 accent-neutral-900'
                />
                Send me the report via WhatsApp too
              </label>

              <button
                type='submit'
                id='lead-form-submit'
                disabled={isSubmitting}
                className={`bg-blaze-orange flex min-h-[6rem] w-full items-end justify-between border-t border-neutral-900 px-6 py-6 text-left text-lg font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white disabled:opacity-60 disabled:hover:bg-blaze-orange disabled:hover:text-neutral-900 ${focusRing}`}
              >
                <span>
                  {isSubmitting
                    ? 'Sending...'
                    : 'Get my full report + free strategy call'}
                </span>
                <span aria-hidden>→</span>
              </button>

              <p className='border-t border-neutral-900 px-4 py-4 text-sm text-neutral-500 md:px-6'>
                No spam ever. Your data is used solely to deliver your report.
              </p>
            </form>
          ) : (
            <div role='status'>
              <div className='border-t border-neutral-900 px-4 py-8 md:px-6'>
                <h2
                  id='lead-form-title'
                  className='font-display text-3xl font-semibold leading-[1] tracking-tighter md:text-4xl'
                >
                  You&apos;re in
                </h2>
                <p className='mt-4 max-w-md text-base leading-relaxed text-neutral-600'>
                  Your full report is being prepared. Expect a WhatsApp message
                  within 2 hours with your detailed analysis and a link to book
                  your free strategy call.
                </p>
              </div>
              <p className='border-t border-neutral-300 px-4 py-5 text-base md:px-6'>
                <span className='font-semibold'>Next step:</span> check your
                WhatsApp for a message from Mitch.
              </p>
              <button
                type='button'
                onClick={onClose}
                className={`flex min-h-[5rem] w-full items-end justify-between border-t border-neutral-900 px-6 py-5 text-left text-lg font-semibold transition-colors hover:bg-neutral-900 hover:text-white ${focusRing}`}
              >
                <span>Close this window</span>
                <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}