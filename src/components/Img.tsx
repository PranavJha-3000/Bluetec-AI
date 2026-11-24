import Image from "next/image";
import { mediaUrl, type Media } from "@/data";

// next/image (resized AVIF/WebP) sized by CSS; the focal point drives object-position.
export default function Img({ m, src, alt, className = "", eager, sizes = "(min-width: 1024px) 28vw, 50vw" }: { m?: Media; src?: string; alt?: string; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <Image
      src={mediaUrl(src ?? m!.url)}
      alt={alt ?? m?.alt ?? ""}
      width={m?.w || 800}
      height={m?.h || 800}
      sizes={sizes}
      quality={70}
      priority={eager}
      loading={eager ? undefined : "lazy"}
      style={{ objectPosition: m ? `${m.fx * 100}% ${m.fy * 100}%` : undefined, background: m?.color }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
