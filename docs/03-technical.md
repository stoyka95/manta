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

Prvním řešením byl import **plných per-weight souborů**
(`@fontsource/poppins/700.css`), které deklarují každý subset s vlastním
`unicode-range`. To past odstranilo, ale znamenalo 10 souborů a ~150 kB
fontů na stránku — samotný `inter-latin-ext-400` má 34 kB, z toho
čeština potřebuje pár set znaků.

Finální stav: fonty se sestavují **vlastním subsetem** — viz
`scripts/build-fonts.py` (§2.2).

Ověřovací nástroj: `node scripts/font-audit.mjs <url>` — přes CDP
`CSS.getPlatformFontsForNode` vypíše, kterými **skutečnými** fonty
prohlížeč jednotlivé prvky vykreslil. Když u řádku svítí `MIX!`, míchají
se dva fonty a něco je špatně.

### 2.2 Vlastní subset fontů (`scripts/build-fonts.py`)

Skript slije `latin` + `latin-ext` woff2 z `@fontsource` do jednoho
souboru na váhu, ořeže ho na znaky, které web používá (základní latinka,
Latin-1, Latin Extended-A, české uvozovky, pomlčky, €, šipky) a uloží do
`public/fonts/`. Vedle toho generuje `app/fonts.css`.

| | před | po |
|---|---|---|
| souborů na stránku | 10 | 6 |
| fonty na `/` | 144 kB | 91 kB |
| fonty na podstránce | 120 kB | 71 kB |

Tři důsledky, kvůli kterým to stojí za vlastní krok v pipeline:

1. **Past z §2.1 přestane existovat.** Jeden soubor na váhu pokrývá
   celou češtinu, není co splést s `unicode-range`.
2. **Stabilní cesta v `/public`** dovolí `<link rel="preload">`
   v `app/layout.tsx` (Poppins 600/700/800 + Inter 400, tedy vše nad
   ohybem). Bez preloadu prohlížeč fonty objeví až po stažení a
   parsování CSS.
3. **Dopočítaný fallback.** Skript ke každé váze vygeneruje
   `@font-face` rodinu `"Poppins Fallback"` / `"Inter Fallback"` nad
   Arialem se `size-adjust`, `ascent-override` a `descent-override`
   spočítanými z metrik cílového fontu. Text ve fallbacku tak zabírá
   stejné místo a přehození fontu **nehýbe layoutem**.

Průměrná šířka znaku se váží četností písmen v **reálném textu webu**
(čte se z předrenderovaného HTML v `.next/server/app/*.html`), takže
`size-adjust` sedí na češtinu, ne na obecnou abecedu. Metriky Arialu se
čtou z Liberation Sans, který je s ním záměrně metricky shodný.

Skript se pouští ručně a výstup se commituje — Vercel build fonttools
nemá:

```bash
pip install fonttools brotli
npm run fonts        # = python3 scripts/build-fonts.py
```

Sada vah v `FAMILIES` musí odpovídat tomu, co se v kódu skutečně
používá (`font-semibold` = 600, `font-bold` = 700, `font-extrabold` =
800; Inter navíc 400 jako základ). Váha použitá v CSS, ale chybějící
v subsetu, se vykreslí synteticky ztučnělá.

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

## 10. Fotky a galerie

Sandbox této session nemá přístup k fotobankám (viz sekce 1), takže na webu
zatím nejsou skutečné fotografie. Místo „prázdných“ míst je nasazený
**fotosystém, který fotky přijme bez zásahu do kódu**:

- `lib/photos.ts` — katalog 14 slotů (slug, alt, popisek, kategorie, poměr
  stran). Čistý modul bez `node:fs`, aby šel importovat i z klientských
  komponent.
- `lib/photos.server.ts` — `photoSrc()` / `availablePhotos()`; sahá na disk,
  takže **jen pro serverové komponenty**. (Import z klientské komponenty
  shodí Turbopack build na `does not support external modules (node:fs)`.)
- `components/ui/Photo.tsx` — slot. Když v `public/photos/<slug>.<ext>` leží
  soubor, vykreslí `next/image`; jinak brandovou ilustraci ze
  `components/illustrations/PhotoScene.tsx` ve stejném poměru stran, takže
  layout nikdy neposkočí.
- `public/photos/README.md` — tabulka slotů pro klienta.

Ilustrované scény (9 typů + varianty) jsou schválně ploché a bez gradientů —
navazují na origami styl loga a nemají `id`, takže je lze bezpečně vykreslit
vícekrát na jedné stránce.

