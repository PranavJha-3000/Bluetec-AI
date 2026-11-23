"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PuppyCard from "@/components/PuppyCard";
import { puppies } from "@/data";

type F = { breed?: string; gender?: string; origin?: string };
const GROUPS: { key: keyof F; label: string; opts: [string, string][] }[] = [
  { key: "breed", label: "Breed", opts: [["maltipoo", "Maltipoo"], ["poodle", "Poodle"], ["pomeranian", "Pomeranian"], ["cavapoo", "Cavapoo"], ["shih-tzu", "Shih Tzu"]] },
  { key: "gender", label: "Boy or girl", opts: [["male", "Boys"], ["female", "Girls"]] },
  { key: "origin", label: "Where from", opts: [["local", "In Dubai"], ["imported", "Imported"]] },
];

export default function Browser() {
  const sp = useSearchParams();
  const [f, setF] = useState<F>({ breed: sp.get("breed") ?? undefined, gender: sp.get("gender") ?? undefined, origin: sp.get("origin") ?? undefined });

  function toggle(k: keyof F, v: string) {
    const next = { ...f, [k]: f[k] === v ? undefined : v };
    setF(next);
    const q = new URLSearchParams(Object.entries(next).filter(([, x]) => x) as [string, string][]).toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  }
  const list = puppies.filter((p) => (!f.breed || p.breeds.includes(f.breed)) && (!f.gender || p.gender === f.gender) && (!f.origin || p.origin === f.origin));
  const filtered = !!(f.breed || f.gender || f.origin);

  return (
    <section className="wrap pb-8">
      <div className="grid gap-4">
        {GROUPS.map((g) => (
          <div key={g.key} role="group" aria-label={g.label} className="flex flex-wrap items-center gap-2">
            <span className="hand w-28 text-toffee-ink">{g.label}</span>
            {g.opts.map(([v, l]) => (
              <button key={v} aria-pressed={f[g.key] === v} onClick={() => toggle(g.key, v)}
                className={`rounded-full border-2 border-cocoa px-4 py-1.5 font-semibold ${f[g.key] === v ? "bg-cocoa text-milk" : "bg-white"}`}>{l}</button>
            ))}
          </div>
        ))}
      </div>
      <p className="hand mt-8 text-xl" aria-live="polite">
        {filtered ? `${list.length} ${list.length === 1 ? "puppy matches" : "puppies match"}` : `${puppies.length} puppies looking for a home`}
        {filtered && <button onClick={() => { setF({}); window.history.replaceState(null, "", window.location.pathname); }} className="ml-3 underline">Clear filters</button>}
      </p>
      {list.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => <PuppyCard key={p.slug} p={p} />)}</div>
      ) : (
        <div className="card mt-6 p-10 text-center">
          <p className="font-display text-3xl font-extrabold">Nobody here yet</p>
          <p className="mt-2 text-cocoa-soft">Tell us what you&apos;re hoping for and we&apos;ll keep an eye out.</p>
          <Link href="/contact" className="btn btn-primary mt-5">Tell us what you&apos;re hoping for</Link>
        </div>
      )}
      <p className="mt-12 text-center"><Link href="/gone-home" className="btn btn-ghost">Already gone home</Link></p>
    </section>
  );
}
