import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectorsGrid from "@/components/SectorsGrid";

export const metadata: Metadata = {
  title: "Sectors | ME Consult",
  description:
    "ME Consult has advised clients across a broad range of industries in Nigeria, from agriculture and FMCG to fintech and technology.",
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Industry expertise across Nigeria's growth sectors"
        description="Our team has advised clients operating across a broad range of industries, giving us a well-rounded understanding of the legal and regulatory environments that businesses face."
      />

      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <SectorsGrid />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
