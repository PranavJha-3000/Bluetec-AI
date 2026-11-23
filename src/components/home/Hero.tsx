import Link from "next/link";
import { puppies, SITE } from "@/data";
import Img from "@/components/Img";
import Mascot from "./Mascot";
import Scallop from "./Scallop";
import HeroTag from "./HeroTag";

const shapes = [
  { h: "h-[8.5rem] md:h-[11rem]", r: -3 },
  { h: "h-[11rem] md:h-[14.5rem]", r: 2 },
  { h: "h-[8rem] md:h-[11.5rem]", r: -2 },
  { h: "h-[9.5rem] md:h-[12.5rem]", r: 0 },
  { h: "h-[11rem] md:h-[15rem]", r: 3 },
  { h: "h-[9rem] md:h-[11rem]", r: -3 },
];
const lattice = "linear-gradient(45deg, transparent 48%, color-mix(in srgb, var(--color-toffee) 14%, transparent) 49% 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, color-mix(in srgb, var(--color-toffee) 14%, transparent) 49% 51%, transparent 52%)";

export default function Hero() {
  const pups = puppies.slice(0, 6);
  // tag shows the cycling breed/name of each of the 7 puppies
  const labels = pups.map((p) => p.name ? `${p.name} · ${p.breed}` : p.breed);
  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 62%, var(--color-honey-soft), transparent 70%), var(--color-milk)" }}>
      <div className="wrap relative z-10 flex flex-col items-center pt-10 text-center md:pt-14">
        <p className="hand text-lg text-toffee-ink md:text-3xl">every puppy is family</p>
        <svg aria-hidden viewBox="0 0 252 10" className="-mt-1 w-40 text-toffee-ink md:w-64"><path d="M2 5q15-7 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <h1 className="mt-3 max-w-[11ch] text-[clamp(2.6rem,6.9vw,6.2rem)] leading-[0.92] md:max-w-[12ch]">Premium teacup puppies in Dubai</h1>
        <p className="mt-4 max-w-[34rem] text-balance text-[1.05rem] text-cocoa-soft md:mt-6 md:text-lg">Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
        <div className="mt-6 flex flex-col items-center gap-4 md:mt-9 md:flex-row">
          <Link href="/puppies" className="btn btn-primary">View available puppies</Link>
          <a href={SITE.whatsapp} className="btn btn-ghost">Enquire on WhatsApp</a>
        </div>
      </div>
      <div className="relative mt-14 md:mt-10">
        <div aria-hidden className="absolute inset-x-0 bottom-0 top-[60%] bg-honey-soft" style={{ backgroundImage: lattice, backgroundSize: "56px 56px" }} />
        <div className="relative flex items-end justify-center gap-1.5 overflow-hidden px-2 pt-12 md:gap-3 md:px-6 lg:gap-5 xl:gap-6">
          {pups.map((p, i) => (
            <div key={p.slug} className="contents">
              {i === 3 && <Mascot pose="peek" className="relative z-10 -mb-3 w-[4.5rem] shrink-0 md:-mb-5 md:w-[9rem] lg:w-[11rem] xl:w-[13rem]" />}
              <div className={`relative w-[3.1rem] shrink-0 md:w-[5.5rem] lg:w-[7.25rem] xl:w-[8.5rem]`} style={{ transform: `rotate(${shapes[i].r}deg)` }}>
                {i === 3 && <HeroTag labels={labels} />}
                <div className={`${shapes[i].h} w-full overflow-hidden rounded-t-full border-[3px] border-b-0 border-cocoa bg-honey-soft`}>
                  <Img m={p.cover} alt={p.name || p.breed} eager />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Scallop className="relative z-10 -mt-[22px]" />
        <div className="h-8 bg-honey-soft md:h-24" style={{ backgroundImage: lattice, backgroundSize: "56px 56px" }} />
      </div>
    </section>
  );
}
