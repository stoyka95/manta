import { site } from "./site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "BowlingAlley",
  name: site.fullName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/logo/manta-logo.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Praha 6",
    postalCode: site.address.zip,
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.0798,
    longitude: 14.3277,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "01:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  sameAs: [site.social.facebook, site.social.instagram],
};

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
