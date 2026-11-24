"use client";
import { useId, useState } from "react";
import { puppies, puppyLabel, SITE } from "@/data";
import "../how-it-works/how.css";
import "./contact.css";
import { CART } from "./art";

// Demo form by decision: the reference's submit endpoint was never observed and there is no backend, so nothing is sent.
// After a valid submit it says so plainly instead of pretending the message went out.
export default function LetterForm({ puppyId, id }: { puppyId?: string; id?: string }) {
  const [sent, setSent] = useState(false);
  const sel = useId();
  const note = useId();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.website) return; // honeypot
    setSent(true);
  }

  if (sent) {
    return (
      <div id={id} role="status" className="ct-letterform text-center">
        <p className="font-plush text-3xl">This demo doesn&apos;t send messages yet</p>
        <p className="mt-2">Your letter was not delivered. To reach us now, message us on <a className="underline" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a> or email <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    );
  }
  return (
    <div className="ct-post">
      <form id={id} onSubmit={submit} className="ct-letterform">
        <span aria-hidden className="ct-letter__stamp" dangerouslySetInnerHTML={{ __html: CART.stamp }} />
        <p className="font-scrawl ct-letterform__greeting">Dear TeddyPups,</p>
        <p className="ct-letterform__line">my name is <span className="ct-blank" style={{ "--size": "16ch" } as React.CSSProperties}><input aria-label="Your name (required)" autoComplete="name" required minLength={2} maxLength={80} name="name" /></span>, and you can reach me on{" "}
          <span className="ct-blank" style={{ "--size": "15ch" } as React.CSSProperties}><input aria-label="Phone or WhatsApp number with country code (required)" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+971 50 123 4567" name="phone" /></span> or by email at{" "}
          <span className="ct-blank" style={{ "--size": "20ch" } as React.CSSProperties}><input aria-label="Email (optional)" type="email" autoComplete="email" placeholder="optional" name="email" /></span>.</p>
        <p className="ct-letterform__line">I live in <span className="ct-blank" style={{ "--size": "13ch" } as React.CSSProperties}><input aria-label="Your area (optional)" autoComplete="address-level2" maxLength={80} placeholder="e.g. Dubai Marina" name="area" /></span>, and I&apos;m curious about{" "}
          <span className="ct-blank ct-blank--select"><label htmlFor={sel} className="sr-only">Puppy you&apos;re interested in (optional)</label>
            <select id={sel} name="puppyId" defaultValue={puppyId ?? ""}>
              <option value="">any puppy (not sure yet)</option>
              {puppies.map((p) => <option key={p.slug} value={p.slug}>{puppyLabel(p)} ({p.breed}, {p.gender === "male" ? "boy" : "girl"})</option>)}
            </select></span>.</p>
        <label htmlFor={note} className="sr-only">Your message (optional)</label>
        <textarea id={note} name="message" rows={4} maxLength={2000} placeholder="Anything else you'd like to tell us…" className="ct-letterform__note" />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
        <div className="ct-letterform__sign">
          <p className="font-scrawl">with love, a future puppy parent</p>
          <button type="submit" className="btn btn-primary">Post my letter</button>
        </div>
      </form>
    </div>
  );
}
