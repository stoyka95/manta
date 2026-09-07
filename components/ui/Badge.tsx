import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "ocean",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ocean" | "gold" | "glow" | "ink";
}) {
  const tones = {
    ocean: "bg-ocean-100 text-ocean-700",
    gold: "bg-gold-200 text-gold-600",
    glow: "bg-white/10 text-glow-cyan",
    ink: "bg-ink-900/5 text-ink-700",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold font-display",
        tones[tone],
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "ocean" && "bg-ocean-500",
          tone === "gold" && "bg-gold-500",
          tone === "glow" && "bg-glow-cyan",
          tone === "ink" && "bg-ink-700"
        )}
      />
      {children}
    </span>
  );
}
