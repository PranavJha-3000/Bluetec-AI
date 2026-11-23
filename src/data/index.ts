import puppiesJson from "./puppies.json";
import goneRaw from "./gone-raw.json";
import familiesJson from "./families.json";
import faqJson from "./faq.json";
import journeysJson from "./journeys.json";

// Media is self-hosted under public/media (fetched by scripts/fetch-media.mjs; rights confirmed by the user for this assignment).
export const MEDIA_BASE = "";
export const mediaUrl = (u: string) => (u.startsWith("http") ? u : MEDIA_BASE + u);

export type Media = { url: string; kind: "image" | "video"; w: number; h: number; alt: string; fx: number; fy: number; color: string; poster?: string; dur?: number };
export type Origin = "imported" | "local";
export type Puppy = { slug: string; name: string; breed: string; gender: "male" | "female"; genderLabel: string; age: string; colour: string; description: string; breeds: string[]; collections: string[]; origin: Origin; cover: Media; media: Media[] };
export type Gone = { slug: string; name: string; breed: string; gender: "male" | "female"; origin: Origin; cover: string };
export type Faq = { question: string; answer: string };
export type Journey = { key: Origin; label: string; hint: string; heading: string; body: string; note: string; steps: { title: string; text: string }[] };

export const puppies = puppiesJson as unknown as Puppy[];
export const faqs = faqJson as Faq[];
export const journeys = (journeysJson as unknown as Journey[]).map((j) => ({ ...j, note: j.note === "$undefined" ? "" : j.note }));
export const families = familiesJson as { url: string; w: number; h: number; alt: string; fx: number; fy: number; color: string }[];

// name/breed/gender from the reference /gone-home roster. Origin per slug is NOT verified (assumption: Pomeranian/Poodle/Pomsky imported, rest local).
const roster: Record<string, [string, string, "male" | "female"]> = {
  "pomeranian-ace-boy": ["Ace", "Pomeranian", "male"], "poodle-leo-male": ["Leo", "Poodle", "male"], "maltipoo-mia-girl": ["Mia", "Maltipoo", "female"],
  "maltipoo-sadie-girl": ["Sadie", "Maltipoo", "female"], "blue-marle-pomeranian": ["", "Pomeranian", "male"], "pomsky-ollie-boy": ["Ollie", "Pomsky", "male"],
  "maltipoo-bruno-boy": ["Bruno", "Maltipoo", "male"], "maltese-buddy-male": ["Buddy", "Maltese", "male"], "maltese-charlie-male": ["Charlie", "Maltese", "male"],
  "pomeranian-daisy-girl": ["Daisy", "Pomeranian", "female"], "pomeranian-bella-female": ["Bella", "Pomeranian", "female"], "poodle-teddy-male": ["Teddy", "Poodle", "male"],
  "poodle-molly-female": ["Molly", "Poodle", "female"], "pomski-coco-girl": ["Coco", "Pomsky", "female"], "pomsky-rosie-girl": ["Rosie", "Pomsky", "female"],
  "pomeranian-leo-boy": ["Leo", "Pomeranian", "male"], "poodle-molly-girl": ["Molly", "Poodle", "female"], "poodle-rocky-boy": ["Rocky", "Poodle", "male"],
  "maltipoo-sophie-girl": ["Sophie", "Maltipoo", "female"], "maltipoo-lola-girl": ["Lola", "Maltipoo", "female"], "pomeranian-rex-boy": ["Rex", "Pomeranian", "male"],
  "pomsky-finn-male": ["Finn", "Pomsky", "male"], "maltipoo-zoe-girl": ["Zoe", "Maltipoo", "female"], "pomeranian-mimi-girl": ["Mimi", "Pomeranian", "female"],
  "bichon-bailey-boy": ["Bailey", "Bichon", "male"], puppy: ["", "Maltipoo", "female"], maltipo: ["", "Poodle", "female"],
};
export const gone: Gone[] = (goneRaw as { slug: string; cover: string }[]).map((g) => {
  const [name, breed, gender] = roster[g.slug];
  return { slug: g.slug, name, breed, gender, origin: /^(pomeranian|poodle|pomsk)/.test(g.slug) ? "imported" : "local", cover: g.cover };
});

export const puppyLabel = (p: { name: string; breed: string; gender: string }) => p.name || `${p.breed} (${p.gender === "male" ? "boy" : "girl"})`;
export const findPuppy = (slug: string) => puppies.find((p) => p.slug === slug);
export const findGone = (slug: string) => gone.find((p) => p.slug === slug);
export const allSlugs = () => [...puppies.map((p) => p.slug), ...gone.map((g) => g.slug)];

export const SITE = {
  name: "TeddyPups U.A.E.",
  whatsapp: "https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project.",
  tel: "tel:+971500000000", telLabel: "+971 50 000 0000", email: "info@instabizweb.com", social: "https://www.instabizweb.com/",
  address: "Downtown Dubai, United Arab Emirates",
};
export const BREEDS = ["Maltipoo", "Poodle", "Pomeranian", "Shih Tzu", "Cavapoo"];
