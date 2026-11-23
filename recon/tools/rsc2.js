const fs = require("fs");
const OUT = "C:/Users/prana/OneDrive/Desktop/Code/Bluetec AI/recon/data/";
function rsc(file) {
  const h = fs.readFileSync(file, "utf8");
  const re = /self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g;
  let m, s = "";
  while ((m = re.exec(h))) s += JSON.parse('"' + m[1] + '"');
  return s;
}
function arrAfter(s, key) {
  const i = s.indexOf('"' + key + '":[');
  if (i < 0) return null;
  const j = i + key.length + 3;
  let d = 0, inStr = false, esc = false;
  for (let k = j; k < s.length; k++) {
    const c = s[k];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === "[") d++;
    else if (c === "]") { d--; if (d === 0) { try { return JSON.parse(s.slice(j, k + 1)); } catch (e) { return null; } } }
  }
}
const pages = ["puppies", "happy-families", "gone-home", "faq", "how-it-works", "contact", "puppies_maltipoo-max-male"];
for (const p of pages) {
  const s = rsc("p_" + p + ".html");
  const keys = [...new Set([...s.matchAll(/"([A-Za-z]+)":\[/g)].map(x => x[1]))].filter(k => !["children", "r", "c", "G", "template", "errorStyles", "errorScripts"].includes(k));
  console.log("==", p, s.length, keys.join(","));
  for (const k of keys) {
    const a = arrAfter(s, k);
    if (a && a.length && typeof a[0] === "object" && a[0] && !Array.isArray(a[0])) {
      console.log("  ", k, a.length, Object.keys(a[0]).join(","));
      fs.writeFileSync(OUT + p + "." + k + ".json", JSON.stringify(a, null, 1).replace(/"blurDataUrl": "[^"]*"/g, '"blurDataUrl": "<omitted>"'));
    }
  }
}
