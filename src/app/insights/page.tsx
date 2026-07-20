import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Insights | ME Consult",
  description:
    "Legal analysis and strategic perspectives on the intersection of law, commerce, and innovation in Nigeria.",
};

const publications = [
  {
    title: "BYOD and Remote Work: Legal Insights for Nigerian Employers",
    authors:
      "Mary Ekemezie (Lead Consultant), Rukayya Umar (Consultant Associate), and Marvellous Oluwatobi Success (Research Volunteer)",
    href: "https://medium.com/@me_consult/byod-and-remote-work-legal-insights-for-nigerian-employers-13aecfeab05b",
  },
  {
    title: "Removing or Replacing a Director: Legal and Strategic Considerations",
    authors: "Mary Ekemezie (Lead Consultant) and Karimat Abdulazeez (Graduate Intern)",
    href: "https://medium.com/@me_consult/understand-the-legal-steps-risks-and-governance-strategies-for-removing-or-replacing-a-director-354c2dd56b6e",
  },
  {
    title: "Board Governance in Practice: Building Effective Boards",
    authors: "Mary Ekemezie (Lead Consultant) and Karimat Abdulazeez (Graduate Intern)",
    href: "https://medium.com/@me_consult/board-governance-in-practice-building-effective-boards-9318313b6b21",
  },
];

const newsAndEvents = [
  {
    title: "Speaking Engagement: Corporate Governance & Startup Growth in Nigeria",
    body: "Mary Ekemezie (Founder, ME Consult) spoke on corporate governance frameworks for scaling businesses in Nigeria.",
  },
  {
    title: "Webinar: Navigating Employment Law in Remote Work Environments",
    body: "A ME Consult virtual session exploring legal considerations for distributed teams and modern workplaces.",
  },
  {
    title: "Legal Clinic: SME Compliance and Regulatory Readiness",
    body: "An interactive session supporting early-stage businesses with practical compliance guidance.",
  },
];

const resources = [
  {
    title: "Startup Compliance Checklist (Nigeria)",
    body: "A roadmap for early-stage ventures navigating CAC, FIRS, and sector-specific filings.",
  },
  {
    title: "Board Evaluation Framework: Self-Assessment Guide",
    body: "A tool for assessing board composition and effectiveness.",
  },
  {
    title: "Employment Contract Essentials (MSMEs)",
    body: "A guide to statutory requirements for labour engagement in Nigeria.",
  },
];

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
                Insights
              </span>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Informed governance is the foundation of corporate resilience
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Our Insights section provides a repository of legal analysis
                and strategic perspectives on the intersection of law,
                commerce, and innovation in Nigeria. Designed for founders,
                institutional investors, and corporate boards, these
                resources offer clarity on the evolving regulatory
                landscape.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Publications
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                Analysis of corporate, commercial, and employment law
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-[#222753]/80">
                These articles are developed through collaborative research
                led by our legal team, with contributions from graduate
                interns and research volunteers.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {publications.map((pub, i) => (
                <Reveal key={pub.href} delay={i * 100}>
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-[#222753]">
                        {pub.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#222753]/60">By {pub.authors}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#222753]/5 text-[#222753] transition-all duration-300 group-hover:bg-[#ffda00] group-hover:translate-x-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <a
              href="https://medium.com/@me_consult"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
            >
              Read more on Medium &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* News and Events */}
      <section id="news-and-events" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
                News and Events
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Firm updates, speaking engagements, and knowledge-sharing
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-white/70">
                This section highlights speaking engagements and conference
                appearances by the Founder, firm-led webinars, training
                sessions and roundtables, public legal education
                initiatives and community engagements, and announcements
                and event highlights.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {newsAndEvents.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl bg-[#ffda00] p-8 text-center sm:p-12 lg:p-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
              Newsletter
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
              Stay informed with insights, updates, and analysis
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#222753]/80">
              Our newsletter is published every two months and provides
              curated updates on legal developments, firm insights,
              publications, and key sector trends relevant to businesses
              operating in Nigeria.
            </p>
            <NewsletterForm className="mx-auto mt-8 max-w-md" />
          </Reveal>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section id="downloadable-resources" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Downloadable Resources
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                Tools and guides for compliance and operations
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, i) => (
                <Reveal key={resource.title} delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                    <div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#222753]/5 text-[#222753]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                        </svg>
                      </span>
                      <h3 className="mt-5 text-base font-semibold text-[#222753]">
                        {resource.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#222753]/70">
                        {resource.body}
                      </p>
                    </div>
                    <span className="mt-6 text-sm font-semibold text-[#222753]/40">
                      Coming soon
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-10 max-w-3xl text-xs leading-5 text-[#222753]/50">
              Notice: These resources are provided for informational
              purposes only and do not constitute legal advice. Use of
              these materials does not create a lawyer-client relationship.
              For specific legal advice, please Contact Us.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
