// Visual parity: screenshot our pages (served on BASE) at the size of each reference PNG and compare.
// Score = mean per-channel difference after downscaling both to 200px wide (0% identical). Also reports height ratio.
import fs from "node:fs";
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://localhost:3100";
const S = "recon/screenshots/";
const pairs = [
  ["vp-d-hero", "/", false], ["vp-m-hero", "/", false],
  ["d-faq", "/faq", true], ["m-faq", "/faq", true], ["d-contact", "/contact", true], ["m-contact", "/contact", true],
  ["d-how", "/how-it-works", true], ["m-how", "/how-it-works", true], ["d-puppies", "/puppies", true], ["m-puppies", "/puppies", true],
  ["d-families", "/happy-families", true], ["m-families", "/happy-families", true], ["d-gone", "/gone-home", true], ["m-gone", "/gone-home", true],
  ["d-detail", "/puppies/maltipoo-max-male", true], ["m-detail", "/puppies/maltipoo-max-male", true],
  ["d-notfound", "/nope", true], ["m-notfound", "/nope", true],
];
const dim = (f) => { const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const browser = await chromium.launch();
fs.mkdirSync("recon/parity", { recursive: true });
const out = [];
for (const [name, route, full] of pairs) {
  const ref = S + name + ".png";
  if (!fs.existsSync(ref)) continue;
  const [w, h] = dim(ref);
  const mobile = name.startsWith("m-") || name.startsWith("vp-m");
  const ctx = await browser.newContext({ viewport: { width: mobile ? 390 : 1440, height: full ? 900 : h }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(400);
  const shot = await page.screenshot({ fullPage: full, animations: "disabled" });
  fs.writeFileSync(`recon/parity/${name}-ours.png`, shot);
  const score = await page.evaluate(async ([a, b]) => {
    const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = s; });
    const [A, B] = await Promise.all([load(a), load(b)]);
    const W = 200, H = Math.round(Math.max(A.height, B.height) * W / Math.max(A.width, B.width));
    const px = (im) => { const c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, W, H); x.drawImage(im, 0, 0, W, im.height * W / im.width); return x.getImageData(0, 0, W, H).data; };
    const p = px(A), q = px(B); let d = 0; for (let i = 0; i < p.length; i += 4) d += (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2])) / 3;
    return d / (p.length / 4) / 255 * 100;
  }, ["data:image/png;base64," + fs.readFileSync(ref).toString("base64"), "data:image/png;base64," + shot.toString("base64")]);
  const ours = (await page.evaluate(() => document.documentElement.scrollHeight));
  out.push({ name, route, ref: `${w}x${h}`, ourHeight: full ? ours : "viewport", diff: score.toFixed(1) + "%" });
  await ctx.close();
}
await browser.close();
console.table(out);
fs.writeFileSync("recon/parity/report.json", JSON.stringify(out, null, 2));
