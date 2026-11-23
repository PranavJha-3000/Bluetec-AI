// Row of semicircles with a dashed inner stitch; the pattern tiles across any width.
export default function Scallop({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`block w-full ${className}`} height="44">
      <defs>
        <pattern id="tp-scallop" width="76" height="44" patternUnits="userSpaceOnUse">
          <path d="M0 44V40a38 38 0 0 1 76 0V44Z" fill="var(--color-honey-soft)" />
          <path d="M0 40a38 38 0 0 1 76 0" fill="none" stroke="var(--color-cocoa)" strokeWidth="3" />
          <path d="M9 40a29 29 0 0 1 58 0" fill="none" stroke="var(--color-toffee-ink)" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="5 5" />
        </pattern>
      </defs>
      <rect width="100%" height="44" fill="url(#tp-scallop)" />
    </svg>
  );
}
