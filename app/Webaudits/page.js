'use client';
import React, { useState, useRef, useCallback } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Breadcrumbs from '../components/Breadcrumbs';
import AuditHero from './components/AuditHero';
import MarketInsights from './components/MarketInsights';
import WhyFunnels from './components/WhyFunnels';
import AuditTool from './components/AuditTool';
import LeadForm from './components/LeadForm';
import SocialProof from './components/SocialProof';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';

export default function WebAuditsPage() {
  const [auditUrl, setAuditUrl] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const auditRef = useRef(null);

  const handleStartAudit = useCallback((url) => {
    setAuditUrl(url);
    // Scroll to the audit tool section
    setTimeout(() => {
      auditRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, []);

  const handleScrollToAudit = useCallback(() => {
    setAuditUrl('');
    setTimeout(() => {
      auditRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  return (
    <div className=" min-h-screen  overflow-x-hidden">
      <Navbar />
      <Breadcrumbs items={[{ name: 'Website audit', href: '/Webaudits' }]} />
      {/* Hero with URL input */}
      <AuditHero onStartAudit={handleStartAudit} />

      {/* Market data — creates urgency */}
      <MarketInsights />

      {/* Problem → Solution education */}
      <WhyFunnels />

      {/* Core interactive audit tool */}
      <div ref={auditRef}>
        <AuditTool
          initialUrl={auditUrl}
          onRequestLeadForm={() => setShowLeadForm(true)}
        />
      </div>

      {/* Social proof */}
      <SocialProof />

      {/* FAQ — objection handling */}
      <FaqSection />

      {/* Final CTA */}
      <FinalCta onScrollToAudit={handleScrollToAudit} />

      {/* Lead capture modal */}
      <LeadForm
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        prefilledUrl={auditUrl}
      />
      <Footer />
    </div>
  );
}
