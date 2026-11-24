"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Img from "@/components/Img";
import { gone, puppies, puppyLabel, type Puppy } from "@/data";
import { inkFor, washFor } from "./art";

type F = { breed?: string; gender?: string; origin?: string };
const GROUPS: { key: keyof F; label: string; opts: [string, string][] }[] = [
  { key: "origin", label: "Where from", opts: [["local", "In Dubai"], ["imported", "Imported"]] },
  { key: "breed", label: "Breed", opts: [["maltipoo", "Maltipoo"], ["poodle", "Poodle"], ["pomeranian", "Pomeranian"], ["cavapoo", "Cavapoo"], ["shih-tzu", "Shih Tzu"]] },
  { key: "gender", label: "Boy or girl", opts: [["male", "Boys"], ["female", "Girls"]] },
];
const WASHES = ["#f2be6b", "#bfddf5", "#f9cdbf", "#fbe3b4", "#e8c39a"];
const TILTS = [0.36, -0.61, 1.07, -0.34, 2.24, -1.8, 0.19, 2.12, 1.47, 0.09];
const style = (i: number, wash = WASHES[i % WASHES.length]) => ({ "--tilt": `${TILTS[i % TILTS.length]}deg`, "--d": `${(i % 8) * 70}ms`, "--wash": wash }) as React.CSSProperties;
const Svg = ({ html }: { html: string }) => <span aria-hidden className="contents" dangerouslySetInnerHTML={{ __html: html }} />;

function Sketch({ p, i }: { p: Puppy; i: number }) {
  const video = p.media.some((m) => m.kind === "video");
  return (
    <li>
      <Link href={`/puppies/${p.slug}`} className="pp-sketch" style={style(i)} data-revealed>
        <span className="pp-sketch__frame">
          <Svg html={washFor(i)} />
          <span className="pp-sketch__photo" style={{ borderRadius: "46% 54% 49% 51% / 52% 47% 53% 48%" }}><Img m={p.cover} eager={i < 4} /></span>
          <Svg html={inkFor(i)} />
          <span className="pp-sketch__sticker font-scrawl">Available</span>
          {video && <span className="pp-sketch__video">with video</span>}
        </span>
        <span className="pp-sketch__name font-plush">{puppyLabel(p)}</span>
        <span className="pp-sketch__meta">{p.breed} · {p.genderLabel} · {p.age}</span>
      </Link>
    </li>
  );
}

export default function Browser() {
  // Server HTML holds the full grid (no layout shift, works without JS); URL filters are applied right after mount.
  const [f, setF] = useState<F>({});
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const url: F = { breed: sp.get("breed") ?? undefined, gender: sp.get("gender") ?? undefined, origin: sp.get("origin") ?? undefined };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after mount; reading it during render would break hydration
    if (url.breed || url.gender || url.origin) setF(url);
  }, []);

  function toggle(k: keyof F, v: string) {
    const next = { ...f, [k]: f[k] === v ? undefined : v };
    setF(next);
    const q = new URLSearchParams(Object.entries(next).filter(([, x]) => x) as [string, string][]).toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  }
  const list = puppies.filter((p) => (!f.breed || p.breeds.includes(f.breed)) && (!f.gender || p.gender === f.gender) && (!f.origin || p.origin === f.origin));
  const filtered = !!(f.breed || f.gender || f.origin);

  return (
    <>
      <div className="pp-sketchpad mt-16">
        <div className="grid gap-4">
          {GROUPS.map((g) => (
            <div key={g.key} role="group" aria-label={g.label} className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl w-28 text-toffee-ink">{g.label}</span>
              {g.opts.map(([v, l]) => (
                <button key={v} type="button" aria-pressed={f[g.key] === v} onClick={() => toggle(g.key, v)} className="pp-sticker-chip">{l}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="font-scrawl mt-10 text-xl" aria-live="polite">
        {filtered ? `${list.length} ${list.length === 1 ? "puppy matches" : "puppies match"}` : `${puppies.length} puppies looking for a home`}
        {filtered && <button onClick={() => { setF({}); window.history.replaceState(null, "", window.location.pathname); }} className="ml-3 underline">Clear filters</button>}
      </p>
      {list.length ? (
        <ul className="pp-sketches mt-8">{list.map((p, i) => <Sketch key={p.slug} p={p} i={i} />)}</ul>
      ) : (
        <div className="card mt-6 p-10 text-center">
          <p className="font-display text-3xl font-extrabold">Nobody here yet</p>
          <p className="mt-2 text-cocoa-soft">Tell us what you&apos;re hoping for and we&apos;ll keep an eye out.</p>
          <Link href="/contact" className="btn btn-primary mt-5">Tell us what you&apos;re hoping for</Link>
        </div>
      )}
      <section className="pp-gone-strip mt-24 -mx-[var(--gutter)] px-[var(--gutter)]" aria-labelledby="gone-title">
        <div className="mx-auto flex max-w-[110rem] flex-col gap-10 lg:flex-row lg:items-center">
          <div className="lg:w-1/3">
            <h2 id="gone-title" className="font-plush text-big">Already gone home</h2>
            <p className="text-lede mt-4 text-[var(--ink-soft)]">Every one of these puppies found a family.</p>
            <Link href="/gone-home" className="btn btn-ghost mt-6">See the puppies who&apos;ve gone home</Link>
          </div>
          <ul className="pp-gone-strip__row">
            {gone.slice(0, 5).map((g, i) => (
              <li key={g.slug}><Link href={`/puppies/${g.slug}`} className="pp-sketch pp-sketch--small" style={style(i, "#f9cdbf")} data-revealed><span className="pp-sketch__frame"><span className="pp-sketch__photo" style={{ borderRadius: "46% 54% 49% 51% / 52% 47% 53% 48%" }}><Img src={g.cover} alt="" /></span></span><span className="pp-sketch__name font-plush">{g.name || g.breed}</span></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
