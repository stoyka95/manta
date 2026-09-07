import { Star, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { hero, stats } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-gradient-to-b from-ocean-100 via-bg to-bg"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <Reveal>
            <Badge tone="ocean">{hero.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.08} as="h1" className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-[4.2rem]">
            Strike zážitek,{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-gold-500 bg-clip-text text-transparent">
              ne jen hru.
            </span>
          </Reveal>
          <Reveal delay={0.16} as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
            {hero.text}
          </Reveal>
          <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href={hero.ctaPrimary.href} size="lg">
                {hero.ctaPrimary.label}
              </Button>
            </Magnetic>
            <Button href={hero.ctaSecondary.href} variant="outline" size="lg">
              {hero.ctaSecondary.label}
            </Button>
          </Reveal>
          <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center gap-5 text-sm text-ink-500">
            <span className="flex items-center gap-1.5 font-semibold text-ink-700">
              <Star className="size-4 fill-gold-500 text-gold-500" />
              {site.rating.value} · {site.rating.count}+ hodnocení
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-ocean-600" />
              bezbariérový přístup
            </span>
          </Reveal>

          <Reveal delay={0.4} className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
                  {s.plain ? (
                    s.value
                  ) : (
                    <>
                      <CountUp value={s.value} />
                      {s.suffix}
                    </>
                  )}
                </p>
                <p className="mt-1 text-xs text-ink-500 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <HeroIllustration />
      </Container>
    </section>
  );
}
