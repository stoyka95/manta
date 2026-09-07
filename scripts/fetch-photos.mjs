// Stáhne sadu reálných fotek z Pixabay API a uloží je do public/photos/.
// Spusťte LOKÁLNĚ (mimo tuto sandboxovanou session, kde je Pixabay blokovaný):
//
//   PIXABAY_API_KEY=xxxxxxxxxxxx node scripts/fetch-photos.mjs
//
// Zdarma API klíč: https://pixabay.com/api/docs/#api_rate_limit (po registraci).
// Free tier: 100 requestů / 60s, licence Pixabay Content License (komerční
// použití bez atribuce povoleno) — https://pixabay.com/service/license/

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const API_KEY = process.env.PIXABAY_API_KEY;
if (!API_KEY) {
  console.error("Chybí PIXABAY_API_KEY. Spusťte: PIXABAY_API_KEY=xxx node scripts/fetch-photos.mjs");
  process.exit(1);
}

const outDir = path.resolve(import.meta.dirname, "..", "public", "photos");
mkdirSync(outDir, { recursive: true });

// slug -> vyhledávací dotaz na Pixabay
const queries = {
  "hero-lanes": "bowling alley lanes",
  "glow-night": "bowling neon glow",
  "burger": "burger restaurant food",
  "cocktail-bar": "cocktail bar drinks",
  "birthday-party": "birthday party celebration",
  "friends-bowling": "friends bowling fun",
  "wine": "wine glasses restaurant",
  "team-celebration": "team celebration high five",
};

async function fetchOne(slug, query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pixabay API ${res.status} pro "${query}"`);
  const data = await res.json();
  const hit = data.hits?.[0];
  if (!hit) {
    console.warn(`Žádný výsledek pro "${query}", přeskakuji.`);
    return;
  }
  const imgRes = await fetch(hit.largeImageURL);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const file = path.join(outDir, `${slug}.jpg`);
  writeFileSync(file, buf);
  console.log(`✓ ${slug}.jpg ← "${query}" (Pixabay #${hit.id}, autor: ${hit.user})`);
}

for (const [slug, query] of Object.entries(queries)) {
  await fetchOne(slug, query);
  // šetrné tempo vůči rate limitu (100 req / 60s)
  await new Promise((r) => setTimeout(r, 700));
}

console.log(`\nHotovo. Fotky jsou v ${outDir}`);
console.log("Dál mi řekněte, ať je zapojím do GalleryStrip / hero sekcí místo SVG ilustrací.");
