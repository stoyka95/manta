#!/usr/bin/env python3
"""Sestaví self-hostované fonty webu do public/fonts/ + app/fonts.css.

Zdrojem jsou woff2 subsety z @fontsource. Ty jsou rozdělené na `latin`
a `latin-ext`; čeština potřebuje obojí (á é í ó ú jsou v `latin`,
ě š č ř ž ů ď ť ň v `latin-ext`). Skript je slije do jednoho souboru na
váhu a ořeže na znaky, které web opravdu používá.

Proč ne `@import "@fontsource/..."`:
  * `latin-ext-*.css` deklaruje @font-face BEZ `unicode-range`, takže
    základní latinka vypadne na systémový font — tuhle past sloučený
    subset ruší úplně,
  * ~2,5× méně bajtů (Inter latin-ext má sám 34 kB),
  * stabilní cesta v /public → jde na fonty dát <link rel="preload">.

Navíc dopočítá náhradní @font-face nad Arialem se `size-adjust`
a `ascent/descent-override`, aby text ve fallbacku zabíral stejné místo
jako v cílovém fontu. Bez toho přehození fontu posune layout — na
/rezervace to dělalo CLS 0,38. Metriky Arialu se čtou z Liberation Sans,
který je s ním záměrně metricky shodný.

Spouští se ručně po změně sady vah; výstup se commituje.
Vyžaduje `pip install fonttools brotli`.

    python3 scripts/build-fonts.py
"""

from __future__ import annotations

import re
import shutil
import sys
from collections import Counter
from pathlib import Path

from fontTools.merge import Merger
from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts"
CSS = ROOT / "app" / "fonts.css"
TMP = ROOT / ".fonts-tmp"

# Metricky shodná náhrada Arialu — z ní se čtou metriky fallbacku.
ARIAL_PROXY = Path("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf")

# Váhy, které web skutečně používá (`font-semibold/bold/extrabold`
# v app/ a components/). Přidání váhy do CSS bez přidání sem znamená
# syntetické tučnění — drž obojí v souladu.
FAMILIES = {
    "poppins": ("Poppins", [600, 700, 800]),
    "inter": ("Inter", [400, 600, 700]),
}

# Znaky, které se mají zachovat. Štědré, ale pořád zlomek originálu.
UNICODES = [
    (0x0020, 0x007E),  # základní latinka
    (0x00A0, 0x00FF),  # Latin-1 (á é í ó ú ý, °, ×, ©)
    (0x0100, 0x017F),  # Latin Extended-A (ě š č ř ž ů ď ť ň + PL/SK)
    (0x2010, 0x2015),  # pomlčky
    (0x2018, 0x201E),  # české uvozovky a apostrofy
    (0x2020, 0x2022),  # † ‡ •
    (0x2026, 0x2026),  # …
    (0x2030, 0x2030),  # ‰
    (0x2039, 0x203A),  # ‹ ›
    (0x20AC, 0x20AC),  # €
    (0x2122, 0x2122),  # ™
    (0x2190, 0x2193),  # šipky
    (0x2212, 0x2212),  # minus
]

TAGS = re.compile(r"<(script|style)[^>]*>.*?</\1>|<[^>]+>", re.S | re.I)


def site_text() -> Counter[str]:
    """Četnost znaků ve skutečném textu webu (z předrenderovaného HTML).

    Slouží jako váhy pro průměrnou šířku znaku — `size-adjust` tak sedí
    na český text, ne na abecedu obecně. Bez buildu se použije prostý
    průměr přes malá písmena a mezeru.
    """
    files = list((ROOT / ".next" / "server" / "app").rglob("*.html"))
    if not files:
        return Counter("abcdefghijklmnopqrstuvwxyz ")
    counts: Counter[str] = Counter()
    for f in files:
        counts.update(TAGS.sub(" ", f.read_text(errors="ignore")).lower())
    return Counter({c: n for c, n in counts.items() if c.isprintable() or c == " "})


def avg_width(font: TTFont, weights: Counter[str]) -> float:
    """Průměrná šířka znaku v em, vážená četností na webu."""
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    upm = font["head"].unitsPerEm
    total = wsum = 0.0
    for ch, n in weights.items():
        glyph = cmap.get(ord(ch))
        if glyph is None or glyph not in hmtx.metrics:
            continue
        total += hmtx[glyph][0] * n
        wsum += n
    return (total / wsum) / upm if wsum else 0.0


