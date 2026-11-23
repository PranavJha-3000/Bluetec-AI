import Link from "next/link";
import Img from "./Img";
import { puppyLabel, type Puppy } from "@/data";

export default function PuppyCard({ p }: { p: Puppy }) {
  const video = p.media.some((m) => m.kind === "video");
  return (
    <Link href={`/puppies/${p.slug}`} className="card group block overflow-hidden shadow-[0_8px_0_-2px_var(--color-cocoa)] transition-transform duration-300 ease-[var(--ease-pounce)] hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-cocoa">
        <Img m={p.cover} className="transition-transform duration-500 group-hover:scale-105" />
        <span className="hand absolute left-3 top-3 -rotate-3 rounded-full border-2 border-cocoa bg-honey px-3 py-1 text-sm">Available</span>
        {video && <span className="hand absolute bottom-3 right-3 rounded-full bg-cocoa px-3 py-1 text-sm text-milk">with video</span>}
      </div>
      <div className="p-4">
        <h3 className="text-2xl">{puppyLabel(p)}</h3>
        <p className="text-cocoa-soft">{p.breed} · {p.genderLabel} · {p.age}</p>
      </div>
    </Link>
  );
}
