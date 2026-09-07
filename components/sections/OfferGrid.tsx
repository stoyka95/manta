"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { offers } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const toneStyles = {
  ocean: {
    bg: "bg-ocean-100",
    ring: "group-hover:ring-ocean-300",
    chip: "bg-white text-ocean-700",
  },
  gold: {
    bg: "bg-gold-200",
    ring: "group-hover:ring-gold-400",
    chip: "bg-white text-gold-600",
  },
  glow: {
    bg: "bg-ink-900",
    ring: "group-hover:ring-glow-violet",
    chip: "bg-white/10 text-glow-cyan",
  },
} as const;

export function OfferGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Vše pod jednou střechou"
          title="Jeden podnik, tři zážitky."
          text="Bowling, jídlo a pořádnou párty nemusíte skládat z různých podniků — v Mantě to spolu jednoduše funguje."
        />

        <RevealGroup
          as="div"
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {offers.map((offer) => {
            const tone = toneStyles[offer.color];
            const isDark = offer.color === "glow";
            return (
              <motion.div key={offer.slug} variants={revealItem}>
                <TiltCard>
                  <Link
                    href={offer.href}
                    className={cn(
                      "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-soft ring-1 ring-transparent transition-shadow hover:shadow-lift",
                      tone.bg,
                      tone.ring
                    )}
                  >
                    <div>
                      <span
                        className={cn(
                          "inline-flex size-11 items-center justify-center rounded-2xl text-lg font-bold",
                          tone.chip
                        )}
                      >
                        {offer.title.charAt(0)}
                      </span>
                      <h3
                        className={cn(
                          "mt-5 font-display text-xl font-bold",
                          isDark ? "text-white" : "text-ink-900"
                        )}
                      >
                        {offer.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed",
                          isDark ? "text-white/70" : "text-ink-700/80"
                        )}
                      >
                        {offer.summary}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "mt-8 inline-flex items-center gap-1.5 text-sm font-semibold",
                        isDark ? "text-glow-cyan" : "text-ocean-700"
                      )}
                    >
                      Zjistit víc
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
