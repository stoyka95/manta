import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { faqs } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Časté dotazy",
  description:
    "Odpovědi na nejčastější dotazy o Bowling Manta: otevírací doba, ceny, počet drah, GLOW bowling, rezervace, firemní akce a bezbariérovost.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <script {...jsonLdScriptProps(faqJsonLd(faqs))} />
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Časté dotazy", href: "/faq" },
      ]))} />

      <PageHero
        eyebrow="Časté dotazy"
        title="Odpovědi, ať víte, do čeho jdete."
        text="Nenašli jste, co jste hledali? Napište nám, rádi doplníme."
      />

      <section className="pb-24 sm:pb-32">
        <Container className="max-w-3xl">
          <Accordion items={faqs} />
          <Reveal className="mt-10 text-center">
            <Button href="/kontakt" variant="outline">
              Zeptat se přímo
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