**Galerie `/galerie`**: masonry mřížka (CSS `columns`), filtr kategorií s
`layoutId` indikátorem, lightbox s klávesovou i klikací navigací, JSON-LD
`ImageGallery` (obrázky se do schématu přidají teprve až existují).
Fotopásy jsou i na `/bowling`, `/restaurace-a-bar` a `/oslavy-a-akce`.

**Pozor na `aspect-ratio` + `h-full`**: kombinace počítá šířku z výšky, takže
v grid řádku s vyšším sourozencem prvek přeteče sloupec. Sloty proto výšku
nikdy neroztahují.

## 11. Nasazení

1. `git push` do větve `claude/bowling-manta-demo-web-m26pwp`.
2. Vercel projekt napojený na repozitář `stoyka95/manta` (přes Vercel MCP
   nástroje v této session).
3. Produkční build ověřen (`next build`) před samotným deployem.
4. Po nasazení: sdílet živou URL, poté navázat fázi analytiky (bod 8).

## 12. Výkon — naměřeno na produkčním buildu

`npm run audit:perf http://localhost:3000` (Chromium, 1366×768, po
`npm run build && npm start`). Bajty jsou **po drátě**, tj. gzip.

| route | HTML | JS | CSS | fonty | celkem | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 19,8 kB | 333 kB | 9,4 kB | 92,5 kB | 507 kB | 188 ms | 0,000 |
| `/bowling` | 15,1 kB | 333 kB | 9,4 kB | 70,9 kB | 481 kB | 120 ms | 0,000 |
| `/cenik` | 11,1 kB | 333 kB | 9,4 kB | 70,9 kB | 477 kB | 120 ms | 0,000 |
| `/galerie` | 17,7 kB | 333 kB | 9,4 kB | 70,9 kB | 483 kB | 120 ms | 0,000 |
| `/rezervace` | 8,4 kB | 333 kB | 9,4 kB | 70,9 kB | 474 kB | 124 ms | 0,000 |
| `/faq` | 10,7 kB | 335 kB | 9,4 kB | 70,9 kB | 478 kB | 116 ms | 0,000 |

Všech 18 rout je předrenderovaných staticky (`○ (Static)`), takže
crawler dostane hotové HTML — bez JavaScriptu vidí na homepage 632 slov,
`h1`, 7× `h2`, 27 interních odkazů a JSON-LD.

### 12.1 Odstraněné CLS

Původně měla `/rezervace` **CLS 0,388** (desktop) a 0,108 (mobil) —
hluboko v pásmu „poor“ (> 0,25). Dvě příčiny, obě odstraněny:

1. **Přehození fontu.** Fallback měl jiné metriky než Poppins/Inter,
   takže se po načtení fontu změnila výška obsahu. Obsah je na
   `/rezervace` svisle vystředěný (`min-h-svh` + `justify-center`), takže
   se posunul celý blok 1240×506 px. Řešení: dopočítaný fallback
   se `size-adjust` (§2.2). Samotný `preload` nestačil — první
   vykreslení proběhne dřív, než je font hotový.
   → 0,388 → 0,002
2. **Hydratace rezervačního widgetu.** Widget potřebuje `new Date()`,
   takže se na serveru vykreslí kostra. Ta měla dva bloky 386 px, ale
   hotový widget má na mobilu jen jeden (souhrn je `fixed` mimo tok).
   Řešení: kostra kopíruje rozměry hotového stavu.
   → 0,092 → 0,000

### 12.2 Kde je strop

333 kB JS je cena za React + Next App Router + `motion`. Statický
generátor bez klientského frameworku (Astro, Eleventy) by na stejném
obsahu poslal jednotky kB. Pro SEO to **není** rozdíl v tom, co crawler
vidí — HTML je v obou případech hotové — ale je to rozdíl v Core Web
Vitals na pomalém mobilu. Snížit to jde jedině ubráním animací
(`LazyMotion`, méně `"use client"` komponent); v tomhle projektu jsou
animace záměrná součást zadání, takže číslo zůstává.

## 13. Demo, ne oficiální web

Web běží na `vercel.app` se skutečným jménem, adresou, telefonem
a `BowlingAlley` schematem reálného podniku. Indexovat ho by znamenalo
konkurovat bowlingmanta.cz v lokálním vyhledávání. Proto:

- `app/layout.tsx` posílá `robots: { index: false, follow: true }` →
  `<meta name="robots" content="noindex, follow">` na každé stránce.
