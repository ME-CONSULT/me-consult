import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | ME Consult",
  description:
    "ME Consult is a client-focused legal practice providing specialised corporate and commercial advisory services in Nigeria.",
};

const team = [
  {
    name: "Mary Ekemezie",
    role: "Founder and Lead Consultant",
    bio: [
      "Mary Ekemezie is the Founder and Lead Consultant at ME Consult, with over 18 years of experience in corporate commercial law and employment law advisory. She is a corporate and investment lawyer with extensive transactional experience and a strong understanding of the Nigerian regulatory environment.",
      "Her expertise lies in structuring, coordinating, and advising on complex mandates in mergers and acquisitions, private equity, and corporate finance, as well as corporate restructurings and regulatory compliance. She has advised on complex corporate and commercial legal matters, combining legal precision with strategic business insight.",
      "Prior to establishing ME Consult, Mary was a Managing Associate at Udo Udoma & Belo-Osagie (UUBO). During her tenure there, she played a pivotal role in market-leading transactions, including the merger of the Nigerian subsidiaries of a multinational beverage company, the first dual listing by an indigenous oil and gas company on the London Stock Exchange (LSE) and the Nigerian Exchange (NGX), and the joint venture arrangement between an indigenous oil and gas company and a leading independent commodities trading company.",
      "In addition to her corporate law expertise, Mary has a distinguished record in the area of employment law and is recognised as a National Leader by Who's Who Legal. She is a practitioner recognised for her technical expertise in employment-related issues arising from significant M&A transactions. She routinely advises national and international businesses in the financial services, professional services, healthcare, manufacturing, and FMCG sectors on Nigerian legal requirements relating to employment contracts, restraint of trade, the employment of foreign nationals, redundancies, and the restructuring of employee remuneration.",
      "Mary served on the leadership team of the African Region of the Employment Law Alliance (ELA) and is the current Chairman of the Employment and Industrial Relations Committee of the Nigerian Bar Association Section on Business Law, and a member of the Employment and Labour Lawyers Association of Nigeria (ELLAN). She has contributed to publications including the International Comparative Legal Guide (ICLG) and the World Bank's Women, Business and Law Report. She is an alumna of the Slaughter & May EXPLORE Programme (2015), the Clifford Chance Africa Academy (2014), and the 17th Euromoney Project Finance School (2013).",
    ],
  },
  {
    name: "Obianuju Ibekwe",
    role: "Of Counsel, Company Secretarial & Corporate Governance",
    bio: [
      "Obianuju Ibekwe serves as Of Counsel at ME Consult, where she leads company secretarial and corporate governance advisory services. With a career spanning the banking, commercial law, and non-profit sectors, Obianuju focuses on coordinating complex corporate compliance and navigating the regulatory landscape for a diverse portfolio of clients.",
      "Called to the Nigerian Bar in 2007, her professional background includes roles at Union Bank Plc and several leading commercial law firms. This experience allows her to develop practical solutions for intricate business transactions, including foreign direct investments, mergers, and corporate restructurings.",
      "A Corporate Governance professional, Obianuju has served as a consultant to publicly listed entities as well as fintech companies. She frequently conducts board-level Board Evaluations and governance audits to ensure organisational excellence.",
    ],
    memberships: [
      "the Nigerian Bar Association (NBA)",
      "the Institute of Chartered Secretaries and Administrators of Nigeria (ICSAN)",
      "Association of Professional Negotiators and Mediators, and",
      "Business Recovery and Insolvency Practitioners of Nigeria (BRIPAN).",
    ],
  },
  {
    name: "Rukayya Umar Danladi",
    role: "Consultant Associate",
    bio: [
      "Rukayya Umar Danladi is a Consultant Associate at ME Consult, where she advises startups and MSMEs on a wide range of corporate and commercial law matters. Her practice focuses on regulatory compliance, corporate governance, contract structuring, and business advisory. She has significant experience drafting and reviewing commercial agreements, including Memoranda of Understanding (MOUs), founders' agreements, HR documentation, internal policies, and strategic partnership frameworks.",
      "Rukayya regularly engages with regulatory authorities such as the Corporate Affairs Commission (CAC) and the Nigerian Communications Commission (NCC), supporting clients on compliance, statutory filings, and advisory matters.",
      "She was called to the Nigerian Bar in 2022 and currently serves as Vice Chair of the Young Lawyers Forum of her branch. Rukayya is a member of the Nigerian Bar Association – Section on Business Law and is a certified Arbitrator.",
    ],
  },
];

const whyChooseUs = [
  {
    title: "Agile Structure",
    body: "Our streamlined, non-traditional structure allows us to provide practical, solution-oriented legal support. By moving away from the bureaucratic overhead of traditional models, we consistently deliver high-quality legal services and offer a transparent, flexible billing system designed for today's technologically driven businesses.",
  },
  {
    title: "Culture-Driven",
    body: "ME Consult is a firm built on professional empathy and collaboration. We recognise that our people are our most significant asset, and we prioritise an internal culture that fosters dedication and excellence. This ethos translates directly into the quality of service we provide to our clients.",
  },
  {
    title: "Client-Centric Partnership",
    body: "We are focused on preserving and growing long-term relationships through personalised service and consistent engagement. Our goal is to manage the legal complexities of business operations, allowing our clients to remain focused on their core objectives: building sustainable enterprises and increasing commercial impact.",
  },
  {
    title: "Strategic Expertise",
    body: "With a team of lawyers whose experience spans diverse sectors, the firm is well-positioned to provide nuanced legal services to corporate entities at every level. In collaboration with our strategic partners, we provide the technical expertise required to assist in the expansion of your business. Our ethical approach ensures that every client receives counsel tailored to their specific commercial context.",
  },
];

