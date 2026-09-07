import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookingWidget } from "@/components/sections/BookingWidget";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rezervace dráhy",
  description:
    "Rezervujte si bowlingovou dráhu v Bowling Manta Praha 6 online — vyberte den, dráhu a hodinu, cenu uvidíte hned. Nebo volejte +420 235 302 220.",
  alternates: { canonical: "/rezervace" },
};

export default function RezervacePage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Domů", href: "/" },
            { name: "Rezervace", href: "/rezervace" },
          ])
        )}
      />

      <section className="flex min-h-svh flex-col justify-center pb-6 pt-20 sm:pb-8 sm:pt-28">
        <Container>
          {/* kompaktní hlavička — vejde se nad widget bez scrollování */}
          <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-600 sm:text-xs">
                Rezervace
              </p>
              <h1 className="mt-0.5 font-display text-xl font-extrabold leading-tight text-ink-900 sm:mt-1 sm:text-3xl">
                Vyberte den, dráhu a hodinu.
              </h1>
              <p className="mt-1 text-[13px] leading-snug text-ink-500 sm:text-sm">
                Bowling Manta má {site.lanes} drah. Cenu za dráhu a hodinu vidíte
                přímo v mřížce — celková částka se počítá průběžně.
              </p>
            </div>

            <ul className="hidden flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500 sm:flex">
              {site.hours.map((h) => (
                <li key={h.days} className="flex items-center gap-1.5">
                  <Clock className="size-3.5 flex-none text-ocean-600" />
                  <span>{h.days}</span>
                  <b className="font-semibold text-ink-900">{h.time}</b>
                </li>
              ))}
            </ul>
          </div>

          <BookingWidget />
        </Container>
      </section>
    </>
  );
}
