// Open passport book: markup, stamps and sizes follow the reference's tp-book / tp-stamp / tp-horizon rules.
const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const entries = [
  { t: "Vet-checked & healthy", d: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.", ink: "#a24a1a", tilt: "-8deg", shape: "round",
    icon: <><path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" {...ICON} /><path d="M22 30h7l3-7 4 13 3-6h7" {...ICON} /></> },
  { t: "Korea to Dubai, safely", d: "Trusted breeders, safe travel, and premium care from start to finish.", ink: "#1f6b45", tilt: "5deg", shape: "ticket",
    icon: <><path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" {...ICON} /><path d="M8 50c10 4 20 4 30 0" {...ICON} strokeDasharray="2 7" /></> },
  { t: "Support 24/7", d: "Always here to help, from choosing your puppy to post-delivery support.", ink: "#5a3a28", tilt: "-4deg", shape: "oval",
    icon: <><path d="M10 14h44v28H30l-12 10v-10h-8z" {...ICON} /><path d="M22 28h0M32 28h0M42 28h0" {...ICON} strokeWidth={5} /></> },
  { t: "Trusted by families worldwide", d: "Puppies delivered to loving homes all around the world.", ink: "#c2622b", tilt: "7deg", shape: "scallop",
    icon: <><circle cx="32" cy="32" r="22" {...ICON} /><path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" {...ICON} /></> },
];

export default function Passport() {
  return (
    <section id="passport" aria-labelledby="trust-title" className="tpb" style={{ "--sky-top": "#f0b866", "--sky-bottom": "#a65a30" } as React.CSSProperties}>
      <div className="gutter mx-auto max-w-[96rem]">
        <div className="tpb-book">
          <div className="tpb-page tpb-page--left">
            <p aria-hidden className="hand tpb-kicker">puppy passport</p>
            <h2 id="trust-title" className="tpb-title">Why families trust TeddyPups</h2>
          </div>
          <ul className="tpb-page tpb-page--right">
            {entries.map((e, i) => (
              <li key={e.t} className="tpb-entry" style={{ "--ink-stamp": e.ink, "--tilt": e.tilt, "--i": i } as React.CSSProperties}>
                <span className={`tpb-stamp tpb-stamp--${e.shape}`}>
                  <svg viewBox="0 0 64 64" className="tpb-icon" aria-hidden>{e.icon}</svg>
                  <span className="tpb-stamp-title">{e.t}</span>
                </span>
                <p className="tpb-text">{e.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div aria-hidden className="tpb-horizon">
        <span className="tpb-sun" />
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tpb-city"><path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" /></svg>
      </div>
    </section>
  );
}
