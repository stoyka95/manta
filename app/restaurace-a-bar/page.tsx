import type { Metadata } from "next";
import { Martini, Wine, Coffee } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { menuHighlights, barHighlights } from "@/lib/content";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Restaurace & bar — kuchyně, vinotéka a kavárna",
  description:
    "Kontinentální kuchyně servírovaná přímo k dráze, bar s koktejly, vinotéka s českými i zahraničními víny a kavárna s letní zahrádkou.",
  alternates: { canonical: "/restaurace-a-bar" },
};

const barIcons = [Martini, Wine, Coffee];

export default function RestauraceABarPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Restaurace & bar", href: "/restaurace-a-bar" },
      ]))} />

      <PageHero
        eyebrow="Restaurace & bar"
        title="Kuchyně, která vydrží celou hru."
        text="Kontinentální kuchyně s poledním menu 11:00–16:00, servírovaná přímo k dráze — hra se kvůli objednávce nezastaví."
        tone="gold"
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading eyebrow="Menu highlights" title="Ukázka z jídelního lístku." />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {menuHighlights.map((cat) => (
              <RevealItem
                key={cat.title}
                className="flex h-full flex-col rounded-3xl border border-line bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-ink-900">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500">{cat.text}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span className="text-ink-700">{item.name}</span>
                      <span className="flex-none font-display font-semibold text-ocean-700">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-6 text-sm text-ink-500">
            Ceny jsou orientační demo hodnoty. Plný jídelní lístek rád ukáže
            obsluha na místě.
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading
            eyebrow="Bar, vinotéka & kavárna"
            title="Pití, které sedí k dobré hře."
            tone="glow"
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {barHighlights.map((item, i) => {
              const Icon = barIcons[i];
              return (
                <RevealItem
                  key={item.title}
                  className="rounded-3xl bg-ink-900 p-7 text-white"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-gold-400">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-bg-alt p-10 text-center sm:p-14">
            <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
              Chcete stůl i dráhu zamluvenou najednou?
            </h2>
            <p className="max-w-lg text-ink-500">
              Při rezervaci dráhy nám stačí napsat počet hostů u jídla —
              stůl vám připravíme přesně na váš čas.
            </p>
            <Button href="/rezervace" size="lg">
              Rezervovat dráhu &amp; stůl
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
