import Link from "next/link";

type IconName = "scale" | "document" | "briefcase" | "building" | "users" | "globe";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    scale:
      "M12 3v18M5 7l-3 6a3 3 0 006 0l-3-6zm14 0l-3 6a3 3 0 006 0l-3-6zM5 7h14M9 21h6",
    document:
      "M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5",
    briefcase:
      "M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8zM8 8V6a2 2 0 012-2h4a2 2 0 012 2v2",
    building: "M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
    users:
      "M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M9.5 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    globe:
      "M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18",
  };
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={paths[name]} />
    </svg>
  );
}

const advisoryServices: { label: string; href: string; icon: IconName }[] = [
  { label: "Board Evaluation", href: "/advisory-services#board-evaluation", icon: "users" },
  { label: "Corporate Governance and Compliance", href: "/advisory-services#corporate-governance-and-compliance", icon: "scale" },
  { label: "Employment and HR Advisory", href: "/advisory-services#employment-and-hr-advisory", icon: "briefcase" },
  { label: "Mergers & Acquisitions", href: "/advisory-services#mergers-and-acquisitions", icon: "building" },
  { label: "Private Equity", href: "/advisory-services#private-equity", icon: "globe" },
  { label: "Startup Advisory Services", href: "/advisory-services#startup-advisory-services", icon: "document" },
];

const company: { label: string; href: string; icon: IconName }[] = [
  { label: "Careers", href: "/careers", icon: "briefcase" },
  { label: "Affiliated Platform", href: "/affiliated-platform", icon: "globe" },
  { label: "About Us", href: "/about", icon: "users" },
  { label: "Insights", href: "/insights", icon: "document" },
];

const sectors = [
  "Fintech & Financial Services",
  "Technology & Startups",
  "Fast-Moving Consumer Goods (FMCG)",
  "Manufacturing",
  "Agriculture",
];

export default function MegaMenu() {
  return (
    <div className="grid grid-cols-[1fr_1fr_1.1fr_0.9fr] divide-x divide-[#222753]/10">
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#222753]/50">
          Advisory Services
        </p>
        <div className="mt-4 space-y-3">
          {advisoryServices.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-start gap-3 rounded-lg p-1.5 transition-colors hover:bg-[#222753]/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#222753]/5 text-[#222753]">
                <Icon name={item.icon} />
              </span>
              <span className="pt-1.5 text-sm font-medium leading-tight text-[#222753]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/advisory-services"
          className="mt-4 inline-block text-xs font-semibold text-[#222753]/70 hover:text-[#222753]"
        >
          View all services &rarr;
        </Link>
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#222753]/50">
          Company
        </p>
        <div className="mt-4 space-y-3">
          {company.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-start gap-3 rounded-lg p-1.5 transition-colors hover:bg-[#222753]/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#222753]/5 text-[#222753]">
                <Icon name={item.icon} />
              </span>
              <span className="pt-1.5 text-sm font-medium leading-tight text-[#222753]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-6">
        <Link
          href="/sectors"
          className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-[#222753] p-5 text-white transition-opacity hover:opacity-95"
        >
          <div className="h-24 w-full rounded-lg bg-[radial-gradient(circle_at_70%_20%,_#3a4283_0%,_#171b3d_100%)]" />
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#ffda00]">
              Sector-Led Advisory
            </p>
            <p className="mt-2 text-lg font-bold leading-snug">
              Explore the industries we serve
            </p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
              View all sectors
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#222753]/50">
          Sectors
        </p>
        <div className="mt-4 space-y-2.5">
          {sectors.map((sector) => (
            <Link
              key={sector}
              href="/sectors"
              className="block text-sm text-[#222753]/80 hover:text-[#222753]"
            >
              {sector}
            </Link>
          ))}
        </div>
        <Link
          href="/contact#online-consultation"
          className="mt-5 inline-block text-xs font-semibold text-[#222753]/70 hover:text-[#222753]"
        >
          Contact Us &rarr;
        </Link>
      </div>
    </div>
  );
}
