import Link from "next/link";
import Img from "@/components/Img";

// Signpost scene: markup and sizes follow the reference's tp-fork / tp-way / tp-sign / tp-window / tp-flight rules.
const ROUTE = "M40 250 C 170 40, 470 20, 620 168";
const Plane = () => (
  <g transform="translate(-126 -78)">
    <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tpw-wing" />
    <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tpw-wing tpw-wing--far" />
    <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" className="tpw-body" />
    <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tpw-wing" />
    <path d="M206 64 C215 67 221 73 224 80" className="tpw-line" />
    <circle cx="136" cy="80" r="25" className="tpw-port" />
  </g>
);

export default function Paths() {
  return (
    <section id="paths" aria-labelledby="paths-title" className="tpw" style={{ "--sky-top": "#fbe3b4", "--sky-bottom": "#f7d18d" } as React.CSSProperties}>
      <div className="gutter mx-auto max-w-[110rem]">
        <h2 id="paths-title" className="tpw-title text-[clamp(2.6rem,6.4vw,6.25rem)] leading-[0.95]">Two ways to meet your puppy</h2>
        <div className="tpw-fork">
          <div aria-hidden className="tpw-post" />
          <article className="tpw-way tpw-way--left" aria-labelledby="way-local">
            <h3 id="way-local" className="tpw-sign tpw-sign--left">Puppies in Dubai</h3>
            <div className="tpw-scene">
              <svg viewBox="0 0 300 120" className="tpw-sky" aria-hidden>
                <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <figure className="tpw-window">
                <span className="tpw-glass"><Img src="/media/FHyoHcIosLZE/60f6e7e00a/showroom.jpg" alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" className="!object-[54.3%_48.3%]" /></span>
                <figcaption className="hand">In our showroom</figcaption>
              </figure>
            </div>
            <p className="tpw-text">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
            <Link href="/puppies?origin=local" className="btn btn-primary">Meet local puppies</Link>
          </article>
          <article className="tpw-way tpw-way--right" aria-labelledby="way-imported">
            <h3 id="way-imported" className="tpw-sign tpw-sign--right">Imported for you</h3>
            <div className="tpw-scene">
              <div className="tpw-flight">
                <svg viewBox="0 0 660 300" role="img" aria-label="A plane bringing a Korean teacup puppy from Korea to Dubai">
                  <path d={ROUTE} className="tpw-route" />
                  <circle cx="40" cy="250" r="7" className="tpw-dot" /><circle cx="620" cy="168" r="7" className="tpw-dot" />
                  <text x="40" y="284" textAnchor="middle" className="tpw-label">Korea</text>
                  <text x="620" y="202" textAnchor="middle" className="tpw-label">Dubai</text>
                  <g className="motion-safe:hidden" transform="translate(331.5 73.8) rotate(-5.4)"><Plane /></g>
                  <g className="motion-reduce:hidden"><Plane /><animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={ROUTE} /></g>
                </svg>
              </div>
            </div>
            <p className="tpw-text">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
            <Link href="/puppies?origin=imported" className="btn btn-primary">See imported puppies</Link>
          </article>
        </div>
      </div>
    </section>
  );
}
