import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { PhotoSlug } from "@/lib/photos";

/** Pás tří obrázků pod hlavičkou podstránky, prokliknutelný do galerie. */
export function PhotoBand({ slugs }: { slugs: [PhotoSlug, PhotoSlug, PhotoSlug] }) {
  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <RevealGroup className="grid gap-4 sm:grid-cols-3">
          {slugs.map((slug, i) => (
            <RevealItem key={slug} className={i === 0 ? "sm:col-span-1" : undefined}>
              <NextLink href="/galerie" aria-label="Otevřít galerii" className="block">
                <Photo
                  slug={slug}
                  ratio="4/3"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="shadow-soft transition-transform duration-300 hover:-translate-y-1"
                />
              </NextLink>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-6 flex justify-end">
          <NextLink
            href="/galerie"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ocean-700 hover:text-ocean-600"
          >
            Celá galerie
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </NextLink>
        </div>
      </Container>
    </section>
  );
}
