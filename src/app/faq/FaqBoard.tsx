"use client";
import { useId, useState } from "react";
import Mascot from "@/components/home/Mascot";
import { faqs, SITE } from "@/data";

const TILT = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4, -1.6];
const PIN = ["var(--color-toffee)", "var(--color-sky-deep)", "#d9a13c", "#c45a6a"];

function Mark({ text, needle }: { text: string; needle: string }) {
  if (!needle) return <>{text}</>;
  const i = text.toLowerCase().indexOf(needle);
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + needle.length)}</mark>{text.slice(i + needle.length)}</>;
}

export default function FaqBoard() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const sid = useId();
  const needle = q.trim().toLowerCase();
  const list = faqs.map((f, i) => ({ ...f, i })).filter((f) => (f.question + f.answer).toLowerCase().includes(needle));
  return (
    <div className="fq-notes" data-open={open !== null ? "" : undefined}>
      <aside className="fq-notes__side" aria-label="Find a question">
        <label htmlFor={sid} className="font-scrawl fq-notes__label">sniff out a question</label>
        <div className="fq-notes__search">
          <svg viewBox="0 0 24 24" aria-hidden className="fq-notes__lens"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
          <input id={sid} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="delivery, Korea, vaccinated…" autoComplete="off" />
        </div>
        <p className="fq-notes__count" aria-live="polite">{list.length === faqs.length ? `${faqs.length} notes on the board` : `${list.length} of ${faqs.length} notes`}</p>
        <div className="fq-notes__teddy">
          <span aria-hidden className="fq-notes__bubble font-plush"><span className="fq-notes__q">?</span><span className="fq-notes__a">!</span></span>
          <Mascot pose="sit" />
        </div>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-wa fq-notes__ask">Ask your own question</a>
      </aside>
      <div className="fq-notes__board">
        <ul className="fq-notes__list">
          {list.map((f, n) => {
            const on = open === f.i;
            return (
              <li key={f.i} className="fq-note" data-unfolded={on ? "" : undefined} style={{ "--tilt": `${TILT[f.i % 9]}deg`, "--pin": PIN[f.i % 4], "--i": n } as React.CSSProperties}>
                <span aria-hidden className="fq-note__pin" />
                <h2 className="fq-note__q">
                  <button type="button" id={`q${f.i}`} aria-expanded={on} aria-controls={`a${f.i}`} onClick={() => setOpen(on ? null : f.i)}>
                    <span className="font-plush-text"><Mark text={f.question} needle={needle} /></span>
                    <span aria-hidden className="fq-note__chevron" />
                  </button>
                </h2>
                <div id={`a${f.i}`} role="region" aria-labelledby={`q${f.i}`} className="fq-note__answer" inert={!on}>
                  <div className="fq-note__flap"><p>{f.answer}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
        {list.length === 0 && <p className="mt-8 text-center">No notes match. Try another word, or ask us directly.</p>}
      </div>
    </div>
  );
}
