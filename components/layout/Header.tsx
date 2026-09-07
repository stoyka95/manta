"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 900 : 1160,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-full border px-4 backdrop-blur-md transition-colors sm:px-6",
          scrolled
            ? "border-line/80 bg-white/85 shadow-soft"
            : "border-white/40 bg-white/60"
        )}
      >
        <Logo />

        <nav className="hidden items-center lg:flex" aria-label="Hlavní navigace">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return <NavLink key={item.href} item={item} active={active} />;
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          {/* Compact icon-only controls: lg–xl, or any width once scrolled */}
          <a
            href={site.phoneHref}
            aria-label={site.phone}
            title={site.phone}
            className={cn(
              "flex size-10 flex-none items-center justify-center rounded-full bg-ocean-100 text-ocean-700 transition-colors hover:bg-ocean-200",
              !scrolled && "xl:hidden"
            )}
          >
            <Phone className="size-4" />
          </a>
          <NextLink
            href="/rezervace"
            aria-label="Rezervovat dráhu"
            title="Rezervovat dráhu"
            className={cn(
              "flex size-10 flex-none items-center justify-center rounded-full bg-gold-500 text-ink-900 transition-transform hover:scale-105",
              !scrolled && "xl:hidden"
            )}
          >
            <CalendarCheck className="size-4" />
          </NextLink>

          {/* Full controls: xl+, only while not scrolled */}
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-ocean-700",
              !scrolled && "xl:flex"
            )}
          >
            <Phone className="size-4" />
            {site.phone}
          </a>
          <span className={cn("hidden", !scrolled && "xl:inline-flex")}>
            <Button href="/rezervace" size="md">
              Rezervovat dráhu
            </Button>
          </span>
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
      </motion.div>

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
    </header>
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
        "relative whitespace-nowrap rounded-full px-2.5 py-2 font-display text-sm font-semibold transition-colors xl:px-4 xl:text-[15px]",
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
