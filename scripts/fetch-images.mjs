// Fetch real, freely-licensed images from Wikimedia Commons for each
// book cover + hero. No API key required. Scaled JPEGs saved to public/images.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/images");
fs.mkdirSync(OUT, { recursive: true });

const UA = "TimelessTalesSiteBuilder/1.0 (https://timelesstales.com; contact@timelesstales.com)";
const API = "https://commons.wikimedia.org/w/api.php";

// Reject obvious non-photo / off-theme results
const BAD = /(map|diagram|chart|logo|seal|flag|coat of arms|svg|icon|graph|locator|plaque|poster|stamp|banknote|coin|signature|gif)/i;

// Each target: filename + ordered list of search queries (first good hit wins)
const TARGETS = [
  { name: "hero-source", q: ["Dal Lake Srinagar sunset", "Dal Lake Srinagar golden hour", "Srinagar Kashmir mountains lake"] },
  { name: "work-tears-in-verse", q: ["open old book pages", "book poetry vintage", "open book candle"] },
  { name: "work-echoes-of-existence", q: ["Dal Lake Srinagar misty morning", "Dal Lake fog dawn", "Kashmir lake reflection mist"] },
  { name: "work-beneath-chinar-trees", q: ["Chinar tree autumn Kashmir", "Chinar autumn leaves Srinagar", "Naseem Bagh chinar autumn"] },
  { name: "work-shards-of-souls", q: ["autumn Srinagar foggy", "broken mirror reflection", "Kashmir autumn misty street"] },
  { name: "work-letters-to-murderer", q: ["old letter handwriting parchment", "antique letter quill ink", "vintage manuscript writing"] },
  { name: "work-midnight-verses", q: ["Dal Lake night reflection", "Srinagar lake night lights", "moon reflection lake night"] },
  { name: "work-whispers-of-srinagar", q: ["Srinagar old city", "Srinagar street twilight", "Srinagar houseboat evening"] },
  { name: "work-silent-conversations", q: ["coffee cup window rain", "two coffee cups table", "tea cup window rainy"] },
  { name: "work-autumn-elegy", q: ["Chinar tree autumn reflection lake", "autumn tree lake reflection red", "Kashmir autumn lake tree"] },
  { name: "work-faded-photographs", q: ["old vintage photographs scattered", "antique sepia photographs", "old family photographs pile"] },
  { name: "work-love-lost-in-kashmir", q: ["Kashmiri woman traditional dress", "woman pheran Kashmir", "Kashmiri girl traditional"] },
  { name: "work-the-invisible-guest", q: ["misty lake moonlight night", "foggy lake moon ethereal", "Dal Lake mist evening"] },
  { name: "work-words-unspoken", q: ["hands holding open book", "writing journal hands", "open journal pen hands"] },
  { name: "work-mourning-dove", q: ["white dove flying sky", "dove in flight", "white pigeon flying"] },
  { name: "work-rose-from-concrete", q: ["wild rose flower stone wall", "rose growing wall ruins", "single red rose"] },
  { name: "work-requiem-for-love", q: ["red rose dark background", "single red rose dramatic", "red rose petals dark"] },
];

async function searchOne(query) {
  const url = `${API}?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1600`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const json = await res.json();
  const pages = json?.query?.pages || {};
  const items = [];
  for (const k in pages) {
    const p = pages[k];
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    if (!/image\/(jpeg|png)/.test(ii.mime)) continue;
    if (BAD.test(p.title)) continue;
    if (ii.width < 1200) continue;
    const landscape = ii.width >= ii.height;
    items.push({ title: p.title, thumburl: ii.thumburl, landscape, w: ii.width });
  }
  // Prefer landscape, then larger originals
  items.sort((a, b) => (b.landscape - a.landscape) || (b.w - a.w));
  return items;
}

async function download(urlStr, dest) {
  const res = await fetch(urlStr, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const used = new Set();
const report = [];

for (const t of TARGETS) {
  let done = false;
  for (const query of t.q) {
    let candidates;
    try {
      candidates = await searchOne(query);
    } catch (e) {
      continue;
    }
    const pick = candidates.find((c) => !used.has(c.title));
    if (!pick) continue;
    try {
      const dest = path.join(OUT, `${t.name}.jpg`);
      const bytes = await download(pick.thumburl, dest);
      used.add(pick.title);
      report.push({ name: t.name, title: pick.title, query, kb: Math.round(bytes / 1024) });
      console.log(`OK  ${t.name}.jpg  <-  ${pick.title}  (${Math.round(bytes / 1024)} KB)  [q: ${query}]`);
      done = true;
      break;
    } catch (e) {
      continue;
    }
  }
  if (!done) {
    console.log(`MISS ${t.name}  — no candidate found across queries`);
    report.push({ name: t.name, title: null });
  }
  // be polite to the API
  await new Promise((r) => setTimeout(r, 350));
}

fs.writeFileSync(
  path.resolve("public/images/_sources.json"),
  JSON.stringify(report, null, 2)
);
console.log("\nDone. Source manifest written to public/images/_sources.json");
