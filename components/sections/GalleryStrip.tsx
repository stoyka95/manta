import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealItem, RevealGroup } from "@/components/ui/Reveal";
import type { PhotoSlug } from "@/lib/photos";
import { photoSrc } from "@/lib/photos.server";

const strip: { slug: PhotoSlug; span?: string }[] = [
  { slug: "hero-lanes", span: "sm:col-span-2" },
  { slug: "glow-night" },
  { slug: "burger" },
  { slug: "cocktail-bar" },
  { slug: "birthday-party", span: "sm:col-span-2" },
];

export function GalleryStrip() {
  const hasPhotos = strip.some((s) => photoSrc(s.slug));

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Atmosféra Manty"
          title="Nakoukněte dovnitř."
          text={
            hasPhotos
              ? "Šest drah, GLOW večery, kuchyně a bar — takhle to u nás vypadá."
              : "Šest drah, GLOW večery, kuchyně a bar. Skutečné fotky provozovny doplňujeme — zatím vám atmosféru přiblíží ilustrace v barvách Manty."
          }
          tone="glow"
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-4">
          {strip.map((item) => (
            <RevealItem key={item.slug} className={item.span}>
              <Photo
                slug={item.slug}
                ratio={item.span ? "16/9" : "4/3"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="shadow-soft transition-transform duration-300 hover:-translate-y-1"
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <NextLink
            href="/galerie"
            className="group inline-flex items-center gap-2 font-display text-[15px] font-semibold text-ocean-700 hover:text-ocean-600"
          >
            Prohlédnout celou galerii
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </NextLink>
        </Reveal>
      </Container>
    </section>
  );
}
