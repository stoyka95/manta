# 01 — Obsahová struktura a copywriting (nový web)

Jazyk: **čeština** (jako originál). Tón: sebevědomý, hravý, ale dospělý —
ne dětinský. Cílovky: rodiny s dětmi, parta přátel, firmy (teambuilding/
večírky), soutěžní hráči, páry na rande.

> **Demo status:** ceny, jídelníček a recenze níže jsou **ilustrativní demo
> obsah** navržený tak, aby web nepůsobil prázdně a dal se reálně auditovat
> (SEO/AEO/GEO, výkon, UX). Nejsou to ověřená aktuální data provozovny — než
> půjde web do ostrého provozu, je třeba je nahradit reálnými čísly klienta.
> Tato poznámka bude i jako komentář v kódu / README, ne na veřejném webu.

## 1. Informační architektura

```
/                     Domů
/bowling               Bowling – dráhy, GLOW, scoring, turnaje & liga
/restaurace-a-bar      Restaurace & bar – kuchyně, vinotéka, kavárna
/oslavy-a-akce         Oslavy & firemní akce – narozeniny, firmy, svatby, teambuilding
/cenik                 Ceník – bowling, balíčky, F&B
/rezervace             Rezervace – interaktivní demo formulář
/kontakt               Kontakt – mapa, doprava, formulář, otevírací doba
/faq                   Časté dotazy (AEO/GEO určeno)
```

Hlavní navigace (6 položek + CTA):
`Bowling · Restaurace & bar · Oslavy & akce · Ceník · Kontakt` + tlačítko
**„Rezervovat dráhu“** (vždy viditelné, sticky header).
FAQ a O nás žijí jako sekce na homepage a ve footeru (odkaz na `/faq`).

---

## 2. Domů (`/`)

### 2.1 Hero
- Eyebrow: `Praha 6 · Bowling od 2002`
- H1: **„Strike zážitek, ne jen hru.“**
- Subtext: „6 profesionálních drah, GLOW bowling, kuchyně, bar a vinotéka
  pod jednou střechou. Ať jedete na rande, s dětmi nebo s celou firmou —
  v Mantě máte dráhu, stůl i náladu zamluvenou najednou.“
- CTA primární: „Rezervovat dráhu“ → `/rezervace`
- CTA sekundární: „Prohlédnout ceník“ → `/cenik`
- Mikro-trust řádek pod CTA: „★ 4.6 · 500+ hodnocení · bezbariérový přístup“
- Vizuál: animovaná manta paprsek ray + „glow“ bowling koule (SVG/CSS,
  parallax na scroll, jemný float loop).

### 2.2 Trust/stat pás (pod herem, 4 čísla)
- `6` drah s GLOW efektem
- `150` hostů kapacita akcí
- `2002` rok založení
- `7 dní` v týdnu otevřeno

### 2.3 „Jeden podnik, tři zážitky“ (nabídka – 3 karty → own pages)
1. **Bowling** — „6 profesionálních drah s QUBICA CONQUEROR BES Premium
   scoringem a večerním GLOW nasvětlením. Zatahovací mantinely pro děti.“
   → `/bowling`
2. **Restaurace & bar** — „Kontinentální kuchyně, poctivé burgery i lehké
   obědy, pivo, koktejly a vinotéka s českými i zahraničními víny.“
   → `/restaurace-a-bar`
3. **Oslavy & firemní akce** — „Narozeniny, firemní večírky, teambuilding
   i svatební hostiny až pro 150 hostů — na klíč, s vlastním scénářem.“
   → `/oslavy-a-akce`

### 2.4 „Proč Manta“ (USP grid, 6 bodů s ikonami)
- **GLOW bowling** — večer se dráhy rozzáří UV světlem.
- **Pro každý věk** — automatické mantinely pro nejmenší hráče.
- **Bezbariérové** — celá budova bez schodů a bariér.
- **Vlastní kuchyně** — jídlo servírované přímo k dráze.
- **Volné WiFi & klimatizace** — pohoda i v létě.
- **Parkování a MHD** — snadná dostupnost i pro skupiny.

### 2.5 Galerie / atmosféra (vizuální pás)
Ilustrovaná (SVG/CSS) sekce s „okny“ do atmosféry: dráhy v GLOW režimu,
letní zahrádka, vinotéka, oslava narozenin — nahrazuje fotografie, protože
tento demo build nemá přístup k reálným fotobankám (viz `03-technical.md`).
Motion: jemný parallax + hover-tilt karty.

