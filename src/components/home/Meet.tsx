"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { puppies, puppyLabel, type Puppy } from "@/data";
import Img from "@/components/Img";
import Mascot from "./Mascot";

const doorTones = ["bg-[#7a4a2b]", "bg-[#a24a1a]", "bg-[#5a3a2a]"];
const hasVideo = (p: Puppy) => p.media.some((m) => m.kind === "video");
const detail = (p: Puppy) => `${p.breed} · ${p.genderLabel} · ${p.age}${hasVideo(p) ? " · with video" : ""}`;

function Door({ p, open, i }: { p: Puppy; open: boolean; i: number }) {
  return (
    <Link href={`/puppies/${p.slug}`} className="group flex w-full flex-col items-center text-center">
      <h3 className="text-[1.65rem] leading-[0.95] md:text-[1.8rem]">{puppyLabel(p)}</h3>
      <p className="mt-2 mb-4 min-h-10 text-sm text-cocoa-soft">{detail(p)}</p>
      <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-t-full border-[3px] border-b-0 border-cocoa ${open ? "bg-honey-soft" : doorTones[i % 3]}`}>
        {open ? (
          <Img m={p.cover} alt={puppyLabel(p)} />
        ) : (
          <>
            <div aria-hidden className="absolute inset-x-[12%] bottom-0 top-[12%] rounded-t-full border-2 border-milk/25" />
            <svg aria-hidden viewBox="0 0 24 24" className="absolute left-1/2 top-[22%] w-9 -translate-x-1/2 fill-milk/40"><circle cx="5" cy="11" r="2.3" /><circle cx="9.5" cy="6.5" r="2.3" /><circle cx="14.5" cy="6.5" r="2.3" /><circle cx="19" cy="11" r="2.3" /><path d="M12 12c-3 0-6 3-6 6 0 2 2 2.5 6 2.5s6-.5 6-2.5c0-3-3-6-6-6z" /></svg>
            <span aria-hidden className="absolute right-[8%] top-[62%] size-3 rounded-full border-2 border-cocoa bg-honey" />
          </>
        )}
        <span className="hand absolute right-2 top-[8%] z-10 rotate-6 rounded-full border-2 border-cocoa bg-milk px-3 py-0.5 text-sm shadow">Available</span>
      </div>
    </Link>
  );
}

export default function Meet() {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean[]>(() => puppies.map((_, i) => i < 3));

  useEffect(() => {
    const o = outer.current!, s = stage.current!, t = track.current!;
    let raf = 0, last = "", h = "";
    const doors = Array.from(t.children) as HTMLElement[];
    const geom = () => {
      const travel = Math.max(0, t.scrollWidth - window.innerWidth);
      return { travel, scrollLen: travel / 1.25, top: o.getBoundingClientRect().top + window.scrollY }; // ~1.25px travel per scrolled px
    };
    const update = () => {
      raf = 0;
      if (getComputedStyle(s).display === "none") { // mobile / reduced motion: plain grid
        if (h) { o.style.height = ""; t.style.transform = ""; h = ""; }
        return;
      }
      const { travel, scrollLen, top } = geom();
      const nh = `${s.offsetHeight + scrollLen}px`;
      if (nh !== h) { h = nh; o.style.height = nh; }
      const p = scrollLen ? Math.min(1, Math.max(0, (window.scrollY - top) / scrollLen)) : 0;
      const x = -p * travel;
      t.style.transform = `translate3d(${x}px,0,0)`;
      const next = doors.map((d) => { const c = d.offsetLeft + d.offsetWidth / 2 + x; return c > 0 && c < window.innerWidth; });
      const k = next.join();
      if (k !== last) { last = k; setOpen(next); }
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    // focusing an off-screen door would scroll the overflow:hidden stage natively; scroll the page instead
    const onFocus = (e: FocusEvent) => {
      s.scrollLeft = 0;
      const d = (e.target as HTMLElement).closest("[data-door]") as HTMLElement | null;
      const { travel, scrollLen, top } = geom();
      if (!d || !travel) return;
      const p = Math.min(1, Math.max(0, (d.offsetLeft + d.offsetWidth / 2 - window.innerWidth / 2) / travel));
      window.scrollTo(0, top + p * scrollLen);
    };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    t.addEventListener("focusin", onFocus);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); t.removeEventListener("focusin", onFocus); };
  }, []);

  const head = (
    <div className="wrap flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 className="text-[clamp(2.6rem,6.3vw,5.7rem)] leading-[0.95]">Meet the pups</h2>
        <p className="mt-3 text-lg text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
      </div>
      <Link href="/puppies" className="btn btn-primary">See all available puppies</Link>
    </div>
  );

  return (
    <section id="meet" ref={outer} className="relative bg-honey-soft md:motion-safe:h-[4100px]">
      {/* mobile: plain grid */}
      <div className="py-14 md:motion-safe:hidden">
        {head}
        <div className="wrap mt-10 grid grid-cols-2 gap-x-4 gap-y-10">
          {puppies.map((p, i) => <Door key={p.slug} p={p} open i={i} />)}
        </div>
      </div>
      {/* desktop: sticky stage */}
      <div ref={stage} className="sticky top-0 hidden h-screen max-h-[900px] min-h-[560px] flex-col justify-between overflow-hidden pt-[calc(var(--header-h,76px)+1rem)] md:motion-safe:flex">
        {head}
        <div ref={track} className="flex w-max gap-12 px-[var(--gutter)] pb-[7.5rem] will-change-transform">
          {puppies.map((p, i) => (
            <div key={p.slug} data-door className="w-[280px] shrink-0"><Door p={p} open={open[i]} i={i} /></div>
          ))}
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[7.5rem] border-t-[3px] border-cocoa bg-toffee/70" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 175px, color-mix(in srgb, var(--color-cocoa) 15%, transparent) 175px 177px)" }} />
        <Mascot pose="walk" className="absolute bottom-3 left-[16%] z-10 w-32" />
      </div>
    </section>
  );
}
