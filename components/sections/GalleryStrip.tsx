"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealItem, RevealGroup } from "@/components/ui/Reveal";
import { BowlingLane } from "@/components/illustrations/BowlingLane";
import { WavePattern } from "@/components/illustrations/DotPattern";
import { galleryStrip } from "@/lib/content";
import { cn } from "@/lib/utils";

const panelStyles = [
  "bg-ink-900 text-white",
  "bg-gold-200 text-ink-900",
  "bg-ocean-600 text-white",
  "bg-white text-ink-900 border border-line",
];

export function GalleryStrip() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Atmosféra Manty"
          title="Nakouknětě dovnitř."
          text="Skutečné fotky provozovny brzy doplníme — zatím vám atmosféru přiblíží naše ilustrace v barvách Manty."
          tone="glow"
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryStrip.map((item, i) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              whileHover={{ y: -6 }}
              className={cn(
                "relative flex h-64 flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-soft",
                panelStyles[i % panelStyles.length]
              )}
            >
              {i === 0 && (
                <>
                  <div className="absolute inset-0 opacity-70">
                    <BowlingLane glow className="h-full w-full" />
                  </div>
                  <motion.div
                    aria-hidden
                    className="absolute -inset-6 rounded-full bg-glow-violet/30 blur-3xl"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 3.2, repeat: Infinity }}
                  />
                </>
              )}
              {i === 1 && (
                <WavePattern className="absolute bottom-0 left-0 h-20 w-full text-gold-400/50" />
              )}
              {i === 2 && (
                <div className="absolute inset-0 flex items-end justify-center opacity-30">
                  <svg viewBox="0 0 100 60" className="h-full w-full" aria-hidden>
                    {[10, 30, 50, 70, 90].map((x, idx) => (
                      <rect
                        key={x}
                        x={x - 3}
                        y={60 - (idx % 2 === 0 ? 40 : 28)}
                        width="6"
                        height={idx % 2 === 0 ? 40 : 28}
                        fill="white"
                        rx="2"
                      />
                    ))}
                  </svg>
                </div>
              )}
              {i === 3 && (
                <div className="absolute right-4 top-4 flex gap-1.5 opacity-60">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="size-2.5 rounded-full bg-glow-pink" />
                  ))}
                </div>
              )}

              <span className="relative font-display text-lg font-bold">
                {item.title}
              </span>
              <p className="relative text-sm opacity-80">{item.text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
