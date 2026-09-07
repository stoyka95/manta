"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function FormSuccess({
  title,
  text,
  onReset,
}: {
  title: string;
  text: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-3xl bg-ocean-100 p-10 text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="flex size-14 items-center justify-center rounded-full bg-white text-ocean-600"
      >
        <CheckCircle2 className="size-7" />
      </motion.span>
      <h3 className="font-display text-xl font-bold text-ink-900">{title}</h3>
      <p className="max-w-sm text-sm text-ink-700">{text}</p>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-semibold text-ocean-700 underline underline-offset-4"
      >
        Odeslat další zprávu
      </button>
    </motion.div>
  );
}
