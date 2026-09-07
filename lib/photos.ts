/**
 * Katalog fotek webu.
 *
 * Soubory se hledají v `public/photos/<slug>.<přípona>`. Web funguje i bez
 * nich — každý slot má brandovou ilustraci jako fallback (viz components/
 * ui/Photo.tsx). Jakmile soubor přibude, automaticky se použije místo
 * ilustrace; není potřeba měnit kód.
 *
 * Alt texty jsou psané pro SEO i čtečky, popisky se zobrazují v galerii.
 */

export type PhotoCategory = "bowling" | "restaurace" | "akce" | "prostory";

export type PhotoSlug =
  | "hero-lanes"
  | "glow-night"
  | "lane-detail"
  | "bowling-shoes"
  | "kids-bowling"
  | "friends-bowling"
  | "burger"
  | "restaurant-interior"
  | "cocktail-bar"
  | "wine"
  | "birthday-party"
  | "team-celebration"
  | "corporate-event"
  | "bar-counter";

export type PhotoMeta = {
  slug: PhotoSlug;
  alt: string;
  caption: string;
  category: PhotoCategory;
  /** poměr stran pro rámeček — drží layout stabilní i bez souboru */
  ratio: "4/3" | "3/2" | "1/1" | "16/9";
};

export const photos: PhotoMeta[] = [
  {
    slug: "hero-lanes",
    alt: "Šest bowlingových drah v Bowling Manta Praha 6 – Řepy",
    caption: "Šest profesionálních drah",
    category: "bowling",
    ratio: "16/9",
  },
  {
    slug: "glow-night",
    alt: "GLOW bowling – dráhy nasvícené UV světlem během večerní hry",
    caption: "GLOW večery od 18:00",
    category: "bowling",
    ratio: "3/2",
  },
  {
    slug: "lane-detail",
    alt: "Detail bowlingové dráhy s koulí a kuželkami",
    caption: "Profesionální povrch drah",
    category: "bowling",
    ratio: "4/3",
  },
  {
    slug: "bowling-shoes",
    alt: "Půjčovna bowlingové obuvi v Bowling Manta",
    caption: "Boty zapůjčíme na místě",
    category: "bowling",
    ratio: "1/1",
  },
  {
    slug: "kids-bowling",
    alt: "Děti hrají bowling se zatahovacími mantinely",
    caption: "Mantinely a lehké koule pro děti",
    category: "akce",
    ratio: "4/3",
  },
  {
    slug: "friends-bowling",
    alt: "Parta přátel se raduje ze strike na bowlingu",
    caption: "Ideální na partu i rande",
    category: "bowling",
    ratio: "3/2",
  },
  {
    slug: "burger",
    alt: "Manta Bacon Burger podávaný v restauraci Bowling Manta",
    caption: "Burgery z naší kuchyně",
    category: "restaurace",
    ratio: "4/3",
  },
  {
    slug: "restaurant-interior",
    alt: "Interiér restaurace Bowling Manta s posezením u drah",
    caption: "Restaurace hned u drah",
    category: "restaurace",
    ratio: "3/2",
  },
  {
    slug: "cocktail-bar",
    alt: "Koktejly připravené na baru Bowling Manta",
    caption: "Koktejly a míchané nápoje",
    category: "restaurace",
    ratio: "1/1",
  },
  {
    slug: "wine",
    alt: "Vinotéka Bowling Manta – výběr vín po skleničce",
    caption: "Vinotéka s výběrem po skleničce",
    category: "restaurace",
    ratio: "4/3",
  },
  {
    slug: "bar-counter",
    alt: "Barový pult v Bowling Manta s výčepem",
    caption: "Bar s čepovaným pivem",
    category: "prostory",
    ratio: "3/2",
  },
  {
    slug: "birthday-party",
    alt: "Narozeninová oslava s dortem v Bowling Manta",
    caption: "Narozeninové oslavy na klíč",
    category: "akce",
    ratio: "4/3",
  },
  {
    slug: "team-celebration",
    alt: "Firemní tým slaví na firemní akci v Bowling Manta",
    caption: "Firemní akce až pro 150 hostů",
    category: "akce",
    ratio: "3/2",
  },
  {
    slug: "corporate-event",
    alt: "Pronájem drah pro firemní večírek v Bowling Manta",
    caption: "Pronájem celého prostoru",
    category: "prostory",
    ratio: "16/9",
  },
];

export function getPhoto(slug: PhotoSlug): PhotoMeta | undefined {
  return photos.find((p) => p.slug === slug);
}

export const photoCategories: { key: PhotoCategory; label: string }[] = [
  { key: "bowling", label: "Bowling" },
  { key: "restaurace", label: "Restaurace & bar" },
  { key: "akce", label: "Oslavy & akce" },
  { key: "prostory", label: "Prostory" },
];
