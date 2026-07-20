import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Affiliated Platform | ME Consult",
  description:
    "ME Academy is an independent knowledge-sharing and professional development platform focused on legal education and entrepreneurial capacity building.",
};

export default function AffiliatedPlatformPage() {
  return (
    <>
      <PageHero eyebrow="Affiliated Platform" title="ME Academy" />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
            <div className="shrink-0">
              <Image
                src="/Blue logo@3x.png"
                alt="ME Academy logo"
                width={220}
                height={220}
                className="mx-auto"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Professional Excellence and Strategic Resources
              </p>
              <div className="mt-4 space-y-5 text-base leading-7 text-[#222753]/80">
                <p>
                  ME Academy is an independent knowledge-sharing and
                  professional development platform focused on legal
                  education and entrepreneurial capacity building.
                </p>
                <p>
                  It operates separately from ME Consult, a legal practice
                  providing corporate, commercial, and employment advisory
                  services in Nigeria. While both platforms share a
                  commitment to strengthening the legal and business
                  ecosystem, they maintain distinct mandates, governance
                  structures, and operations.
                </p>
                <p>
                  ME Academy delivers specialised training for legal
                  practitioners, including continuing professional
                  development courses, as well as an SME Hub providing
                  structured resources for startups and growth-stage
                  businesses.
                </p>
              </div>

              <a
                href="https://www.me-academy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ffda00] hover:text-[#222753]"
              >
                Explore the Platform: www.me-academy.org
              </a>

              <p className="mt-10 text-xs leading-5 text-[#222753]/50">
                Disclaimer: ME Academy is an independent educational
                platform. It does not provide legal advice or legal
                representation. ME Consult is not responsible for any
                content, services, or engagements accessed through the ME
                Academy platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
