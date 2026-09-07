import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  text,
  tone = "ocean",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: React.ReactNode;
  tone?: "ocean" | "gold" | "glow";
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-36 sm:pt-44", className)}>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-ocean-100 via-bg to-bg"
      />
      <Container className="max-w-3xl text-center">
        <Reveal>
          <Badge tone={tone} className="mx-auto">
            {eyebrow}
          </Badge>
        </Reveal>
        <Reveal
          delay={0.08}
          as="h1"
          className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl"
        >
          {title}
        </Reveal>
        <Reveal delay={0.16} as="p" className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
          {text}
        </Reveal>
      </Container>
    </section>
  );
}
