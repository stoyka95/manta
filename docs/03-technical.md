# 03 — Technické zadání

## 1. Prostředí této session — omezení, která ovlivňují build

Tento build vzniká v sandboxované Claude Code cloud session s omezeným
síťovým výstupem (egress proxy s allowlistem). Ověřeno:

- `WebFetch`/`curl` na libovolné domény (vč. `example.com`) → **blokováno**
  (`EGRESS_BLOCKED` / proxy 403 „connect_rejected“).
- `WebSearch` → **funguje** (jiná cesta, mimo tuto proxy).
- Fotobanky (`images.unsplash.com`, `source.unsplash.com`,
  `images.pexels.com`, `pixabay.com`, `cdn.pixabay.com` vč. jejich API) →
  **blokováno**. Ověřeno opakovaně dvěma nezávislými cestami — `curl`
  (Node fetch/proxy) i přímo přes headless Chromium (Playwright), obojí
  končí na úrovni proxy s `ERR_TUNNEL_CONNECTION_FAILED` / 403. Chromium
  tedy proxy restrikci neobchází — jde o skutečné síťové omezení tohoto
  prostředí, ne o limitaci jednoho nástroje.
- `github.com` → dosažitelný (potřeba pro git push).
- npm registry (`registry.npmjs.org`), PyPI atd. → v `noProxy` allowlistu,
  **fungují přímo** (bez proxy).

**Důsledky pro implementaci:**
1. Žádné externí runtime fetchování fontů (Google Fonts API) ani obrázků —
   vše musí jít přes npm balíčky (self-hosted) nebo být vygenerováno lokálně
   (SVG/CSS).
2. Fotografie reálné provozovny nejsou k dispozici → nahrazeno vlastní
   sadou SVG ilustrací v brand paletě (viz `02-design.md`, sekce 5). Uživatel
   může fotky doplnit později do připravených `<img>` slotů.
3. Přesný aktuální ceník/jídelníček nebyl možné stáhnout 1:1 → demo hodnoty
   jasně okomentované jako placeholder (viz `01-content-structure.md`).

## 2. Tech stack

| Vrstva | Volba | Důvod |
|---|---|---|
| Framework | **Next.js 15** (App Router, TS) | SSG/SSR pro SEO, snadný Vercel deploy, file-based routing = čistá IA |
| Styling | **Tailwind CSS v4** | rychlé sestavení design tokenů z `02-design.md`, výkon |
| Animace | **Framer Motion (`motion`)** + CSS keyframes | deklarativní scroll/hover animace popsané v design docu |
| Fonty | **`@fontsource/poppins` (nadpisy) + `@fontsource/inter` (text)** | self-hosted, žádné runtime volání na Google — importovat plné per-weight CSS, viz past níže |
| Ikony | **`lucide-react`** (doladěné vlastní SVG pro brand ilustrace) | lehké, tree-shakable |
| Formuláře | React state + `zod` validace (client-side, bez backendu) | demo funkčnost bez nutnosti serveru/DB |
| Rezervace | vlastní `BookingWidget` (den × dráha × hodina, výpočet ceny) | interaktivní demo rezervačního systému, viz sekce 9 |
| Obrázky loga | vlastní SVG → rasterizace přes `sharp` (node skript) do PNG | needed „logo → PNG“ zadání |
| Hosting | **Vercel** | zadání uživatele |
| Analytika (fáze 2) | `@vercel/analytics` + PostHog (anonymní) | zadání uživatele — připojuje se až po potvrzení nasazení |

### 2.1 Past: `@fontsource/*/latin-ext-*.css` nestačí

`@fontsource/poppins/latin-ext-700.css` deklaruje `@font-face` **bez
`unicode-range`**, ale samotný woff2 obsahuje jen rozšířenou latinku
(U+0100–02BA a dál). Základní latinka — tedy `a–z` i `á é í ó ú ý` — v
souboru **není**. Prohlížeč proto tyto glyfy vykreslil systémovým fontem
a Poppins/Inter se projevily jen na `ě š č ř ž ů ď ť ň`. Navenek to
vypadalo jako „diakritika je tlustší než zbytek textu“, ve skutečnosti
byl v brand fontu jen ten zlomek znaků.

