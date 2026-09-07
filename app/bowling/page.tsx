import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Users2, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem, ScaleIn } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { StepList } from "@/components/sections/StepList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BowlingLane } from "@/components/illustrations/BowlingLane";
import { bowlingHowTo, tournaments } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bowling — 6 drah s GLOW efektem",
  description:
    "6 profesionálních bowlingových drah v Praze 6 se scoringem QUBICA CONQUEROR BES Premium a večerním GLOW nasvětlením. Bowlingová liga a turnaje.",
  alternates: { canonical: "/bowling" },
};

const rules = [
  { icon: Users2, text: "Max. 6 hráčů na jednu dráhu pro plynulou hru." },
  { icon: ShieldCheck, text: "Bowlingová obuv povinná — zapůjčíme na recepci." },
  { icon: Sparkles, text: "GLOW večery pátek a sobota, dráhy svítí UV světlem." },
  { icon: Trophy, text: "Nováčci vítáni — automatické mantinely na požádání." },
];

export default function BowlingPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Bowling", href: "/bowling" },
      ]))} />

      <PageHero
        eyebrow="Bowling"
        title="Šest drah. Nekonečno stylů hry."
        text={`Bowling Manta má ${site.lanes} profesionálních drah se scoringovým systémem QUBICA CONQUEROR BES Premium a večerním GLOW nasvětlením — otevřeno denně v Praze 6.`}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading eyebrow="Jak hrát" title="Tři kroky ke strike sérii." />
          <div className="mt-10">
            <StepList steps={bowlingHowTo} />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#241c4d] via-[#2c2166] to-ink-900 p-8 sm:p-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-glow-cyan">
                <Sparkles className="size-4" /> GLOW Night
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Když se dráhy rozsvítí.
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                V pátek a sobotu večer přepínáme dráhy do UV režimu — koule,
                pásy i dekorace svítí a atmosféra houstne. Ideální na
                narozeninovou párty i rande.
              </p>
              <Button href="/rezervace" className="mt-7">
                Rezervovat GLOW večer
              </Button>
            </Reveal>
            <ScaleIn>
              <BowlingLane glow className="w-full" />
            </ScaleIn>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading
            eyebrow="Turnaje & liga"
            title="Hrajte pravidelně, soutěžte o poháry."
            tone="gold"
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            {tournaments.map((t) => (
              <RevealItem
                key={t.title}
                className="rounded-3xl border border-line bg-white p-7"
              >
                <Trophy className="size-7 text-gold-500" />
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {t.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8">
            <Button href="/kontakt" variant="outline">
              Chci se přidat
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading eyebrow="Pravidla & bezpečnost" title="Ať je hra fér pro všechny." />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
            {rules.map((r) => (
              <RevealItem
                key={r.text}
                className="flex items-start gap-4 rounded-2xl bg-bg-alt p-5"
              >
                <r.icon className="mt-0.5 size-5 flex-none text-ocean-600" />
                <p className="text-sm text-ink-700">{r.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
