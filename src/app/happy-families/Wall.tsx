"use client";
import { useEffect, useRef, useState } from "react";
import Img from "@/components/Img";
import { families, mediaUrl } from "@/data";

export default function Wall() {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const n = families.length;

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
      <ul className="wrap columns-2 gap-5 pb-8 md:columns-3 xl:columns-4">
        {families.map((f, i) => (
          <li key={f.url} className="mb-5 break-inside-avoid">
            <button onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }} aria-label={`Open photo ${i + 1} of ${n}`}
              className="block w-full rotate-[var(--r,0deg)] bg-white p-2 pb-8 shadow-[0_6px_0_-2px_var(--color-cocoa)] border-2 border-cocoa transition-transform hover:rotate-0"
              style={{ "--r": `${(i % 5) - 2}deg` } as React.CSSProperties}>
              <div style={{ aspectRatio: `${f.w}/${f.h}` }}><Img m={{ ...f, kind: "image" }} /></div>
            </button>
          </li>
        ))}
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
