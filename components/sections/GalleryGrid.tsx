"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { photoCategories, type PhotoCategory } from "@/lib/photos";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  slug: string;
  alt: string;
  caption: string;
  category: PhotoCategory;
  ratio: string;
  /** cesta ke skutečné fotce; chybí, pokud je slot zatím ilustrovaný */
  src: string | null;
};

export function GalleryGrid({
  items,
  scenes,
}: {
  items: GalleryItem[];
  /** předrenderované ilustrace ze serveru, indexované podle slugu */
  scenes: Record<string, React.ReactNode>;
}) {
  const [filter, setFilter] = useState<PhotoCategory | "vse">("vse");
  const [open, setOpen] = useState<number | null>(null);

  const shown = filter === "vse" ? items : items.filter((i) => i.category === filter);
  const active = open !== null ? shown[open] : null;

  function step(delta: number) {
    setOpen((i) => (i === null ? null : (i + delta + shown.length) % shown.length));
  }

  return (
    <>
      {/* filtr kategorií */}
      <div className="flex flex-wrap gap-2">
        {[{ key: "vse" as const, label: "Vše" }, ...photoCategories].map((c) => {
          const isActive = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setFilter(c.key);
                setOpen(null);
              }}
              className={cn(
                "relative rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors",
                isActive ? "text-white" : "text-ink-700 hover:bg-ocean-100"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-ink-900"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {c.label}
            </button>
          );
        })}
      </div>

      {/* mřížka */}
      <motion.div layout className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {shown.map((item, i) => (
            <motion.button
              key={item.slug}
              layout
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl shadow-soft"
              aria-label={`Zvětšit: ${item.caption}`}
            >
              <div className="relative" style={{ aspectRatio: item.ratio }}>
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  scenes[item.slug]
                )}
              </div>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent p-4 pt-10 text-left font-display text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.caption}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Zavřít"
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            {shown.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Předchozí"
                  className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Další"
                  className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}

            <motion.figure
              key={active.slug}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div
                className="relative overflow-hidden rounded-3xl bg-ocean-100"
                style={{ aspectRatio: active.ratio }}
              >
                {active.src ? (
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                ) : (
                  scenes[active.slug]
                )}
              </div>
              <figcaption className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-white/80">
                {!active.src && <Camera className="size-4 flex-none text-gold-400" />}
                {active.caption}
                {!active.src && <span className="text-white/40">· ilustrace</span>}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
