import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="px-3 pb-20 sm:px-5 sm:pb-28">
      <Container>
        <Reveal
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ocean-700 via-ocean-800 to-ink-900 px-8 py-16 text-center sm:px-16"
        >
          <div
            aria-hidden
            className="absolute -left-16 -top-16 h-64 w-64 animate-glow-pulse rounded-full bg-gold-400/20"
          />
          <div
            aria-hidden
            style={{ animationDelay: "1.1s" }}
            className="absolute -bottom-20 -right-10 h-72 w-72 animate-glow-pulse rounded-full bg-glow-violet/20"
          />
          <h2 className="relative font-display text-3xl font-extrabold text-white sm:text-4xl">
            Domluvme dráhu na váš termín.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-white/70">
            Rezervace zabere minutu — a o víkendech se vyplatí předstihnout
            ostatní party.
          </p>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="/rezervace" size="lg">
                Rezervovat dráhu
              </Button>
            </Magnetic>
            <a
              href={site.phoneHref}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/25 px-7 font-display font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
