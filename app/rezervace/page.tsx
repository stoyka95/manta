import type { Metadata } from "next";
import { Clock, Phone, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rezervace dráhy",
  description:
    "Zamluvte si bowlingovou dráhu v Bowling Manta Praha 6 online za minutu, nebo zavolejte na +420 235 302 220.",
  alternates: { canonical: "/rezervace" },
};

export default function RezervacePage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Rezervace", href: "/rezervace" },
      ]))} />

      <PageHero
        eyebrow="Rezervace"
        title="Zamluvte si dráhu za minutu."
        text="Vyplňte formulář níže — potvrzení termínu vám přijde e-mailem nebo SMS."
      />

      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <ReservationForm />

          <Reveal delay={0.1} className="space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink-900">
                <Clock className="size-4.5 text-ocean-600" /> Otevírací doba
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-500">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="font-semibold text-ink-900">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink-900">
                <Phone className="size-4.5 text-ocean-600" /> Raději telefonicky?
              </h3>
              <p className="mt-3 text-sm text-ink-500">
                Zavolejte nám, rádi rezervaci domluvíme na míru — hlavně o
                víkendech a GLOW večerech doporučujeme předstih.
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 inline-block font-display text-lg font-bold text-ocean-700"
              >
                {site.phone}
              </a>
            </div>

            <div className="flex gap-3 rounded-3xl bg-gold-200/60 p-5 text-sm text-ink-700">
              <Info className="size-4.5 flex-none text-gold-600" />
              <p>
                Toto je ukázkový (demo) formulář bez napojení na reálný
                rezervační systém — data se nikam neodesílají.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
