# 02 — Design systém

## 1. Zdroj pravdy: nové logo

Logo Manta = origami manta rejnok (3 vrstvy modré ve tvaru křídel/plutví)
plavoucí před sluncem, které je zároveň bowlingová koule (3 bílé dírky na
úchop). Wordmark „manta“ malými písmeny, zaoblený geometrický sans, tmavá
petrolejová barva, ® symbol.

**Z loga odvozený význam:** voda/pohyb (rejnok) × hra/přesnost (koule) ×
teplo/energie (slunce). Paleta níže NENÍ převzata ze starého webu (ten byl
tmavě modrý/generický) — je odvozena čistě z nového loga.

## 2. Barevná paleta

### Primární (Manta Ocean — modrá z rejnoka)
| Token | Hex | Použití |
|---|---|---|
| `ocean-100` | `#EAF6FA` | jemné pozadí sekcí, ghost badge |
| `ocean-200` | `#CBEAF3` | hover pozadí, obrysy karet |
| `ocean-300` | `#9FDBEA` | světlá plutev, ilustrace |
| `ocean-400` | `#5FBEDD` | ilustrace, sekundární akcent |
| `ocean-500` | `#2E9BC7` | odkazy, ikony, sekundární CTA border |
| `ocean-600` | `#1C7BAE` | primární brand modrá (loga střed) |
| `ocean-700` | `#145C87` | hover primární, tmavší akcent |
| `ocean-900` | `#0D3A56` | hluboké pozadí (GLOW sekce) |

### Ink (petrolejová z wordmarku — hlavní textová/tmavá barva)
| Token | Hex | Použití |
|---|---|---|
| `ink-500` | `#5C7B82` | pomocný/muted text |
| `ink-700` | `#33535B` | běžný text, nadpisy H3+ |
| `ink-900` | `#1E353B` | H1/H2, wordmark, primární tlačítka (tmavý bg) |

### Strike Gold (slunce/koule — energický akcent, hlavní CTA)
| Token | Hex | Použití |
|---|---|---|
| `gold-200` | `#FDECC4` | pozadí badge, glow halo |
| `gold-400` | `#F8C452` | ilustrace, hover stavy |
| `gold-500` | `#F3A824` | **primární CTA barva** („Rezervovat dráhu“) |
| `gold-600` | `#D98A12` | hover/aktivní CTA |

### Glow (neonový doplněk — POUZE pro GLOW bowling storytelling, používat
úsporně: badge „GLOW Night“, hover glow na tmavých kartách, nikdy jako
základní barva stránky)
| Token | Hex | Použití |
|---|---|---|
| `glow-pink` | `#FF5FA0` | UV neon akcent |
| `glow-violet` | `#8B6BFF` | UV neon akcent, gradient s glow-pink |
| `glow-cyan` | `#3FE8D0` | UV neon akcent |

### Neutrální / povrchy
| Token | Hex | Použití |
|---|---|---|
| `surface` | `#FFFFFF` | karty, nav |
| `bg` | `#F6FBFC` | základní pozadí stránky (jemný modro-bílý nádech) |
| `bg-alt` | `#EFF7F8` | střídavé pozadí sekcí |
| `line` | `#DCEAEE` | jemné oddělovače/bordery |

**Pravidlo:** stránka je vždy světlá (`bg`/`surface`). Tmavá `ink-900` nebo
`ocean-900` se používá jen lokálně — patička (footer), „GLOW Night“ karta,
příp. hero overlay panel — nikdy jako pozadí celé stránky/`<body>`.

Kontrast: `ink-900` na `bg` = AAA. `surface` text na `gold-500` tlačítku
používá `ink-900` (ne bílou) — zlatá je světlý tón, bílý text by neprošel
kontrastem.

## 3. Typografie

- **Display/nadpisy:** `Poppins` (500–800) — geometrická, zaoblené
  tvary ladí s kulatým wordmarkem loga. Velké H1 v hero sekcích, `clamp()`
  fluidní velikosti.
- **Text/UI:** `Inter` (400–600) — vysoká čitelnost, plná diakritika CZ,
  skvělá i v malých velikostech (tabulky ceníku, formuláře).
- Font balíčky přes `@fontsource` (self-hosted přes npm, viz technical.md) —
  žádné runtime volání na Google Fonts API kvůli síťovým omezením sandboxu.
- Škála (fluidní, `clamp`): `text-xs 12px → display-2xl ~72px`, poměr ~1.25.
- Nadpisy: „tight“ tracking, line-height 1.05–1.15. Odstavce: 1.6.

## 4. Tvar, prostor, hloubka

- **Radius:** karty `24px` (`rounded-3xl`), tlačítka plně pilulková
  (`9999px`) — inspirace Gurdena/Uber Eats „pill“ CTA a floating pill nav.
- **Stín:** vrstvený měkký stín (`shadow-soft`: 0 1px 2px rgba(30,53,59,.04),
  0 12px 32px rgba(30,53,59,.08)) — žádné ostré/tmavé stíny.
- **Grid:** 12 sloupců desktop, max-width kontejneru `1240px`, section
  padding `clamp(64px, 8vw, 128px)` vertikálně.
- **Floating nav bar:** navigace jako „pilulka“ posazená s odsazením od
  horní hrany (`top:16px`), poloprůhledné bílé pozadí + `backdrop-blur`,
  při scrollu se zmenší/zhutní — přímá inspirace floating nav v Brooks
  Freund a Uber Eats ukázce.
- **Floating info karty přes hero vizuál** (malá karta s ikonou + statem,
  `position:absolute`, jemný stín, mírný rotate) — inspirace Gurdena
  („Your Policy Issued“) a Uber Eats („Deliver in 30 min“). U nás např.
  „GLOW od 18:00“ nebo „6 volných drah dnes“.
