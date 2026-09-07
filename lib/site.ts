export const site = {
  name: "Manta",
  fullName: "Bowling Manta",
  claim: "Strike zážitek, ne jen hru.",
  url: "https://bowling-manta-stoyka95s-projects.vercel.app",
  phone: "+420 235 302 220",
  phoneHref: "tel:+420235302220",
  email: "info@bowlingmanta.cz",
  address: {
    street: "Makovského 1342/12a",
    city: "Praha 6 – Řepy",
    zip: "163 00",
    country: "CZ",
    full: "Makovského 1342/12a, 163 00 Praha 6 – Řepy",
  },
  founded: 2002,
  lanes: 6,
  capacity: 150,
  rating: { value: 4.6, count: 500 },
  hours: [
    { days: "Neděle – Čtvrtek", time: "11:00 – 00:00" },
    { days: "Pátek – Sobota", time: "11:00 – 01:00" },
  ],
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Bowling", href: "/bowling" },
  { label: "Restaurace & bar", href: "/restaurace-a-bar" },
  { label: "Oslavy & akce", href: "/oslavy-a-akce" },
  { label: "Ceník", href: "/cenik" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNav: NavItem[] = [
  ...mainNav,
  { label: "Rezervace", href: "/rezervace" },
  { label: "Časté dotazy", href: "/faq" },
];
