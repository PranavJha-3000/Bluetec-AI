"use client";
import { useEffect, useState } from "react";

export default function HeroTag({ labels }: { labels: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % labels.length), 2500);
    return () => clearInterval(t);
  }, [labels.length]);
  return (
    <span className="hand absolute -top-9 left-1/2 z-10 max-w-[70vw] -translate-x-1/2 rotate-[-6deg] whitespace-nowrap rounded-full border-2 border-cocoa bg-milk px-3 py-0.5 text-xs md:-top-11 md:px-4 md:py-1 md:text-base">
      {labels[i]}
    </span>
  );
}
