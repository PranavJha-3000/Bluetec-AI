import Link from "next/link";
import Mascot from "./Mascot";

const stripes = "repeating-linear-gradient(90deg,var(--color-toffee-deep) 0 1.5rem,var(--color-milk) 1.5rem 3rem)";
const scallop = "radial-gradient(circle at 1.5rem 0.2rem, #000 1.45rem, transparent 1.5rem)";

export default function Paths() {
  return (
    <section id="paths" className="py-20 md:py-28" style={{ background: "linear-gradient(var(--color-honey-soft), var(--color-honey-soft))" }}>
      <div className="wrap">
        <h2 className="mx-auto max-w-[14ch] text-center text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">Two ways to meet your puppy</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
          <article className="card flex flex-col overflow-hidden bg-milk/70 p-6 md:p-8">
            <div aria-hidden className="-mx-6 -mt-6 mb-6 h-12 md:-mx-8 md:-mt-8" style={{ background: stripes, maskImage: scallop, maskSize: "3rem 100%", WebkitMaskImage: scallop, WebkitMaskSize: "3rem 100%" }} />
            <svg aria-hidden viewBox="0 0 400 110" className="h-28 w-full" fill="none" stroke="var(--color-cocoa-soft)" strokeOpacity=".45" strokeWidth="4">
              <path d="M4 106H396M20 106V60H50V106M70 106V30L82 14L94 30V106M110 106V50L140 62V106M160 106V40H190V106M210 106V70H240V106M260 106V20H290V106" />
            </svg>
            <h3 className="mt-4 text-3xl">In our showroom</h3>
            <p className="mt-2 flex-1 text-cocoa-soft">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
            <Link href="/puppies?origin=local" className="btn btn-primary mt-6 self-start">Meet local puppies</Link>
          </article>
          <article className="card flex flex-col bg-milk/70 p-6 md:p-8">
            <span className="mb-6 self-start border-y-2 border-cocoa px-6 py-2 pr-10 text-xl text-milk" style={{ background: "linear-gradient(var(--color-toffee), var(--color-toffee-deep))", clipPath: "polygon(0 0,88% 0,100% 50%,88% 100%,0 100%)" }}>Puppies from Korea</span>
            <svg role="img" aria-label="Korea to Dubai" viewBox="0 0 400 140" className="h-36 w-full">
              <path d="M40 120 Q200 -30 360 100" fill="none" stroke="var(--color-toffee-deep)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
              <circle cx="40" cy="120" r="6" fill="var(--color-toffee-deep)" />
              <circle cx="360" cy="100" r="6" fill="var(--color-toffee-deep)" />
              <text x="40" y="138" textAnchor="middle" fontSize="14" fill="var(--color-cocoa)">Korea</text>
              <text x="360" y="124" textAnchor="middle" fontSize="14" fill="var(--color-cocoa)">Dubai</text>
              <g className="motion-safe:hidden" transform="translate(205 28) rotate(8)" stroke="var(--color-cocoa)" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M-8 0L-18 -16L-8 -16L6 0Z" fill="var(--color-toffee)" />
                <path d="M-8 0L-18 16L-8 16L6 0Z" fill="var(--color-toffee)" />
                <ellipse rx="26" ry="9" fill="var(--color-milk)" />
              </g>
              <g className="motion-reduce:hidden" stroke="var(--color-cocoa)" strokeWidth="2.5" strokeLinejoin="round">
                <g>
                <path d="M-8 0L-18 -16L-8 -16L6 0Z" fill="var(--color-toffee)" />
                <path d="M-8 0L-18 16L-8 16L6 0Z" fill="var(--color-toffee)" />
                <ellipse rx="26" ry="9" fill="var(--color-milk)" />
              </g>
                <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M40 120 Q200 -30 360 100" />
              </g>
            </svg>
            <h3 className="mt-4 text-3xl">Imported for you</h3>
            <p className="mt-2 flex-1 text-cocoa-soft">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
            <Link href="/puppies?origin=imported" className="btn btn-primary mt-6 self-start">See imported puppies</Link>
          </article>
        </div>
        <Mascot pose="sit" className="mx-auto mt-8 w-24 md:hidden" />
      </div>
    </section>
  );
}
