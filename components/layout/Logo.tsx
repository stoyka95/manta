import Link from "next/link";
import { MantaMark } from "@/components/illustrations/MantaMark";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Bowling Manta — domů"
    >
      <MantaMark className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
      <span
        className={cn(
          "font-display text-2xl font-bold -tracking-[0.01em]",
          dark ? "text-white" : "text-ink-900"
        )}
      >
        manta
      </span>
    </Link>
  );
}
