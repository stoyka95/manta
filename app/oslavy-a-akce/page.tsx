import type { Metadata } from "next";
import { Cake, Briefcase, Users, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { StepList } from "@/components/sections/StepList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { EventInquiryForm } from "@/components/sections/EventInquiryForm";
import { eventPackages, eventSteps } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Oslavy & firemní akce",
  description:
    "Narozeniny, firemní večírky, teambuilding i svatby pro až 150 hostů v Praze 6. Program, catering i AV technika na míru.",
  alternates: { canonical: "/oslavy-a-akce" },
};

const icons = { cake: Cake, briefcase: Briefcase, users: Users, heart: Heart } as const;

export default function OslavyAAkcePage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Oslavy & akce", href: "/oslavy-a-akce" },
      ]))} />

      <PageHero
        eyebrow="Oslavy & firemní akce"
        title="Vaše akce, náš servis."
        text={`Kapacita až ${site.capacity} hostů, bezbariérové prostory a program sestavený přesně na míru vaší oslavě nebo firemní akci.`}
        tone="glow"
      />

      <PhotoBand slugs={["birthday-party", "team-celebration", "kids-bowling"]} />

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading eyebrow="Balíčky" title="Vyberte typ akce." />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eventPackages.map((pkg) => {
              const Icon = icons[pkg.icon];
              return (
                <RevealItem
                  key={pkg.title}
                  className="rounded-3xl border border-line bg-white p-6 transition-shadow hover:shadow-lift"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-gold-200 text-gold-600">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {pkg.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-bg-alt py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Jak akce probíhá" title="Od poptávky po strike večírek." tone="ocean" />
          <div className="mt-10">
            <StepList steps={eventSteps} />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Poptávka"
            title="Napište nám o vaší akci."
            text="Ozveme se zpravidla do 24 hodin s návrhem programu a orientační cenou."
          />
          <div className="mt-10">
            <EventInquiryForm />
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