def build_subset(family: str, weight: int) -> tuple[int, int, TTFont]:
    d = ROOT / "node_modules" / "@fontsource" / family / "files"
    paths = [d / f"{family}-{s}-{weight}-normal.woff2" for s in ("latin", "latin-ext")]
    for p in paths:
        if not p.exists():
            sys.exit(f"chybí zdroj: {p}")
    before = sum(p.stat().st_size for p in paths)

    # Merger umí jen TTF/OTF, ne woff2 → dekomprimovat do dočasných souborů.
    ttfs = []
    for p in paths:
        f = TTFont(p)
        f.flavor = None
        out = TMP / p.with_suffix(".ttf").name
        f.save(out)
        ttfs.append(str(out))

    font = Merger().merge(ttfs)

    opts = Options()
    opts.layout_features = ["*"]  # kerning a ligatury ať zůstanou
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.desubroutinize = True
    sub = Subsetter(options=opts)
    sub.populate(unicodes=[c for lo, hi in UNICODES for c in range(lo, hi + 1)])
    sub.subset(font)

    font.flavor = "woff2"
    target = OUT / f"{family}-{weight}.woff2"
    font.save(target)
    return before, target.stat().st_size, TTFont(target)


def face(css_family: str, weight: int, file: str) -> str:
    return (
        f"@font-face {{\n"
        f'  font-family: "{css_family}";\n'
        f"  font-style: normal;\n"
        f"  font-weight: {weight};\n"
        f"  font-display: swap;\n"
        f'  src: url("/fonts/{file}") format("woff2");\n'
        f"}}"
    )


def fallback_face(css_family: str, weight: int, font: TTFont, arial: TTFont,
                  text: Counter[str]) -> str:
    """@font-face nad Arialem přeškálovaný na metriky cílového fontu."""
    upm = font["head"].unitsPerEm
    hhea = font["hhea"]
    adjust = avg_width(font, text) / avg_width(arial, text)
    pct = lambda v: f"{v / upm / adjust * 100:.2f}%"  # noqa: E731
    return (
        f"@font-face {{\n"
        f'  font-family: "{css_family} Fallback";\n'
        f"  font-style: normal;\n"
        f"  font-weight: {weight};\n"
        f'  src: local("Arial"), local("Helvetica"), local("Liberation Sans");\n'
        f"  size-adjust: {adjust * 100:.2f}%;\n"
        f"  ascent-override: {pct(hhea.ascent)};\n"
        f"  descent-override: {pct(-hhea.descent)};\n"
        f"  line-gap-override: {pct(hhea.lineGap)};\n"
        f"}}"
    )


def main() -> None:
    if not ARIAL_PROXY.exists():
        sys.exit(f"chybí {ARIAL_PROXY} (apt install fonts-liberation)")
    OUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)

    text = site_text()
    arial = TTFont(ARIAL_PROXY)
    blocks = [
        "/* Generováno scripts/build-fonts.py — needitovat ručně. */",
    ]
    before_total = after_total = 0
    missing: set[str] = set()

    try:
        for family, (css_family, weights) in FAMILIES.items():
            for weight in weights:
                before, after, font = build_subset(family, weight)
                before_total += before
                after_total += after
                cmap = font.getBestCmap()
                missing |= {c for c in text if c.strip() and ord(c) not in cmap}
                blocks.append(face(css_family, weight, f"{family}-{weight}.woff2"))
                blocks.append(fallback_face(css_family, weight, font, arial, text))
                print(f"  {family}-{weight}.woff2  {before / 1024:6.1f} kB → {after / 1024:5.1f} kB")
    finally:
        shutil.rmtree(TMP, ignore_errors=True)

    CSS.write_text("\n\n".join(blocks) + "\n")
    print(f"\ncelkem {before_total / 1024:.1f} kB → {after_total / 1024:.1f} kB")
    print(f"zapsáno {CSS.relative_to(ROOT)}")
    if missing:
        print(f"\nPOZOR: text webu používá znaky mimo subset: {''.join(sorted(missing))}")


if __name__ == "__main__":
    main()
