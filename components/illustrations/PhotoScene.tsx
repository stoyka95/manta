import type { PhotoSlug } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * Brandové ilustrované scény, které drží fotoslotům místo, dokud nedorazí
 * skutečné fotky provozovny. Ploché fasety záměrně navazují na origami
 * styl loga. Bez gradientů (žádná `id` → scéna jde bezpečně vykreslit
 * vícekrát na jedné stránce).
 */

type SceneKind =
  | "lanes"
  | "glow"
  | "shoes"
  | "people"
  | "food"
  | "drink"
  | "wine"
  | "party"
  | "room";

/** varianta odlišuje sloty, které sdílejí stejný typ scény */
const sceneBySlug: Record<PhotoSlug, { kind: SceneKind; variant?: number }> = {
  "hero-lanes": { kind: "lanes", variant: 0 },
  "glow-night": { kind: "glow" },
  "lane-detail": { kind: "lanes", variant: 1 },
  "bowling-shoes": { kind: "shoes" },
  "kids-bowling": { kind: "party", variant: 1 },
  "friends-bowling": { kind: "people", variant: 0 },
  burger: { kind: "food" },
  "restaurant-interior": { kind: "room", variant: 0 },
  "cocktail-bar": { kind: "drink" },
  wine: { kind: "wine" },
  "bar-counter": { kind: "room", variant: 1 },
  "birthday-party": { kind: "party", variant: 0 },
  "team-celebration": { kind: "people", variant: 1 },
  "corporate-event": { kind: "lanes", variant: 2 },
};

const V = "0 0 320 200";

function Lanes({ variant = 0 }: { variant?: number }) {
  // 0 = denní pohled, 1 = detail s koulí zblízka, 2 = širší večerní pronájem
  const night = variant === 2;
  const bg = night ? "#0D3A56" : "#F6FBFC";
  const laneA = night ? "#145C87" : "#9FDBEA";
  const laneB = night ? "#1C7BAE" : "#CBEAF3";
  const ballR = variant === 1 ? 30 : 17;
  const ballC = variant === 1 ? { x: 96, y: 138 } : { x: 118, y: 150 };
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      {[0, 1, 2, 3].map((i) => (
        <polygon
          key={i}
          fill={i % 2 ? laneA : laneB}
          points={`${40 + i * 62},200 ${102 + i * 62},200 ${172 + i * 9},70 ${150 + i * 9},70`}
        />
      ))}
      <rect x="0" y="58" width="320" height="16" fill={night ? "#0A2E45" : "#5FBEDD"} />
      {[152, 161, 170, 179, 188].map((x, i) => (
        <rect key={x} x={x} y={42 - (i % 2) * 4} width="5" height="16" rx="2.5" fill="#FFFFFF" />
      ))}
      <circle cx={ballC.x} cy={ballC.y} r={ballR} fill={night ? "#F3A824" : "#1C7BAE"} />
      {[
        [-0.3, -0.42],
        [0.24, -0.48],
        [0.0, 0.06],
      ].map(([dx, dy], i) => (
        <circle
          key={i}
          cx={ballC.x + dx * ballR}
          cy={ballC.y + dy * ballR}
          r={ballR * 0.16}
          fill={night ? "#0D3A56" : "#FFFFFF"}
        />
      ))}
      <circle cx="252" cy="42" r="30" fill="#F9D086" opacity={night ? 0.4 : 1} />
    </svg>
  );
}

function Glow() {
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#0D3A56" />
      {[0, 1, 2, 3].map((i) => (
        <polygon
          key={i}
          fill={["#8B6BFF", "#3FE8D0", "#FF5FA0", "#8B6BFF"][i]}
          opacity="0.32"
          points={`${34 + i * 64},200 ${96 + i * 64},200 ${170 + i * 9},72 ${148 + i * 9},72`}
        />
      ))}
      <rect x="0" y="62" width="320" height="12" fill="#8B6BFF" opacity="0.5" />
      {[150, 159, 168, 177, 186].map((x, i) => (
        <rect key={x} x={x} y={46 - (i % 2) * 4} width="5" height="16" rx="2.5" fill="#3FE8D0" />
      ))}
      <circle cx="112" cy="152" r="18" fill="#FF5FA0" />
      <circle cx="107" cy="146" r="2.8" fill="#0D3A56" />
      <circle cx="116" cy="145" r="2.8" fill="#0D3A56" />
      <circle cx="112" cy="153" r="2.8" fill="#0D3A56" />
      {[[52, 34], [268, 52], [214, 26], [86, 60]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 ? 4 : 6} fill="#3FE8D0" opacity="0.55" />
      ))}
    </svg>
  );
}

