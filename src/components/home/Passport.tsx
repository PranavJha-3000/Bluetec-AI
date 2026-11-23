const cards = [
  { t: "Vet-checked & healthy", d: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.", r: "-rotate-2", round: true },
  { t: "Korea to Dubai, safely", d: "Trusted breeders, safe travel, and premium care from start to finish.", r: "rotate-1", round: false },
  { t: "Support 24/7", d: "We are a message away before, during and long after your puppy comes home.", r: "-rotate-1", round: true },
];

export default function Passport() {
  return (
    <section id="passport" className="overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(var(--color-honey), var(--color-toffee-deep))" }}>
      <div className="wrap">
        <div className="rounded-[2rem] border-[5px] border-cocoa bg-honey-soft p-6 shadow-[0_10px_0_var(--color-cocoa-soft)] md:p-12">
          <p className="hand text-lg text-toffee-ink">puppy passport</p>
          <h2 className="mt-2 max-w-[12ch] text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95]">Why families trust TeddyPups</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {cards.map((c) => (
              <li key={c.t} className={`${c.r} flex flex-col items-center rounded-2xl border-[3px] border-cocoa bg-milk p-6 text-center`}>
                <span aria-hidden className={`grid size-32 place-items-center border-[3px] border-dashed border-toffee-ink p-3 font-display text-lg leading-tight font-extrabold text-toffee-ink ${c.round ? "rounded-full" : "rounded-xl"}`}>
                  {c.t}
                </span>
                <h3 className="mt-5 text-xl">{c.t}</h3>
                <p className="mt-1 text-cocoa-soft">{c.d}</p>
              </li>
            ))}
          </ul>
          <p className="hand mt-10 border-t-2 border-dashed border-cocoa-soft/40 pt-5 text-center text-lg text-cocoa-soft">Trusted by families worldwide</p>
        </div>
      </div>
    </section>
  );
}
