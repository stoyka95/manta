import Image from "next/image";
import { PhotoScene } from "@/components/illustrations/PhotoScene";
import { getPhoto, type PhotoSlug } from "@/lib/photos";
import { photoSrc } from "@/lib/photos.server";
import { cn } from "@/lib/utils";

/**
 * Fotoslot. Když v `public/photos/` leží soubor pro daný slug, vykreslí
 * optimalizovanou fotku; jinak brandovou ilustrovanou scénu se stejným
 * poměrem stran, takže layout nikdy neposkočí.
 */
export function Photo({
  slug,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  ratio,
  rounded = "rounded-3xl",
}: {
  slug: PhotoSlug;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** přebije výchozí poměr z katalogu */
  ratio?: string;
  rounded?: string;
}) {
  const meta = getPhoto(slug);
  if (!meta) return null;
  const src = photoSrc(slug);

  return (
    <div
      className={cn("relative overflow-hidden bg-ocean-100", rounded, className)}
      style={{ aspectRatio: ratio ?? meta.ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={meta.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <PhotoScene slug={slug} />
      )}
    </div>
  );
}