function Shoes() {
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#EAF6FA" />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${34 + i * 116}, ${58 + i * 18})`}>
          <path d="M0,60 L0,26 Q0,18 10,18 L38,18 L74,44 Q96,52 96,62 L96,68 L8,68 Q0,68 0,60 Z" fill="#1C7BAE" />
          <path d="M0,68 L96,68 L96,78 L0,78 Z" fill="#145C87" />
          <path d="M10,26 L34,26 L34,44 L10,44 Z" fill="#F3A824" />
          {[30, 42, 54].map((x) => (
            <rect key={x} x={x} y="30" width="3" height="14" rx="1.5" fill="#EAF6FA" />
          ))}
        </g>
      ))}
      <circle cx="272" cy="44" r="26" fill="#F9D086" />
    </svg>
  );
}

function People({ variant = 0 }: { variant?: number }) {
  const tone = variant === 0 ? ["#1C7BAE", "#F3A824", "#5FBEDD"] : ["#145C87", "#5FBEDD", "#F3A824"];
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#F6FBFC" />
      <rect x="0" y="150" width="320" height="50" fill="#CBEAF3" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${74 + i * 66}, ${64 + (i % 2) * 10})`}>
          <circle cx="0" cy="0" r="17" fill={tone[i]} />
          <path d={`M-26,86 Q-26,26 0,26 Q26,26 26,86 Z`} fill={tone[i]} opacity="0.85" />
        </g>
      ))}
      <circle cx="44" cy="46" r="24" fill="#F9D086" />
      <circle cx="266" cy="128" r="15" fill="#1C7BAE" />
      <circle cx="261" cy="123" r="2.4" fill="#FFFFFF" />
      <circle cx="270" cy="122" r="2.4" fill="#FFFFFF" />
      <circle cx="266" cy="129" r="2.4" fill="#FFFFFF" />
    </svg>
  );
}

function Food() {
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#FDECC4" />
      <ellipse cx="160" cy="146" rx="96" ry="26" fill="#FFFFFF" />
      <path d="M104,112 Q160,58 216,112 Z" fill="#F8C452" />
      <rect x="100" y="112" width="120" height="12" rx="6" fill="#9FDBEA" />
      <rect x="100" y="124" width="120" height="14" rx="7" fill="#D98A12" />
      <rect x="100" y="138" width="120" height="12" rx="6" fill="#F8C452" />
      {[130, 160, 190].map((x) => (
        <circle key={x} cx={x} cy="80" r="4" fill="#FFFFFF" opacity="0.8" />
      ))}
      <circle cx="266" cy="46" r="24" fill="#F3A824" />
    </svg>
  );
}

function Drink() {
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#1E353B" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${82 + i * 78}, ${52 + (i % 2) * 14})`}>
          <path d="M-30,0 L30,0 L4,42 L4,84 L-4,84 L-4,42 Z" fill="#5FBEDD" opacity="0.9" />
          <path d="M-22,6 L22,6 L2,36 L-2,36 Z" fill={["#F3A824", "#FF5FA0", "#3FE8D0"][i]} />
          <rect x="-16" y="84" width="32" height="5" rx="2.5" fill="#9FDBEA" />
        </g>
      ))}
      <circle cx="42" cy="40" r="20" fill="#F9D086" opacity="0.55" />
    </svg>
  );
}

