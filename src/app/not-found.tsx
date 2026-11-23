import Link from "next/link";

export default function NotFound() {
  const tabs = [["/", "Home"], ["/puppies", "Puppies"], ["/happy-families", "Happy families"], ["/faq", "FAQ"], ["/contact", "Contact"]];
  return (
    <section className="wrap py-20 text-center">
      <div className="mx-auto max-w-xl rotate-1 rounded-lg border-[3px] border-cocoa bg-honey-soft p-8 shadow-[0_8px_0_-2px_var(--color-cocoa)]">
        <p className="hand text-toffee-ink">have you seen this pup?</p>
        <h1 className="text-[clamp(4rem,15vw,9rem)] leading-none">LOST</h1>
        <p className="mt-2 text-cocoa-soft">This page wandered off. Tear off a tab to find your way back.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map(([h, l]) => <Link key={h} href={h} className="rounded-b-lg border-2 border-cocoa bg-white px-3 py-2 font-semibold">{l}</Link>)}
        </div>
      </div>
    </section>
  );
}
