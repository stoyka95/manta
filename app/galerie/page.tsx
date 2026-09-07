import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GalleryGrid, type GalleryItem } from "@/components/sections/GalleryGrid";
import { PhotoScene } from "@/components/illustrations/PhotoScene";
import { photos } from "@/lib/photos";
import { photoSrc } from "@/lib/photos.server";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Podívejte se do Bowling Manta v Praze 6 – Řepích: šest drah, GLOW večery, restaurace, bar a vinotéka i prostory pro oslavy a firemní akce.",
  alternates: { canonical: "/galerie" },
};

export default function GaleriePage() {
  const items: GalleryItem[] = photos.map((p) => ({
    slug: p.slug,
    alt: p.alt,
    caption: p.caption,
    category: p.category,
    ratio: p.ratio,
    src: photoSrc(p.slug),
  }));

  // ilustrace se renderují na serveru, klientská mřížka je jen skládá
  const scenes = Object.fromEntries(
    photos.map((p) => [p.slug, <PhotoScene key={p.slug} slug={p.slug} />])
  );

  const realPhotos = items.filter((i) => i.src);

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `Galerie — ${site.fullName}`,
    url: `${site.url}/galerie`,
    ...(realPhotos.length > 0 && {
      image: realPhotos.map((p) => ({
        "@type": "ImageObject",
        contentUrl: `${site.url}${p.src}`,
        caption: p.caption,
        description: p.alt,
      })),
    }),
  };

  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Domů", href: "/" },
            { name: "Galerie", href: "/galerie" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(galleryJsonLd)} />

      <PageHero
        eyebrow="Galerie"
        title="Podívejte se k nám."
        text={`Šest drah s GLOW efektem, restaurace s barem a vinotékou a prostor až pro ${site.capacity} hostů — v Praze 6 v Řepích.`}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal>
            <GalleryGrid items={items} scenes={scenes} />
          </Reveal>

          {realPhotos.length === 0 && (
            <Reveal delay={0.1}>
              <p className="mt-10 flex items-start gap-3 rounded-3xl bg-gold-200/60 p-5 text-sm text-ink-700">
                <Camera className="mt-0.5 size-4.5 flex-none text-gold-600" />
                <span>
                  Galerie zatím ukazuje ilustrace v barvách Manty. Jakmile
                  doplníme skutečné fotky provozovny, objeví se zde i na celém
                  webu automaticky.
                </span>
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