Správně je importovat **plné per-weight soubory** (`@fontsource/poppins/700.css`),
které deklarují každý subset s vlastním `unicode-range`. Prohlížeč pak
stáhne jen to, co stránka potřebuje — pro češtinu latin + latin-ext,
devanagari nikdy (ověřeno v síťovém panelu: 9 souborů, ~150 kB).

Ověřovací nástroj: `node scripts/font-audit.mjs <url>` — přes CDP
`CSS.getPlatformFontsForNode` vypíše, kterými **skutečnými** fonty
prohlížeč jednotlivé prvky vykreslil. Když u řádku svítí `MIX!`, míchají
se dva fonty a něco je špatně.

## 3. Struktura projektu (návrh)

```
app/
  layout.tsx                 – root layout, fonty, metadata defaults, JSON-LD Organization
  page.tsx                   – Domů
  bowling/page.tsx
  restaurace-a-bar/page.tsx
  oslavy-a-akce/page.tsx
  cenik/page.tsx
  rezervace/page.tsx
  kontakt/page.tsx
  faq/page.tsx
  sitemap.ts                 – dynamický sitemap.xml
  robots.ts                  – robots.txt
  opengraph-image.tsx        – generovaný OG obrázek (branded)
components/
  layout/ (Header, Footer, MobileNav)
  sections/ (Hero, StatBar, OfferGrid, WhyUs, GlowNight, PricingTeaser,
             Testimonials, FaqAccordion, CtaBanner, ContactMap…)
  ui/ (Button, Badge, Card, Accordion…)
  illustrations/ (MantaHero.tsx, BowlingLane.tsx, GlowBadge.tsx…)
lib/
  content.ts                 – copy jako typovaná data (jeden zdroj pravdy)
  seo.ts                     – helpery pro metadata/JSON-LD
public/
  logo/ (manta-logo.svg, manta-logo.png, favicon…)
docs/                         – tato dokumentace
scripts/
  render-logo.mjs            – SVG → PNG export (sharp)
```

## 4. SEO — implementace

- Per-route `generateMetadata` (title/description šablony, `<= 60/155`
  znaků), kanonické URL, `alternates.canonical`.
- `sitemap.ts` + `robots.ts` generované ze seznamu rout.
- Sémantický HTML5 (`header/nav/main/section/footer`, jeden `h1`/stránka,
  logická hierarchie h2→h3).
- Obrázky/ilustrace s popisným `alt`; dekorativní `aria-hidden`.
- Interní prolinkování mezi Domů ↔ podstránky (nabídkové karty, CTA, footer).
- Core Web Vitals: `next/font` self-host (žádný layout shift z fontů),
  `next/image`-style optimalizace tam, kde budou reálné fotky, animace
  přes `transform/opacity` (GPU), lazy-mount těžších motion sekcí.
- Rychlost: statické generování (SSG) všech stránek — žádný DB round-trip.

## 5. AEO (Answer Engine Optimization) — cíl: citovatelnost v AI asistentech

- `/faq` + FAQ sekce na homepage/kontaktu jako **`FAQPage` JSON-LD**, každá
  odpověď 40–70 slov, fakt hned v první větě (viz `01-content-structure.md`).
- `LocalBusiness`/`SportsActivityLocation` JSON-LD na homepage a v
  `layout.tsx` (adresa, telefon, otevírací doba `openingHoursSpecification`,
  `priceRange`, geo souřadnice, `sameAs`).
- Krátké „přímé odpovědi“ hned pod nadpisy klíčových sekcí (první věta =
  extrahovatelný fakt, ne marketingová fráze) — např. „Bowling Manta má 6
  profesionálních drah v Praze 6, otevřeno denně od 11:00.“
- Konzistentní NAP (Name/Address/Phone) napříč patičkou, kontaktní stránkou
  a JSON-LD — AI enginy i lokální SEO tomu důvěřují víc, když se shoduje.

## 6. GEO (Generative Engine Optimization)

- Strukturovaný obsah s jasnými nadpisy, definičními větami a tabulkami
  (ceník) — enginy typu ChatGPT/Perplexity/Gemini preferují extrahovatelné,
  dobře strukturované bloky před „vágní“ marketingovou prózou.
