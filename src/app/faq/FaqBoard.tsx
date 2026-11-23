"use client";
import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/data";

export default function FaqBoard() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const needle = q.trim().toLowerCase();
  const list = faqs.map((f, i) => ({ ...f, i })).filter((f) => (f.question + f.answer).toLowerCase().includes(needle));
  return (
    <section className="wrap mx-auto max-w-3xl pb-8">
      <label className="block">
        <span className="sr-only">Search questions</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="sniff out a question…" className="hand w-full rounded-full border-[3px] border-cocoa bg-white px-6 py-3 text-lg" />
      </label>
      <p className="hand mt-3 text-center text-cocoa-soft" aria-live="polite">
        {list.length === faqs.length ? `${faqs.length} notes on the board` : `${list.length} of ${faqs.length} notes`}
      </p>
      <ul className="mt-6 grid gap-4">
        {list.map((f) => (
          <li key={f.i} className="card bg-honey-soft shadow-[0_6px_0_-2px_var(--color-cocoa)]">
            <h2 className="text-xl">
              <button aria-expanded={open === f.i} aria-controls={`a${f.i}`} onClick={() => setOpen(open === f.i ? null : f.i)} className="flex w-full justify-between gap-4 p-5 text-left">
                {f.question}
                <span aria-hidden>{open === f.i ? "–" : "+"}</span>
              </button>
            </h2>
            <div id={`a${f.i}`} hidden={open !== f.i} className="px-5 pb-5 text-cocoa-soft">{f.answer}</div>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-8 text-center">No notes match. Try another word, or ask us directly.</p>}
      <p className="mt-10 text-center"><Link href="/contact" className="btn btn-primary">Ask your own question</Link></p>
    </section>
  );
}
