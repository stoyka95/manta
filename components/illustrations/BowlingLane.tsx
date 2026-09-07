"use client";

import { motion } from "motion/react";

export function BowlingLane({
  glow = false,
  className,
}: {
  glow?: boolean;
  className?: string;
}) {
  const laneFill = glow ? "url(#laneGlow)" : "url(#laneWood)";
  const pinFill = glow ? "#EAF7FC" : "#FFFFFF";
  const pinStroke = glow ? "#3FE8D0" : "#DCEAEE";

  return (
    <svg viewBox="0 0 400 320" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="laneWood" x1="200" y1="20" x2="200" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8C452" />
          <stop offset="100%" stopColor="#D9840F" />
        </linearGradient>
        <linearGradient id="laneGlow" x1="200" y1="20" x2="200" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3A2E6B" />
          <stop offset="100%" stopColor="#1B1440" />
        </linearGradient>
      </defs>

      <polygon points="150,20 250,20 320,300 80,300" fill={laneFill} opacity={glow ? 1 : 0.16} />
      <g stroke={glow ? "#8B6BFF" : "#0D3A56"} strokeOpacity={glow ? 0.6 : 0.12} strokeWidth="2">
        <line x1="150" y1="20" x2="80" y2="300" />
        <line x1="250" y1="20" x2="320" y2="300" />
        <line x1="200" y1="20" x2="200" y2="300" strokeDasharray="6 10" />
      </g>

      {/* pins */}
      {[
        [200, 46],
        [188, 58],
        [212, 58],
        [176, 72],
        [200, 72],
        [224, 72],
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <ellipse cx="0" cy="12" rx="7" ry="12" fill={pinFill} stroke={pinStroke} strokeWidth="1.5" />
          {glow && <circle cx="0" cy="6" r="2" fill="#3FE8D0" />}
        </g>
      ))}

      {/* ball */}
      <motion.g
        initial={{ y: 260, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <circle
          cx="200"
          cy="250"
          r="20"
          fill={glow ? "#FF5FA0" : "#1C7BAE"}
        />
        <circle cx="194" cy="240" r="2.4" fill="white" fillOpacity="0.85" />
        <circle cx="204" cy="238" r="2" fill="white" fillOpacity="0.85" />
        <circle cx="199" cy="246" r="1.8" fill="white" fillOpacity="0.85" />
      </motion.g>
    </svg>
  );
}
