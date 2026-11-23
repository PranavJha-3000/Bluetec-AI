"use client";
import { useEffect, useRef, useState } from "react";
import Mascot from "./Mascot";

// Small mascot that walks along the bottom edge as the page scrolls (reference behaviour, simplified).
export default function Roamer() {
  const box = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);
  useEffect(() => {
    const el = box.current!;
    if (!matchMedia("(prefers-reduced-motion:no-preference)").matches) return;
    let last = scrollY, dir = 1, stop = 0, lastDot = -999;
    const tick = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const x = max > 0 ? (scrollY / max) * (innerWidth - el.offsetWidth) : 0;
      if (scrollY !== last) dir = scrollY > last ? 1 : -1;
      last = scrollY;
      const foot = document.querySelector("footer")?.getBoundingClientRect();
      const hide = scrollY < 120 || (!!foot && foot.top < innerHeight - 60); // hero has its own peeking pup; footer has the basket pup
      el.style.opacity = hide ? "0" : "1";
      el.style.transform = `translateX(${x}px) scaleX(${dir})`;
      el.classList.add("is-walking");
      setMoving(true);
      if (!hide && Math.abs(x - lastDot) > 56) { // paw print dot left behind
        lastDot = x;
        const d = document.createElement("span");
        d.className = "tp-dot pointer-events-none fixed bottom-3 z-30 size-2.5 rounded-full bg-toffee-ink/50";
        d.style.left = `${x + 34}px`;
        d.addEventListener("animationend", () => d.remove());
        document.body.append(d);
      }
      clearTimeout(stop);
      stop = window.setTimeout(() => { el.classList.remove("is-walking"); setMoving(false); }, 400);
    };
    tick();
    addEventListener("scroll", tick, { passive: true });
    return () => { removeEventListener("scroll", tick); clearTimeout(stop); };
  }, []);
  return <div ref={box} aria-hidden className="pointer-events-none tp-walker fixed bottom-[4.5rem] left-0 z-40 w-16 transition-opacity duration-300 md:bottom-2 md:w-24"><Mascot pose={moving ? "walk" : "sit"} /></div>;
}
