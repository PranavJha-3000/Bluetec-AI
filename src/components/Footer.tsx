import Link from "next/link";
import { SITE } from "@/data";
import Mascot from "@/components/home/Mascot";

export default function Footer() {
  return (
    <footer className="mt-24 bg-cocoa text-milk">
      <div className="wrap relative flex items-end justify-between gap-6 pt-14">
        <div>
          <p className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none font-extrabold">Home, at last.</p>
          <p className="hand mt-2 text-lg text-honey">every puppy is family</p>
        </div>
        <div aria-hidden className="relative w-28 shrink-0 md:w-36">
          <Mascot pose="peek" className="relative z-0 w-full" />
          <div className="relative z-10 -mt-7 h-12 rounded-b-3xl border-[3px] border-cocoa bg-toffee md:h-14" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 .6rem, rgb(0 0 0/.18) .6rem calc(.6rem + 2px))" }} />
        </div>
      </div>
      <div className="wrap grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-extrabold">TeddyPups U.A.E.</p>
          <p className="mt-3 max-w-md text-milk/80">Premium teacup puppies in Dubai. Every puppy is family.</p>
        </div>
        <nav aria-label="Footer" className="grid gap-2">
          <Link href="/puppies">Puppies</Link><Link href="/gone-home">Gone home</Link><Link href="/happy-families">Happy families</Link>
          <Link href="/how-it-works">How it works</Link><Link href="/how-it-works#delivery">Delivery</Link><Link href="/faq">FAQ</Link><Link href="/contact">Visit &amp; contact</Link>
        </nav>
        <div className="grid content-start gap-2">
          <a href={SITE.whatsapp}>WhatsApp</a><a href={SITE.tel}>{SITE.telLabel}</a><a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.social}>Instagram</a><a href={SITE.social}>Facebook</a><a href={SITE.social}>Map</a>
          <p className="text-milk/70">{SITE.address}</p>
        </div>
      </div>
      <p className="wrap pb-8 text-sm text-milk/60">© {new Date().getFullYear()} TeddyPups U.A.E.</p>
    </footer>
  );
}
