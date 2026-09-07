# Fotky webu

Sem patří fotky provozovny. Web je použije **automaticky** — nic se nemusí
programovat.

## Jak přidat fotku

Uložte soubor pod přesným názvem slotu, například `hero-lanes.jpg`.
Podporované přípony (v tomto pořadí priority): `jpg`, `jpeg`, `webp`,
`avif`, `png`.

Dokud soubor chybí, slot vykreslí brandovou ilustraci ve stejném poměru
stran, takže se layout nikdy neposune.

## Seznam slotů

| Soubor | Kde se zobrazí | Poměr |
|---|---|---|
| `hero-lanes` | homepage, /bowling, galerie | 16/9 |
| `glow-night` | homepage, /bowling, galerie | 3/2 |
| `lane-detail` | galerie | 4/3 |
| `bowling-shoes` | /bowling, galerie | 1/1 |
| `kids-bowling` | /oslavy-a-akce, galerie | 4/3 |
| `friends-bowling` | galerie | 3/2 |
| `burger` | homepage, /restaurace-a-bar, galerie | 4/3 |
| `restaurant-interior` | /restaurace-a-bar, galerie | 3/2 |
| `cocktail-bar` | homepage, galerie | 1/1 |
| `wine` | /restaurace-a-bar, galerie | 4/3 |
| `bar-counter` | galerie | 3/2 |
| `birthday-party` | homepage, /oslavy-a-akce, galerie | 4/3 |
| `team-celebration` | /oslavy-a-akce, galerie | 3/2 |
| `corporate-event` | galerie | 16/9 |

Popisky a alt texty (důležité pro SEO) jsou v `lib/photos.ts` — pokud fotka
ukazuje něco jiného, upravte je tam.

## Doporučení

- Šířka aspoň 1600 px, orientace na šířku (kromě `1/1` slotů).
- Fotky se ořezávají `object-cover` na uvedený poměr — hlavní motiv
  držte blíž středu.
- Next.js si obrázky sám optimalizuje a servíruje ve WebP/AVIF.

## Stock fotky jako dočasná náhrada

```bash
PIXABAY_API_KEY=xxx node scripts/fetch-photos.mjs
```

Stáhne chybějící sloty z Pixabay (Pixabay Content License, komerční užití
bez atribuce). Skutečné fotky podniku jsou vždy lepší.
