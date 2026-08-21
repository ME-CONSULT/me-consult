import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Careers | ME Consult",
  description:
    "Build your career at the intersection of law and strategy with ME Consult.",
};

const whoWeSeek = [
  {
    title: "Legal Professionals",
    body: "Recent call-to-bar graduates and young lawyers with a passion for corporate governance and M&A.",
  },
  {
    title: "Strategists",
    body: "Individuals who possess a meticulous eye for detail and a commitment to excellence in advisory work.",
  },
];

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

      {/* Mission + Who We Seek */}
      <section id="mission" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                The ME Consult Mission
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                Developing the next generation of legal professionals
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-[#222753]/80">
                We are committed to developing the next generation of
                corporate-commercial legal professionals. We provide an
                environment where intellectual curiosity meets practical
                application, offering young professionals the opportunity to
                develop their expertise within a modern legal practice.
              </p>
            </Reveal>

            <div id="who-we-seek" className="scroll-mt-24 mt-12">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                  Who We Seek
                </p>
              </Reveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {whoWeSeek.map((item, i) => (
                  <Reveal key={item.title} delay={i * 100} className="h-full">
                    <div className="hover-glow h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                      <h3 className="text-lg font-semibold text-[#222753]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#222753]/70">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The ME Consult Experience */}
      <section id="experience" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
                The ME Consult Experience
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What you can expect on the team
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {experience.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="hover-glow h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffda00]/40 hover:bg-[#ffda00]/10">
                    <h3 className="text-lg font-semibold text-[#ffda00]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section id="how-to-apply" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl bg-[#ffda00] p-8 text-center sm:p-12 lg:p-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
              How to Apply
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
              To apply or express your interest
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#222753]/80">
              Please send your CV and a short cover letter to the email
              address below.
            </p>
            <a
              href="mailto:contactus@me-consult.org"
              className="hover-glow mt-8 inline-flex items-center gap-2 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#222753]"
            >
              contactus@me-consult.org
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
