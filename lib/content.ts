// Jeden zdroj pravdy pro copy webu — viz docs/01-content-structure.md

export const hero = {
  eyebrow: "Praha 6 · Bowling od 2002",
  title: "Strike zážitek, ne jen hru.",
  text: "6 profesionálních drah, GLOW bowling, kuchyně, bar a vinotéka pod jednou střechou. Ať jedete na rande, s dětmi nebo s celou firmou — v Mantě máte dráhu, stůl i náladu zamluvenou najednou.",
  ctaPrimary: { label: "Rezervovat dráhu", href: "/rezervace" },
  ctaSecondary: { label: "Prohlédnout ceník", href: "/cenik" },
  trust: "500+ hodnocení · bezbariérový přístup",
};

export const stats = [
  { value: 6, suffix: "", label: "drah s GLOW efektem" },
  { value: 150, suffix: "", label: "hostů kapacita akcí" },
  { value: 2002, suffix: "", label: "rok založení", plain: true },
  { value: 7, suffix: "×", label: "v týdnu otevřeno" },
];

export const offers = [
  {
    slug: "bowling",
    title: "Bowling",
    href: "/bowling",
    summary:
      "6 profesionálních drah s QUBICA CONQUEROR BES Premium scoringem a večerním GLOW nasvětlením. Zatahovací mantinely pro děti.",
    color: "ocean" as const,
  },
  {
    slug: "restaurace",
    title: "Restaurace & bar",
    href: "/restaurace-a-bar",
    summary:
      "Kontinentální kuchyně, poctivé burgery i lehké obědy, pivo, koktejly a vinotéka s českými i zahraničními víny.",
    color: "gold" as const,
  },
  {
    slug: "oslavy",
    title: "Oslavy & firemní akce",
    href: "/oslavy-a-akce",
    summary:
      "Narozeniny, firemní večírky, teambuilding i svatební hostiny až pro 150 hostů — na klíč, s vlastním scénářem.",
    color: "glow" as const,
  },
];

export const whyUs = [
  {
    title: "GLOW bowling",
    text: "Večer se dráhy rozzáří UV světlem a hra dostane úplně jinou atmosféru.",
    icon: "sparkles" as const,
  },
  {
    title: "Pro každý věk",
    text: "Automatické zatahovací mantinely pomůžou i nejmenším hráčům trefit kužely.",
    icon: "baby" as const,
  },
  {
    title: "Bezbariérové",
    text: "Celá budova je bez schodů a bariér — dostupná pro každého hosta.",
    icon: "accessibility" as const,
  },
  {
    title: "Vlastní kuchyně",
    text: "Jídlo a pití servírujeme přímo k dráze, hra se kvůli tomu nezastaví.",
    icon: "utensils" as const,
  },
  {
    title: "WiFi & klimatizace",
    text: "Volné WiFi a příjemná teplota po celý rok, i o horkém pražském létě.",
    icon: "wifi" as const,
  },
  {
    title: "Parkování a MHD",
    text: "Snadná dostupnost autem i veřejnou dopravou — ideální i pro velké skupiny.",
    icon: "car" as const,
  },
];

export const galleryStrip = [
  { title: "GLOW Night", text: "Dráhy v UV nasvětlení, pátek a sobota večer." },
  { title: "Letní zahrádka", text: "Posezení venku mimo hru, otevřeno celý rok." },
  { title: "Vinotéka", text: "Česká i zahraniční vína, degustace pro skupiny." },
  { title: "Oslavy", text: "Narozeniny, večírky i firemní akce na klíč." },
];

export const testimonials = [
  {
    quote:
      "Oslavili jsme tu firemní vánoční večírek pro 40 lidí — perfektní servis i zábava.",
    name: "Tereza K.",
    role: "event manažerka",
  },
  {
    quote: "Kluci byli z GLOW bowlingu naprosto u vytržení. Přijdeme znovu!",
    name: "Petr N.",
    role: "rodič",
  },
  {
    quote:
      "Burger po dráze byl lepší, než jsem čekal. Bar má fakt slušnou nabídku whisky.",
    name: "Martin V.",
    role: "host",
  },
  {
    quote: "Nejlepší místo na rande, které není nudné.",
    name: "Hana S.",
    role: "host",
  },
  {
    quote:
      "S firemní ligou hrajeme v Mantě už třetím rokem — skvělé zázemí.",
    name: "David R.",
    role: "kapitán ligového týmu",
  },
];

