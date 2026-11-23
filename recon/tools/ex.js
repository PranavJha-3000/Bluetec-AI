const fs=require("fs");const f=process.argv[2];const h=fs.readFileSync(f,"utf8");
const m=h.match(/<main[\s\S]*?<\/main>/)?.[0]||h;
const t=m.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<style[\s\S]*?<\/style>/g,"").replace(/<(h[1-6]|p|li|a|button|div|section|span|label|dt|dd|summary)[ >][^>]*>/g,"\n").replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&#x27;/g,"'");
console.log(t.split("\n").map(s=>s.trim()).filter(Boolean).join(" | ").slice(0,+process.argv[3]||3500));
console.log("TITLE:",h.match(/<title>(.*?)<\/title>/)?.[1]);
