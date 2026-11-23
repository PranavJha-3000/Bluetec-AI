"use client";
import { useEffect, useRef, useState } from "react";

const PAD = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z";
const TOES: [number, number, number, number, number][] = [[14.6, 29.5, 4.6, 6.4, -0.5], [24.2, 16.6, 4.6, 6.4, -0.15], [36, 16.6, 4.6, 6.4, 0.15], [49.4, 29.5, 4.6, 6.4, 0.5]];
const GAP = 36, LIFE = 1000, HOLD = 600, MQ = "(hover:hover) and (pointer:fine)", RM = "(prefers-reduced-motion: reduce)";

type Print = { x: number; y: number; a: number; t: number };

export default function PawTrail() {
  const [on, setOn] = useState(false); // false on server + first client render: no hydration diff
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = matchMedia(MQ), rm = matchMedia(RM);
    const sync = () => setOn(fine.matches && !rm.matches);
    sync();
    fine.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => { fine.removeEventListener("change", sync); rm.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!on || !cv || !ctx) return;
    const dpr = () => Math.min(devicePixelRatio || 1, 2);
    const pad = new Path2D(PAD), toes = new Path2D();
    TOES.forEach(([x, y, rx, ry, r]) => { toes.moveTo(x + rx * Math.cos(r), y + rx * Math.sin(r)); toes.ellipse(x, y, rx, ry, r, 0, Math.PI * 2); });
    let prints: Print[] = [], raf = 0, last: { x: number; y: number } | null = null, side = 1;

    const resize = () => { cv.width = innerWidth * dpr(); cv.height = innerHeight * dpr(); };
    const frame = (now: number) => {
      raf = 0;
      prints = prints.filter((p) => now - p.t < LIFE);
      ctx.clearRect(0, 0, cv.width, cv.height);
      const k = 0.27 * dpr();
      ctx.fillStyle = "#8e3f15"; // --color-toffee-ink
      for (const p of prints) {
        const age = now - p.t;
        ctx.globalAlpha = 0.42 * (age < HOLD ? 1 : 1 - (age - HOLD) / (LIFE - HOLD));
        ctx.setTransform(k, 0, 0, k, 0, 0);
        ctx.translate(p.x / 0.27, p.y / 0.27);
        ctx.rotate(p.a);
        ctx.translate(-32, -32);
        ctx.fill(pad); ctx.fill(toes);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (prints.length) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      if (!last) { last = { x: e.clientX, y: e.clientY }; return; }
      const dx = e.clientX - last.x, dy = e.clientY - last.y, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
      for (let n = Math.floor(d / GAP); n > 0; n--) { // one print per GAP px travelled, even on fast jumps
        const off = 7 * (side = -side);
        last.x += (dx / d) * GAP; last.y += (dy / d) * GAP;
        prints.push({ x: last.x - Math.sin(a) * off, y: last.y + Math.cos(a) * off, a: a + Math.PI / 2, t: performance.now() });
      }
      if (prints.length && !raf) raf = requestAnimationFrame(frame);
    };
    const leave = () => { last = null; };
    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { removeEventListener("resize", resize); removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [on]);

  return on ? <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] h-screen w-screen" /> : null;
}
