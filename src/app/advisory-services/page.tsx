import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Advisory Services | ME Consult",
  description:
    "ME Consult offers a comprehensive range of legal and advisory services to clients across Nigeria, from board evaluation to startup advisory.",
};

const services = [
  {
    number: "01",
    id: "board-evaluation",
    title: "Board Evaluation",
    body: "Effective boards are the cornerstone of strong organisations. ME Consult supports companies in conducting structured and objective board evaluations to assess the performance, composition, and effectiveness of their boards of directors. Our process is thorough, confidential, and tailored to the specific governance context of each client. We provide boards with clear, actionable feedback and recommendations to strengthen board dynamics, sharpen strategic oversight, and ensure fulfilment of their fiduciary responsibilities. Our team's experience advising boards across multiple sectors gives us a practical perspective on governance in practice.",
  },
  {
    number: "02",
    id: "corporate-governance-and-compliance",
    title: "Corporate Governance and Compliance",
    body: "At the heart of our practice is a commitment to helping the businesses we advise build and sustain a robust culture of corporate governance and compliance. We recognise that clearly defined standards of conduct and decision-making processes play a critical role in fostering ethical business practices, advancing a company's objectives, and maintaining relationships among stakeholders. Our team brings experience working with executive and management teams to establish governance frameworks, designing and implementing appropriate charters and guidelines, conducting governance reviews, and advising on the training and education required for directors to fulfil their responsibilities. We serve as a governance partner for companies at every stage of growth.",
  },
  {
    number: "03",
    id: "employment-and-hr-advisory",
    title: "Employment and HR Advisory",
    body: "ME Consult offers clients a full range of labour and employment law-related services. We assist our clients by providing practical solutions on all aspects of employment-related matters, including employment contracts, the employment of foreign nationals, termination of employment contracts, redundancies, and restructuring of employee remuneration, including employee share and incentive plans. We also advise on employee issues arising from mergers and acquisitions. Our Lead Consultant is an employment law specialist ranked as a National Leader for labour and employment practice in Nigeria by Who's Who Legal, a distinction that positions ME Consult to provide strategic counsel on contentious, investigatory, or sensitive employment matters.",
  },
  {
    number: "04",
    id: "intellectual-property-protection",
    title: "Intellectual Property Protection",
    body: "ME Consult advises clients on the full spectrum of intellectual property protection and branding rights, offering practical, business-focused solutions. Our services in this area include the registration of trademarks; advising on franchising, licensing, and marketing arrangements; registration of agreements at the National Office for Technology Acquisition and Promotion (NOTAP); and advising on the commercialisation of intellectual property rights. Whether you are a founder protecting a new brand or an established business managing a portfolio of IP assets, we provide guidance to safeguard and maximise the value of your intellectual property.",
  },
  {
    number: "05",
    id: "legal-and-regulatory-compliance-audits",
    title: "Legal & Regulatory Compliance Audits",
    body: "Regulatory compliance is foundational to building a business with lasting goodwill and profitability. At ME Consult, we combine legal knowledge with a commercial approach to help clients understand and meet their compliance obligations. Our services include compliance reviews and legal audits to identify and mitigate exposure to regulatory risk; the design and development of regulatory reporting frameworks; and advising on strategies for maintaining corporate standards and controls. We work with clients proactively to build compliance cultures that are sustainable, not merely reactive.",
  },
  {
    number: "06",
    id: "mergers-and-acquisitions",
    title: "Mergers & Acquisitions",
    body: "Our team brings over 35 years of combined experience in advising corporate conglomerates, investors, and shareholders on the structuring and execution of complex M&A transactions in Nigeria. We guide clients through every phase of a mandate, from initial deal structuring and due diligence to documentation, regulatory filings, and post-completion integration. The firm's expertise is anchored by the professional track record of our Founder. Prior to establishing ME Consult, she practised within a leading, top-tier Nigerian law firm, where she played a pivotal role in some of the market's most sophisticated transactions.",
    highlights: [
      {
        title: "The AB InBev Subsidiary Merger",
        body: "Our Founder advised on the complex multi-entity merger of the Nigerian subsidiaries of AB InBev (International Breweries Plc, Intafact Beverages Limited, and Pabod Breweries Limited). This landmark transaction involved intricate court-sanctioned schemes of merger, the consolidation of manufacturing assets across multiple jurisdictions in Nigeria, and the post-merger integration of diverse corporate structures on the Nigerian Exchange (NGX).",
      },
      {
        title: "LSE-NGX Dual Listing",
        body: "She was a key member of the team that advised on the first-ever dual listing of an indigenous oil and gas company on the London Stock Exchange and the Nigerian Exchange, navigating the harmonisation of dual-jurisdictional regulatory requirements and cross-border listing rules.",
      },
    ],
    closing:
      "This background in handling high-stakes, multi-jurisdictional mandates ensures that ME Consult provides the technical precision and strategic foresight required for today's corporate transactions.",
  },
  {
    number: "07",
    id: "private-equity",
    title: "Private Equity",
    body: "We provide specialised legal support for private equity investments, focusing on the critical execution phase of a transaction. Our expertise is concentrated on advising PE funds and institutional investors on their entry into, and exit from, Nigerian investee companies. We structure investment documentation, negotiate shareholder agreements, and design robust governance frameworks tailored to the specific risk profile of the target company. By combining sector-specific regulatory knowledge across financial services, FMCG, technology, and logistics, with a deep understanding of PE commercial objectives, we ensure that the legal architecture of every deal is built to protect value and facilitate a successful exit.",
  },
  {
    number: "08",
    id: "private-wealth-advisory",
    title: "Private Wealth Advisory",
    body: "Preserving and transferring wealth built in Nigeria demands structured governance, deliberate succession design, and a long-term perspective on what endures. Our Private Wealth Advisory practice serves high-net-worth individuals, families, and family-owned businesses seeking structured approaches to managing and transferring wealth. We provide legal and strategic advisory on:",
    highlights: [
      {
        title: "Estate Planning & Wealth Transfer",
        body: "Advising on structures intended to facilitate intergenerational transfers.",
      },
      {
        title: "Business Succession & Continuity",
        body: "Advising on succession planning and continuity arrangements.",
      },
      {
        title: "Trust & Family Governance",
        body: "Advising on governance frameworks for family and trust structures.",
      },
      {
        title: "Real Estate & Property Planning",
        body: "Advising on legal aspects of Nigerian land and property matters.",
      },
      {
        title: "Sustainability Integration",
        body: "Advising on incorporating environmental and social considerations into wealth structures.",
      },
    ],
    closing:
      "Our work is grounded in our understanding of Nigerian law and the practical realities of managing multi-generational wealth in a dynamic market; however, outcomes depend on the specific facts and applicable law.",
  },
  {
    number: "09",
    id: "regulatory-and-general-corporate-advisory",
    title: "Regulatory & Corporate Advisory",
    body: "ME Consult provides comprehensive regulatory and corporate advisory services to businesses at every stage of growth. Our work includes advising on company formation and corporate structuring, foreign investment and regulatory approvals, sector-specific licensing and compliance, corporate restructurings, and ongoing governance advisory. We maintain working relationships with key regulatory agencies, including the Corporate Affairs Commission (CAC), and the Nigerian Communications Commission (NCC), guiding clients through regulatory processes efficiently.",
  },
  {
    number: "10",
    id: "startup-advisory-services",
    title: "Startup Advisory Services",
    body: "At ME Consult, we are committed to supporting startups and MSMEs in building businesses that are legally sound, compliant with applicable laws and regulations, and structured for sustainable growth. We work with founders and management teams from ideation through to set-up, consolidation, scaling, and growth phases. Our work includes assisting founders in protecting their intellectual property; advising on appropriate business structure and corporate governance strategies; standardising contract documentation; advising on employee remuneration and retention strategies; and preparing organisations for financing rounds.",
  },
];

export default function AdvisoryServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Advisory Services"
        title="A comprehensive range of legal and advisory services"
        description="ME Consult offers a comprehensive range of legal and advisory services to clients across Nigeria. Our legal and advisory services are listed alphabetically below."
      />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="divide-y divide-[#222753]/10">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 py-12 first:pt-0"
              >
                <Reveal className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <span className="text-3xl font-bold text-[#ffda00]">
                    {service.number}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold tracking-tight text-[#222753]">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[#222753]/80">
                      {service.body}
                    </p>

                    {service.highlights && (
                      <ul className="mt-6 space-y-4">
                        {service.highlights.map((h) => (
                          <li
                            key={h.title}
                            className="hover-glow rounded-2xl bg-[#222753]/[0.03] p-5 ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                          >
                            <p className="text-sm font-semibold text-[#222753]">
                              {h.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#222753]/70">
                              {h.body}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {service.closing && (
                      <p className="mt-6 text-base leading-7 text-[#222753]/80">
                        {service.closing}
                      </p>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
