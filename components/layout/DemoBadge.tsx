"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Info, X } from "lucide-react";

/**
 * Trvalé upozornění, že jde o ukázku, ne o oficiální web klubu.
 *
 * Web nese skutečné jméno, adresu i telefon podniku, takže návštěvník
 * musí mít jak poznat, že se dívá na demo. Proto je štítek vidět na každé
 * stránce a v zavřeném stavu zůstává jako ikona — nejde ho odklikat
 * natrvalo.
 *
 * Stav drží `useState` v root layoutu, který App Router mezi přechody
 * neodmountuje. Zavření tak platí pro celou návštěvu, ale po reloadu se
 * upozornění zase ukáže — což je záměr.
 */
export function DemoBadge() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed right-3 z-50 print:hidden sm:right-4"
      // Odsazení od spodní hrany si drží samo, ale respektuje fixní
      // spodní lištu, pokud ji stránka má (rezervační souhrn pod `lg`
      // publikuje svou výšku do `--bottom-sheet`). Bez toho by štítek
      // v kroku s kontakty překryl formulář.
      style={{ bottom: "calc(var(--bottom-sheet, 0px) + 0.75rem)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="open"
            layout
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="max-w-[min(20rem,calc(100vw-1.5rem))] origin-bottom-right rounded-2xl border border-line bg-white/95 p-4 shadow-lg backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 flex-none items-center justify-center rounded-full bg-gold-300 text-ink-900">
                <Info className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-ink-900">
                  Ukázka webu
                </p>
                <p className="mt-1 text-[13px] leading-snug text-ink-500">
                  Není to oficiální stránka klubu. Ceny, dostupnost drah
                  i rezervace jsou nezávazné demo.
                </p>
                <a
                  href="https://www.bowlingmanta.cz"
                  className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ocean-600 hover:text-ocean-700"
                >
                  Oficiální web
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zmenšit upozornění"
                className="-mr-1 -mt-1 flex size-7 flex-none items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ocean-100 hover:text-ink-900"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="closed"
            type="button"
            layout
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            aria-label="Zvětšit upozornění: jde o ukázku webu"
            className="flex origin-bottom-right items-center gap-2 rounded-full border border-line bg-white/95 py-2 pl-2.5 pr-3.5 shadow-lg backdrop-blur transition-colors hover:bg-white"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-gold-300 text-ink-900">
              <Info className="size-3.5" />
            </span>
            <span className="font-display text-xs font-bold uppercase tracking-wide text-ink-900">
              Demo
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
