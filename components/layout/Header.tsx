"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Jedna křivka a jedno trvání pro celé smrsknutí hlavičky. */
const MORPH = "duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]";

/** Hystereze prahu, ať lišta nebliká, když uživatel zastaví přesně na hraně. */
const COLLAPSE_AT = 48;
const EXPAND_AT = 12;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > EXPAND_AT : y > COLLAPSE_AT));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-full border px-4 backdrop-blur-md sm:px-6",
          // Rozměr, pozadí, rámeček i stín na jedné křivce — dřív se
          // velikost animovala 350 ms v JS, ale barvy 150 ms v CSS
          // a obsah se prohodil skokem, takže to působilo rozsypaně.
          "transition-[max-width,padding,background-color,border-color,box-shadow]",
          MORPH,
          scrolled
            ? "max-w-[1040px] border-line/80 bg-white/85 py-2 shadow-soft"
            : "max-w-[1200px] border-white/40 bg-white/60 py-3"
        )}
      >
        <Logo />

        <nav className="hidden items-center lg:flex" aria-label="Hlavní navigace">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return <NavLink key={item.href} item={item} active={active} />;
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <HeaderControl
            href={site.phoneHref}
            external
            icon={Phone}
            label={site.phone}
            title={site.phone}
            collapsed={scrolled}
            labelWidth="xl:max-w-[9rem]"
            className={cn(
              "bg-ocean-100 text-ocean-700 hover:bg-ocean-200",
              !scrolled && "xl:bg-transparent xl:text-ink-700 xl:hover:bg-ocean-100"
            )}
          />
          <HeaderControl
            href="/rezervace"
            icon={CalendarCheck}
            label="Rezervovat dráhu"
            title="Rezervovat dráhu"
            collapsed={scrolled}
            labelWidth="xl:max-w-[9rem]"
            className="bg-gold-500 text-ink-900 shadow-soft hover:bg-gold-600 hover:shadow-lift"
          />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-full bg-ocean-100 text-ink-900 lg:hidden"
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-3 top-[74px] rounded-3xl border border-line bg-white p-5 shadow-lift sm:inset-x-5 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobilní navigace">
              {mainNav.map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 font-display text-base font-semibold text-ink-900 hover:bg-ocean-100"
                >
                  {item.label}
                </NextLink>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold text-ink-700"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
              <Button href="/rezervace" className="w-full justify-center">
                Rezervovat dráhu
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Ovládací prvek hlavičky, který se z pilulky s popiskem smrskne na
 * kolečko s ikonou. Ikona přitom zůstává na místě — mění se jen popisek.
 *
 * Přechod je záměrně v CSS, ne ve Framer Motion. Podmínka „pod xl se
 * vejdou jen ikony“ tak zůstává media query, takže server i klient
 * vykreslí totéž a hydratace nic neposune (CLS zůstává 0). Popisek navíc
 * zůstává v DOM i ve smrsklém stavu, takže ho čtečky i roboti čtou pořád.
 */
function HeaderControl({
  href,
  external,
  icon: Icon,
  label,
  title,
  collapsed,
  labelWidth,
  className,
}: {
  href: string;
  external?: boolean;
  icon: typeof Phone;
  label: string;
  title: string;
  collapsed: boolean;
  /**
   * Rozvinutá šířka popisku jako HOTOVÁ třída — Tailwind skenuje zdroj,
   * takže `xl:${...}` by se nikdy nevygenerovalo. Hodnota má sedět na
   * skutečnou šířku textu; moc velká a animace zprvu „stojí“ na místě.
   */
  labelWidth: string;
  className?: string;
}) {
  const content = (
    <>
      <Icon className="size-4 flex-none" />
      {/* Šířka a průhlednost běží schválně zvlášť, každá na svém elementu.
          Kdyby sdílely jedno trvání, bylo by při zavírání vidět, jak text
          ořezává zužující se pilulka („Rezervo…“), a při otevírání by
          naskočil do ještě úzké. */}
      <span
        className={cn(
          "overflow-hidden transition-[max-width,margin] motion-reduce:transition-none",
          MORPH,
          "ml-0 max-w-0",
          !collapsed && cn("xl:ml-2", labelWidth)
        )}
      >
        <span
          className={cn(
            "block whitespace-nowrap font-display text-[15px] font-semibold",
            "transition-opacity motion-reduce:transition-none",
            // CSS bere trvání z cílového stavu, takže tohle dává
            // asymetrii zadarmo: při zavírání text zmizí hned, při
            // otevírání počká, až se pilulka rozevře.
            collapsed
              ? "opacity-0 duration-150"
              : "opacity-0 duration-200 xl:opacity-100 xl:delay-200"
          )}
        >
          {label}
        </span>
      </span>
    </>
  );

  const classes = cn(
    "inline-flex h-11 flex-none items-center rounded-full px-3.5",
    "transition-[background-color,color,box-shadow] motion-reduce:transition-none",
    MORPH,
    className
  );

  if (external) {
    return (
      <a href={href} title={title} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <NextLink href={href} title={title} className={classes}>
      {content}
    </NextLink>
  );
}

function NavLink({
  item,
  active,
}: {
  item: { label: string; href: string };
  active: boolean;
}) {
  return (
    <NextLink
      href={item.href}
      className={cn(
        "relative whitespace-nowrap rounded-full px-2.5 py-2 font-display text-sm font-semibold transition-colors xl:px-3 xl:text-[15px]",
        active ? "text-ocean-700" : "text-ink-700 hover:text-ocean-700"
      )}
    >
      {item.label}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 -z-10 rounded-full bg-ocean-100"
        />
      )}
    </NextLink>
  );
}
