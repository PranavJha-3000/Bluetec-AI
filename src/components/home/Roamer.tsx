"use client";
import { useEffect, useRef } from "react";
import Mascot from "./Mascot";
import { Rig } from "./rig";

// The one dog: walks along the bottom edge as the page scrolls (position = scroll progress, stride = distance walked,
// turns smoothly when the scroll direction flips, sits when you stop). Rig is a port of the reference's own mascot rig.
export default function Roamer() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!, svg = el.querySelector("svg");
    if (!svg || !matchMedia("(prefers-reduced-motion:no-preference)").matches) return;
    const rig = new Rig(svg, "sit", 1);
    let lastY = scrollY, lastX = 0, lastDot = -999, stopAt = 0, raf = 0, prev = 0, started = false;
    const loop = (now: number) => {
      const dt = prev ? (now - prev) / 1000 : 0.016; prev = now;
      if (now > stopAt && rig.strideTarget) { rig.stride(0); rig.setPose("sit"); }
      rig.tick(dt, now / 1000);
      if (now < stopAt || !rig.settled) raf = requestAnimationFrame(loop); else { raf = 0; prev = 0; }
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const m = document.getElementById("meet")?.getBoundingClientRect();
      const pinned = innerWidth >= 1024 && !!m && m.top <= 0 && m.bottom >= innerHeight; // Meet scene: the dog walks on the spot beside the moving floor
      if (pinned) {
        const floor = Math.min(128, Math.max(80, 0.13 * innerHeight));
        el.style.width = `${Math.min(224, Math.max(176, Math.min(0.14 * innerWidth, 0.24 * innerHeight)))}px`;
        el.style.bottom = `${floor * 0.42}px`;
      } else { el.style.width = ""; el.style.bottom = ""; }
      const w = el.offsetWidth;
      let x = pinned ? 0.14 * innerWidth : max > 0 ? (scrollY / max) * (innerWidth - w) : 0;
      const foot = document.querySelector("footer")?.getBoundingClientRect(), bk = document.getElementById("footer-basket")?.getBoundingClientRect();
      // near the footer the dog leaves its lane, hops along an arc and lands in the basket (the basket pup appears on landing)
      const t = foot && bk && !pinned ? Math.min(1, Math.max(0, (innerHeight - foot.top - 150) / 350)) : 0, e = t * t * (3 - 2 * t);
      let y = 0;
      if (t > 0 && bk) {
        const bottom = parseFloat(getComputedStyle(el).bottom) || 0;
        x += (bk.left + bk.width * (212 / 300) - w / 2 - x) * e;
        y = (bk.top + bk.height * 0.62 - (innerHeight - bottom)) * e - Math.sin(Math.PI * t) * 90;
      }
      const inBasket = t >= 1;
      document.documentElement.dataset.basket = inBasket ? "in" : "armed";
      const hide = inBasket || (!pinned && scrollY < 120); // hero has its own peeking pup; the basket pup takes over on landing
      el.style.opacity = hide ? "0" : "1";
      el.style.transform = `translate(${x}px,${y}px)`;
      const moved = pinned ? Math.abs(scrollY - lastY) * 1.25 : Math.abs(x - lastX); // the track travels 1.25px per scrolled px
      if (!started) { started = true; lastX = x; lastY = scrollY; return; }
      if (t > 0 && t < 1) rig.face(1); else if (scrollY !== lastY) rig.face(pinned || scrollY > lastY ? 1 : -1);
      lastY = scrollY;
      rig.advance((moved * 300) / w); lastX = x; // viewBox is 300 wide
      rig.stride(1); rig.setPose(t > 0.7 && t < 1 ? "hop" : "walk");
      stopAt = performance.now() + 350;
      if (!raf) raf = requestAnimationFrame(loop);
      if (!hide && Math.abs(x - lastDot) > 56) { // paw print dot left behind
        lastDot = x;
        const d = document.createElement("span");
        d.className = "tp-dot pointer-events-none fixed bottom-3 z-30 size-2.5 rounded-full bg-toffee-ink/50";
        d.style.left = `${x + w * 0.36}px`;
        d.addEventListener("animationend", () => d.remove());
        document.body.append(d);
      }
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    rig.tick(0.016, 0); // apply the sit pose
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={box} aria-hidden className="pointer-events-none fixed bottom-[4.5rem] left-0 z-40 w-24 transition-opacity duration-300 md:bottom-2 md:w-36"><Mascot pose="walk" /></div>;
}
