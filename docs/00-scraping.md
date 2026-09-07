# 00 — Průzkum původního webu (bowlingmanta.cz)

> **Poznámka k metodě:** Sandboxované síťové prostředí této session blokuje přímý
> HTTP(S) přístup na libovolné domény (nástroj WebFetch vrací `EGRESS_BLOCKED`
> i pro neutrální test domény typu `example.com`). Obsah proto nebyl stažen
> stránku po stránce přes crawler, ale rekonstruován z veřejně indexovaných
> výsledků vyhledávání (WebSearch) napříč více dotazy — Google cache snippetů,
> agregátory (Meníčka.cz, Kudy z nudy, Firmy.cz, Tripadvisor, PGCR.cz…) a
> samotné URL struktury webu. Číselné údaje (ceník, přesná gramáž jídel) proto
> **nejsou k dispozici 1:1** a v novém demo webu jsou nahrazeny realistickými,
> jasně řešenými demo hodnotami — viz `03-technical.md`, sekce „Demo status“.

## 1. Základní fakta o podniku

| Atribut | Hodnota |
|---|---|
| Název | Bowling Manta (Bowling a restaurace Manta) |
| Založeno | 2002 |
| Adresa | Makovského 1342/12a, 163 00 Praha 6 – Řepy |
| Telefon | +420 235 302 220 |
| E-mail | info@bowlingmanta.cz |
| Jazykové mutace | CZ / EN |
| Otevírací doba | Ne–Čt 11:00–00:00, Pá–So 11:00–01:00 |
| Bezbariérovost | Ano, celá budova |
| Kapacita | Bowling + restaurace celkem až 150 osob (restaurace samotná ~100 míst) |

## 2. Nabídka / provoz

- **6 profesionálních bowlingových drah**, scoring systém QUBICA CONQUEROR
  BES Premium.
- **GLOW bowling** — večerní UV nasvětlení drah.
- **Automatické zatahovací mantinely** pro děti/začátečníky.
- **Herna** (arkádové/zábavní automaty).
- **Restaurace a kavárna** — kontinentální kuchyně, minutky i hotová jídla,
  polední menu (11:00–16:00).
- **Bar** + **vinotéka** — česká i zahraniční vína.
- **Letní zahrádka.**
- Free WiFi, klimatizace.
- Prostory pro **firemní večírky, rauty, oslavy narozenin, promoce, svatby,
  teambuilding**.
- Pořádané **turnaje a liga**: „Místní Bowlingová Liga MANTA“, „Manta Strike
  Shop devítka“ a další jednorázové turnaje.
- Online rezervační systém (samostatná subdoména `bowlingmanta.isportsystem.cz`).

## 3. Zjištěná struktura webu (URL mapa)

```
/cz/                                   – úvodní stránka
/cz/bowling/                           – o bowlingu (dráhy, GLOW, systém)
/cz/bowling/cenik/                     – ceník bowlingu
/cz/bowling/provozni-rad/              – provozní řád
/cz/bowling/poradane-turnaje/          – přehled turnajů
/cz/bowling/poradane-turnaje/mistni-bowlingova-liga-manta/
/cz/bowling/poradane-turnaje/manta-strike-shop-devitka/
/cz/bar/                               – bar
/cz/restaurace/                        – restaurace a kavárna
/cz/restaurace/jidelni-listek/         – jídelní lístek
/cz/galerie/                           – fotogalerie (např. „letní zahrádka“)
/cz/novinky/                           – aktuality/novinky
/cz/novinky/oteviraci-doba-o-svatcich-2024/
/cz/kontakt/                           – kontakt
/en/...                                – anglická mutace zrcadlící cz/
```

## 4. Diagnóza — co na původním webu (dle dostupných indicií) drhne

Toto jsou postřehy z URL struktury, meta titulků a agregátorů, které použijeme
jako zdůvodnění, **proč** nová IA (informační architektura) vypadá jinak:

1. **Plochá, izolovaná menu struktura** — bowling / bar / restaurace jsou tři
   oddělené sekce bez jasné společné cesty k akci (rezervace/objednávka).
   Návštěvník musí sám skládat dohromady, že jde o jeden zážitek.
2. **Rezervace mimo doménu** (`isportsystem.cz` subdoména) bez viditelného,
   opakovaného CTA na hlavní stránce — ztrácí se kontext a důvěra.
3. **Chybí prodejní/atrakční vrstva** pro skupiny a firmy — narozeniny, firemní
   akce a turnaje jsou „zahrabané“ v podstránkách bowlingu, přitom jde o
   nejsilnější byznys důvod k návštěvě (skupina 6–20 lidí, vyšší tržba/akce).
4. **Novinky jako jediný zdroj „živosti“** webu (otevírací doba o svátcích…) —
   chybí evergreen obsah typu FAQ, recenze, jasné USP.
5. **Málo důvěryhodnostních signálů** na úvodní stránce (hodnocení, počet
   drah/kapacita/rok založení nejsou hned vidět).

## 5. Co si z původního webu **bereme** do nového obsahu

- Faktický základ: adresa, telefon, e-mail, otevírací dobu, rok založení,
  počet drah, GLOW bowling, scoring systém, bezbariérovost, wifi/klima,
  vinotéku, letní zahrádku, kapacitu, typy akcí (firemní, narozeninové,
  svatby, teambuilding, turnaje/liga).
- Dvojjazyčnost (CZ hlavní jazyk, struktura připravená na EN).
- Segmentaci publika: rodiny s dětmi, party skupiny přátel, firmy
  (teambuilding/večírky), soutěžní hráči (liga/turnaje), páry (rande).

## 6. Co v novém webu **měníme**

- Sjednocujeme bowling + bar + restaurace pod jeden „zážitkový“ příběh s
  jasnou hlavní CTA (Rezervovat dráhu) opakovanou v každé sekci.
- Rezervace zůstává navenek na externím rezervačním systému (typické pro
  bowling centra), ale je prezentovaná jako integrovaný krok, ne odkaz na
  cizí doménu bez kontextu.
- Přidáváme sekci pro skupiny/firmy/oslavy jako prominentní produkt, ne
  podstránku.
- Přidáváme FAQ (AEO/GEO), recenze/hodnocení, jasné počty (6 drah, 150 hostů,
  od 2002) jako důvěryhodnostní prvky hned na úvodní stránce.
- Zjednodušujeme menu ze 3 oddělených sekcí na logické okruhy: Bowling ·
  Restaurace & bar · Oslavy a firemní akce · Ceník · Kontakt/Rezervace.
