"use client";

import { useState } from "react";
import { motion, animate } from "motion/react";
import { cn } from "@/lib/utils";

export function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);

  return (
    <motion.span
      className={cn(className)}
      viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      onViewportEnter={() => {
        const reduced =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        animate(0, value, {
          duration: reduced ? 0 : duration,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => setDisplay(Math.round(v)),
        });
      }}
    >
      {display}
    </motion.span>
  );
}
