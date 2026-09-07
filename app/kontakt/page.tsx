import type { Metadata } from "next";
import { MapPin, Phone, Mail, Car, Bus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapIllustration } from "@/components/illustrations/MapIllustration";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Bowling Manta, Makovského 1342/12a, Praha 6 – Řepy. Telefon +420 235 302 220, e-mail info@bowlingmanta.cz. Otevřeno denně.",
  alternates: { canonical: "/kontakt" },
};

const contactFaqs = faqs.slice(0, 3);

export default function KontaktPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbJsonLd([
        { name: "Domů", href: "/" },
        { name: "Kontakt", href: "/kontakt" },
      ]))} />

      <PageHero
        eyebrow="Kontakt"
        title="Najděte nás v Řepích."
        text="Máte dotaz k rezervaci, akci nebo jen chcete pozdravit? Ozvěte se — rádi odpovíme."
      />

      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <MapIllustration className="w-full rounded-3xl" />
            <div className="mt-6 grid gap-4 rounded-3xl border border-line bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 flex-none text-ocean-600" />
                <div>
                  <p className="font-display font-bold text-ink-900">Adresa</p>
                  <p className="text-sm text-ink-500">{site.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 flex-none text-ocean-600" />
                <div>
                  <p className="font-display font-bold text-ink-900">Telefon</p>
                  <a href={site.phoneHref} className="text-sm text-ink-500 hover:text-ocean-700">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 flex-none text-ocean-600" />
                <div>
                  <p className="font-display font-bold text-ink-900">E-mail</p>
                  <a href={`mailto:${site.email}`} className="text-sm text-ink-500 hover:text-ocean-700">
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm text-ink-500">
                <span className="flex items-center gap-2">
                  <Car className="size-4 text-ocean-600" /> Parkování u objektu
                </span>
                <span className="flex items-center gap-2">
                  <Bus className="size-4 text-ocean-600" /> Dostupné MHD
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-alt py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading align="center" eyebrow="Než napíšete" title="Možná už tu odpověď je." />
          <div className="mt-10">
            <Accordion items={contactFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
