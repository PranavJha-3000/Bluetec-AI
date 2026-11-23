import Link from "next/link";
import Img from "@/components/Img";
import { families } from "@/data";

const caps = ["Lulu 🧸 with her new mummy ❤️", "New puppy 🧸😍", "Gang of 3 😍🧸", "So happy 😍😍", "New pup 🥰💫", "Home at last 🏡", "Best friends 🐾", "Family of four ❤️"];
const tilt = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2", "rotate-2", "-rotate-3"];
const tape = ["var(--color-honey)", "var(--color-blush)", "var(--color-sky)"];
const skyline = "M0 100V70H30V50H55V75H80V40H100V90H130V55H160V30L170 10L180 30V80H210V45H240V70H270V35H300V85H330V60H360V25H380V95H420V50H450V80H480V100Z";

export default function Dusk() {
  return (
    <section id="dusk" className="overflow-hidden bg-toffee-deep text-milk">
      <div aria-hidden className="relative h-28 border-b border-milk/15 md:h-32">
        <div className="absolute top-0 right-[18%] size-32 rounded-t-full bg-honey/90 shadow-[0_0_60px_20px_color-mix(in_srgb,var(--color-honey)_45%,transparent)] md:size-36" />
        <svg viewBox="0 0 480 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full" fill="var(--color-toffee-ink)" fillOpacity=".7"><path d={skyline} /></svg>
      </div>
      <div className="wrap pt-12 md:pt-16">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-[clamp(2.6rem,6.5vw,6rem)] leading-[.92]">Happy families &amp; puppies</h2>
            <p className="mt-5 max-w-xl text-lg text-milk/80">We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments were shared by clients who welcomed a Teddy Pup into their homes and hearts.</p>
          </div>
          <figure className="relative -rotate-1 rounded-3xl border-[3px] border-cocoa bg-milk p-6 text-cocoa shadow-[6px_8px_0_var(--color-cocoa)]">
            <blockquote className="font-display text-lg leading-snug md:text-xl">“TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect.”</blockquote>
            <figcaption className="hand mt-3 text-toffee-ink">Sarah M., Dubai, UAE</figcaption>
            <span aria-hidden className="absolute -bottom-3 left-10 size-6 rotate-45 border-r-[3px] border-b-[3px] border-cocoa bg-milk" />
          </figure>
        </div>
        <div className="mt-12 h-5 rounded-full border-[3px] border-cocoa bg-cocoa-soft" aria-hidden />
        <div className="relative overflow-hidden border-x-[3px] border-cocoa px-4 pt-10 pb-24 md:px-10" style={{ background: "repeating-linear-gradient(var(--color-toffee-deep) 0 3.5rem, color-mix(in srgb, var(--color-cocoa) 12%, var(--color-toffee-deep)) 3.5rem 3.6rem)" }}>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-8 lg:grid-cols-4">
            {families.slice(0, 8).map((f, i) => (
              <li key={f.url} className={`${tilt[i]} relative bg-milk p-2 pb-8 text-cocoa shadow-[0_8px_16px_rgb(0_0_0/.35)]`}>
                <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 opacity-80" style={{ background: tape[i % 3] }} />
                <div className="aspect-[3/4]"><Img m={{ ...f, kind: "image" as const }} /></div>
                <p className="hand absolute inset-x-2 bottom-1.5 truncate text-center text-xs md:text-sm">{caps[i]}</p>
              </li>
            ))}
          </ul>
          <div aria-hidden className="absolute bottom-0 left-[6%] flex flex-col items-center">
            <span className="h-9 w-7 rounded-t-lg rounded-b-sm bg-honey-soft shadow-[0_0_40px_18px_color-mix(in_srgb,var(--color-honey)_40%,transparent)]" />
            <span className="h-16 w-2 bg-cocoa md:h-20" />
          </div>
          <div aria-hidden className="absolute bottom-0 left-1/2 hidden h-24 w-14 -translate-x-1/2 rounded-t-full border-[3px] border-toffee bg-toffee-ink sm:block" />
          <Link href="/happy-families" className="btn btn-primary absolute right-6 bottom-6 md:right-10">See every happy family</Link>
        </div>
      </div>
      <div aria-hidden className="h-12 border-t-[3px] border-cocoa bg-cocoa" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 6rem, color-mix(in srgb, var(--color-milk) 12%, transparent) 6rem calc(6rem + 1px))" }} />
    </section>
  );
}
