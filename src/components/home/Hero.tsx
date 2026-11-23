import Link from "next/link";
import { puppies, SITE } from "@/data";
import Img from "@/components/Img";
import Mascot from "./Mascot";

// Lineup seats (position, width, peek, tilt) are the reference's own values for its six hero puppies.
const SEATS = [
  { slug: "maltipoo-max-male", x: "9%", w: "8.6rem", peek: 0.62, tilt: "-5deg" },
  { slug: "korean-teacup-maltipoo-female", x: "22.5%", w: "10.4rem", peek: 0.8, tilt: "3deg" },
  { slug: "pomeranian-female", x: "35%", w: "9.2rem", peek: 0.7, tilt: "-2deg" },
  { slug: "maltipoo-cavapoo-male", x: "65%", w: "9.4rem", peek: 0.74, tilt: "3deg" },
  { slug: "toy-poodle-male-female", x: "77.5%", w: "10.6rem", peek: 0.82, tilt: "-3deg" },
  { slug: "maltipoo-female-2", x: "91%", w: "8.4rem", peek: 0.6, tilt: "4deg" },
];

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="tph" style={{ "--sky-top": "#fffdf8", "--sky-bottom": "#fff1d8", "--quilt": "#fff1d8" } as React.CSSProperties}>
      <span aria-hidden className="tph-sun" />
      <div className="tph-copy gutter">
        <p className="tph-note hand">every puppy is family
          <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" aria-hidden><path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </p>
        <h1 id="hero-title" className="tph-title"><span className="block">Premium teacup</span><span className="block">puppies in Dubai</span></h1>
        <p className="tph-lede">Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
        <div className="tph-actions">
          <Link href="/puppies" className="btn btn-primary">View available puppies</Link>
          <a href={SITE.whatsapp} className="btn btn-ghost">Enquire on WhatsApp</a>
        </div>
      </div>
      <div className="tph-stage">
        <ul className="tph-lineup" aria-label="Some of the puppies in our showroom">
          {SEATS.map((s, i) => {
            const p = puppies.find((q) => q.slug === s.slug) ?? puppies[i];
            const label = p.name ? `${p.name}, ${p.breed}` : p.breed;
            return (
              <li key={s.slug} className="tph-seat" style={{ "--x": s.x, "--w": s.w, "--peek": s.peek, "--tilt": s.tilt, "--i": i } as React.CSSProperties}>
                <Link href={`/puppies/${p.slug}`} className="tph-pup" aria-label={`Meet ${label}`}>
                  <span className="tph-photo"><Img m={p.cover} alt={`${p.genderLabel} ${p.breed} puppy`} eager /></span>
                  <span aria-hidden className="tph-name hand" data-show={i === 2 || undefined}>{p.name || p.breed}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="tph-teddy"><Mascot pose="peek" className="w-full" /></div>
        <div aria-hidden className="tph-quilt">
          <svg className="tph-edge" width="100%" height="40" preserveAspectRatio="none"><defs><pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse"><path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} /><path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" /><path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" /></pattern></defs><rect width="100%" height="40" fill="url(#tp-scallop)" /></svg>
        </div>
      </div>
    </section>
  );
}
