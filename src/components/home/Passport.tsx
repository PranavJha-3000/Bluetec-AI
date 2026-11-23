const cards = [
  { t: "Vet-checked & healthy", d: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.", r: "-rotate-2", round: true },
  { t: "Korea to Dubai, safely", d: "Trusted breeders, safe travel, and premium care from start to finish.", r: "rotate-1", round: false },
  { t: "Support 24/7", d: "We are a message away before, during and long after your puppy comes home.", r: "-rotate-1", round: true },
];

function Card({ c }: { c: (typeof cards)[number] }) {
  return (
    <li className={`${c.r} flex items-center gap-4 rounded-2xl border-[3px] border-cocoa bg-milk p-4 text-left`}>
      <span aria-hidden className={`grid size-24 shrink-0 place-items-center border-[3px] border-dashed border-toffee-ink p-2 text-center font-display text-sm leading-tight font-extrabold text-toffee-ink md:size-28 ${c.round ? "rounded-full" : "rounded-xl"}`}>{c.t}</span>
      <div>
        <h3 className="text-xl">{c.t}</h3>
        <p className="mt-1 text-cocoa-soft">{c.d}</p>
      </div>
    </li>
  );
}

export default function Passport() {
  return (
    <section id="passport" className="overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(var(--color-honey), var(--color-toffee-deep))" }}>
      <div className="wrap">
        <div className="relative grid overflow-hidden rounded-[2rem] border-[5px] border-cocoa bg-honey-soft shadow-[0_10px_0_var(--color-cocoa-soft)] md:grid-cols-2">
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-8 -translate-x-1/2 md:block" style={{ background: "linear-gradient(90deg, transparent, rgb(0 0 0/.18) 50%, transparent)" }} />
          <div className="p-6 md:p-10">
            <p className="hand text-lg text-toffee-ink">puppy passport</p>
            <h2 className="mt-2 max-w-[12ch] text-[clamp(2.4rem,5vw,4.5rem)] leading-[.95]">Why families trust TeddyPups</h2>
            <ul className="mt-8 grid gap-6">{cards.slice(0, 1).map((c) => <Card key={c.t} c={c} />)}</ul>
          </div>
          <div className="border-t-[3px] border-cocoa/30 p-6 md:border-t-0 md:p-10">
            <ul className="grid gap-6">{cards.slice(1).map((c) => <Card key={c.t} c={c} />)}</ul>
            <p className="hand mt-8 border-t-2 border-dashed border-cocoa-soft/40 pt-5 text-center text-lg text-cocoa-soft">Trusted by families worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
