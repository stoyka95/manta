"use client";

import { motion } from "motion/react";

export function MapIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={className} aria-hidden fill="none">
      <rect width="480" height="320" rx="32" fill="#EAF6FA" />
      <g stroke="#CBEAF3" strokeWidth="10">
        <line x1="0" y1="80" x2="480" y2="60" />
        <line x1="0" y1="180" x2="480" y2="200" />
        <line x1="90" y1="0" x2="70" y2="320" />
        <line x1="330" y1="0" x2="360" y2="320" />
      </g>
      <g stroke="#9FDBEA" strokeWidth="10" strokeDasharray="2 16" strokeLinecap="round">
        <line x1="0" y1="130" x2="480" y2="130" />
      </g>

      {[
        [140, 110],
        [200, 240],
        [380, 90],
        [60, 250],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="46"
          height="34"
          rx="8"
          fill="white"
          opacity="0.8"
        />
      ))}

      <motion.g
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.circle
          cx="240"
          cy="150"
          r="26"
          fill="#F3A824"
          fillOpacity="0.25"
          animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <circle cx="240" cy="150" r="14" fill="#1C7BAE" stroke="white" strokeWidth="4" />
        <path d="M240 150 L240 178" stroke="#1C7BAE" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
