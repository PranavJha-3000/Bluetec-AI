"use client";
import { useState } from "react";
import { journeys } from "@/data";

export default function Tabs() {
  const [i, setI] = useState(0);
  const j = journeys[i];
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") setI((i + 1) % journeys.length);
  };
  return (
    <div>
      <div role="tablist" aria-label="Journey" onKeyDown={key} className="mx-auto flex w-fit rounded-full border-[3px] border-cocoa bg-white p-1">
        {journeys.map((t, n) => (
          <button key={t.key} role="tab" id={`t-${t.key}`} aria-selected={i === n} aria-controls="panel" tabIndex={i === n ? 0 : -1} onClick={() => setI(n)}
            className={`rounded-full px-6 py-2 font-bold ${i === n ? "bg-cocoa text-milk" : ""}`}>
            {t.label} <span className="hand text-sm font-normal">{t.hint}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="panel" aria-labelledby={`t-${j.key}`} className="mt-10">
        <h2 className="text-4xl">{j.heading}</h2>
        <p className="mt-3 max-w-2xl text-cocoa-soft">{j.body}</p>
        {j.note && <p className="hand mt-3 text-toffee-ink">{j.note}</p>}
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {j.steps.map((s, n) => (
            <li key={s.title} className="card p-6">
              <span className="hand text-toffee-ink">step {n + 1}</span>
              <h3 className="text-2xl">{s.title}</h3>
              <p className="mt-2 text-cocoa-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
