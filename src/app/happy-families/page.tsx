import type { Metadata } from "next";
import Mascot from "@/components/home/Mascot";
import { families } from "@/data";
import Wall from "./Wall";
import "../how-it-works/how.css";
import "./hf.css";

export const metadata: Metadata = { title: "Happy families", description: "Families who brought their TeddyPups puppy home." };

export default function Families() {
  return (
    <div className="hw-page">
      <section aria-labelledby="families-title" className="hf-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="hf-memories__head">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink">our wall of happy endings</p>
              <h1 id="families-title" className="font-plush text-giant hf-memories__title">
                Happy families
                <svg viewBox="0 0 48 44" className="hf-memories__heart" aria-hidden><path d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </h1>
              <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft">Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.</p>
              <p className="font-scrawl mt-5 text-lg text-toffee-ink">{families.length} moments and counting</p>
            </div>
            <figure className="hf-memories__note">
              <span aria-hidden className="hf-tape hf-tape--center" />
              <blockquote className="font-plush-text">“TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”</blockquote>
              <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
            </figure>
          </div>
          <div className="mt-16 md:mt-20"><Wall /></div>
          <div className="hf-memories__foot">
            <Mascot pose="sit" className="w-36 md:w-44" />
            <p className="font-scrawl text-lg text-cocoa-soft">every one of them was a Teddy Pup once</p>
          </div>
        </div>
      </section>
    </div>
  );
}
