import fs from 'node:fs';
const r = (f) => JSON.parse(fs.readFileSync(`recon/data/${f}`, 'utf8'));
const strip = (m) => m && { url: m.url, kind: m.kind, w: m.width, h: m.height, alt: m.alt, fx: m.focalX, fy: m.focalY, color: m.color, poster: m.poster ? m.poster.url : undefined, dur: m.durationS ?? undefined };
const puppies = r('puppies.puppies.json').map((p) => ({
  slug: p.slug, name: p.name, breed: p.breed, gender: p.gender, genderLabel: p.genderLabel, age: p.age, colour: p.colour,
  description: p.description, breeds: p.breeds.map((b) => b.slug), collections: p.collections.map((c) => c.slug), origin: p.origin.slug, cover: strip(p.cover), media: p.media.map(strip),
}));
fs.writeFileSync('src/data/puppies.json', JSON.stringify(puppies));
const avail = new Set(puppies.map((p) => p.slug));
const gone = r('sitemap-covers.json').filter((c) => !avail.has(c.slug));
fs.writeFileSync('src/data/gone-raw.json', JSON.stringify(gone, null, 1));
fs.writeFileSync('src/data/families.json', JSON.stringify(r('happy-families.photos.json').map((m) => ({ url: m.url, w: m.width, h: m.height, alt: m.alt, fx: m.focalX, fy: m.focalY, color: m.color }))));
fs.writeFileSync('src/data/faq.json', JSON.stringify(r('faq.faqs.json').map(({ question, answer }) => ({ question, answer }))));
fs.writeFileSync('src/data/journeys.json', JSON.stringify(r('how-it-works.journeys.json')));
console.log(puppies.length, gone.length);