export const faqs = [
  {
    q: "Kde se Bowling Manta nachází a jak se tam dostanu?",
    a: "Bowling Manta sídlí na adrese Makovského 1342/12a, Praha 6 – Řepy. Dostupná je autem s parkováním u objektu i MHD, budova je navíc plně bezbariérová.",
  },
  {
    q: "Jaká je otevírací doba Bowling Manty?",
    a: "Neděle až čtvrtek máme otevřeno 11:00–00:00, pátek a sobotu 11:00–01:00. Otevřeno je tak celý týden, včetně poledních hodin na oběd.",
  },
  {
    q: "Kolik bowlingových drah Manta má?",
    a: "Manta má 6 profesionálních drah se scoringovým systémem QUBICA CONQUEROR BES Premium, včetně automatických mantinelů pro děti.",
  },
  {
    q: "Co je GLOW bowling a kdy se pouští?",
    a: "GLOW bowling je večerní režim s UV nasvětlením drah a černým světlem v prostoru — dráhy i míče v něm svítí. Spouští se ve večerních hodinách, typicky pátek a sobotu.",
  },
  {
    q: "Kolik stojí hodina bowlingu v Mantě?",
    a: "Cena za dráhu a hodinu se pohybuje od 590 Kč mimo špičku do 890 Kč o GLOW večerech o víkendu. Přesný ceník najdete na stránce Ceník.",
  },
  {
    q: "Kolik hráčů se vejde na jednu dráhu?",
    a: "Na jednu dráhu doporučujeme maximálně 6 hráčů, aby hra plynule odsýpala a každý si užil dostatek hodů.",
  },
  {
    q: "Je Bowling Manta vhodná pro malé děti?",
    a: "Ano. Dráhy mají automatické zatahovací mantinely, takže si hru užijí i nejmenší hráči, a herna nabízí zábavu i mimo dráhu.",
  },
  {
    q: "Je Bowling Manta bezbariérová?",
    a: "Ano, celá budova — dráhy, restaurace i sociální zařízení — je bez schodů a bariér přístupná pro vozíčkáře.",
  },
  {
    q: "Dá se v Mantě uspořádat firemní večírek nebo teambuilding?",
    a: "Ano, kapacita až 150 hostů umožňuje firemní večírky, rauty, teambuilding i svatby. Program a catering sestavíme na míru — víc na stránce Oslavy & akce.",
  },
  {
    q: "Je potřeba se na bowling objednávat dopředu?",
    a: "O víkendech a večer doporučujeme rezervaci dopředu, protože je o dráhy velký zájem. Ve všední den dopoledne obvykle stačí přijít.",
  },
  {
    q: "Nabízí Manta i jídlo a pití přímo u dráhy?",
    a: "Ano, restaurace servíruje jídlo i pití přímo k dráze, takže hra kvůli objednávce nemusí stát. K dispozici je i bar a vinotéka.",
  },
  {
    q: "Pořádá Manta bowlingové turnaje nebo ligu?",
    a: "Ano, pravidelně běží Místní bowlingová liga Manta a několik jednorázových turnajů ročně. Nové týmy a hráče rádi přivítáme — napište nám na kontakt.",
  },
];

export const faqShort = faqs.slice(0, 4);

// --- Bowling ---
export const bowlingHowTo = [
  { step: "1", title: "Vyberte termín", text: "Rezervujte si dráhu online nebo telefonicky, klidně i na dnešní večer." },
  { step: "2", title: "Přezujte boty", text: "Na recepci dostanete bowlingovou obuv ve vaší velikosti." },
  { step: "3", title: "Hrajte", text: "Systém QUBICA vám sám spočítá skóre — vy se soustřeďte na strike." },
];

export const tournaments = [
  {
    title: "Místní bowlingová liga Manta",
    text: "Pravidelná sezónní liga pro amatérské i pokročilé týmy. Tréninkové sloty a zápasy každý týden.",
  },
  {
    title: "Manta Strike Cup",
    text: "Jednorázový turnaj otevřený veřejnosti, pořádaný několikrát do roka, s cenami pro nejlepší hráče.",
  },
];

