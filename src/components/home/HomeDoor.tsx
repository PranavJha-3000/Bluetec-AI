import Img from "@/components/Img";
import Mascot from "./Mascot";
import { puppies, SITE } from "@/data";

export default function HomeDoor() {
  const p = puppies[0];
  const v = p.media.find((m) => m.kind === "video");
  const m = v?.poster ? { ...v, kind: "image" as const, url: v.poster } : p.cover;
  return (
    <section id="home" className="overflow-hidden border-t border-milk/15 bg-cocoa py-16 text-center text-milk md:py-24">
      <div className="wrap">
        <h2 className="mx-auto max-w-[14ch] text-[clamp(2.6rem,7vw,6.5rem)] leading-[.92]">Ready to meet your new best friend?</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-milk/80">Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p>
        <div aria-hidden className="relative mx-auto mt-12 h-[26rem] max-w-[38rem] overflow-hidden rounded-t-3xl bg-cocoa-soft" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 3.5rem, rgb(0 0 0/.18) 3.5rem calc(3.5rem + 2px))" }}>
          <div className="absolute top-12 left-1/2 size-80 -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(color-mix(in srgb, var(--color-honey) 35%, transparent), transparent 70%)" }} />
          <div className="absolute bottom-6 left-1/2 h-72 w-48 -translate-x-1/2 overflow-hidden rounded-t-full border-[6px] border-toffee bg-honey-soft"><Img m={m} /><div className="tp-door absolute inset-0 origin-left bg-toffee" style={{ transform: "perspective(700px) rotateY(-100deg)" }} /></div>
          <span className="absolute right-[18%] bottom-40 h-10 w-7 rounded-t-md rounded-b-xl border-2 border-cocoa bg-honey-soft shadow-[0_0_30px_12px_color-mix(in_srgb,var(--color-honey)_40%,transparent)]" />
          <span className="hand absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-md border-2 border-cocoa bg-honey px-4 text-sm text-cocoa">welcome home</span>
          <span className="absolute right-[10%] bottom-6 h-10 w-14 rounded-b-lg bg-toffee"><i className="absolute -top-14 left-1/2 block h-16 w-12 -translate-x-1/2 rounded-t-full bg-[#5b9a4f]" /></span>
          <span className="absolute bottom-6 left-[12%] h-10 w-14 rounded-b-lg bg-toffee"><i className="absolute -top-14 left-1/2 block h-16 w-12 -translate-x-1/2 rounded-t-full bg-[#5b9a4f]" /></span>
          <Mascot pose="walk" className="absolute bottom-4 left-[8%] z-10 w-40" />
        </div>
        <div aria-hidden className="mx-auto h-4 max-w-[44rem] rounded bg-cocoa-soft/60" />
        <a href={SITE.whatsapp} className="btn btn-wa mt-10">Enquire on WhatsApp</a>
      </div>
    </section>
  );
}
