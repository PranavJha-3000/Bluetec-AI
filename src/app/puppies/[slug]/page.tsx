import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "./Gallery";
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
    <article className="wrap py-10">
      <nav aria-label="Breadcrumb" className="hand text-sm text-cocoa-soft">
        <Link href="/">Home</Link> / <Link href={gone ? "/gone-home" : "/puppies"}>{gone ? "Gone home" : "Puppies"}</Link> / {puppyLabel(sub)}
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {p ? <Gallery media={p.media} /> : <div className="card aspect-[4/5] overflow-hidden"><Img src={g!.cover} alt={`${puppyLabel(sub)}, ${sub.breed} puppy`} eager /></div>}
        <div>
          <p className="hand text-xl text-toffee-ink">{gone ? "the day they went home" : "looking for a home"}</p>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-none">{puppyLabel(sub)}</h1>
          <span className="hand mt-3 inline-block -rotate-2 rounded-full border-2 border-cocoa bg-honey px-4 py-1">{gone ? "Gone home ♥" : "Available"}</span>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {[["Breed", sub.breed], ["Boy or girl", sub.gender === "male" ? "Boy" : "Girl"], ...(p ? [["Age", p.age]] : []), ["Where", sub.origin === "imported" ? "Imported for you" : "In Dubai"]].map(([k, v]) => (
              <div key={k} className="card p-4"><dt className="hand text-sm text-toffee-ink">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          {p?.description && <p className="mt-5 text-cocoa-soft">{p.description}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            {gone ? <Link href="/puppies" className="btn btn-primary">Meet the puppies still waiting</Link> : (<>
              <a href={wa} className="btn btn-wa">Ask about {puppyLabel(sub)} on WhatsApp</a>
              <a href="#enquire" className="btn btn-ghost">Send an enquiry</a>
            </>)}
          </div>
        </div>
      </div>
      {!gone && (
        <>
          <section className="mt-16" aria-labelledby="comes-title">
            <p className="hand text-xl text-toffee-ink">what comes with {puppyLabel(sub)}</p>
            <h2 id="comes-title" className="mt-1 text-4xl">Every Teddy Pup comes</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["Vaccinated", "Dewormed", "Verified health certificate from licensed vets", "Thoroughly checked before joining your family"].map((t) => <li key={t} className="card p-5 font-semibold">{t}</li>)}
            </ul>
          </section>
          <section className="mt-16" aria-labelledby="abroad-title">
            <p className="hand text-xl text-toffee-ink">the way home</p>
            <h2 id="abroad-title" className="mt-1 text-4xl">Coming home from abroad</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ABROAD.map(([t, d], i) => <li key={t} className="card p-5"><span className="hand text-toffee-ink">Step {i + 1}</span><h3 className="text-xl">{t}</h3><p className="mt-1 text-cocoa-soft">{d}</p></li>)}
            </ol>
          </section>
        </>
      )}
      {!gone && (
        <section id="enquire" className="mt-16 scroll-mt-24">
          <h2 className="mb-6 text-4xl">Send an enquiry about {puppyLabel(sub)}</h2>
          <LetterForm puppyId={slug} id={`enquiry-${slug}`} />
        </section>
      )}
      {prev && next && (
        <nav aria-label="More puppies" className="mt-16 flex justify-between gap-4">
          <Link href={`/puppies/${prev}`} className="btn btn-ghost">← Previous pup</Link>
          <Link href={`/puppies/${next}`} className="btn btn-ghost">Next pup →</Link>
        </nav>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
  );
}