- **Decorativní geometrické tvary** (rotated square/diamond, blob) jako
  section-dividery — inspirace Brooks Freund.

## 5. Ilustrace místo fotografií (důležité omezení prostředí)

Sandbox této session nemá síťový přístup k fotobankám (Unsplash/Pexels
apod. jsou na proxy úrovni blokované, viz `03-technical.md`). Aby web
„nebyl prázdný“ a přesto splnil zadání, **nahrazujeme fotografie vlastní
sadou SVG/CSS ilustrací a vzorů** v brand paletě:

- **Hero vizuál:** vrstvený SVG manta rejnok (gradient ocean-300→ocean-700)
  nad "slunce/koule" (gradient gold), s jemnou float/parallax animací —
  přímé rozšíření loga do hero ilustrace.
- **Dráhy/GLOW ilustrace:** stylizovaná bowlingová dráha s perspektivou,
  UV gradient pruhy, animovaná trajektorie koule + kužely při scrollu do
  view.
  animace.
- **Texturní vzory:** jemné tečkované/vlnkové SVG patterny (odkaz na vodu a
  díry na kouli) jako pozadí sekcí s nízkou opacitou.
- **Kartové ikony:** sada jednotných line/duotone ikon (bowling pin, koule,
  sklenice, vidlička, konfety, kalendář…) v `ocean`/`gold` barvách.
- Pokud klient v budoucnu dodá reálné fotky provozovny, `<img>` sloty jsou
  připravené (viz komponenty `PhotoFrame`) a ilustrace lze zaměnit 1:1.

## 6. Motion / animace (Framer Motion + CSS)

Princip: **motion má vždy účel** (vede pozornost, potvrzuje akci, ukazuje
hloubku) — nikdy samoúčelné blikání.

| Efekt | Kde | Popis |
|---|---|---|
| Reveal on scroll | všechny sekce | fade + translateY(24px→0), stagger dětí 60–90ms, `viewport once:true` |
| Hero parallax | hero ilustrace | vrstvy manta/koule/pozadí se hýbou různou rychlostí při scrollu i mouse-move |
| Float loop | ikony, koule, badge | nekonečná jemná `y: [0,-8,0]` smyčka, 4–6s, ease `easeInOut` |
| Hover tilt | produktové/nabídkové karty | 3D tilt dle pozice kurzoru (max 6°) + scale 1.02 |
| Magnetic button | primární CTA | tlačítko se nepatrně přitahuje ke kurzoru v okolí 24px |
| Counter count-up | stat pás (6 drah, 150 hostů…) | čísla se animovaně načtou při vstupu do viewportu |
| Sticky nav shrink | header | výška/padding se zmenší a přidá se blur+stín po 40px scrollu |
| Glow pulse | „GLOW Night“ karta/badge | jemná pulzující záře v `glow-pink/violet/cyan` |
| Carousel drag | recenze, galerie | swipe/drag s momentum + pill šipky (inspirace Uber Eats carousel nav) |
| Path draw | logo/ilustrace při prvním loadu | SVG stroke-dashoffset animace „nakreslení“ rejnoka |
| Page/section transitions | routing mezi stránkami | krátký fade+slide (200–300ms), respektuje `prefers-reduced-motion` |

Veškerý motion respektuje `prefers-reduced-motion: reduce` (fallback: jen
fade, bez transformací/parallaxu).

## 7. Komponenty — vzory a inspirace

| Komponenta | Vzor | Inspirace |
|---|---|---|
| Header | floating pill, blur, shrink on scroll | Brooks Freund, Uber Eats |
| Hero | velký display nadpis + 2 CTA (solid pill + outline pill) + floating stat karta nad ilustrací | Gurdena, Uber Eats |
| Badge/eyebrow | pilulka s tečkou, `ocean-100`/`gold-200` pozadí | Gurdena („Georgia's #1…“) |
| Nabídkové karty | barevně kódované měkké pozadí na kategorii, ikona, CTA link se šipkou | Gurdena kategorie insurance |
| Trust pás | avatary/hodnocení nebo řada „proč nás“ ikon místo partner-log (nemáme reálná loga klientů) | Uber Eats hero rating |
| Ceníková tabulka | karty místo klasické tabulky na mobilu, zvýrazněný „doporučený“ sloupec | vlastní, konzistentní s paletou |
| FAQ | accordion s plynulou výškovou animací, `FAQPage` schema | — |
| CTA banner | plná barva `ocean-700`→`ocean-900` gradient, bílý text, floating shapes | Brooks Freund dark hero mood |
| Footer | tmavý `ink-900` panel, 4 sloupce, mapa/kontakt | — |

## 8. Breakpoints & responzivita

`xs:0 · sm:480 · md:768 · lg:1024 · xl:1280 · 2xl:1536` (Tailwind default +
`xs`). Mobile-first. Nav se na `<lg` mění na hamburger s fullscreen menu
(animovaný slide+fade). Hero ilustrace na mobilu zjednodušená (méně vrstev,
bez mouse-parallaxu, jen scroll reveal) kvůli výkonu.

## 9. Přístupnost

- Kontrast textu min. AA (většina kombinací AAA — viz sekce 2).
- Fokus states: viditelný `outline` v `ocean-600` na všech interaktivních
  prvcích (i uvnitř pill tlačítek).
- Sémantické nadpisové pořadí (jeden H1/stránka), `alt` texty pro veškeré
  SVG ilustrace s významem, dekorativní SVG `aria-hidden`.
- Formuláře (`/rezervace`, `/kontakt`) — labely, `aria-describedby` pro
  chyby, chybové stavy i barevně i textově.
