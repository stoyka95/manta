export function DotPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="manta-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#manta-dots)" />
    </svg>
  );
}

export function WavePattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 120"
      className={className}
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0,64 C200,120 400,8 600,48 C800,88 1000,16 1200,64 L1200,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
}
