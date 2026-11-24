import type { Metadata } from "next";
import Link from "next/link";
import Mascot from "@/components/home/Mascot";
import Img from "@/components/Img";
import { gone } from "@/data";
import "../how-it-works/how.css";
import "./gone.css";

export const metadata: Metadata = { title: "Gone home", description: "Puppies who found their forever families." };

const TILT = [-1.4, 1.1, -0.6, 1.6, -1.1, 0.8];

export default function GoneHome() {
  return (
    <div className="hw-page">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        <header className="gh-boothhead">
          <div className="max-w-3xl">
            <h1 className="font-plush text-giant">Gone home</h1>
            <p className="text-lede mt-6 text-cocoa-soft">Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we&apos;ll help you find your match.</p>
            <Link className="btn btn-primary mt-8" href="/puppies">See available puppies</Link>
          </div>
          <div aria-hidden className="gh-booth">
            <Mascot pose="sit" className="gh-booth__teddy" />
            <div className="gh-booth__counter"><span className="font-plush">tickets home</span></div>
          </div>
        </header>
        <ul className="gh-tickets" aria-label="Puppies who have gone home">
          {gone.map((g, i) => (
            <li key={g.slug} className="gh-ticket" style={{ "--tilt": `${TILT[i % 6]}deg`, "--i": i % 6 } as React.CSSProperties}>
              <Link className="gh-ticket__link" href={`/puppies/${g.slug}`}>
                <span className="gh-ticket__main">
                  <span className="gh-ticket__photo"><Img src={g.cover} alt={`${g.name || g.breed}, ${g.gender} ${g.breed} puppy`} /></span>
                  <span className="gh-ticket__body">
                    <span className="font-scrawl gh-ticket__kicker">one ticket home</span>
                    <span className="font-plush gh-ticket__name">{g.name || g.breed}</span>
                    <span className="gh-ticket__meta">{g.name ? `${g.breed}, ` : ""}{g.gender === "male" ? (g.name ? "boy" : "Boy") : (g.name ? "girl" : "Girl")}</span>
                    <span className="gh-ticket__route">
                      <span>{g.origin === "imported" ? "TeddyPups" : "Dubai showroom"}</span>
                      <svg viewBox="0 0 60 12" aria-hidden><path d="M2 6h46" /><path d="M44 2l6 4-6 4" /></svg>
                      <span>home ♥</span>
                    </span>
                  </span>
                </span>
                <span aria-hidden className="gh-ticket__stub"><span className="font-plush">admit one</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
