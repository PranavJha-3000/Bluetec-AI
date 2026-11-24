"use client";
import { useState } from "react";
import Mascot from "@/components/home/Mascot";
import { ART } from "./art";

const Svg = ({ k }: { k: string }) => <span aria-hidden className="contents" dangerouslySetInnerHTML={{ __html: ART[k] }} />;

type Step = [icon: string, tint: string, title: string, text: string];
const LOCAL: Step[] = [
  ["iLocal1", "#fbe3b4", "Explore our puppies", "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information."],
  ["iLocal2", "#fde6de", "Choose your puppy", "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions."],
  ["iLocal3", "#e3f0fb", "Meet before you choose", "Spend time bonding before making your decision."],
  ["iLocal4", "#e6f2df", "Pick-up or delivery", "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably."],
];
const IMPORTED: Step[] = [
  ["iImp1", "#fbe3b4", "Reserve your puppy", "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences."],
  ["iImp2", "#fde6de", "Personalized consultation", "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey."],
  ["iImp3", "#e3f0fb", "Import and arrival", "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family."],
  ["iImp4", "#e6f2df", "Welcome home", "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home."],
];

function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="hw-steps">
      {steps.map(([icon, tint, title, text], i) => (
        <li key={title} className="hw-step" style={{ "--i": i, "--tint": tint } as React.CSSProperties}>
          <span aria-hidden className="hw-step__icon"><Svg k={icon} /></span>
          <span className="hw-step__num font-plush">Step {i + 1}</span>
          <h4 className="font-plush-text hw-step__title">{title}</h4>
          <p className="hw-step__text">{text}</p>
        </li>
      ))}
    </ol>
  );
}

export default function Tabs() {
  const [at, setAt] = useState(0);
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { setAt(1 - at); (e.currentTarget.children[1 - at + 1] as HTMLElement)?.focus(); }
  };
  const tabs = [["local", "In Dubai", "meet in person"], ["imported", "Imported", "order upon request"]];
  return (
    <section className="hw-journeys" aria-labelledby="two-ways-title" data-ready="true">
      <div className="hw-journeys__top">
        <div>
          <p className="font-scrawl hw-journeys__kicker">choose your way</p>
          <h2 id="two-ways-title" className="font-plush text-big">Two ways home</h2>
        </div>
        <div className="hw-journeys__pick">
          <div role="tablist" aria-label="Ways to bring your puppy home" className="hw-switch" style={{ "--at": at, "--n": 2 } as React.CSSProperties} onKeyDown={key}>
            <span aria-hidden className="hw-switch__thumb" />
            {tabs.map(([id, label, hint], i) => (
              <button key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={at === i} aria-controls={`panel-${id}`} tabIndex={at === i ? 0 : -1} className="hw-switch__tab" onClick={() => setAt(i)}>
                <span className="font-plush hw-switch__label">{label}</span>
                <span className="hw-switch__hint">{hint}</span>
              </button>
            ))}
          </div>
          <Mascot pose="sit" className="hw-journeys__teddy" />
        </div>
      </div>

      <div role="tabpanel" id="panel-local" aria-labelledby="tab-local" className="hw-journey" hidden={at !== 0}>
        <div className="hw-journey__head">
          <div>
            <h3 className="font-plush hw-journey__title">Meet your puppy in person</h3>
            <p className="text-lede mt-4 text-[var(--ink-soft)]">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they&apos;re raised with care, proper nutrition, and veterinary checks.</p>
          </div>
          <div aria-hidden className="hw-postcard">
            <span className="hw-postcard__sun" />
            <Svg k="postcardCity" />
            <span className="font-scrawl hw-postcard__to hw-postcard__to--left">Downtown Dubai</span>
          </div>
        </div>
        <Steps steps={LOCAL} />
      </div>

      <div role="tabpanel" id="panel-imported" aria-labelledby="tab-imported" className="hw-journey" hidden={at !== 1}>
        <div className="hw-journey__head">
          <div>
            <h3 className="font-plush hw-journey__title">Order upon request</h3>
            <p className="text-lede mt-4 text-[var(--ink-soft)]">Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world&apos;s most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.</p>
            <p className="font-scrawl mt-4 text-toffee-ink">From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world&apos;s finest puppies to Dubai, just for you.</p>
          </div>
          <div aria-hidden className="hw-postcard hw-postcard--sky">
            <Svg k="postcardSky" /><Svg k="postcardPlane" />
            <span className="font-scrawl hw-postcard__from">Europe · Korea</span>
            <span className="font-scrawl hw-postcard__to">Dubai</span>
          </div>
        </div>
        <Steps steps={IMPORTED} />
      </div>
    </section>
  );
}
