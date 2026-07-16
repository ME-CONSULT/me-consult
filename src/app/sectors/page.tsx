import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sectors | ME Consult",
  description:
    "ME Consult has advised clients across a broad range of industries in Nigeria, from agriculture and FMCG to fintech and technology.",
};

const sectors = [
  "Agriculture",
  "Agro-Allied Industry",
  "Fast-Moving Consumer Goods (FMCG)",
  "Fintech & Financial Services",
  "Food and Beverage Technology",
  "Food Delivery & Logistics",
  "Logistics & Logistics Technology",
  "Manufacturing",
  "Professional Services",
  "Regulatory Technology",
  "Technology & Startups",
];

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Industry expertise across Nigeria's growth sectors"
        description="Our team has advised clients operating across a broad range of industries, giving us a well-rounded understanding of the legal and regulatory environments that businesses face."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="flex items-center gap-4 rounded-xl border border-[#222753]/10 p-6"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ffda00]" />
                <span className="text-base font-medium text-[#222753]">
                  {sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
