import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "ocean",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  tone?: "ocean" | "gold" | "glow" | "ink";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Badge tone={tone} className="mb-4">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-500">{text}</p>
      ) : null}
    </Reveal>
  );
}
