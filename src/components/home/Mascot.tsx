// Simple poodle face; poses only shift the paws/tilt slightly.
export default function Mascot({ pose = "peek", className }: { pose?: "peek" | "sit" | "walk"; className?: string }) {
  const sw = { stroke: "var(--color-cocoa)", strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const tilt = pose === "walk" ? -4 : 0;
  return (
    <svg viewBox="0 0 200 190" className={className} role="img" aria-label="Teddy the poodle mascot">
      <g transform={`rotate(${tilt} 100 100)`}>
        <circle cx="100" cy="28" r="22" fill="var(--color-honey)" {...sw} />
        <circle cx="100" cy="100" r="82" fill="var(--color-honey)" {...sw} />
        <circle cx="30" cy="110" r="26" fill="var(--color-honey)" {...sw} />
        <circle cx="170" cy="110" r="26" fill="var(--color-honey)" {...sw} />
        <ellipse cx="100" cy="112" rx="42" ry="34" fill="var(--color-honey-soft)" />
        <circle cx="66" cy="112" r="11" fill="var(--color-blush)" />
        <circle cx="134" cy="112" r="11" fill="var(--color-blush)" />
        <circle cx="76" cy="90" r="8" fill="var(--color-cocoa)" />
        <circle cx="124" cy="90" r="8" fill="var(--color-cocoa)" />
        <ellipse cx="100" cy="108" rx="11" ry="8" fill="var(--color-cocoa)" />
        <path d="M100 116v8M86 126q14 12 28 0" fill="none" {...sw} strokeWidth={4} />
        {pose !== "sit" && (
          <>
            <ellipse cx="68" cy="176" rx="20" ry="13" fill="var(--color-honey)" {...sw} />
            <ellipse cx="132" cy="176" rx="20" ry="13" fill="var(--color-honey)" {...sw} />
          </>
        )}
      </g>
    </svg>
  );
}
