"use client";
import { useEffect } from 'react';
import { supabase } from '../lib/supabase/server';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const logVisit = async () => {
      try {
        // Simple visit logging
        // In a real app you might check for a 'Do Not Track' header or cookie consent
        // and handle local storage to avoid counting the same user multiple times per session
        
        await supabase.from('visitors').insert({
          page: pathname,
          user_agent: window.navigator.userAgent,
        });
      } catch (error) {
        // Silently fail for analytics to not disturb user experience
        console.error("Tracker error:", error);
      }
    };

    logVisit();
  }, [pathname]);

  return null; // This component renders nothing
}
