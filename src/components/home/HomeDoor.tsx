import Link from "next/link";
import Img from "@/components/Img";
import { puppies, SITE } from "@/data";
import HomeTeddy from "./HomeTeddy";

// Scene, sizes and door animation follow the reference's tp-home / tp-house rules.
export default function HomeDoor() {
  const p = puppies[0];
  const v = p.media.find((m) => m.kind === "video");
  const m = v?.poster ? { ...v, kind: "image" as const, url: v.poster } : p.cover;
  return (
    <section id="home" aria-labelledby="cta-title" className="tph2">
      <div className="tph2-copy gutter">
        <h2 id="cta-title">Ready to meet your new best friend?</h2>
        <p>Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p>
      </div>
      <div className="tph2-house">
        <span aria-hidden className="tph2-plant tph2-plant--l" />
        <span aria-hidden className="tph2-lamp" />
        <div className="tph2-doorway">
          <span className="tph2-inside"><Img m={m} alt={`${p.name}, waiting inside`} /></span>
          <span aria-hidden className="tph2-door"><span className="tph2-peep" /><span className="tph2-knob" /></span>
        </div>
        <span aria-hidden className="tph2-plant tph2-plant--r" />
        <span aria-hidden className="tph2-mat hand">welcome home</span>
        <HomeTeddy />
      </div>
      <div className="tph2-actions gutter">
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-wa">Enquire on WhatsApp</a>
        <Link href="/contact" className="btn tph2-ghost">Visit &amp; contact</Link>
      </div>
    </section>
  );
}
