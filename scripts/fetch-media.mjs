// Downloads every media path referenced in src/data/*.json into public/ (same path), so the site is self-hosted.
import fs from "node:fs";
import path from "node:path";
const ORIGIN = "https://puppy.instabizweb.com";
const paths = new Set();
for (const f of fs.readdirSync("src/data").filter((x) => x.endsWith(".json")))
  for (const m of fs.readFileSync("src/data/" + f, "utf8").matchAll(/"(\/media\/[^"]+)"/g)) paths.add(m[1]);
let n = 0, bytes = 0;
await Promise.all([...paths].map(async (p) => {
  const out = path.join("public", p);
  if (fs.existsSync(out)) return;
  const r = await fetch(ORIGIN + p);
  if (!r.ok) return console.error("FAIL", r.status, p);
  const b = Buffer.from(await r.arrayBuffer());
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, b); n++; bytes += b.length;
}));
console.log(`${n} files, ${(bytes / 1e6).toFixed(1)} MB of ${paths.size}`);
