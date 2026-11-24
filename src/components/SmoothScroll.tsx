"use client";
import { useEffect } from "react";

// Wheel smoothing (lerp 0.1, like the reference's Lenis) with no library. Touch, keyboard and programmatic scrolls stay native.
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let target = scrollY, raf = 0, last = 0;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const step = () => {
      const d = target - scrollY;
      if (Math.abs(d) < 0.5) { scrollTo(0, target); raf = 0; return; }
      last = scrollY + d * 0.1;
      scrollTo(0, last);
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
      target = Math.min(max(), Math.max(0, target + e.deltaY * unit));
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onScroll = () => { if (!raf) target = scrollY; };
    addEventListener("wheel", onWheel, { passive: false });
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("wheel", onWheel); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
