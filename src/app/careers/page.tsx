import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Careers | ME Consult",
  description:
    "Build your career at the intersection of law and strategy with ME Consult.",
};

const experience = [
  {
    title: "High-Stakes Exposure",
    body: "Gain direct involvement in complex advisory matters and corporate restructuring.",
  },
  {
    title: "Technical Development",
    body: "Develop understanding of CAMA 2020, the NDPA, and cross-border regulatory compliance.",
  },
  {
    title: "Professional Mentorship",
    body: "Collaborate directly with a team led by a Lead Consultant with extensive cross-sector expertise.",
  },
  {
    title: "Holistic Growth",
    body: "Work in an environment that supports professional development, collaboration, and long-term career growth.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career at the Intersection of Law and Strategy"
      />

      <section id="mission" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            The ME Consult Mission
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#222753]/80">
            We are committed to developing the next generation of
            corporate-commercial legal professionals. We provide an
            environment where intellectual curiosity meets practical
            application, offering young professionals the opportunity to
            develop their expertise within a modern legal practice.
          </p>
        </div>
      </section>

      <section id="who-we-seek" className="scroll-mt-24 bg-[#222753]/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Who We Seek
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5">
              <h3 className="text-lg font-semibold text-[#222753]">
                Legal Professionals
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#222753]/70">
                Recent call-to-bar graduates and young lawyers with a passion
                for corporate governance and M&amp;A.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5">
              <h3 className="text-lg font-semibold text-[#222753]">
                Strategists
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#222753]/70">
                Individuals who possess a meticulous eye for detail and a
                commitment to excellence in advisory work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 bg-[#222753] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
            The ME Consult Experience
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {experience.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <h3 className="text-lg font-semibold text-[#ffda00]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#222753]">
            How to Apply
          </h2>
          <p className="mt-4 text-base leading-7 text-[#222753]/80">
            To apply or express your interest, please send your CV and a
            short cover letter to:
          </p>
          <a
            href="mailto:contactus@me-consult.org"
            className="mt-4 inline-block text-lg font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
          >
            contactus@me-consult.org
          </a>
        </div>
      </section>
    </>
  );
}
