"use client";

import { Sparkles, Baby, Accessibility, Utensils, Wifi, Car } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { whyUs } from "@/lib/content";
import { motion } from "motion/react";

const icons = {
  sparkles: Sparkles,
  baby: Baby,
  accessibility: Accessibility,
  utensils: Utensils,
  wifi: Wifi,
  car: Car,
} as const;

export function WhyUs() {
  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Proč Manta"
          title="Detaily, které zážitek posouvají dál."
          tone="gold"
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item) => {
            const Icon = icons[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={revealItem}
                className="group rounded-3xl border border-line bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ocean-100 text-ocean-700 transition-colors group-hover:bg-gold-200 group-hover:text-gold-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
