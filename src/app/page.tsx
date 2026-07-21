import Link from "next/link";
import Image from "next/image";
import Testimonials from "@/components/Testimonials";
import FeatureCards from "@/components/FeatureCards";
import WhyChooseUsAccordion from "@/components/WhyChooseUsAccordion";
import SectorsGrid from "@/components/SectorsGrid";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
          <div className="relative isolate h-[85vh] max-h-[800px] min-h-[520px] overflow-hidden rounded-3xl">
            <Image
              src="/hero 2.jpeg"
              alt="ME Consult advisory team"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#222753]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171b3d]/90 via-[#222753]/40 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16">
              <Reveal>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Comprehensive Legal and Governance Risk Management.
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/80">
                  We help businesses navigate the complexities of the Nigerian
                  regulatory environment through specialised advisory,
                  confident governance, and practical execution.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#222753] transition-colors hover:bg-white/90"
                  >
                    Learn More
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={360} className="absolute bottom-8 right-8 hidden sm:block">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                <div className="flex -space-x-3">
                  {["ME", "OI", "RU"].map((initials) => (
                    <span
                      key={initials}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#222753] bg-[#ffda00] text-xs font-semibold text-[#222753]"
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-2xl font-bold text-white">40+ Years</p>
                <p className="text-sm text-white/70">
                  Combined legal &amp; governance expertise.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
                  <Image
                    src="/why-choose-us.jpeg"
                    alt="ME Consult advisory team"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-[#222753] sm:text-4xl">
                  Why Choose Us
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#222753]/70">
                  We understand the specific requirements and challenges of
                  establishing and scaling businesses in Nigeria. We have
                  structured our practice around the principles of
                  accessibility, scalability, and flexibility, ensuring that
                  our clients receive sophisticated counsel at a cost that
                  aligns with their specific growth phase.
                </p>
              </Reveal>

              <Reveal delay={150} className="flex flex-col justify-center">
                <WhyChooseUsAccordion />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ME Consult for Startups & MSMEs */}
      <section className="py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 px-8 sm:px-12 lg:grid-cols-[1fr_1fr] lg:items-end lg:px-16">
            <Reveal>
              <span className="inline-block rounded-full bg-[#222753]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Startups &amp; MSMEs
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                ME Consult for Startups &amp; MSMEs
              </h2>
            </Reveal>
            <Reveal delay={150} className="ml-auto max-w-lg">
              <p className="text-base leading-7 text-[#222753]/70">
                ME Consult is a client-focused legal practice providing
                specialised corporate and commercial advisory services.
              </p>
              <Link
                href="/advisory-services#startup-advisory-services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#222753]"
              >
                Explore Startup Advisory Services
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12">
            <FeatureCards
              cards={[
                {
                  title: "Impact and Responsibility",
                  body: "Our responsibility extends beyond providing legal solutions. We are committed to the advancement of the legal profession and the development of the communities in which we operate, rooted in integrity, professional excellence, and responsible impact.",
                  icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
                },
                {
                  title: "Graduate Internship Programme",
                  body: "A structured internship programme giving law students and early-career legal professionals practical exposure to corporate and commercial practice, working alongside our team on active transactions and advisory mandates.",
                  icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.02 12.02 0 0112 21.5a12.02 12.02 0 01-6.16-10.92L12 14zm-9 0v6",
                },
                {
                  title: "Pro Bono Advisory",
                  body: "We actively support pro bono initiatives, providing legal assistance to individuals and non-profit organisations that lack the resources to secure legal representation, contributing to equitable access to justice.",
                  icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Sectors
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-7 text-white/70">
                Our team has advised clients operating across a broad range
                of industries, giving us a well-rounded understanding of the
                legal and regulatory environments that businesses face. The
                sectors we serve include:
              </p>
            </Reveal>

            <div className="mt-10">
              <SectorsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <Reveal className="flex flex-col">
                <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-2xl">
                  <Image
                    src="/hero 1.png"
                    alt="ME Consult advisory team"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="mt-10 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  What Drives Us
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                  As a modern, partner-led legal practice, we are driven by a
                  commitment to agility, integrity, and commercial
                  awareness. We equip startups, MSMEs, and established
                  corporate entities with the legal architecture required to
                  navigate complexities and achieve sustainable growth.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                  {[
                    {
                      number: "01",
                      title: "Responsiveness",
                      body: "We prioritise speed and precision. Our lean structure allows us to provide high-quality legal counsel that keeps pace with the rapid decision-making cycles of our clients.",
                    },
                    {
                      number: "02",
                      title: "Integrity",
                      body: "We believe in ethical partnership. Our advice is grounded in transparency and a commitment to the long-term success of our clients, their stakeholders, and the wider legal profession.",
                    },
                    {
                      number: "03",
                      title: "Commercial Value",
                      body: "We move beyond abstract legal theory to provide adaptive, commercially focused advice. We offer flexible, competitive fee structures that reflect the scope of work and services provided.",
                    },
                    {
                      number: "04",
                      title: "Strategic Agility",
                      body: "Rather than adhering to rigid, traditional models, we leverage our firm’s structure to provide solution-oriented advisory services. We are proactive in our approach, helping clients anticipate risks before they manifest.",
                    },
                    {
                      number: "05",
                      title: "Impact",
                      body: "We thrive when our clients thrive. We support the business community and the development of innovative enterprises, contributing to sustainable economic development.",
                    },
                  ].map((item) => (
                    <div key={item.number}>
                      <p className="text-xs font-semibold text-white/40">{item.number}</p>
                      <p className="mt-2 text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/60">{item.body}</p>
                    </div>
                  ))}
                </div>

                <div className="relative mt-10 h-56 overflow-hidden rounded-2xl">
                  <Image
                    src="/hero 3.jpeg"
                    alt="ME Consult team collaborating"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-[#222753]">Meet </span>
                <span className="text-[#c9a600]">the Team.</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  first: "Mary",
                  last: "Ekemezie",
                  role: "Founder and Lead Consultant",
                  initials: "ME",
                  bio: "Mary is the Founder and Lead Consultant at ME Consult, with over 18 years of experience in corporate commercial law and employment law advisory.",
                  href: "/team-onboarding#mary",
                  photo: "/Mary Ekemezie - .jpg",
                },
                {
                  first: "Obianuju",
                  last: "Ibekwe",
                  role: "Of Counsel, Company Secretarial & Corporate Governance",
                  initials: "OI",
                  bio: "Obianuju serves as Of Counsel at ME Consult, where she leads company secretarial and corporate governance advisory services.",
                  href: "/team-onboarding#obianuju",
                  photo: "/OBIANUJU IBEKWE -.png",
                },
                {
                  first: "Rukayya",
                  last: "Umar Danladi",
                  role: "Consultant Associate",
                  initials: "RU",
                  bio: "Rukayya is a Consultant Associate at ME Consult, where she advises startups and MSMEs on a wide range of corporate and commercial law matters.",
                  href: "/team-onboarding#rukayya",
                  photo: "/Rukayya.jpg",
                },
              ].map((member) => (
                <Link
                  key={member.first}
                  href={member.href}
                  className="hover-glow group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#222753]/5 transition-shadow hover:shadow-lg"
                >
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#222753]/5">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`${member.first} ${member.last}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#222753] text-2xl font-bold text-[#ffda00]">
                        {member.initials}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide text-[#222753]/50">
                      {member.role}
                    </p>
                    <p className="mt-2 text-xl font-bold">
                      <span className="text-[#222753]">{member.first} </span>
                      <span className="text-[#c9a600]">{member.last}</span>
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#222753]/60">{member.bio}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4">
                      Read Full Profile
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA banner */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl bg-[#ffda00] p-8 text-center sm:p-12 lg:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
              ME Consult: Legal Advisory for Modern Business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#222753]/80">
              Our team provides the technical legal expertise required to
              navigate the Nigerian business environment and support
              clients&rsquo; commercial objectives.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact#online-consultation"
                className="hover-glow rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90"
              >
                Contact Us
              </Link>
              <a
                href="tel:+2347026839242"
                className="text-sm font-semibold text-[#222753]"
              >
                +(234) 702-6839-242
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