### 2.6 Ceník — teaser
Krátká tabulka „od“ cen (viz `/cenik`) + CTA „Zobrazit celý ceník“.

### 2.7 Recenze / testimonials (demo, 5 karet, karusel)
1. „Oslavili jsme tu firemní vánoční večírek pro 40 lidí — perfektní servis
   i zábava.“ — *Tereza K., event manažerka*
2. „Kluci byli z GLOW bowlingu naprosto u vytržení. Přijdeme znovu!“
   — *Petr N., rodič*
3. „Burger po dráze byl lepší, než jsem čekal. Bar má fakt slušnou nabídku
   whisky.“ — *Martin V.*
4. „Nejlepší místo na rande, které není nudné.“ — *Hana S.*
5. „S firemní ligou hrajeme v Mantě už třetím rokem — skvělé zázemí.“
   — *David R., kapitán ligového týmu*

### 2.8 FAQ teaser (3–4 otázky, viz `/faq` pro plný výčet)

### 2.9 CTA banner
- H2: „Domluvme dráhu na váš termín.“
- CTA: „Rezervovat dráhu“ / „Zavolejte nám: +420 235 302 220“

### 2.10 Footer (na všech stránkách)
Sloupce: O Mantě (krátce + adresa) · Rychlé odkazy · Otevírací doba ·
Kontakt & sociální sítě. Dole: copyright, „Vytvořeno jako demo projekt“,
odkazy na Zásady cookies / Ochrana osobních údajů (placeholder stránky
nejsou nutné pro demo, stačí kotvy/():contact).

---

## 3. Bowling (`/bowling`)

- H1: „Šest drah. Nekonečno stylů hry.“
- Intro odstavec: dráhy, QUBICA CONQUEROR BES Premium scoring, GLOW bowling
  popis (jak a kdy se spouští), automatické mantinely.
- Sekce **„Jak hrát“** — 3 kroky: Vyberte termín → Přezujte boty → Hrajte
  (ikony/ilustrace, animovaný postup).
- Sekce **„GLOW Night“** — kdy (např. pá/so večer), atmosféra, CTA rezervace
  večerního slotu.
- Sekce **Turnaje & liga** — „Místní bowlingová liga Manta“ (pravidelná
  sezónní liga) + jednorázové turnaje (např. „Manta Strike Cup“) — krátký
  popis + CTA „Chci se přidat“ → kontakt.
- Sekce **Pravidla & bezpečnost** (krátký FAQ blok — obuv, věk, počet hráčů
  na dráhu max. 6).
- CTA: Rezervovat dráhu.

## 4. Restaurace & bar (`/restaurace-a-bar`)

- H1: „Kuchyně, která vydrží celou hru.“
- Intro: kontinentální kuchyně, obědové menu 11:00–16:00, servis k dráze.
- Sekce **Menu highlights** (demo kategorie, 4 karty s ukázkovými položkami
  a orientační cenou):
  - Rychlovky k dráze (burgery, hranolky, wingsy)
  - Polední menu (polévka + hlavní jídlo)
  - Sdílené mísy (nachos, mix na stůl pro partu)
  - Dezerty
- Sekce **Bar & vinotéka**: koktejly, čepovaná piva, vinotéka s českými i
  zahraničními víny — degustace na požádání pro skupiny.
- Sekce **Kavárna & letní zahrádka**: ráno/odpoledne mimo hru.
- CTA: Rezervovat stůl / dráhu + odkaz na plný jídelní lístek (placeholder
  PDF/CTA „na vyžádání u obsluhy“ pro demo).

## 5. Oslavy & firemní akce (`/oslavy-a-akce`)

- H1: „Vaše akce, náš servis.“
- Intro: kapacita až 150 hostů, bezbariérové prostory, vlastní scénář akce.
- 4 balíčkové karty:
  1. **Narozeniny** — dráha + jídlo + dort na přání, pro děti i dospělé.
  2. **Firemní večírek / vánoční párty** — pronájem více drah, catering,
     AV technika na prezentaci.
  3. **Teambuilding** — turnajový formát s vyhlášením vítězů, ideální 15–60
     lidí.
  4. **Svatby & rauty** — celá provozovna k dispozici, vlastní menu.
