import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "./Gallery";
import Mascot from "@/components/home/Mascot";
import "./detail.css";
import Img from "@/components/Img";
import LetterForm from "../../contact/LetterForm";
import { allSlugs, findGone, findPuppy, puppies, puppyLabel, SITE } from "@/data";

const ABROAD = [["Reserve your puppy", "Tell us which puppy has captured your heart."], ["Personalized consultation", "We finalize details with you and share updates on your puppy's journey."], ["Import and arrival", "We manage health checks, travel arrangements, and documentation."], ["Welcome home", "We help your new puppy settle in and ensure a smooth transition into your home."]];

export const dynamicParams = false;
export const generateStaticParams = () => allSlugs().map((slug) => ({ slug }));

const titleOf = (p: { name: string; breed: string; gender: string }) =>
  p.name ? `${p.name}, ${p.breed} puppy` : `${p.breed} puppy (${p.gender === "male" ? "boy" : "girl"})`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findPuppy(slug) ?? findGone(slug);
  return p ? { title: titleOf(p) } : {};
}

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = findPuppy(slug);
  const g = findGone(slug);
  if (!p && !g) notFound();
  const sub = p ?? g!;
  const gone = !p;
  const ring = [...puppies.map((x) => x.slug)];
  const idx = ring.indexOf(slug);
  const prev = !gone ? ring[(idx - 1 + ring.length) % ring.length] : null;
  const next = !gone ? ring[(idx + 1) % ring.length] : null;
  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", item: "/" }, { name: gone ? "Gone home" : "Puppies", item: gone ? "/gone-home" : "/puppies" }, { name: puppyLabel(sub) }]
      .map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })),
  };
  const wa = `${SITE.whatsapp.split("?")[0]}?text=${encodeURIComponent(`Hi! I'd like to know more about ${puppyLabel(sub)}.`)}`;

  return (
    <div className="pd-scene">
    <article className="wrap py-10">
      <nav aria-label="Breadcrumb" className="pd-crumb text-base">
        <Link href={gone ? "/gone-home" : "/puppies"}>{gone ? "Gone home" : "Available puppies"}</Link> / {puppyLabel(sub)}
      </nav>
      <p className="pd-mark"><b>1</b>hello, it&apos;s me</p>
      <div className="mt-5 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="pd-photo">{p ? <Gallery media={p.media} /> : <div className="card aspect-[4/5] overflow-hidden"><Img src={g!.cover} alt={`${puppyLabel(sub)}, ${sub.breed} puppy`} eager /></div>}</div>
        <div>
        <div className="pd-card">
          <span aria-hidden className="pd-card__pin" />
          <Mascot pose="peek" className="pd-card__peek" />
          <span className="pd-chip">{gone ? "Gone home ♥" : "Available"}</span>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-none">{puppyLabel(sub)}</h1>
          <p className="mt-2 text-cocoa-soft">{sub.breed}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {[["Breed", sub.breed], ["Boy or girl", sub.gender === "male" ? "Boy" : "Girl"], ...(p ? [["Age", p.age]] : []), ["Where", sub.origin === "imported" ? "Imported for you" : "In Dubai"]].map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          {p?.description && <p className="mt-5 text-cocoa-soft">{p.description}</p>}
          <div className="mt-8 grid gap-3">
            {gone ? <Link href="/puppies" className="btn btn-primary">Meet the puppies still waiting</Link> : (<>
              <a href={wa} className="btn btn-wa">Ask about {puppyLabel(sub)} on WhatsApp</a>
              <a href="#enquire" className="btn btn-ghost">Send an enquiry</a>
            </>)}
          </div>
        </div>
{!gone && (<section className="pd-sheet pd-comes" aria-labelledby="comes-title">
            <p className="pd-mark"><b>2</b>what comes with {puppyLabel(sub)}</p>
            <h2 id="comes-title" className="mt-1 text-4xl">Every Teddy Pup comes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Vaccinated", "Dewormed", "Verified health certificate from licensed vets", "Thoroughly checked before joining your family"].map((t) => <li key={t} className="card p-3 text-sm font-semibold">{t}</li>)}
            </ul>
          </section>)}
        </div>
      </div>
      {!gone && (
        <>
          <section className="pd-way mt-16" aria-labelledby="abroad-title">
            <p className="pd-mark"><b>3</b>the way home</p>
            <h2 id="abroad-title" className="mt-4 max-w-[12ch] text-4xl">Coming home from abroad</h2>
            <ol className="pd-way__steps">
              {ABROAD.map(([t, d], i) => <li key={t}><b className="pd-way__n" aria-hidden>{i + 1}</b><div><h3 className="text-xl">{t}</h3><p className="mt-1 text-cocoa-soft">{d}</p></div></li>)}
            </ol>
          </section>
        </>
      )}
      {!gone && (
        <section id="enquire" className="pd-sheet mt-12 md:mt-16 scroll-mt-24">
          <p className="pd-mark"><b>4</b>dear TeddyPups…</p>
          <h2 className="mb-6 text-4xl">Send an enquiry about {puppyLabel(sub)}</h2>
          <LetterForm puppyId={slug} id={`enquiry-${slug}`} />
        </section>
      )}
      {prev && next && (
        <nav aria-label="More puppies" className="mt-12 grid gap-4 sm:grid-cols-2">
          {([[prev, "Previous pup"], [next, "Next pup"]] as const).map(([sl, label]) => { const q = puppies.find((x) => x.slug === sl)!; return (
            <Link key={label} href={`/puppies/${sl}`} className="pd-nav card"><span className="hand text-toffee-ink">{label}</span><strong className="font-plush text-xl">{q.breed}</strong></Link>); })}
        </nav>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
    </div>
  );
}
