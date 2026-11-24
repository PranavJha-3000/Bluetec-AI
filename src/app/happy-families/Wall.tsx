"use client";
import { useEffect, useRef, useState } from "react";
import Img from "@/components/Img";
import { families, mediaUrl } from "@/data";
import { PRINTS } from "./meta";

const PAW = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export default function Wall() {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const n = families.length;
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  // Prints drop onto the wall as they scroll into view (SSR renders them all visible).
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      const hit = es.filter((e) => e.isIntersecting).map((e) => Number((e.target as HTMLElement).dataset.idx));
      if (!hit.length) return;
      setSeen((s) => new Set([...s, ...hit]));
      es.forEach((e) => e.isIntersecting && io.unobserve(e.target));
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".hf-wall__item").forEach((el) => io.observe(el));
    setArmed(true);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpen((o) => (o! + 1) % n);
      if (e.key === "ArrowLeft") setOpen((o) => (o! - 1 + n) % n);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open, n]);

  function close() { setOpen(null); opener.current?.focus(); }

  return (
    <>
      <ul className="hf-wall" aria-label="Photos from TeddyPups families">
        {families.map((f, i) => {
          const [tilt, tape, tapes, delay] = PRINTS[i % PRINTS.length];
          return (
            <li key={f.url} className="hf-wall__item" data-idx={i} data-armed={armed ? "" : undefined} data-revealed={armed && seen.has(i) ? "" : undefined} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
              <button type="button" className="hf-wall__print" onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }} aria-label={`Open photo ${i + 1} of ${n}`}>
                <span className="hf-polaroid" style={{ "--tilt": `${tilt}deg`, "--tape": tape } as React.CSSProperties}>
                  {tapes.split("+").map((t) => <span key={t} aria-hidden className={`hf-tape hf-tape--${t}`} />)}
                  <span className="hf-polaroid__photo" style={{ aspectRatio: `${f.w}/${f.h}` }}><Img m={{ ...f, kind: "image" }} eager={i < 4} /></span>
                  <span className="hf-polaroid__caption font-scrawl" />
                </span>
                <svg viewBox="0 0 64 64" className="hf-wall__paw" aria-hidden fill="currentColor"><path d={PAW} /></svg>
              </button>
            </li>
          );
        })}
      </ul>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-cocoa/95 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(families[open].url)} alt={families[open].alt} className="max-h-[75vh] max-w-full rounded-lg border-4 border-milk object-contain" />
          <p className="hand text-milk">{open + 1} / {n}</p>
          <div className="flex gap-3">
            <button className="btn btn-ghost" onClick={() => setOpen((open - 1 + n) % n)}>Previous</button>
            <button className="btn btn-ghost" onClick={() => setOpen((open + 1) % n)}>Next</button>
            <button autoFocus className="btn btn-primary" onClick={close}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
