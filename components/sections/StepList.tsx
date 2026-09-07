"use client";

import { motion } from "motion/react";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function StepList({
  steps,
  className,
}: {
  steps: { step: string; title: string; text: string }[];
  className?: string;
}) {
  return (
    <RevealGroup className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((s) => (
        <motion.div
          key={s.step}
          variants={revealItem}
          className="relative rounded-3xl border border-line bg-white p-6"
        >
          <span className="font-display text-3xl font-extrabold text-ocean-200">
            {s.step}
          </span>
          <h3 className="mt-3 font-display text-base font-bold text-ink-900">
            {s.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
        </motion.div>
      ))}
    </RevealGroup>
  );
}
