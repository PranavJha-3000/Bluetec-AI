import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { gone, puppyLabel } from "@/data";

export const metadata: Metadata = { title: "Gone home", description: "Puppies who found their forever families." };

export default function GoneHome() {
  return (
    <>
      <PageHead eyebrow="boarding passes, all stamped" title="Gone home" sub={`${gone.length} pups who found their families.`} />
      <ul className="wrap grid gap-5 pb-8 md:grid-cols-2 xl:grid-cols-3">
        {gone.map((g) => (
          <li key={g.slug}>
            <Link href={`/puppies/${g.slug}`} className="card flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://puppy.instabizweb.com${g.cover}`} alt="" loading="lazy" className="h-24 w-24 rounded-2xl border-2 border-cocoa object-cover" />
              <div>
                <p className="hand text-xs tracking-widest text-toffee-ink">{g.origin === "imported" ? "TEDDYPUPS → HOME ♥" : "DUBAI SHOWROOM → HOME ♥"}</p>
                <p className="font-display text-2xl font-extrabold">{puppyLabel(g)}</p>
                <p className="text-cocoa-soft">{g.breed} · {g.gender === "male" ? "Boy" : "Girl"}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="pb-8 text-center"><Link href="/puppies" className="btn btn-primary">Meet the pups still waiting</Link></p>
    </>
  );
}
