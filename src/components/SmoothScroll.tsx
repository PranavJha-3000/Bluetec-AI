"use client";
import { useEffect } from "react";

// Wheel smoothing with no library. Constants fitted to the reference's Lenis by sampling scrollY per frame after one 300px wheel tick:
// it travels 85% of the delta (wheel multiplier .85) and eases out exponentially, tau ~165ms (55% done at 100ms, 86% at 300ms, 97% at 600ms). Touch, keyboard and programmatic scrolls stay native.
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let target = scrollY, raf = 0, prev = 0;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const step = (now: number) => {
      const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 1 / 60; prev = now;
      const d = target - scrollY;
      if (Math.abs(d) < 0.5) { scrollTo({ top: target, behavior: "instant" }); raf = 0; prev = 0; return; }
      scrollTo({ top: scrollY + d * (1 - Math.exp(-dt / 0.165)), behavior: "instant" }); // instant: html has scroll-behavior:smooth for anchors
      raf = requestAnimationFrame(step);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || e.deltaX) return;
      for (let n = e.target as HTMLElement | null; n && n !== document.body; n = n.parentElement) { // let inner scrollers keep their wheel
        const o = getComputedStyle(n).overflowY;
        if ((o === "auto" || o === "scroll") && n.scrollHeight > n.clientHeight) return;
      }
      e.preventDefault();
      if (!raf) target = scrollY;
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1;
      target = Math.min(max(), Math.max(0, target + e.deltaY * unit * 0.86));
      if (!raf) { prev = 0; raf = requestAnimationFrame(step); }
    };
    const onScroll = () => { if (!raf) target = scrollY; };
    addEventListener("wheel", onWheel, { passive: false });
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("wheel", onWheel); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