function Wine() {
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#EAF6FA" />
      <rect x="0" y="152" width="320" height="48" fill="#CBEAF3" />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${108 + i * 96}, 44)`}>
          <path d="M-26,0 L26,0 Q26,42 4,52 L4,92 L-4,92 L-4,52 Q-26,42 -26,0 Z" fill="#FFFFFF" opacity="0.92" />
          <path d="M-24,14 L24,14 Q23,38 2,48 L-2,48 Q-23,38 -24,14 Z" fill={i ? "#D98A12" : "#8B2C4A"} opacity="0.75" />
          <rect x="-18" y="92" width="36" height="5" rx="2.5" fill="#9FDBEA" />
        </g>
      ))}
      {[36, 262].map((x, i) => (
        <g key={x} transform={`translate(${x}, 54)`}>
          <rect x="-13" y="16" width="26" height="82" rx="10" fill={i ? "#145C87" : "#1C7BAE"} />
          <rect x="-5" y="-6" width="10" height="26" rx="4" fill="#145C87" />
          <rect x="-13" y="46" width="26" height="24" fill="#F9D086" />
        </g>
      ))}
    </svg>
  );
}

function Party({ variant = 0 }: { variant?: number }) {
  const confetti =
    variant === 0
      ? ["#F3A824", "#FF5FA0", "#3FE8D0", "#1C7BAE", "#8B6BFF"]
      : ["#5FBEDD", "#F8C452", "#3FE8D0", "#1C7BAE", "#F3A824"];
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill="#F6FBFC" />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = (i * 61) % 310 + 6;
        const y = (i * 37) % 110 + 8;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="7"
            height="11"
            rx="2"
            fill={confetti[i % confetti.length]}
            opacity="0.85"
            transform={`rotate(${(i * 47) % 90 - 45} ${x + 3} ${y + 5})`}
          />
        );
      })}
      <rect x="104" y="130" width="112" height="50" rx="8" fill="#FDECC4" />
      <rect x="104" y="130" width="112" height="16" rx="8" fill="#FFFFFF" />
      <rect x="104" y="162" width="112" height="18" fill="#F8C452" />
      {[128, 160, 192].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="108" width="4" height="22" rx="2" fill="#5FBEDD" />
          <circle cx={x} cy="104" r="5" fill="#F3A824" />
        </g>
      ))}
      <rect x="0" y="180" width="320" height="20" fill="#CBEAF3" />
    </svg>
  );
}

function Room({ variant = 0 }: { variant?: number }) {
  const warm = variant === 0;
  return (
    <svg viewBox={V} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="200" fill={warm ? "#294853" : "#1E353B"} />
      <rect x="0" y="120" width="320" height="80" fill={warm ? "#33535B" : "#0D3A56"} />
      <rect x="0" y="112" width="320" height="12" rx="4" fill="#F3A824" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={18 + i * 50} y={54 + (i % 3) * 8} width="14" height={46 - (i % 3) * 8} rx="4"
          fill={["#5FBEDD", "#F8C452", "#9FDBEA", "#FF5FA0", "#3FE8D0", "#F3A824"][i]} opacity="0.9" />
      ))}
      <rect x="0" y="34" width="320" height="6" fill="#145C87" />
      {[54, 160, 266].map((x) => (
        <g key={x}>
          <rect x={x - 1} y="0" width="2" height="18" fill="#5FBEDD" />
          <path d={`M${x - 14},18 L${x + 14},18 L${x},34 Z`} fill="#F9D086" />
        </g>
      ))}
      {[86, 234].map((x) => (
        <rect key={x} x={x - 30} y="140" width="60" height="10" rx="5" fill="#5C7B82" />
      ))}
    </svg>
  );
}

function renderScene(kind: SceneKind, variant: number) {
  switch (kind) {
    case "lanes":
      return <Lanes variant={variant} />;
    case "glow":
      return <Glow />;
    case "shoes":
      return <Shoes />;
    case "people":
      return <People variant={variant} />;
    case "food":
      return <Food />;
    case "drink":
      return <Drink />;
    case "wine":
      return <Wine />;
    case "party":
      return <Party variant={variant} />;
    case "room":
      return <Room variant={variant} />;
  }
}

export function PhotoScene({
  slug,
  className,
}: {
  slug: PhotoSlug;
  className?: string;
}) {
  const { kind, variant = 0 } = sceneBySlug[slug];
  return <div className={cn("h-full w-full", className)}>{renderScene(kind, variant)}</div>;
}
