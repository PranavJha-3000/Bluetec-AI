import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Tabs from "./Tabs";

export const metadata: Metadata = { title: "How it works", description: "Meet a puppy in Dubai or order an imported teacup, step by step." };

const chips = [["#two-ways", "Two ways"], ["#promise", "Our promise"], ["#delivery", "Delivery"], ["#why", "Why us"]];

export default function How() {
  return (
    <>
      <PageHead eyebrow="from hello to home" title="How it works" />
      <nav aria-label="On this page" className="wrap flex flex-wrap justify-center gap-3 pb-10">
        {chips.map(([h, l]) => <a key={h} href={h} className="rounded-full border-2 border-cocoa bg-white px-4 py-1.5 font-semibold">{l}</a>)}
      </nav>
      <section id="two-ways" className="wrap scroll-mt-24"><Tabs /></section>
      <section id="promise" className="wrap scroll-mt-24 py-16">
        <h2 className="text-4xl">Our promise</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Health-checked & vaccinated", "Ethically sourced", "Support after you go home"].map((t) => <p key={t} className="card p-6 font-semibold">{t}</p>)}
        </div>
      </section>
      <section id="delivery" className="wrap scroll-mt-24 py-8">
        <h2 className="text-4xl">Delivery</h2>
        <p className="mt-3 max-w-2xl text-cocoa-soft">Pick your puppy up from our showroom or have them delivered to your home within Dubai, safely and comfortably.</p>
      </section>
      <section id="why" className="wrap scroll-mt-24 py-16">
        <h2 className="text-4xl">Why TeddyPups</h2>
        <p className="mt-3 max-w-2xl text-cocoa-soft">Every puppy is family: trusted breeders, vet checks, and a team that stays with you long after the first cuddle.</p>
      </section>
    </>
  );
}
