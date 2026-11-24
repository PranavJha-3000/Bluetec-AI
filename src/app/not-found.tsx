import Link from "next/link";
import Mascot from "@/components/home/Mascot";
import "./not-found.css";

const tabs = [["/", "Home"], ["/puppies", "Puppies"], ["/how-it-works", "How it works"], ["/faq", "Questions"], ["/contact", "Contact"]];

export default function NotFound() {
  return (
    <section className="nf-wrap">
      <div className="nf-poster">
        <span aria-hidden className="nf-tape nf-tape--l" />
        <span aria-hidden className="nf-tape nf-tape--r" />
        <p className="font-scrawl nf-kicker">have you seen this page?</p>
        <h1 className="font-plush nf-lost">LOST</h1>
        <div className="nf-photo"><Mascot pose="walk" className="nf-dog" /></div>
        <p className="nf-copy">One page, last seen wandering off. It answers to the address you typed, but it isn&apos;t here any more. Teddy is on the case.</p>
        <p className="font-scrawl nf-found">if found, take a tab:</p>
        <ul className="nf-tabs">
          {tabs.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
