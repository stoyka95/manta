import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { bowlingPricing } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Ceník"
            title="Transparentní ceny, žádná překvapení."
            text="Platíte za dráhu a hodinu, ne za hráče — parta se tak rozpočítá sama. Plný ceník včetně balíčků pro skupiny najdete na jedné stránce."
          />

          <div>
            <RevealGroup className="grid gap-4 sm:grid-cols-3">
              {bowlingPricing.map((tier) => (
                <div
                  key={tier.label}
                  className={cn(
                    "rounded-3xl p-6 shadow-soft transition-transform hover:-translate-y-1",
                    tier.featured
                      ? "bg-ink-900 text-white"
                      : "bg-white border border-line text-ink-900"
                  )}
                  style={{ opacity: 1 }}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      tier.featured ? "text-white/70" : "text-ink-500"
                    )}
                  >
                    {tier.label}
                  </p>
                  <p className="mt-3 font-display text-3xl font-extrabold">
                    {tier.price}
                  </p>
                  <p
                    className={cn(
                      "text-sm",
                      tier.featured ? "text-white/60" : "text-ink-500"
                    )}
                  >
                    {tier.unit}
                  </p>
                </div>
              ))}
            </RevealGroup>

            <Reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
              <span className="flex items-center gap-1.5">
                <Check className="size-4 text-ocean-600" /> max. 6 hráčů / dráha
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-4 text-ocean-600" /> obuv od 50 Kč
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-4 text-ocean-600" /> studenti −15 %
              </span>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <Button href="/cenik" variant="secondary">
                Zobrazit celý ceník
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