// --- Restaurace & bar ---
export const menuHighlights = [
  {
    title: "Rychlovky k dráze",
    text: "Burgery, hranolky a wingsy, které vydrží celou hru.",
    items: [
      { name: "Manta Strike Burger", price: "219 Kč" },
      { name: "Hranolky s dipem", price: "89 Kč" },
      { name: "Kuřecí wingsy", price: "179 Kč" },
    ],
  },
  {
    title: "Polední menu",
    text: "Polévka + hlavní jídlo, servírované 11:00–16:00.",
    items: [
      { name: "Polední menu (Po–Pá)", price: "159 Kč" },
      { name: "Polévka dne", price: "59 Kč" },
    ],
  },
  {
    title: "Sdílené mísy",
    text: "Ideální na stůl pro celou partu mezi hody.",
    items: [
      { name: "Nachos sdílené", price: "249 Kč" },
      { name: "Mix mísa pro 4", price: "399 Kč" },
    ],
  },
  {
    title: "Dezerty",
    text: "Sladká tečka po vítězné sérii.",
    items: [
      { name: "Domácí brownie", price: "99 Kč" },
      { name: "Dort na přání", price: "na dotaz" },
    ],
  },
];

export const barHighlights = [
  { title: "Bar & koktejly", text: "Klasické i signature koktejly, čepovaná piva a nealko mixy." },
  { title: "Vinotéka", text: "Česká i zahraniční vína, na požádání degustace pro skupiny." },
  { title: "Kavárna & zahrádka", text: "Ráno i odpoledne mimo hru, posezení venku po celý rok." },
];

// --- Oslavy & akce ---
export const eventPackages = [
  {
    title: "Narozeniny",
    text: "Dráha + jídlo + dort na přání, pro děti i dospělé.",
    icon: "cake" as const,
  },
  {
    title: "Firemní večírek",
    text: "Pronájem více drah, catering a AV technika na prezentaci.",
    icon: "briefcase" as const,
  },
  {
    title: "Teambuilding",
    text: "Turnajový formát s vyhlášením vítězů, ideální pro 15–60 lidí.",
    icon: "users" as const,
  },
  {
    title: "Svatby & rauty",
    text: "Celá provozovna k dispozici, menu i program podle přání.",
    icon: "heart" as const,
  },
];

export const eventSteps = [
  { step: "1", title: "Poptávka", text: "Napíšete nám termín, počet hostů a typ akce." },
  { step: "2", title: "Návrh programu", text: "Připravíme program, menu a rozpočet na míru." },
  { step: "3", title: "Potvrzení", text: "Doladíme detaily a rezervaci potvrdíme." },
  { step: "4", title: "Realizace", text: "V den akce se staráme o vše — vy si užíváte hosty." },
];

// --- Ceník ---
export const bowlingPricing = [
  { label: "Po–Pá do 17:00", price: "590 Kč", unit: "/hod. za dráhu" },
  { label: "Po–Ne od 17:00 / víkend", price: "790 Kč", unit: "/hod. za dráhu", featured: true },
  { label: "GLOW večer (pá–so)", price: "890 Kč", unit: "/hod. za dráhu" },
];

export const pricingExtras = [
  { label: "Půjčení obuvi", price: "50 Kč / pár" },
  { label: "Ponožky na jedno použití", price: "30 Kč" },
  { label: "Studentská sleva (Po–Pá do 17:00)", price: "−15 %" },
];

export const groupPackages = [
  { title: "Narozeninový", text: "2 hod. dráha, boty, pizza/burger menu pro každého.", price: "od 350 Kč/os." },
  { title: "Firemní", text: "Pronájem 3+ drah, catering, welcome drink.", price: "na míru — poptávka" },
  { title: "Ligový tým", text: "Sezónní členství v lize + tréninkové sloty.", price: "2 900 Kč/sezóna" },
];

export const foodPricing = [
  { label: "Burger", price: "219 Kč" },
  { label: "Polední menu", price: "159 Kč" },
  { label: "Nachos sdílené", price: "249 Kč" },
  { label: "Pivo 0,3 l", price: "55 Kč" },
  { label: "Sklenka vína", price: "89 Kč" },
];
