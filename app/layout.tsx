import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Bowling, restaurace a bar v Praze 6`,
    template: `%s — ${site.fullName}`,
  },
  description:
    "Bowling Manta v Praze 6 – Řepích: 6 profesionálních drah s GLOW efektem, restaurace, bar a vinotéka. Otevřeno denně, ideální na rande, oslavy i firemní akce.",
  keywords: [
    "bowling Praha",
    "bowling Praha 6",
    "Bowling Manta",
    "GLOW bowling",
    "firemní akce Praha",
    "narozeninová oslava bowling",
    "restaurace Praha 6 Řepy",
  ],
  authors: [{ name: site.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: site.fullName,
    title: `${site.fullName} — Bowling, restaurace a bar v Praze 6`,
    description:
      "6 profesionálních drah, GLOW bowling, restaurace, bar a vinotéka pod jednou střechou v Praze 6.",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — Bowling, restaurace a bar v Praze 6`,
    description:
      "6 profesionálních drah, GLOW bowling, restaurace, bar a vinotéka pod jednou střechou v Praze 6.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#f6fbfc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className="h-full scroll-smooth antialiased">
      <head>
        {/* Fonty nad ohybem: bez preloadu je prohlížeč objeví až po
            parsování CSS, prohodí je po prvním vykreslení a posune layout
            (na /rezervace to dělalo CLS 0,39). Preload je stihne dřív. */}
        {["poppins-600", "poppins-700", "poppins-800", "inter-400"].map((f) => (
          <link
            key={f}
            rel="preload"
            as="font"
            type="font/woff2"
            href={`/fonts/${f}.woff2`}
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body className="flex min-h-full flex-col bg-bg font-body text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
