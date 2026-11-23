import { mediaUrl, type Media } from "@/data";

// Plain <img>: the focal point drives object-position.
export default function Img({ m, src, alt, className = "", eager }: { m?: Media; src?: string; alt?: string; className?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl(src ?? m!.url)}
      alt={alt ?? m?.alt ?? ""}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ objectPosition: m ? `${m.fx * 100}% ${m.fy * 100}%` : undefined, background: m?.color }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
