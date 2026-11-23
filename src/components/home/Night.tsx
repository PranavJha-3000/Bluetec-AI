import Link from "next/link";
import Mascot from "./Mascot";
import { faqs } from "@/data";

// Deterministic scatter so server and client agree.
const stars = Array.from({ length: 40 }, (_, i) => ({ x: (i * 61.8) % 100, y: (i * 37.3 + 11) % 100, d: (i * 0.37) % 3, s: 4 + (i % 3) * 2 }));

export default function Night() {
  return (
    <section id="night" className="relative overflow-hidden bg-cocoa py-16 text-milk md:py-24">
      <div aria-hidden className="absolute inset-0">
        {stars.map((s, i) => (
          <span key={i} className="absolute rounded-full bg-honey motion-safe:animate-[tp-twinkle_3s_ease-in-out_infinite]" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
        ))}
      </div>
      {[["8%", "20%", 0], ["88%", "35%", 1.2], ["70%", "78%", 2.1]].map(([l, t, d], i) => (
        <span key={i} aria-hidden className="tp-float hand absolute text-3xl text-honey/70" style={{ left: l as string, top: t as string, animationDelay: `${d}s` }}>?</span>
      ))}
      <div className="wrap relative grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-[clamp(2.6rem,6.5vw,6rem)] leading-[.92]">Questions, answered</h2>
            <Mascot pose="sit" className="hidden w-32 shrink-0 sm:block" />
          </div>
          <Link href="/faq" className="btn btn-outline-light mt-8">Read all questions</Link>
        </div>
        <ul className="space-y-8">
          {faqs.slice(0, 3).map((f) => (
            <li key={f.question} className="grid grid-cols-[auto_1fr] gap-x-3">
              <span aria-hidden className="text-honey">✦</span>
              <div>
                <h3 className="text-xl md:text-2xl">{f.question}</h3>
                <p className="mt-2 text-milk/75">{f.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
