// Re-fetch every chosen Commons image at a web-appropriate width (1280px),
// which re-encodes them far smaller. Also rewrites a correct _sources.json.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/images");
const UA = "TimelessTalesSiteBuilder/1.0 (https://timelesstales.com; contact@timelesstales.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const WIDTH = 1280;

// Final, correct name -> Commons File title (merges both fetch runs)
const MAP = {
  "hero-source": "File:Dal Lake at sunset, Srinagar.jpg",
  "work-tears-in-verse": "File:Anthology of Persian Poetry (Safina) MET TR686.2002.jpeg",
  "work-echoes-of-existence": "File:SERENEKASHMIR.jpg",
  "work-beneath-chinar-trees": "File:Chinar oriental plane tree.jpg",
  "work-shards-of-souls": "File:Shattered Glass Altar at Sunset.jpg",
  "work-letters-to-murderer": "File:Scribe- Menahem - The Birds' Head Haggadah - Google Art Project.jpg",
  "work-midnight-verses": "File:IMG 4641 - Laveno - Foto Giovanni Dall'Orto - 2 feb 2007.jpg",
  "work-whispers-of-srinagar": "File:Panorama of Bazaar Scene - Old City - Srinagar - Jammu & Kashmir - India (26743918472).jpg",
  "work-silent-conversations": "File:Project 365 -202 210723 The Rainy City (53061937253).jpg",
  "work-autumn-elegy": "File:Autumn Reflections - Flickr - laijos.jpg",
  "work-faded-photographs": "File:William Charles Wentworth (sepia).jpg",
  "work-love-lost-in-kashmir": "File:Dard Aryan of Ladakh.jpg",
  "work-the-invisible-guest": "File:Dülmen, Kirchspiel, ehem. Sondermunitionslager Visbeck, Löschteich -- 2024 -- 6367-71.jpg",
  "work-words-unspoken": "File:Drawing, study for hands holding an open book with drapery from clothing, ca. 1890 (CH 18404437).jpg",
  "work-mourning-dove": "File:White-tipped dove.jpg",
  "work-rose-from-concrete": "File:Red rose single flower.jpg",
  "work-requiem-for-love": "File:Vibrant red rose on gray (Unsplash).jpg",
};

async function thumbUrl(title) {
  const url = `${API}?action=query&format=json&titles=${encodeURIComponent(
    title
  )}&prop=imageinfo&iiprop=url|size&iiurlwidth=${WIDTH}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const json = await res.json();
  const pages = json?.query?.pages || {};
  for (const k in pages) {
    const ii = pages[k].imageinfo?.[0];
    if (ii) return ii.thumburl || ii.url;
  }
  return null;
}

async function download(urlStr, dest) {
  const res = await fetch(urlStr, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const report = [];
for (const [name, title] of Object.entries(MAP)) {
  try {
    const url = await thumbUrl(title);
    if (!url) { console.log(`MISS ${name}`); continue; }
    const bytes = await download(url, path.join(OUT, `${name}.jpg`));
    report.push({ name, title: title.replace(/^File:/, ""), kb: Math.round(bytes / 1024) });
    console.log(`OK  ${name}.jpg  ${Math.round(bytes / 1024)} KB  <-  ${title.replace(/^File:/, "")}`);
  } catch (e) {
    console.log(`ERR ${name}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 300));
}
fs.writeFileSync(path.join(OUT, "_sources.json"), JSON.stringify(report, null, 2));
console.log("\nManifest rewritten.");
