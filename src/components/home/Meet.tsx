"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { puppies, type Puppy } from "@/data";
import Img from "@/components/Img";

// Door colours, label rules and scene mechanics follow the reference's own Meet component.
const DOOR = ["#a24a1a", "#5a3a28", "#d4893f", "#b8644a", "#7a4a2e"];
const hasVideo = (p: Puppy) => p.media.some((m) => m.kind === "video");
const title = (p: Puppy) => p.name || p.breed;
const meta = (p: Puppy) => [p.name ? p.breed : "", p.genderLabel.toLowerCase(), p.age].filter(Boolean).join(", ") + (hasVideo(p) ? ", with video" : "");

function Paw() {
  return <svg viewBox="0 0 24 24" className="md-peep fill-current" aria-hidden><circle cx="5" cy="11" r="2.3" /><circle cx="9.5" cy="6.5" r="2.3" /><circle cx="14.5" cy="6.5" r="2.3" /><circle cx="19" cy="11" r="2.3" /><path d="M12 12c-3 0-6 3-6 6 0 2 2 2.5 6 2.5s6-.5 6-2.5c0-3-3-6-6-6z" /></svg>;
}

export default function Meet() {
  const sect = useRef<HTMLElement>(null), range = useRef<HTMLDivElement>(null), hall = useRef<HTMLDivElement>(null), track = useRef<HTMLOListElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width:1024px) and (prefers-reduced-motion:no-preference)");
    const on = () => setPinned(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const r = range.current!, h = hall.current!, t = track.current!;
    if (!pinned) { r.style.height = ""; h.style.removeProperty("--door-w"); h.style.removeProperty("--floor-x"); t.style.transform = ""; t.querySelectorAll<HTMLElement>(".md-door").forEach((d) => (d.dataset.open = "true")); return; }
    const doors = Array.from(t.children) as HTMLElement[];
    let travel = 0, raf = 0;
    const measure = () => {
      const stage = r.firstElementChild as HTMLElement, head = stage.querySelector<HTMLElement>(".md-head")!;
      const plate = Math.max(64, ...Array.from(t.querySelectorAll<HTMLElement>(".md-plate")).map((e) => e.offsetHeight));
      const floor = h.querySelector<HTMLElement>(".md-floor")?.offsetHeight ?? 0;
      const w = Math.max(128, Math.min(256, 0.15 * innerWidth, (stage.clientHeight - (head.offsetTop + head.offsetHeight) - floor - plate - 40) / 1.3));
      h.style.setProperty("--door-w", `${w.toFixed(0)}px`);
      travel = Math.max(0, t.scrollWidth - innerWidth);
      r.style.height = `calc(100vh + ${Math.round(0.8 * travel)}px)`;
    };
    const update = () => {
      raf = 0;
      const top = sect.current!.getBoundingClientRect().top + scrollY, len = r.offsetHeight - innerHeight;
      const p = len > 0 ? Math.min(1, Math.max(0, (scrollY - top) / len)) : 0, x = -p * travel;
      t.style.transform = `translate3d(${x}px,0,0)`;
      h.style.setProperty("--floor-x", `${x.toFixed(1)}px`); // the floor planks travel with the doors
      const edge = 0.36 * innerWidth;
      for (const d of doors) { const o = String(d.offsetLeft + x < edge); if (d.dataset.open !== o) d.dataset.open = o; }
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    const remeasure = () => { measure(); req(); };
    for (const d of doors) d.dataset.open = "false";
    measure(); update();
    addEventListener("scroll", req, { passive: true }); addEventListener("resize", remeasure);
    const ro = new ResizeObserver(remeasure); ro.observe(t);
    // keyboard focus on an off-screen door: scroll the page (not the clipped stage) to it
    const onFocus = (e: FocusEvent) => {
      (r.firstElementChild as HTMLElement).scrollLeft = 0;
      const d = (e.target as HTMLElement).closest<HTMLElement>(".md-door");
      if (!d || !travel) return;
      const p = Math.min(1, Math.max(0, (d.offsetLeft + d.offsetWidth / 2 - innerWidth / 2) / travel));
      scrollTo(0, sect.current!.getBoundingClientRect().top + scrollY + p * (r.offsetHeight - innerHeight));
    };
    t.addEventListener("focusin", onFocus);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", req); removeEventListener("resize", remeasure); ro.disconnect(); t.removeEventListener("focusin", onFocus); };
  }, [pinned]);

  return (
    <section id="meet" ref={sect} aria-labelledby="meet-title" className="md bg-[#fdebc7]" data-pinned={pinned || undefined}>
      <div ref={range}>
        <div className="md-stage">
          <header className="md-head wrap">
            <div>
              <h2 id="meet-title" className="text-[clamp(2.6rem,6.4vw,6.25rem)] leading-[0.95]">Meet the pups</h2>
              <p className="mt-3 max-w-[44ch] text-[clamp(1.125rem,1.4vw,1.375rem)] leading-normal text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
            </div>
            <Link href="/puppies" className="btn btn-primary shrink-0">See all available puppies</Link>
          </header>
          <div ref={hall} className="md-hall">
            <ol ref={track} className="md-track" aria-label="Puppies looking for a family">
              {puppies.map((p, i) => (
                <li key={p.slug} className="md-door" data-open="true">
                  <Link href={`/puppies/${p.slug}`} className="md-link" style={{ "--door": DOOR[i % DOOR.length] } as React.CSSProperties}>
                    <span className="md-plate"><span className="md-name">{title(p)}</span><span className="md-meta">{meta(p)}</span></span>
                    <span className="md-frame">
                      <span className="md-room"><Img m={p.cover} alt={`${title(p)}, ${p.genderLabel.toLowerCase()} ${p.breed} puppy`} /></span>
                      <span aria-hidden className="md-way"><span className="md-leaf"><Paw /><span className="md-knob" /></span></span>
                      <span className="md-tag hand">Available</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="md-door md-door--all" data-open="true">
                <Link href="/puppies" className="md-link"><span className="md-frame md-frame--all"><span className="md-all">Meet them all</span></span></Link>
              </li>
            </ol>
            <div aria-hidden className="md-floor" />
          </div>
        </div>
      </div>
    </section>
  );
}
