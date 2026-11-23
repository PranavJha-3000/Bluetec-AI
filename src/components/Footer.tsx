import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data";
import Mascot from "@/components/home/Mascot";

// Layout, basket art, stars and moon follow the reference footer's markup and CSS.
const STARS: [number, number, number][] = [[6, 18, 12.6], [14, 42, 8.4], [23, 12, 9.8], [31, 30, 7], [44, 9, 11.2], [52, 36, 7.7], [63, 15, 10.5], [71, 40, 7], [92, 33, 8.4]];
const EXPLORE: [string, string][] = [["/puppies", "Available puppies"], ["/gone-home", "Gone home"], ["/happy-families", "Happy families"], ["/how-it-works", "How it works"], ["/how-it-works#delivery", "Delivery & collection"], ["/faq", "FAQ"], ["/contact", "Visit & contact"]];
const SOCIAL = ["Instagram", "TikTok", "Facebook"];

export default function Footer() {
  return (
    <footer className="tpf relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10">
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="tpf-hill"><path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" /></svg>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {STARS.map(([x, y, w], i) => (
            <svg key={i} viewBox="0 0 40 40" className="absolute text-honey motion-safe:animate-[tp-twinkle_3.2s_ease-in-out_infinite]" style={{ left: `${x}%`, top: `${y}%`, width: w, animationDelay: `${(i * 0.4).toFixed(2)}s` }}><path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" /></svg>
          ))}
        </div>
        <span className="tpf-moon" />
      </div>
      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(2rem,4.2vw,4rem)] leading-[.95] font-extrabold text-honey-soft">Home, at last.</p>
          <p className="mt-5 max-w-md text-milk/80">TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
        </div>
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <div aria-hidden className="tpf-basket" id="footer-basket">
            <svg viewBox="0 0 300 240" className="tpf-back"><ellipse cx="212" cy="145" rx="96" ry="12" fill="#5d3519" stroke="var(--color-cocoa)" strokeWidth="3" /><path d="M116 145 A96 12 0 0 1 308 145" fill="none" stroke="var(--color-cocoa)" strokeWidth="13" strokeLinecap="round" /><path d="M116 145 A96 12 0 0 1 308 145" fill="none" stroke="#e8b46c" strokeWidth="7.5" strokeLinecap="round" /></svg>
            <Mascot pose="peek" className="tpf-pup" />
            <svg viewBox="0 0 300 240" className="tpf-front"><path d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z" fill="#d9a05a" stroke="var(--color-cocoa)" strokeWidth="3" strokeLinejoin="round" /><path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" fill="none" stroke="#2a170e47" strokeWidth="2.6" strokeLinecap="round" /><path d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230" fill="none" stroke="#2a170e26" strokeWidth="2.6" strokeLinecap="round" /><path d="M116 145 A96 12 0 0 0 308 145" fill="none" stroke="var(--color-cocoa)" strokeWidth="13" strokeLinecap="round" /><path d="M116 145 A96 12 0 0 0 308 145" fill="none" stroke="#e8b46c" strokeWidth="7.5" strokeLinecap="round" /></svg>
          </div>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="hand text-lg text-honey">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE.map(([h, t]) => <li key={h}><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href={h}>{t}</Link></li>)}
          </ul>
        </nav>
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h2 className="hand text-lg text-honey">Say hello</h2>
          <ul className="mt-4 space-y-2.5 text-milk/90">
            <li><a className="font-semibold hover:text-honey" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.telLabel}</a></li>
            <li><a className="break-all hover:text-honey" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>{SITE.address}</li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
            {SOCIAL.map((s) => <li key={s}><a href={SITE.social} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey">{s}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="gutter relative mx-auto mt-16 flex max-w-[110rem] flex-col items-start justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60 md:flex-row md:items-center">
        <span className="flex items-center gap-3"><Image src="/brand/logo.png" alt="" width={36} height={36} className="size-9 rounded-full" />© {new Date().getFullYear()} TeddyPups U.A.E.</span>
        <span className="hand text-base text-honey/80">every puppy is family</span>
      </div>
    </footer>
  );
}
