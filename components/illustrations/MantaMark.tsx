export function MantaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="20 -10 600 370"
      className={className}
      aria-hidden
      fill="none"
    >
      <defs>
        <radialGradient id="markSunGrad" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FDE39B" />
          <stop offset="45%" stopColor="#F8C452" />
          <stop offset="100%" stopColor="#D9840F" />
        </radialGradient>
        <linearGradient id="markRayGrad" x1="60" y1="40" x2="615" y2="345" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B9E7F2" />
          <stop offset="38%" stopColor="#4FAAD6" />
          <stop offset="72%" stopColor="#1C7BAE" />
          <stop offset="100%" stopColor="#0D4E72" />
        </linearGradient>
        <linearGradient id="markHornGrad" x1="230" y1="10" x2="335" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FCFE6" />
          <stop offset="100%" stopColor="#2E93C2" />
        </linearGradient>
      </defs>

      <circle cx="470" cy="160" r="125" fill="url(#markSunGrad)" />
      <circle cx="503" cy="112" r="16" fill="#FFFFFF" fillOpacity="0.92" />
      <circle cx="548" cy="132" r="12.5" fill="#FFFFFF" fillOpacity="0.92" />
      <circle cx="516" cy="158" r="11" fill="#FFFFFF" fillOpacity="0.92" />

      <polygon points="255,50 230,8 276,46" fill="url(#markHornGrad)" />
      <polygon points="299,40 320,4 336,46" fill="url(#markHornGrad)" />

      <polygon
        points="30,190 170,80 270,50 310,35 355,95 520,200 615,330 430,290 330,270 150,300 60,345"
        fill="url(#markRayGrad)"
      />

      <g stroke="#EAF7FC" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round">
        <path d="M170,80 L330,270" />
        <path d="M270,50 L430,290" />
        <path d="M30,190 L150,300" />
      </g>
    </svg>
  );
}