- `BreadcrumbList` JSON-LD pro podstránky.
- `Product`/`Offer` JSON-LD na `/cenik` (bowling hodina jako nabídka s
  cenou a měnou CZK).
- `Event`/`SportsEvent` JSON-LD potenciál pro ligu/turnaje na `/bowling`
  (připraveno jako rozšíření, ne blokující pro demo).
- Čistá sémantika + rychlé načtení = enginy stránku spolehlivě
  naindexují/vyrenderují (mnoho AI crawlerů nespouští JS bez fallbacku —
  proto SSG, ne CSR-only).

## 7. Nástroj pro audit

Cíl: web má projít auditem na `audit.demakod.cz`. Zajišťujeme:
- Validní `robots.txt`/`sitemap.xml`, žádné blokující `noindex`.
- Rychlé LCP (statický hero, self-hosted fonty, ilustrace jako inline SVG
  ne jako těžké rastrové obrázky).
- Meta title/description na každé stránce, `<html lang="cs">`, `viewport`
  meta, favicon sada (16/32/180/512 + `site.webmanifest`).
- OG/Twitter meta + generovaný `opengraph-image`.
- Žádné console errory, žádné broken linky (interní nav prochází jen
  existující routy).

## 8. Analytika (fáze 2 — po potvrzení nasazení)

Dle zadání: *„po dokončení programování dej web na Vercel, pak napojíme i
analytiku anonymní (Vercel a PostHog)“* → analytika se připojuje **po**
úspěšném nasazení, ne během buildu:
1. **Vercel Web Analytics** — `@vercel/analytics` balíček + `<Analytics />`
   v root layoutu (aktivace v repu; ostrá sběr dat se zapne v projektu na
   Vercelu).
2. **PostHog** (anonymní režim) — `posthog-js` s `person_profiles: 'identified_only'`
   a bez cookie/identifikace uživatele (respekt k „anonimní“ požadavku),
   cookie-less/`disable_session_recording` konfigurovatelné; API klíč se
   doplní jako env proměnná (`NEXT_PUBLIC_POSTHOG_KEY`) až budou k
   dispozici přístupy — kód připravíme jako no-op bez klíče.

## 9. Rezervační widget (`/rezervace`)

Interaktivní ukázka rezervačního systému — celá se vejde na jednu obrazovku
(bez scrollování), inspirace obdobným demem na `absolutni-bowling.vercel.app`.

**Tok:** výběr dne → výběr slotů v mřížce → souhrn s cenou → kontakt → potvrzení.

| Prvek | Chování |
|---|---|
| Výběr dne | 14 dní dopředu, stránkované po 7; „dnes“ má tečku. Po 20:00 se otevírá rovnou zítřek |
| Mřížka | 6 drah × hodiny 11–23. V každé volné buňce je **cena za hodinu** (330/430/530 Kč Po–Pá, 450/550 Kč víkend a svátky) |
| Obsazenost | deterministický FNV-1a hash z `datum\|dráha\|hodina` — stejný den vypadá vždy stejně, žádný hydration mismatch. Večery a víkendy jsou plnější |
| Uplynulé hodiny | u dnešního dne jsou hodiny ≤ aktuální nevolitelné |
| Limit | max. 3 hodiny na dráhu online (nad rámec = telefonicky), více drah najednou lze |
| Cena | průběžný součet napříč vybranými sloty, rozpad po dráhách v souhrnu |
| Responzivita | desktop: souhrn jako pravý sloupec; mobil: fixní spodní lišta, která se v dalším kroku rozvine do sheetu |
| Hydratace | datum se počítá až na klientovi přes `useSyncExternalStore`; do té doby se renderuje skeleton stejné výšky |

Formulář je stále demo — nic se neodesílá, což je na stránce i v potvrzení
explicitně napsané.

## 10. Nasazení

1. `git push` do větve `claude/bowling-manta-demo-web-m26pwp`.
2. Vercel projekt napojený na repozitář `stoyka95/manta` (přes Vercel MCP
   nástroje v této session).
3. Produkční build ověřen (`next build`) před samotným deployem.
4. Po nasazení: sdílet živou URL, poté navázat fázi analytiky (bod 8).
