import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  bowlingPricing,
  pricingExtras,
  groupPackages,
  foodPricing,
} from "@/lib/content";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ceník — bowling, balíčky a občerstvení",
  description:
    "Ceník bowlingu v Praze 6: cena za dráhu a hodinu, balíčky pro narozeniny, firmy a ligové týmy, orientační ceny jídla a pití.",
  alternates: { canonical: "/cenik" },
};

export default function CenikPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Ceník", href: "/cenik" },
      ]))} />

      <PageHero
        eyebrow="Ceník"
        title="Transparentní ceny, žádná překvapení."
        text="Platíte za dráhu a hodinu, ne za hráče. Ceny níže jsou demo hodnoty pro účely tohoto webu — aktuální ceník platí ten na místě."
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading eyebrow="Bowling" title="Cena za dráhu / hodinu" text="Max. 6 hráčů na dráhu." />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {bowlingPricing.map((tier) => (
              <RevealItem
                key={tier.label}
                className={cn(
                  "rounded-3xl p-7 shadow-soft",
                  tier.featured ? "bg-ink-900 text-white" : "border border-line bg-white text-ink-900"
                )}
              >
                <p className={cn("text-sm font-semibold", tier.featured ? "text-white/70" : "text-ink-500")}>
                  {tier.label}
                </p>
                <p className="mt-3 font-display text-4xl font-extrabold">{tier.price}</p>
                <p className={cn("text-sm", tier.featured ? "text-white/60" : "text-ink-500")}>
                  {tier.unit}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6 grid gap-3 rounded-3xl bg-bg-alt p-6 sm:grid-cols-3">
            {pricingExtras.map((e) => (
              <div key={e.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-ink-700">
                  <Check className="size-4 flex-none text-ocean-600" /> {e.label}
                </span>
                <span className="font-display font-semibold text-ink-900">{e.price}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-alt py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Balíčky pro skupiny" title="Ideální na narozeniny i firmu." tone="gold" />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {groupPackages.map((pkg) => (
              <RevealItem key={pkg.title} className="rounded-3xl bg-white p-7 shadow-soft">
                <h3 className="font-display text-lg font-bold text-ink-900">{pkg.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{pkg.text}</p>
                <p className="mt-5 font-display text-xl font-extrabold text-ocean-700">
                  {pkg.price}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Jídlo & pití" title="Orientační ceny z restaurace." tone="glow" />
          <Reveal className="mt-10 divide-y divide-line rounded-3xl border border-line bg-white">
            {foodPricing.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-6 py-4 text-sm sm:px-8">
                <span className="text-ink-700">{item.label}</span>
                <span className="font-display font-semibold text-ink-900">{item.price}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-8 flex justify-center">
            <Button href="/rezervace" size="lg">
              Rezervovat dráhu
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
