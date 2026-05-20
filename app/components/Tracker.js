"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabase/server";
import { usePathname } from "next/navigation";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const logVisit = async () => {
      try {
        await supabase.from("visitors").insert({
          page: pathname,
          user_agent: window.navigator.userAgent,
        });
      } catch (error) {
        console.error("Tracker error:", error);
      }
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => logVisit(), { timeout: 5000 });
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(logVisit, 2000);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
