// Stáhne fotky z Pixabay do public/photos/ pod názvy, které web očekává.
//
// Spusťte LOKÁLNĚ (v sandboxu této session je Pixabay blokovaný proxy):
//
//   PIXABAY_API_KEY=xxxxxxxx node scripts/fetch-photos.mjs
//   PIXABAY_API_KEY=xxxxxxxx node scripts/fetch-photos.mjs glow-night burger
//
// Bez argumentů stáhne všechny chybějící sloty; s argumenty jen vyjmenované
// (a přepíše je). Klíč zdarma: https://pixabay.com/api/docs/
// Licence Pixabay Content License — komerční použití bez atribuce.
//
// Pozn.: stock fotky jsou jen dočasná náhrada. Skutečné fotky provozovny
// stačí uložit do public/photos/ pod stejným názvem (jpg/webp/png) a web je
// použije automaticky — viz lib/photos.ts.

import { writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const API_KEY = process.env.PIXABAY_API_KEY;
if (!API_KEY) {
  console.error(
    "Chybí PIXABAY_API_KEY.\n  PIXABAY_API_KEY=xxx node scripts/fetch-photos.mjs"
  );
  process.exit(1);
}

const outDir = path.resolve(import.meta.dirname, "..", "public", "photos");
mkdirSync(outDir, { recursive: true });

/** slug → vyhledávací dotaz; slugy musí sedět na PhotoSlug v lib/photos.ts */
const queries = {
  "hero-lanes": "bowling alley lanes",
  "glow-night": "bowling neon lights",
  "lane-detail": "bowling ball lane",
  "bowling-shoes": "bowling shoes",
  "kids-bowling": "children bowling",
  "friends-bowling": "friends bowling fun",
  burger: "burger fries restaurant",
  "restaurant-interior": "restaurant interior tables",
  "cocktail-bar": "cocktails bar",
  wine: "wine glasses bar",
  "bar-counter": "bar counter beer tap",
  "birthday-party": "birthday party cake celebration",
  "team-celebration": "team celebration high five",
  "corporate-event": "corporate party venue",
};

const EXT = ["jpg", "jpeg", "webp", "png"];
const has = (slug) => EXT.some((e) => existsSync(path.join(outDir, `${slug}.${e}`)));

const only = process.argv.slice(2);
const todo = Object.entries(queries).filter(
  ([slug]) => (only.length ? only.includes(slug) : !has(slug))
);

if (only.length) {
  const unknown = only.filter((s) => !(s in queries));
  if (unknown.length) {
    console.error(`Neznámé slugy: ${unknown.join(", ")}`);
    console.error(`Dostupné: ${Object.keys(queries).join(", ")}`);
    process.exit(1);
  }
}

if (todo.length === 0) {
  console.log("Všechny sloty už mají fotku. Konkrétní přestáhnete uvedením slugu.");
  process.exit(0);
}

let ok = 0;
const failed = [];

for (const [slug, query] of todo) {
  try {
    const url =
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}` +
      `&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&min_width=1200`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Pixabay API ${res.status}`);
    const hit = (await res.json()).hits?.[0];
    if (!hit) throw new Error("žádný výsledek");

    const img = await fetch(hit.largeImageURL);
    if (!img.ok) throw new Error(`stažení ${img.status}`);
    writeFileSync(path.join(outDir, `${slug}.jpg`), Buffer.from(await img.arrayBuffer()));
    console.log(`✓ ${slug}.jpg  ← "${query}"  (Pixabay #${hit.id}, ${hit.user})`);
    ok++;
  } catch (err) {
    console.warn(`✗ ${slug}: ${err.message}`);
    failed.push(slug);
  }
  await new Promise((r) => setTimeout(r, 700)); // limit 100 req / 60 s
}

const present = readdirSync(outDir).filter((f) => EXT.includes(f.split(".").pop()));
console.log(`\nStaženo ${ok}/${todo.length}. Celkem fotek: ${present.length}/${Object.keys(queries).length}`);
if (failed.length) console.log(`Nepovedlo se: ${failed.join(", ")}`);
console.log("\nDál: `npm run build` a fotky se objeví v galerii i na podstránkách.");
