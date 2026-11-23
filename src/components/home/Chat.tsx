"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data";

const steps = [
  ["Say hello", "Tell us what you're looking for on WhatsApp. We reply in minutes."],
  ["Meet your match", "Pick a breed and we share real photos, health details and availability."],
  ["Take them home", "We handle the paperwork and delivery so your puppy arrives safe and happy."],
];
const breeds = [["Maltipoo", "maltipoo"], ["Pomeranian", "pomeranian"], ["Poodle", "poodle"], ["Cavapoo", "cavapoo"], ["Shih Tzu", "shih-tzu"]];
const paw = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 24 24' fill='%23f2be6b' fill-opacity='.35'%3E%3Ccircle cx='5' cy='11' r='2'/%3E%3Ccircle cx='9.5' cy='6.5' r='2'/%3E%3Ccircle cx='14.5' cy='6.5' r='2'/%3E%3Ccircle cx='19' cy='11' r='2'/%3E%3Cpath d='M12 12c-3 0-6 3-6 6 0 2 2 2.5 6 2.5s6-.5 6-2.5c0-3-3-6-6-6z'/%3E%3C/svg%3E\")";
// hidden until its step; always shown under reduced motion or without JS
const css = `.tp-b{opacity:0;transform:translateY(12px);transition:opacity .5s,transform .5s}.tp-b[data-on=true]{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.tp-b{opacity:1!important;transform:none!important;transition:none}}`;

export default function Chat() {
  const [step, setStep] = useState(0);
  const marks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // each sentinel is a third of the section; the one crossing the viewport middle is active
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setStep(marks.current.indexOf(e.target as HTMLDivElement))),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    marks.current.forEach((m) => m && io.observe(m));
    return () => io.disconnect();
  }, []);

  return (
    <section id="chat" className="relative py-16 md:py-24" style={{ background: "linear-gradient(var(--color-honey-soft), var(--color-honey))" }}>
      <style>{css}</style>
      <noscript><style>{".tp-b{opacity:1!important;transform:none!important}"}</style></noscript>
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col">
        {steps.map((_, i) => <div key={i} ref={(el) => { marks.current[i] = el; }} className="flex-1" />)}
      </div>
      <div className="wrap relative grid items-start gap-12 md:min-h-[1500px] md:grid-cols-2 md:gap-16">
        <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">Your puppy journey</h2>
          <p className="mt-5 max-w-[34ch] text-lg">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          <ol className="mt-10 space-y-8">
            {steps.map(([t, d], i) => (
              <li key={t} aria-current={i === step ? "step" : undefined} className={`flex gap-4 transition-opacity duration-500 ${i === step ? "opacity-100" : "opacity-40"}`}>
                <span className={`grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-cocoa text-xl font-bold ${i === step ? "bg-toffee-deep text-milk" : "bg-honey-soft"}`}>{i + 1}</span>
                <div><h3 className="text-2xl">{t}</h3><p className="mt-1 max-w-[38ch] text-cocoa-soft">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:sticky md:top-[calc(var(--header-h)+2rem)] md:justify-self-end">
          <div className="mx-auto w-full max-w-[22rem] rotate-3 rounded-[2.5rem] border-[3px] border-cocoa bg-milk p-3 shadow-[10px_14px_0_rgba(42,23,14,.18)]">
            <div className="rounded-[1.7rem] bg-milk px-4 py-3"><b className="block leading-tight">TeddyPups U.A.E.</b><span className="text-sm text-cocoa-soft">online</span></div>
            <div className="mt-2 flex min-h-[26rem] flex-col justify-end gap-3 rounded-2xl bg-honey-soft p-3" style={{ backgroundImage: paw }}>
              <p data-on={step >= 0} className="tp-b ml-auto max-w-[85%] rounded-2xl border-2 border-cocoa bg-honey px-3 py-2 text-sm">Hi TeddyPups! I&apos;d love to know more about your puppies.</p>
              <div data-on={step >= 1} className="tp-b max-w-[90%] rounded-2xl border-2 border-cocoa bg-milk px-3 py-2 text-sm">
                Select your preferred breed or tell us what you&apos;re looking for.
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {breeds.map(([n, s]) => <Link key={s} href={`/puppies?breed=${s}`} className="rounded-full border-2 border-cocoa bg-honey-soft px-2.5 py-0.5 text-xs font-semibold">{n}</Link>)}
                </div>
              </div>
              <div data-on={step >= 2} aria-hidden className="tp-b flex w-fit gap-1 rounded-2xl border-2 border-cocoa bg-milk px-3 py-2.5">
                {[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-cocoa-soft/60" />)}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-full bg-milk py-1 pl-4 pr-1 text-sm">
              Say hello on WhatsApp
              <a href={SITE.whatsapp} aria-label="Send on WhatsApp" className="btn-wa grid size-10 place-items-center rounded-full">
                <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current"><path d="M3 20l18-8L3 4v6l12 2-12 2z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
