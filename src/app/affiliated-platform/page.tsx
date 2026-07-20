import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Affiliated Platform | ME Consult",
  description:
    "ME Academy is an independent knowledge-sharing and professional development platform focused on legal education and entrepreneurial capacity building.",
};

export default function AffiliatedPlatformPage() {
  return (
    <>
      {/* ME Academy intro */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div className="flex justify-center rounded-2xl bg-white/5 p-10">
                <Image
                  src="/White logo.png"
                  alt="ME Academy"
                  width={220}
                  height={220}
                  className="h-auto w-full max-w-[200px]"
                />
              </div>

              <div>
                <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
                  Affiliated Platform
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ME Academy
                </h1>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/50">
                  Professional Excellence and Strategic Resources
                </p>
                <div className="mt-4 space-y-4 text-base leading-7 text-white/70">
                  <p>
                    ME Academy is an independent knowledge-sharing and
                    professional development platform focused on legal
                    education and entrepreneurial capacity building.
                  </p>
                  <p>
                    It operates separately from ME Consult, a legal
                    practice providing corporate, commercial, and
                    employment advisory services in Nigeria. While both
                    platforms share a commitment to strengthening the
                    legal and business ecosystem, they maintain distinct
                    mandates, governance structures, and operations.
                  </p>
                </div>

                <a
                  href="https://www.me-academy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffda00] px-6 py-3 text-sm font-semibold text-[#222753] transition-colors hover:bg-white"
                >
                  Explore the Platform: www.me-academy.org
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What ME Academy Offers */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
              What ME Academy Offers
            </h2>

            <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Continuing Professional Development",
                  body: "Specialised training for legal practitioners, including continuing professional development courses.",
                  icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.02 12.02 0 0112 21.5a12.02 12.02 0 01-6.16-10.92L12 14zm-9 0v6",
                },
                {
                  title: "SME Hub",
                  body: "Structured resources for startups and growth-stage businesses.",
                  icon: "M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
                },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    i === 0
                      ? "bg-[#222753] text-white"
                      : "bg-white text-[#222753] shadow-sm ring-1 ring-[#222753]/5"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      i === 0 ? "bg-white/10" : "bg-[#222753]/5"
                    }`}
                  >
                    <svg
                      className={`h-5 w-5 ${i === 0 ? "text-[#ffda00]" : "text-[#222753]"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={card.icon} />
                    </svg>
                  </span>
                  <p className="mt-5 text-base font-semibold">{card.title}</p>
                  <p className={`mt-2 text-sm leading-6 ${i === 0 ? "text-white/70" : "text-[#222753]/60"}`}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-[#222753]/50">
              Disclaimer: ME Academy is an independent educational platform.
              It does not provide legal advice or legal representation. ME
              Consult is not responsible for any content, services, or
              engagements accessed through the ME Academy platform.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
