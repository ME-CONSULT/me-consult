import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Team Profiles | ME Consult",
  description:
    "Full profiles of the ME Consult team: Mary Ekemezie, Obianuju Ibekwe, and Rukayya Umar Danladi.",
};

const team = [
  {
    name: "Mary Ekemezie",
    role: "Founder and Lead Consultant",
    photo: "/Mary Ekemezie - .jpg",
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
    photo: "/OBIANUJU IBEKWE -.png",
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
    photo: "/Rukayya.jpg",
    bio: [
      "Rukayya Umar Danladi is a Consultant Associate at ME Consult, where she advises startups and MSMEs on a wide range of corporate and commercial law matters. Her practice focuses on regulatory compliance, corporate governance, contract structuring, and business advisory. She has significant experience drafting and reviewing commercial agreements, including Memoranda of Understanding (MOUs), founders' agreements, HR documentation, internal policies, and strategic partnership frameworks.",
      "Rukayya regularly engages with regulatory authorities such as the Corporate Affairs Commission (CAC) and the Nigerian Communications Commission (NCC), supporting clients on compliance, statutory filings, and advisory matters.",
      "She was called to the Nigerian Bar in 2022 and currently serves as Vice Chair of the Young Lawyers Forum of her branch. Rukayya is a member of the Nigerian Bar Association – Section on Business Law and is a certified Arbitrator.",
    ],
  },
];

export default function TeamOnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the Team"
        title="Team Profiles"
        description="Full profiles of the consultants behind ME Consult's corporate, commercial, and governance advisory practice."
      />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="divide-y divide-[#222753]/10">
            {team.map((member) => (
              <div
                key={member.name}
                id={member.name.split(" ")[0].toLowerCase()}
                className="scroll-mt-24 py-14 first:pt-0"
              >
                <Reveal className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    {member.photo && (
                      <div className="relative aspect-square w-24 overflow-hidden rounded-2xl sm:w-40 lg:w-full">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h2 className="mt-4 text-lg font-bold text-[#222753]">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-sm text-[#222753]/60">{member.role}</p>
                  </div>

                  <div>
                    <div className="space-y-4 text-base leading-7 text-[#222753]/80">
                      {member.bio.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {member.memberships && (
                      <div className="mt-4 text-base leading-7 text-[#222753]/80">
                        <p>Professional memberships:</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {member.memberships.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
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
