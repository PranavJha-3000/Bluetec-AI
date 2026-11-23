const fs = require("fs");
const s = fs.readFileSync("rsc_puppies.txt", "utf8");
function arrAfter(key) {
  const i = s.indexOf('"' + key + '":[');
  if (i < 0) return null;
  let j = i + key.length + 3, d = 0, inStr = false, esc = false;
  for (let k = j; k < s.length; k++) {
    const c = s[k];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === "[") d++;
    else if (c === "]") { d--; if (d === 0) return JSON.parse(s.slice(j, k + 1)); }
  }
}
const keys = [...new Set([...s.matchAll(/"([A-Za-z]+)":\[/g)].map(m => m[1]))];
console.log("array props:", keys.join(","));
const pup = arrAfter("puppies");
console.log("puppies:", pup && pup.length);
if (pup) {
  console.log("fields:", Object.keys(pup[0]).join(","));
  const slim = pup.map(p => ({ slug: p.slug, name: p.name, breed: p.breed, gender: p.gender, age: p.age, status: p.status, featured: p.featured, origin: p.origin, source: p.source, media: (p.media || []).map(m => m.kind).join(","), tags: p.tags, extra: Object.keys(p).filter(k => !["id","slug","name","displayName","breed","gender","genderLabel","age","colour","description","records","status","featured","seoDescription","cover","media"].includes(k)) }));
  fs.mkdirSync("C:/Users/prana/OneDrive/Desktop/Code/Bluetec AI/recon/data", { recursive: true });
  fs.writeFileSync("C:/Users/prana/OneDrive/Desktop/Code/Bluetec AI/recon/data/puppies-summary.json", JSON.stringify(slim, null, 1));
  const media = pup.flatMap(p => (p.media || []).map(m => ({ slug: p.slug, kind: m.kind, url: m.url, w: m.width, h: m.height, dur: m.durationS })));
  fs.writeFileSync("C:/Users/prana/OneDrive/Desktop/Code/Bluetec AI/recon/data/media-index.json", JSON.stringify(media, null, 1));
  console.log(JSON.stringify(slim.slice(0, 3)));
  console.log("status counts", JSON.stringify(slim.reduce((a, p) => (a[p.status] = (a[p.status] || 0) + 1, a), {})));
  console.log("media total", media.length, "videos", media.filter(m => m.kind === "video").length);
}
