"use client";

import { motion } from "motion/react";
import { MantaMark } from "./MantaMark";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[560px]">
      {/* soft background blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-10 -right-6 h-64 w-64 rounded-full bg-gold-300/40 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-ocean-300/40 blur-3xl"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* dotted ring pattern (bowling ball holes motif) */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -right-4 top-6 h-24 w-24 text-ocean-300/70"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 80;
          return (
            <circle
              key={i}
              cx={100 + r * Math.cos(angle)}
              cy={100 + r * Math.sin(angle)}
              r="6"
              fill="currentColor"
            />
          );
        })}
      </svg>

      {/* main mark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center drop-shadow-[0_30px_60px_rgba(13,58,86,0.25)]"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="w-[85%]"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <MantaMark className="w-full" />
        </motion.div>
      </motion.div>

      {/* floating stat card */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: 0, scale: 1.03 }}
        className="absolute left-2 bottom-6 w-44 rounded-2xl bg-white/90 p-4 shadow-soft backdrop-blur sm:left-0 sm:bottom-10"
      >
        <p className="font-display text-sm font-bold text-ink-900">
          GLOW od 18:00
        </p>
        <p className="mt-1 text-xs text-ink-500">
          Pátek &amp; sobota večer — dráhy svítí UV světlem.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -16, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: 0, scale: 1.03 }}
        className="absolute right-0 top-2 w-40 rounded-2xl bg-white/90 p-4 shadow-soft backdrop-blur sm:-right-4"
      >
        <p className="font-display text-2xl font-extrabold text-ocean-700">6</p>
        <p className="text-xs text-ink-500">profi drah v Praze 6</p>
      </motion.div>
    </div>
  );
}