- `app/robots.ts` crawl schválně **povoluje**. Kdyby tam bylo
  `Disallow: /`, robot stránku vůbec nestáhne, `noindex` v hlavičce
  nikdy nepřečte — a URL se pak může v Googlu objevit bez obsahu.
  `follow: true` pak zajistí, že robot projde všechny podstránky a
  `noindex` si přečte u každé.
- `components/layout/DemoBadge.tsx` drží vpravo dole trvalé upozornění.
  Otevřené vysvětlí, že ceny i rezervace jsou nezávazné, a odkáže na
  oficiální web; zavřené se scvrkne na pilulku „DEMO“, takže se nedá
  odklikat natrvalo. Stav drží `useState` v root layoutu, který App
  Router mezi přechody neodmountuje — zavření platí pro celou návštěvu,
  po reloadu se upozornění zase ukáže.

Pod `lg` se štítek na `/rezervace` odsune výš (`bottom-24`), aby
nepřekrýval fixní lištu se souhrnem rezervace.

Sitemap zůstává — pomáhá robotovi najít všechny stránky, u kterých si má
`noindex` přečíst.

Až web dostane vlastní doménu a nahradí ten původní, stačí obrátit
`index: false` na `true` a odebrat `<DemoBadge />` z layoutu.

## 14. Smrsknutí hlavičky při scrollu

Původně to působilo rozsypaně, protože jedna změna běžela na třech
různých hodinách:

| co | čím | trvání |
|---|---|---|
| šířka a odsazení lišty | `motion.div` `animate` | 350 ms |
| pozadí, rámeček, stín | `transition-colors` | 150 ms (výchozí) |
| **obsah ovládání** | `xl:hidden` / `xl:flex` | **0 ms — skok** |

Text „+420 235 302 220“ a tlačítko „Rezervovat dráhu“ tedy zmizely
v jednom snímku a kolečka s ikonami se objevila na jejich místě; teprve
pak se lišta dalších 350 ms sunula do užšího tvaru.

Teď je to jeden morf: ikona zůstává na místě a mění se jen popisek vedle
ní. Vše na jedné křivce `cubic-bezier(0.32, 0.72, 0, 1)`, 450 ms.

### Proč CSS a ne Framer Motion

Podmínka „pod `xl` se vejdou jen ikony“ musí zůstat media query. Kdyby ji
řešil JavaScript (`matchMedia`), server by neznal šířku okna, vykreslil
by jiný stav než klient a hydratace by lištu posunula — tedy CLS, který
je jinak na nule. CSS tenhle problém nemá. Bonus: popisek zůstává v DOM
i ve smrsklém stavu, takže ho čtečky i roboti čtou pořád.

### Šířka a průhlednost zvlášť

Popisek má dva vnořené `<span>`: vnější animuje `max-width` (450 ms),
vnitřní `opacity`. Se sdíleným trváním bylo při zavírání vidět, jak text
ořezává zužující se pilulka („Rezervo…“), a při otevírání naskočil do
ještě úzké.

CSS bere hodnoty přechodu z **cílového** stavu, což dává asymetrii
zadarmo:

- zavírání → `duration-150`, bez prodlevy: text zmizí dřív, než ho stihne
  šířka oříznout,
- otevírání → `duration-200 delay-200`: pilulka se nejdřív rozevře,
  teprve pak se text objeví.

`max-width` v rozvinutém stavu má sedět na skutečnou šířku textu
(naměřeno 131 a 135 px → `9rem`). Zbytečně velká hodnota znamená, že
animace zpočátku „stojí“, než se `max-width` dostane pod šířku obsahu.

Pozn.: rozvinutá šířka se předává jako **hotová třída**
(`xl:max-w-[9rem]`), ne jako `xl:${...}` — Tailwind skenuje zdrojový
text a složenou třídu by nevygeneroval.

### Hystereze prahu

`scrolled` se zapíná nad 48 px a vypíná pod 12 px. S jediným prahem
lišta blikala, když uživatel zastavil přesně na hraně.

### Rozměry

Rozvinutá lišta je `max-w-[1200px]` (bylo 1160). Ovládání povyrostlo —
telefon má nově vlastní pilulku a CTA ikonu kalendáře, díky které morf
čte jako záměr — a při 1160 px obsah o 9 px přetékal. Ověřeno na
1024/1100/1279/1280/1300/1366/1440/1600/1920 px: `scrollWidth` se rovná
`clientWidth`, nikde vodorovný scroll.

Vedlejší úklid: v hlavičce byl dvakrát odkaz na `/rezervace` (ikonová
i textová varianta, jedna schovaná CSS). Teď je jeden.
