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
    if (!svg) return;
    if (!matchMedia("(prefers-reduced-motion:no-preference)").matches) { el.style.display = "none"; return; } // static page: no roaming dog, the basket pup stays
    const rig = new Rig(svg, "sit", 1);
    let lastY = scrollY, lastX = 0, lastDot = -999, stopAt = 0, raf = 0, prev = 0, started = false;
    const loop = (now: number) => {
      const dt = prev ? (now - prev) / 1000 : 0.016; prev = now;
      if (now > stopAt && rig.strideTarget) { rig.stride(0); rig.setPose("sit"); }
      rig.tick(dt, now / 1000);
      if (now < stopAt || !rig.settled) raf = requestAnimationFrame(loop); else { raf = 0; prev = 0; }
    };
    // Phones (reference "lane" mode): the dog is docked, half off the left edge above the bottom bar, and trots out to the
    // right while the Paths, Passport and Night scenes are on screen (measured: x -72px docked / 205px out at 390 wide).
    const smooth = (t: number) => { const c = Math.min(1, Math.max(0, t)); return c * c * (3 - 2 * c); };
    const laneX = () => {
      let k = 0;
      for (const id of ["paths", "passport", "night"]) {
        const sec = document.getElementById(id); if (!sec) continue;
        const top = sec.getBoundingClientRect().top + scrollY, a = top - 420, b = top + 620;
        k = Math.max(k, smooth((scrollY - (a - 250)) / 250) * (1 - smooth((scrollY - b) / 250)));
      }
      return -0.185 * innerWidth + k * 0.711 * innerWidth;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const m = document.getElementById("meet")?.getBoundingClientRect();
      const lane = innerWidth < 768;
      const pinned = innerWidth >= 1024 && !!m && m.top <= 0 && m.bottom >= innerHeight; // Meet scene: the dog walks on the spot beside the moving floor
      if (pinned) {
        const floor = Math.min(128, Math.max(80, 0.13 * innerHeight));
        el.style.width = `${Math.min(224, Math.max(176, Math.min(0.14 * innerWidth, 0.24 * innerHeight)))}px`;
        el.style.bottom = `${floor * 0.42}px`;
      } else if (lane) { el.style.width = "180px"; el.style.bottom = "calc(var(--bar-h) - 3rem)"; } else { el.style.width = ""; el.style.bottom = ""; }
      const w = el.offsetWidth;
      let x = pinned ? 0.14 * innerWidth : lane ? laneX() : max > 0 ? (scrollY / max) * (innerWidth - w) : 0;
      const bk = document.getElementById("footer-basket")?.getBoundingClientRect();
      // the hop is driven by the basket itself: it starts 350px before the basket is fully on screen and lands as it arrives
      const t = bk && !pinned ? Math.min(1, Math.max(0, 1 - (bk.top + bk.height * 0.9 + 20 - innerHeight) / 350)) : 0, e = t * t * (3 - 2 * t);
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
    // The pup's eyes follow the pointer (fine pointers only); gaze eases back to centre while it walks.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = el.getBoundingClientRect();
      rig.look((e.clientX - (b.left + b.width / 2)) / (innerWidth * 0.4), (e.clientY - (b.top + b.height * 0.3)) / (innerHeight * 0.4));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", onMove, { passive: true });
    let queued = 0;
    const onScrollFrame = () => { if (!queued) queued = requestAnimationFrame(() => { queued = 0; onScroll(); }); }; // at most one layout read per frame
    onScroll();
    addEventListener("scroll", onScrollFrame, { passive: true });
    addEventListener("resize", onScrollFrame);
    rig.tick(0.016, 0); // apply the sit pose
    return () => { removeEventListener("pointermove", onMove); removeEventListener("scroll", onScrollFrame); removeEventListener("resize", onScrollFrame); cancelAnimationFrame(raf); cancelAnimationFrame(queued); };
  }, []);
  return <div ref={box} data-roamer aria-hidden className="pointer-events-none fixed bottom-[4.5rem] left-0 z-40 w-24 transition-opacity duration-300 md:bottom-2 md:w-36"><Mascot pose="walk" /></div>;
}
