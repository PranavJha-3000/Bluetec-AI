"use client";
import { useState } from "react";
import { puppies, puppyLabel } from "@/data";

// Log-only by decision: the reference's submit endpoint was never observed, so nothing leaves the browser.
export default function LetterForm({ puppyId, id }: { puppyId?: string; id?: string }) {
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.website) return; // honeypot
    console.log("[enquiry]", data);
    setSent(true);
  }

  if (sent) {
    return (
      <div id={id} role="status" className="card bg-honey-soft p-10 text-center">
        <p className="font-display text-4xl font-extrabold">Letter posted!</p>
        <p className="mt-2">Thank you, we&apos;ll be in touch soon.</p>
      </div>
    );
  }
  const f = "mt-1 w-full rounded-xl border-2 border-cocoa bg-white px-4 py-3";
  return (
    <form id={id} onSubmit={submit} className="card relative grid gap-4 bg-milk p-6 sm:grid-cols-2 sm:p-10">
      <label>Your name *<input name="name" required maxLength={80} autoComplete="name" className={f} /></label>
      <label>Phone *<input name="phone" type="tel" required autoComplete="tel" className={f} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" className={f} /></label>
      <label>Area<input name="area" maxLength={80} autoComplete="address-level2" className={f} /></label>
      <label className="sm:col-span-2">
        Which puppy?
        <select name="puppyId" defaultValue={puppyId ?? ""} className={f}>
          <option value="">any puppy (not sure yet)</option>
          {puppies.map((p) => <option key={p.slug} value={p.slug}>{puppyLabel(p)} · {p.breed}</option>)}
        </select>
      </label>
      <label className="sm:col-span-2">Message<textarea name="message" maxLength={2000} rows={5} className={f} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      <button className="btn btn-primary justify-self-start sm:col-span-2">Post the letter</button>
    </form>
  );
}
