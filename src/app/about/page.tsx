import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FeatureCards from "@/components/FeatureCards";

export const metadata: Metadata = {
  title: "About Us | ME Consult",
  description:
    "ME Consult is a client-focused legal practice providing specialised corporate and commercial advisory services in Nigeria.",
};

const team = [
  {
    name: "Mary Ekemezie",
    role: "Founder and Lead Consultant",
    photo: "/Mary Ekemezie - .jpg",
  },
  {
    name: "Obianuju Ibekwe",
    role: "Of Counsel, Company Secretarial & Corporate Governance",
    photo: "/OBIANUJU IBEKWE -.png",
  },
  {
    name: "Rukayya Umar Danladi",
    role: "Consultant Associate",
    photo: "/Rukayya.jpg",
  },
];

const whyChooseUs = [
  "Agile Structure",
  "Culture-Driven",
  "Client-Centric Partnership",
  "Strategic Expertise",
];

export default function AboutPage() {
  return (
    <>
      {/* About Our Firm */}
      <section id="who-we-are" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-block rounded-full bg-[#222753]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                  About Us
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                  About Our Firm
                </h1>
                <p className="mt-4 max-w-lg text-base leading-7 text-[#222753]/70">
                  ME Consult is a client-focused legal practice providing
                  specialised corporate and commercial advisory services. The
                  firm and its strategic partners possess the technical
                  knowledge and depth of experience required to advise
                  entities ranging from emerging startups to multinational
                  conglomerates on the legal frameworks and documentation
                  necessary for operating in Nigeria.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact#online-consultation"
                    className="hover-glow rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90"
                  >
                    Book a Consultation
                  </Link>
                  <a
                    href="#meet-the-team"
                    className="hover-glow rounded-full border border-[#222753]/20 px-6 py-3 text-sm font-semibold text-[#222753] transition-colors hover:bg-[#222753]/5"
                  >
                    Meet the Team
                  </a>
                </div>
              </div>

              <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
                <Image
                  src="/why-choose-us.jpeg"
                  alt="ME Consult advisory team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-[#222753]/10 pt-10">
              <div>
                <p className="text-3xl font-bold text-[#222753] sm:text-4xl">2021</p>
                <p className="mt-1 text-sm text-[#222753]/60">Founded</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#222753] sm:text-4xl">40+</p>
                <p className="mt-1 text-sm text-[#222753]/60">
                  Years of Combined Experience
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#222753] sm:text-4xl">10</p>
                <p className="mt-1 text-sm text-[#222753]/60">Advisory Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Founder */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative order-2 h-72 overflow-hidden rounded-2xl sm:h-96 lg:order-1">
                <Image
                  src="/Mary Ekemezie - .jpg"
                  alt="Mary Ekemezie, Founder and Lead Consultant"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-block rounded-full bg-[#222753]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                  About Us
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                  Our Founder
                </h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-[#222753]/70">
                  Our Founder and Lead Counsel, Mary Ekemezie, is a corporate
                  and investment lawyer with over 18 years of experience in
                  corporate and commercial law. Throughout her career,
                  including her tenure at a leading Nigerian law firm, she
                  has advised on complex legal issues and provided nuanced,
                  client-focused counsel to individuals, institutional
                  investors, and corporate boards.
                </p>
                <p className="mt-4 max-w-lg text-base leading-7 text-[#222753]/70">
                  To support the long-term sustainability of our clients&rsquo;
                  operations, ME Consult provides strategic advisory and
                  training on corporate governance, human resources
                  management, and human capital development.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                  {whyChooseUs.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#ffda00]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="9" strokeWidth={1.75} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-sm font-medium text-[#222753]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section id="what-drives-us" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <span className="inline-block rounded-full bg-[#222753]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
              What Drives Us
            </span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
              A modern, partner-led legal practice
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#222753]/70">
              We are driven by a commitment to agility, integrity, and
              commercial awareness. We equip startups, MSMEs, and established
              corporate entities with the legal architecture required to
              navigate complexities and achieve sustainable growth.
            </p>

            <div className="mt-10">
              <FeatureCards
                cards={[
                  {
                    title: "Responsiveness",
                    body: "We prioritise speed and precision. Our lean structure allows us to provide high-quality legal counsel that keeps pace with the rapid decision-making cycles of our clients.",
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                  {
                    title: "Integrity",
                    body: "We believe in ethical partnership. Our advice is grounded in transparency and a commitment to the long-term success of our clients, their stakeholders, and the wider legal profession.",
                    icon: "M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z",
                  },
                  {
                    title: "Commercial Value",
                    body: "We move beyond abstract legal theory to provide adaptive, commercially focused advice. We offer flexible, competitive fee structures that reflect the scope of work and services provided.",
                    icon: "M3 6h18v12H3V6zm9 3a3 3 0 100 6 3 3 0 000-6zM6 9v.01M18 15v.01",
                  },
                  {
                    title: "Strategic Agility",
                    body: "Rather than adhering to rigid, traditional models, we leverage our firm's structure to provide solution-oriented advisory services. We are proactive in our approach, helping clients anticipate risks before they manifest.",
                    icon: "M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10zM9 15l-3 3 1 3 3-1M15 15l3 3-1 3-3-1",
                  },
                  {
                    title: "Impact",
                    body: "We thrive when our clients thrive. We support the business community and the development of innovative enterprises, contributing to sustainable economic development.",
                    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section id="meet-the-team" className="scroll-mt-24 bg-[#222753]/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Meet the Team
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            The People Behind ME Consult
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Link
                key={member.name}
                href={`/team-onboarding#${member.name.split(" ")[0].toLowerCase()}`}
                className="hover-glow group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5 transition-shadow hover:shadow-lg"
              >
                {member.photo ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image src={member.photo} alt={member.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#222753] text-lg font-semibold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <p className="mt-5 text-lg font-semibold text-[#222753]">
                  {member.name}
                </p>
                <p className="mt-1 text-sm text-[#222753]/60">{member.role}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4">
                  Read Full Profile
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact and Responsibility */}
      <section id="impact-and-responsibility" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Impact and Responsibility
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            A responsibility that extends beyond legal solutions
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#222753]/80">
            We are committed to the advancement of the legal profession and
            the development of the communities in which we operate. Our
            initiatives are rooted in our core values of integrity,
            professional excellence, and responsible impact.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="hover-glow rounded-2xl border border-[#222753]/10 p-8">
              <h3 className="text-lg font-semibold text-[#222753]">
                Graduate Internship Programme
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#222753]/70">
                ME Consult operates a structured internship programme
                designed to provide law students and early-career legal
                professionals with practical exposure to corporate and
                commercial practice. Participants work alongside our team on
                active transactions and advisory mandates, gaining the
                technical skills and commercial insights necessary to
                complement their academic legal education. We are dedicated
                to mentoring the next generation of legal practitioners
                through hands-on experience and professional guidance.
              </p>
            </div>
            <div className="hover-glow rounded-2xl border border-[#222753]/10 p-8">
              <h3 className="text-lg font-semibold text-[#222753]">
                Pro Bono Advisory
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#222753]/70">
                We believe that access to high-quality legal counsel is a
                vital component of a functioning society. ME Consult
                actively supports pro bono initiatives, providing legal
                assistance to individuals and non-profit organisations that
                lack the resources to secure legal representation or advice.
                By dedicating our time and expertise to community-focused
                legal work, we contribute to the broader goal of ensuring
                equitable access to justice and legal support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
