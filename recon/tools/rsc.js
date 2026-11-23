const fs = require("fs");
const h = fs.readFileSync("p_puppies.html", "utf8");
const re = /self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g;
let m, s = "";
while ((m = re.exec(h))) s += JSON.parse('"' + m[1] + '"');
fs.writeFileSync("rsc_puppies.txt", s);
console.log("len", s.length);
const i = s.indexOf('"slug"');
console.log(s.slice(Math.max(0, i - 200), i + 1800));
