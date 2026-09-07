import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { Logo } from "./Logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Bowling, restaurace, bar a vinotéka v Praze 6. Šest profesionálních
            drah a GLOW bowling od {site.founded}.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-ocean-600"
            >
              <FacebookIcon className="size-4.5" />
            </a>
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-ocean-600"
            >
              <InstagramIcon className="size-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
            Rychlé odkazy
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/75 transition-colors hover:text-gold-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
            Otevírací doba
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {site.hours.map((h) => (
              <li key={h.days} className="flex flex-col">
                <span className="text-white/50">{h.days}</span>
                <span className="font-semibold text-white">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4.5 flex-none text-gold-400" />
              {site.address.full}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4.5 flex-none text-gold-400" />
              <a href={site.phoneHref} className="hover:text-gold-400">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4.5 flex-none text-gold-400" />
              <a href={`mailto:${site.email}`} className="hover:text-gold-400">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 px-5 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Bowling Manta. Všechna práva vyhrazena.</p>
          <p>Vytvořeno jako demo projekt · návrh &amp; realizace webu.</p>
        </div>
      </div>
    </footer>
  );
}
