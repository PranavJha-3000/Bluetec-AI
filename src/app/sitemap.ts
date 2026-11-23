import type { MetadataRoute } from "next";
import { allSlugs } from "@/data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://puppy.instabizweb.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/puppies", "/gone-home", "/happy-families", "/how-it-works", "/faq", "/contact"];
  return [...pages, ...allSlugs().map((s) => `/puppies/${s}`)].map((p) => ({ url: base + p }));
}
