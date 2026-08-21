import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    title: "The Business Law Series",
    body: "Join us for another edition of the ME Consult Business Law Series as we unpack what investors really look for before committing capital. Learn why governance, compliance and investment readiness are just as important as a great business idea.",
    cta: {
      label: "Register Now",
      href: "https://zfrmz.com/r97wm79XnC5OFZ4mcsxg",
    },
  },
  {
    title: "Missed a Previous Business Law Series?",
    body: "Catch up on valuable insights from our previous Business Law Series sessions. Download past editions, presentation materials and resources from previous editions of ME Consult's Business Law Series, where leading legal and industry professionals share practical insights on the issues shaping startups, SMEs and growing businesses.",
    list: [
      "Tax Housekeeping for Businesses and Not-for-Profit Organisations",
      "Bring Your Own Device and Remote Work: Key Considerations for Employers and Businesses",
      "Key Considerations for Building a Small but Effective Corporate Governance Structure",
    ],
    cta: {
      label: "Browse Previous Editions",
      href: "https://drive.google.com/drive/folders/1ribLhhgK9ujOBYj17AkDHPOaTLeGn249?usp=drive_link",
    },
  },
  {
    title: "Speaking Engagement: Preparing Students for Global Success",
    body: "Our Founder & Lead Consultant, Mary Ekemezie, will be speaking at the Pre-Departure Session of Multi-Plan Pathway College on Tuesday, 28th July 2026 at 12:30pm. In her speech, she will share practical guidance for students preparing to study abroad. The session will cover adapting to a new environment, managing expectations, academic and professional success, and practical strategies for a smooth transition. If you would like to meet, you can catch up with her in Lekki.",
    link: {
      text: "Multi-Plan Pathway College",
      href: "https://share.google/dpgT2ohiqu4oAk4zt",
    },
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
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
                  Insights
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Informed governance is the foundation of corporate resilience
                </h1>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/70">
                  Our Insights section provides a repository of legal
                  analysis and strategic perspectives on the intersection
                  of law, commerce, and innovation in Nigeria. Designed for
                  founders, institutional investors, and corporate boards,
                  these resources offer clarity on the evolving regulatory
                  landscape.
                </p>
              </Reveal>

              <Reveal delay={150} className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
                <Image
                  src="/insights-hero.jpeg"
                  alt="ME Consult legal analysis and publications"
                  fill
                  className="object-cover"
                />
              </Reveal>
            </div>
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
                    className="hover-glow group flex items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
              className="hover-glow mt-8 inline-flex items-center gap-2 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ffda00] hover:text-[#222753]"
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
                <Reveal key={item.title} delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffda00]/40 hover:bg-[#ffda00]/10">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {item.link
                        ? item.body.split(item.link.text).map((part, idx, arr) => (
                            <span key={idx}>
                              {part}
                              {idx < arr.length - 1 && (
                                <a
                                  href={item.link!.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-[#ffda00] underline-offset-2 hover:text-white"
                                >
                                  {item.link!.text}
                                </a>
                              )}
                            </span>
                          ))
                        : item.body}
                    </p>
                    {item.list && (
                      <ul className="mt-4 space-y-2">
                        {item.list.map((entry) => (
                          <li key={entry} className="flex gap-2 text-sm leading-6 text-white/70">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ffda00]" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.cta && (
                      <a
                        href={item.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-glow mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#ffda00] px-5 py-2.5 text-sm font-semibold text-[#222753] transition-colors hover:bg-white"
                      >
                        {item.cta.label} &rarr;
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="scroll-mt-24 bg-white pt-16 pb-10 lg:pt-24 lg:pb-14">
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
                  <div className="hover-glow flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
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
              For specific legal advice, please{" "}
              <Link href="/contact" className="underline hover:text-[#222753]">
                Contact Us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
