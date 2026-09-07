import { existsSync } from "node:fs";
import { join } from "node:path";
import { photos, type PhotoMeta, type PhotoSlug } from "./photos";

/**
 * Server-only část fotokatalogu — sahá na souborový systém, takže se NESMÍ
 * importovat z klientských komponent (jinak se `node:fs` dostane do bundlu).
 * Běží při buildu; všechny stránky jsou staticky generované.
 */

const EXTENSIONS = ["jpg", "jpeg", "webp", "avif", "png"] as const;

/**
 * Vrátí veřejnou cestu k fotce, pokud soubor existuje, jinak null.
 * Běží jen na serveru při buildu (všechny stránky jsou staticky generované).
 */
export function photoSrc(slug: PhotoSlug): string | null {
  const dir = join(process.cwd(), "public", "photos");
  for (const ext of EXTENSIONS) {
    if (existsSync(join(dir, `${slug}.${ext}`))) return `/photos/${slug}.${ext}`;
  }
  return null;
}

/** Fotky, které jsou skutečně k dispozici — pro galerii a JSON-LD. */
export function availablePhotos(): (PhotoMeta & { src: string })[] {
  return photos
    .map((p) => {
      const src = photoSrc(p.slug);
      return src ? { ...p, src } : null;
    })
    .filter((p): p is PhotoMeta & { src: string } => p !== null);
}
