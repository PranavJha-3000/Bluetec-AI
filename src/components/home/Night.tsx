import Link from "next/link";
import Mascot from "./Mascot";
import { faqs } from "@/data";

// Star positions, sizes and delays are the reference's own (11 sparkles).
const STARS: [number, number, number][] = [[8, 12, 16.2], [22, 30, 9], [41, 8, 12.6], [57, 22, 8.1], [72, 6, 14.4], [88, 18, 10.8], [95, 42, 9], [4, 58, 10.8], [34, 70, 7.2], [63, 84, 9.9], [83, 66, 12.6]];
const Spark = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden><path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" /></svg>
);

export default function Night() {
  return (
    <section id="night" aria-labelledby="questions-title" className="tpn" style={{ "--sky-top": "#4d2b19", "--sky-bottom": "#2f1a10" } as React.CSSProperties}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map(([x, y, w], i) => (
          <Spark key={i} className="absolute text-honey motion-safe:animate-[tp-twinkle_3s_ease-in-out_infinite]" style={{ left: `${x}%`, top: `${y}%`, width: w, animationDelay: `${(i * 0.4).toFixed(2)}s` }} />
        ))}
      </div>
      <div className="tpn-grid gutter">
        <div>
          <h2 id="questions-title" className="text-[clamp(2.6rem,6.4vw,6.25rem)] leading-[.95]">Questions, answered</h2>
          <Link href="/faq" className="btn btn-outline-light mt-8">Read all questions</Link>
          <Mascot pose="sit" className="mt-9 w-[clamp(9.5rem,30vw,13rem)] lg:hidden" />
        </div>
        <dl className="tpn-list">
          {faqs.slice(0, 3).map((f) => (
            <div key={f.question}>
              <dt className="tpn-q"><Spark className="tpn-star" />{f.question}</dt>
              <dd className="tpn-a">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
