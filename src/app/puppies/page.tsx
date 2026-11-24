import type { Metadata } from "next";
import Mascot from "@/components/home/Mascot";
import Browser from "./Browser";
import { UNDERLINE } from "./art";
import "../how-it-works/how.css";
import "./pups.css";

export const metadata: Metadata = { title: "Puppies", description: "Meet the puppies looking for a home in Dubai." };

export default function Puppies() {
  return (
    <div className="pp-sketchbook">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        <header className="pp-sketchbook__head">
          <div className="pp-sketchbook__words">
            <p className="font-scrawl text-lg text-toffee-ink">from Teddy&apos;s sketchbook</p>
            <h1 className="pp-sketchbook__title font-plush text-giant" data-revealed>
              Available puppies
              <span aria-hidden className="contents" dangerouslySetInnerHTML={{ __html: UNDERLINE }} />
            </h1>
            <p className="pp-sketchbook__lede text-lede mt-6 max-w-[48ch] text-[var(--ink-soft)]">Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p>
          </div>
          <div className="pp-sketchbook__self">
            <Mascot pose="sit" className="h-full w-full" />
            <span className="pp-sketchbook__caption font-scrawl" aria-hidden>self-portrait</span>
          </div>
        </header>
        <Browser />
      </div>
    </div>
  );
}
