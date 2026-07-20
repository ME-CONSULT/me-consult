type IconName =
  | "leaf"
  | "factory"
  | "bag"
  | "cash"
  | "coffee"
  | "truck"
  | "box"
  | "briefcase"
  | "shield"
  | "rocket"
  | "globe";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    leaf: "M5 21c8 0 13-5 13-13V5h-3C7 5 5 12 5 21zM5 21c0-4 2-7 5-9",
    factory: "M3 21V10l6 4v-4l6 4V6l6 4v11H3z",
    bag: "M6 7h12l1 14H5L6 7zM9 7a3 3 0 016 0",
    cash: "M3 6h18v12H3V6zm9 3a3 3 0 100 6 3 3 0 000-6zM6 9v.01M18 15v.01",
    coffee: "M4 8h13a3 3 0 010 6h-1M4 8v7a4 4 0 004 4h4a4 4 0 004-4v-1M4 8V5h10v3",
    truck: "M3 7h10v9H3V7zm10 3h4l3 3v3h-7v-6zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    box: "M3 8l9-5 9 5-9 5-9-5zm0 0v9l9 5m0-14v14m9-14v9l-9 5",
    briefcase: "M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8zM8 8V6a2 2 0 012-2h4a2 2 0 012 2v2",
    shield: "M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z",
    rocket: "M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10zM9 15l-3 3 1 3 3-1M15 15l3 3-1 3-3-1",
    globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18",
  };
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={paths[name]} />
    </svg>
  );
}

const sectors: { label: string; icon: IconName }[] = [
  { label: "Agriculture", icon: "leaf" },
  { label: "Agro-Allied Industry", icon: "factory" },
  { label: "Fast-Moving Consumer Goods (FMCG)", icon: "bag" },
  { label: "Fintech & Financial Services", icon: "cash" },
  { label: "Food and Beverage Technology", icon: "coffee" },
  { label: "Food Delivery & Logistics", icon: "truck" },
  { label: "Logistics & Logistics Technology", icon: "box" },
  { label: "Manufacturing", icon: "factory" },
  { label: "Professional Services", icon: "briefcase" },
  { label: "Regulatory Technology", icon: "shield" },
  { label: "Technology & Startups", icon: "rocket" },
];

const tones = [
  "bg-white text-[#222753]",
  "bg-white/10 text-white",
  "bg-[#3a4283] text-white",
];

// Fixed shuffle (not Math.random) so the pattern looks randomized without
// causing a server/client hydration mismatch.
const toneOrder = [2, 0, 1, 2, 1, 0, 2, 1, 0, 2, 1];

export default function SectorsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {sectors.map((sector, i) => (
        <div
          key={sector.label}
          className={`flex h-52 flex-col justify-between rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl ${tones[toneOrder[i % toneOrder.length]]}`}
        >
          <Icon name={sector.icon} />
          <div>
            <p className="text-xs opacity-60">{String(i + 1).padStart(2, "0")}.</p>
            <p className="mt-1 text-sm font-semibold leading-snug">{sector.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
