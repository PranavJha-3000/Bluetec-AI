"use client";
import { useEffect, useRef } from "react";
import Mascot from "./Mascot";

// Small mascot that walks along the bottom edge as the page scrolls (reference behaviour, simplified).
export default function Roamer() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!;
    if (!matchMedia("(min-width:768px) and (prefers-reduced-motion:no-preference)").matches) return;
    let last = scrollY, dir = 1, stop = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const x = max > 0 ? (scrollY / max) * (innerWidth - 90) : 0;
      if (scrollY !== last) dir = scrollY > last ? 1 : -1;
      last = scrollY;
      const meet = document.getElementById("meet")?.getBoundingClientRect();
      const hide = !!meet && meet.top <= 0 && meet.bottom > innerHeight; // Meet has its own mascot
      el.style.opacity = hide ? "0" : "1";
      el.style.transform = `translateX(${x}px) scaleX(${dir})`;
      el.classList.add("tp-bob");
      clearTimeout(stop);
      stop = window.setTimeout(() => el.classList.remove("tp-bob"), 160);
    };
    tick();
    addEventListener("scroll", tick, { passive: true });
    return () => { removeEventListener("scroll", tick); clearTimeout(stop); };
  }, []);
  return <div ref={box} aria-hidden className="pointer-events-none fixed bottom-2 left-0 z-40 hidden w-[4.5rem] transition-opacity duration-300 md:block"><Mascot pose="walk" /></div>;
}
