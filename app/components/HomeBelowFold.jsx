"use client";

import dynamic from "next/dynamic";

const Exper = dynamic(() => import("./exper"), {
  loading: () => <div className="min-h-[50vh]" aria-hidden />,
});

const TextCursorLoader = dynamic(() => import("./TextCursorLoader"), {
  ssr: false,
});

export default function HomeBelowFold() {
  return (
    <>
      <TextCursorLoader />
      <Exper />
    </>
  );
}
