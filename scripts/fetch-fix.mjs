// Targeted re-fetch for off-theme / missed items. Overwrites in place.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/images");
const UA = "TimelessTalesSiteBuilder/1.0 (https://timelesstales.com; contact@timelesstales.com)";
const API = "https://commons.wikimedia.org/w/api.php";

const BAD = /(map|diagram|chart|logo|seal|flag|coat of arms|svg|icon|graph|locator|plaque|poster|stamp|banknote|coin|signature|gif|aircraft|airplane|aeroplane|museum|traffic|zrcadlo|village|panorama of bazaar|aircraftspotting|jet|airport|airshow)/i;

const TARGETS = [
  { name: "work-tears-in-verse", q: ["open book reading candlelight", "open poetry book page", "open antique book"] },
  { name: "work-shards-of-souls", q: ["broken glass shattered", "cracked glass texture", "shattered window glass"] },
  { name: "work-letters-to-murderer", q: ["fountain pen handwritten letter", "old handwritten manuscript ink", "antique letter writing paper"] },
  { name: "work-faded-photographs", q: ["vintage photograph portrait sepia", "antique photograph old", "old photograph black and white portrait"] },
  { name: "work-the-invisible-guest", q: ["foggy lake evening mist", "misty water moonlight", "lake fog night reflection"] },
  { name: "work-mourning-dove", q: ["white dove bird", "Streptopelia dove", "white pigeon bird sky"] },
];

async function searchOne(query) {
  const url = `${API}?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrnamespace=6&gsrlimit=14&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1600`;
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
    items.push({ title: p.title, thumburl: ii.thumburl, landscape: ii.width >= ii.height, w: ii.width });
  }
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

for (const t of TARGETS) {
  let done = false;
  for (const query of t.q) {
    let candidates;
    try { candidates = await searchOne(query); } catch { continue; }
    const pick = candidates[0];
    if (!pick) continue;
    try {
      const bytes = await download(pick.thumburl, path.join(OUT, `${t.name}.jpg`));
      console.log(`OK  ${t.name}.jpg  <-  ${pick.title}  (${Math.round(bytes / 1024)} KB)  [q: ${query}]`);
      done = true;
      break;
    } catch { continue; }
  }
  if (!done) console.log(`STILL MISS ${t.name}`);
  await new Promise((r) => setTimeout(r, 350));
}