const whatDrivesUs = [
  {
    title: "Responsiveness",
    body: "We prioritise speed and precision. Our lean structure allows us to provide high-quality legal counsel that keeps pace with the rapid decision-making cycles of our clients.",
  },
  {
    title: "Integrity",
    body: "We believe in ethical partnership. Our advice is grounded in transparency and a commitment to the long-term success of our clients, their stakeholders, and the wider legal profession.",
  },
  {
    title: "Commercial Value",
    body: "We move beyond abstract legal theory to provide adaptive, commercially focused advice. We offer flexible, competitive fee structures that reflect the scope of work and services provided.",
  },
  {
    title: "Strategic Agility",
    body: "Rather than adhering to rigid, traditional models, we leverage our firm's structure to provide solution-oriented advisory services. We are proactive in our approach, helping clients anticipate risks before they manifest.",
  },
  {
    title: "Impact",
    body: "We thrive when our clients thrive. We support the business community and the development of innovative enterprises, contributing to sustainable economic development.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A client-focused legal practice for modern business"
        description="ME Consult provides specialised corporate and commercial advisory services, combining technical legal knowledge with commercial insight to advise entities ranging from emerging startups to multinational conglomerates."
      />

      {/* Who We Are */}
      <section id="who-we-are" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Who We Are
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            The Firm
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-7 text-[#222753]/80">
            <p>
              ME Consult is a client-focused legal practice providing
              specialised corporate and commercial advisory services. The
              firm and its strategic partners possess the technical
              knowledge and depth of experience required to advise entities
              ranging from emerging startups to multinational conglomerates
              on the legal frameworks and documentation necessary for
              operating in Nigeria.
            </p>
            <p>
              Established in 2021 by Mary Ekemezie, ME Consult was founded
              with a clear mandate: to provide accessible, commercially
              integrated legal counsel. Since its inception, the firm has
              become a dedicated partner for businesses across multiple
              sectors, offering specialised legal services in mergers and
              acquisitions, employment law, regulatory compliance, and
              intellectual property. We operate on the principles of
              integrity and responsiveness, grounded in the conviction that
              the most effective legal advice is not only technically
              accurate but also practical and aligned with the client's
              commercial objectives.
            </p>
          </div>

          <h3 className="mt-12 text-2xl font-bold tracking-tight text-[#222753]">
            Our Founder
          </h3>
          <div className="mt-4 max-w-3xl space-y-5 text-base leading-7 text-[#222753]/80">
            <p>
              Our Founder and Lead Counsel, Mary Ekemezie, is a corporate
              and investment lawyer with over 18 years of experience in
              corporate and commercial law. Throughout her career, including
              her tenure at a leading Nigerian law firm, she has advised on
              complex legal issues and provided nuanced, client-focused
              counsel to individuals, institutional investors, and corporate
              boards. Her expertise is particularly recognised for its
              intersection of legal precision and strategic business
              insight.
            </p>
          </div>

          <h3 className="mt-12 text-2xl font-bold tracking-tight text-[#222753]">
            Our Focus
          </h3>
          <div className="mt-4 max-w-3xl space-y-5 text-base leading-7 text-[#222753]/80">
            <p>
              To support the long-term sustainability of our clients'
              operations, ME Consult provides strategic advisory and
              training on corporate governance, human resources management,
              and human capital development. By sharing industry best
              practices and providing tailored recommendations, we ensure
              our clients are equipped to manage internal risks while
              maintaining a competitive advantage in their respective
              markets.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-[#222753]/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Meet the Team
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            The People Behind ME Consult
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#222753] text-lg font-semibold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <p className="mt-5 text-lg font-semibold text-[#222753]">
                  {member.name}
                </p>
                <p className="mt-1 text-sm text-[#222753]/60">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 space-y-16">
            {team.map((member) => (
              <div key={member.name} id={member.name.split(" ")[0].toLowerCase()}>
                <h3 className="text-xl font-bold text-[#222753]">
                  {member.name} &ndash; {member.role}
                </h3>
                <div className="mt-4 max-w-3xl space-y-4 text-base leading-7 text-[#222753]/80">
                  {member.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {member.memberships && (
                  <div className="mt-4 max-w-3xl text-base leading-7 text-[#222753]/80">
                    <p>Professional memberships:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {member.memberships.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Why Choose Us
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            We understand the requirements of scaling a business in Nigeria
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#222753]/80">
            We have structured our practice around the principles of
            accessibility, scalability, and flexibility, ensuring that our
            clients receive sophisticated counsel at a cost that aligns with
            their specific growth phase.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#222753]/10 p-8"
              >
                <h3 className="text-lg font-semibold text-[#222753]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#222753]/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section id="what-drives-us" className="scroll-mt-24 bg-[#222753] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
            What Drives Us
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            A modern, partner-led legal practice
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/80">
            We are driven by a commitment to agility, integrity, and
            commercial awareness. We equip startups, MSMEs, and established
            corporate entities with the legal architecture required to
            navigate complexities and achieve sustainable growth.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatDrivesUs.map((item) => (
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
            <div className="rounded-2xl border border-[#222753]/10 p-8">
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
            <div className="rounded-2xl border border-[#222753]/10 p-8">
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