- Sekce **„Jak akce probíhá“** — 4 kroky (poptávka → návrh programu →
  potvrzení → realizace).
- Formulář **poptávky akce** (jméno, firma, typ akce, počet hostů, termín,
  zpráva) — demo, bez reálného backendu (viz technical.md).
- CTA: „Poptat akci“.

## 6. Ceník (`/cenik`)

### Bowling — cena za dráhu/hod. (max. 6 hráčů/dráha)
| Časové pásmo | Po–Pá do 17:00 | Po–Ne od 17:00 / víkend | GLOW večer (pá–so) |
|---|---|---|---|
| Cena/hod./dráha | 590 Kč | 790 Kč | 890 Kč |

- Půjčení obuvi: 50 Kč / pár
- Ponožky na jedno použití: 30 Kč
- Studentská sleva (Po–Pá do 17:00): −15 %

### Balíčky pro skupiny
| Balíček | Co obsahuje | Cena od |
|---|---|---|
| Narozeninový | 2 hod. dráha, boty, pizza/burger menu pro každého | 350 Kč/os. |
| Firemní | pronájem 3+ drah, catering, welcome drink | na míru — poptávka |
| Ligový tým | sezónní členství v lize + tréninkové sloty | 2 900 Kč/sezóna |

### Jídlo & pití (orientačně)
Burger 219 Kč · Polední menu 159 Kč · Nachos sdílené 249 Kč · Pivo 0,3 l 55 Kč
· Sklenka vína 89 Kč.

Poznámka pod tabulkou: „Ceny jsou orientační demo hodnoty. Konečný ceník se
řídí aktuálním platným ceníkem na místě.“

## 7. Rezervace (`/rezervace`)

- H1: „Zamluvte si dráhu za minutu.“
- Interaktivní formulář (klientský stav, žádné reálné odesílání):
  datum, čas, počet drah, počet hráčů, jméno, telefon/e-mail, poznámka.
- Po odeslání: úspěšný stav s rekapitulací + poznámka „Toto je ukázkový
  (demo) formulář bez napojení na rezervační systém.“
- Vedle formuláře: shrnutí (otevírací doba, telefon, doporučení rezervovat
  víkendy dopředu).

## 8. Kontakt (`/kontakt`)

- H1: „Najděte nás v Řepích.“
- Adresa, telefon, e-mail, odkaz na mapu (stylizovaná ilustrovaná mapa/CSS,
  bez závislosti na Google Maps API klíči — viz technical.md), popis
  dopravy (autobus/parkování).
- Otevírací doba (tabulka Ne–Čt / Pá–So).
- Kontaktní formulář (jméno, e-mail, zpráva) — demo, bez backendu.
- Krátký FAQ blok (3 otázky) + link na plné FAQ.

## 9. FAQ (`/faq`) — cca 12 otázek pro AEO/GEO

1. Kde se Bowling Manta nachází a jak se tam dostanu?
2. Jaká je otevírací doba Bowling Manty?
3. Kolik bowlingových drah Manta má?
4. Co je GLOW bowling a kdy se pouští?
5. Kolik stojí hodina bowlingu v Mantě?
6. Kolik hráčů se vejde na jednu dráhu?
7. Je Bowling Manta vhodná pro malé děti?
8. Je Bowling Manta bezbariérová?
9. Dá se v Mantě uspořádat firemní večírek nebo teambuilding?
10. Je potřeba se na bowling objednávat dopředu?
11. Nabízí Manta i jídlo a pití přímo u dráhy?
12. Pořádá Manta bowlingové turnaje nebo ligu?

(Odpovědi 40–70 slov, přímé, s konkrétním faktem hned v první větě — formát
optimalizovaný pro citaci AI vyhledávači / Answer Engine Optimization.)

Každá otázka zároveň jako `FAQPage` JSON-LD (viz `03-technical.md`).

---

## 10. Tón hlasu — pravidla pro copy

- Krátké, aktivní věty. Sloveso v rozkazovacím způsobu pro CTA.
- Čísla vždy konkrétní (6 drah, 150 hostů, 2002) — buduje důvěru.
- Bez klišé typu „jedinečný zážitek pro celou rodinu“ bez kontextu — vždy
  doplnit *proč* (GLOW, kuchyně, kapacita…).
- Nadpisy (H1/H2) čtenářsky nosné i osamocené (mimo kontext stránky) — pomáhá
  SEO/AEO výtahům.
