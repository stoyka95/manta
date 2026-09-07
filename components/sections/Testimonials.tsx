"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Co říkají hosté"
            title="Recenze z drah i od stolu."
            className="mb-0"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Předchozí recenze"
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:border-ocean-600 hover:text-ocean-700"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Další recenze"
              className="flex size-11 items-center justify-center rounded-full bg-gold-500 text-ink-900 transition-transform hover:scale-105"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <div
              data-card
              key={t.name}
              className="w-[300px] flex-none snap-start rounded-3xl border border-line bg-white p-7 shadow-soft sm:w-[360px]"
            >
              <Quote className="size-7 text-gold-500" />
              <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                „{t.quote}“
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-ocean-100 font-display font-bold text-ocean-700">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-ink-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
