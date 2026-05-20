"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TextCursor = dynamic(() => import("./textcursor"), { ssr: false });

export default function TextCursorLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const enable = () => setShow(true);

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(enable, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(enable, 2000);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden>
      <TextCursor />
    </div>
  );
}
