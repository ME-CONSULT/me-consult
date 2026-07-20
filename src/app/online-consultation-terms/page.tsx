import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Online Consultation Terms & Conditions | ME Consult",
  description:
    "The Terms and Conditions governing ME Consult's online legal consultation services.",
};

const feeRows = [
  {
    duration: "30 minutes",
    fee: "₦25,000",
    lawyer: "Consultant Associate",
    timeslots: "10:00 AM - 10:30 AM, 2:00 PM - 2:30 PM",
  },
  {
    duration: "30 minutes",
    fee: "₦100,000",
    lawyer: "Lead Consultant",
    timeslots: "10:00 AM - 10:30 AM, 2:00 PM - 2:30 PM",
  },
  {
    duration: "30 minutes",
    fee: "₦100,000",
    lawyer: "Of Counsel",
    timeslots: "10:00 AM - 10:30 AM, 2:00 PM - 2:30 PM",
  },
  {
    duration: "60 minutes",
    fee: "₦50,000",
    lawyer: "Consultant Associate",
    timeslots: "10:00 AM - 11:00 AM, 2:00 PM - 3:00 PM",
  },
  {
    duration: "60 minutes",
    fee: "₦200,000",
    lawyer: "Lead Consultant",
    timeslots: "10:00 AM - 11:00 AM, 2:00 PM - 3:00 PM",
  },
  {
    duration: "60 minutes",
    fee: "₦200,000",
    lawyer: "Of Counsel",
    timeslots: "10:00 AM - 11:00 AM, 2:00 PM - 3:00 PM",
  },
  {
    duration: "90 minutes",
    fee: "₦75,000",
    lawyer: "Consultant Associate",
    timeslots: "11:00 AM - 12:30 PM, 3:00 PM - 4:30 PM",
  },
  {
    duration: "90 minutes",
    fee: "₦300,000",
    lawyer: "Lead Consultant",
    timeslots: "11:00 AM - 12:30 PM, 3:00 PM - 4:30 PM",
  },
  {
    duration: "90 minutes",
    fee: "₦300,000",
    lawyer: "Of Counsel",
    timeslots: "10:00 AM - 11:00 AM, 2:00 PM - 3:00 PM",
  },
  {
    duration: "120 minutes",
    fee: "₦100,000",
    lawyer: "Consultant Associate",
    timeslots: "9:00 AM - 11:00 AM, 12:00 PM - 2:00 PM",
  },
  {
    duration: "120 minutes",
    fee: "₦400,000",
    lawyer: "Lead Consultant",
    timeslots: "9:00 AM - 11:00 AM, 12:00 PM - 2:00 PM",
  },
  {
    duration: "120 minutes",
    fee: "₦400,000",
    lawyer: "Of Counsel",
    timeslots: "10:00 AM - 11:00 AM, 2:00 PM - 3:00 PM",
  },
];

export default function OnlineConsultationTermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Online Consultation Terms & Conditions"
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-12 text-base leading-7 text-[#222753]/80">
            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                1. Introduction and Definitions
              </h2>
              <p className="mt-3">
                1.1 These Terms and Conditions (&ldquo;Terms&rdquo;) govern
                the provision of online legal consultation services
                (&ldquo;Services&rdquo;) by ME Consult (&ldquo;ME
                Consult&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;).
              </p>
              <p className="mt-3">
                1.2 In these Terms, unless the context otherwise requires:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  &ldquo;Client&rdquo; or &ldquo;you&rdquo; means any person
                  who accesses or uses the Services;
                </li>
                <li>
                  &ldquo;Consultation&rdquo; means any scheduled legal
                  consultation conducted via the Platform;
                </li>
                <li>
                  &ldquo;Platform&rdquo; means any website, application, or
                  third-party system through which the Services are
                  delivered;
                </li>
                <li>
                  &ldquo;Services&rdquo; means the online legal consultation
                  services provided by ME Consult.
                </li>
              </ul>
              <p className="mt-3">
                1.3 By booking or participating in a Consultation, you agree
                to be bound by these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                2. Nature and Scope of Services
              </h2>
              <p className="mt-3">
                2.1 The booking of, or participation in, any consultation
                shall not, of itself, give rise to a continuing
                solicitor-client relationship between the Client and ME
                Consult.
              </p>
              <p className="mt-3">
                2.2 A formal and ongoing solicitor-client relationship shall
                arise only where expressly agreed in writing by ME Consult
                following the consultation, and subject to the execution of
                a separate engagement letter or retainer agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                3. Capacity and Eligibility
              </h2>
              <p className="mt-3">
                3.1 By accessing or using our Service, the Client represents
                and warrants that they are at least eighteen (18) years of
                age and possess the requisite legal capacity to enter into a
                binding contract.
              </p>
              <p className="mt-3">
                3.2 ME Consult reserves the right to refuse or terminate
                access to the Services where it reasonably believes that a
                person does not meet these requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                4. Booking, Fees, and Payments
              </h2>
              <p className="mt-3">
                4.1 All consultations must be pre-booked through our
                official website or designated communication channels.
              </p>
              <p className="mt-3">
                4.2 Consultation fees are exclusive of Value Added Tax
                (VAT), which will be applied at the prevailing rate
                (currently 7.5%) at checkout, in compliance with Nigerian
                tax law.
              </p>
              <p className="mt-3">
                4.3 Booking is confirmed only upon full payment of the
                consultation fee. ME Consult reserves the right to refuse
                service where payment has not been confirmed or has been
                reversed.
              </p>

              <h3 className="mt-6 font-semibold text-[#222753]">
                4.4 Consultation Fee Structure
              </h3>
              <div className="mt-4 overflow-x-auto rounded-2xl ring-1 ring-[#222753]/10">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#222753] text-white">
                      <th className="px-4 py-3 font-semibold">Duration</th>
                      <th className="px-4 py-3 font-semibold">
                        Consultation Fee Rate (&#8358;, Excl. VAT)
                      </th>
                      <th className="px-4 py-3 font-semibold">Lawyer</th>
                      <th className="px-4 py-3 font-semibold">
                        Timeslot Examples
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeRows.map((row, i) => (
                      <tr
                        key={`${row.duration}-${row.lawyer}-${i}`}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#222753]/[0.03]"}
                      >
                        <td className="px-4 py-3 align-top text-[#222753]">
                          {row.duration}
                        </td>
                        <td className="px-4 py-3 align-top text-[#222753]">
                          {row.fee}
                        </td>
                        <td className="px-4 py-3 align-top text-[#222753]">
                          {row.lawyer}
                        </td>
                        <td className="px-4 py-3 align-top text-[#222753]/80">
                          {row.timeslots}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-6">
                This fee structure aligns with the lawyer category and band
                as prescribed under Scale 1 of the Legal Practitioners
                Remuneration Order, 2023.
              </p>

              <h3 className="mt-6 font-semibold text-[#222753]">
                4.5 Selection of a Lawyer
              </h3>
              <p className="mt-1 text-sm leading-6">
                Clients may select from available counsel based on
                experience and availability during the booking process.
                Preferences indicated will be accommodated subject to
                availability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                5. Client Responsibilities
              </h2>
              <p className="mt-3">5.1 Clients are expected to, and shall:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  ensure all information provided during the relevant
                  session is accurate, authentic, up-to-date and lawfully
                  obtained;
                </li>
                <li>
                  attend sessions promptly. Sessions will begin and end at
                  the scheduled times, regardless of the client&rsquo;s
                  arrival time;
                </li>
                <li>use a secure device and network for virtual consultations;</li>
                <li>treat all ME Consult&rsquo;s personnel respectfully;</li>
                <li>comply with all applicable laws and regulations.</li>
              </ul>
              <p className="mt-3">
                5.2 ME Consult shall not be responsible for any consequences
                arising from the Client&rsquo;s failure to comply with this
                clause.
              </p>
              <p className="mt-3">
                Note: Clients who are more than 10 (ten) minutes late may
                forfeit their session without refund or reschedule rights.
                For further details, see the section on Cancellations and
                Refund Policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                6. Confidentiality and Disclosure
              </h2>
              <p className="mt-3">
                6.1 ME Consult undertakes not to disclose any information
                shared during the consultation without the Client&rsquo;s
                prior written consent, except where disclosure is required
                by law, the courts, governmental agencies, and/or
                regulatory authorities. Clients are advised to refrain from
                sharing sensitive information via unsecured networks. ME
                Consult will not be held liable for data breaches caused by
                the client&rsquo;s use of insecure communication channels.
              </p>
              <p className="mt-3">
                6.2 It is our policy to take your initial instructions to us
                in any matter as your authority for us to disclose that you
                are a client of the firm, and that we have acted for you on
                any matter where information about that matter is in the
                public domain. Where a matter is not in the public domain,
                we will only disclose that you are a client of the firm if
                you consent to such disclosure. By retaining and using our
                Services, you acknowledge and agree that you have given your
                consent to ME Consult&rsquo;s disclosure that you are a
                client of the firm, for matters in the public domain.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                7. Data Protection and Privacy
              </h2>
              <p className="mt-3">
                ME Consult complies with the Nigeria Data Protection Act
                2023 and the Nigeria Data Protection Regulation (NDPR) 2019.
                By using our Services, you consent to the collection,
                processing, storage, and transfer of your data strictly for
                the purpose of the delivery of the Services.
              </p>
              <p className="mt-3">Your rights include:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Accessing, correcting, or requesting the deletion of your data.</li>
                <li>Objecting to processing in specific cases.</li>
                <li>Lodging complaints with the Nigeria Data Protection Commission.</li>
              </ul>
              <p className="mt-3">
                All data is securely stored, and not shared with third
                parties without lawful basis or your explicit consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                8. Technology and Platform Disclaimer
              </h2>
              <p className="mt-3">
                8.1 ME Consult shall not be liable for any delay,
                interruption, or failure in the provision of the Services
                arising from circumstances beyond its reasonable control,
                including but not limited to:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>internet connectivity issues;</li>
                <li>hardware or software failures;</li>
                <li>
                  outages or disruptions of third-party platforms or
                  service providers; or
                </li>
                <li>any other technological limitations or failures.</li>
              </ul>
              <p className="mt-3">
                8.2 The Client acknowledges that the service is delivered
                over the internet and may be subject to inherent
                limitations and risks associated with digital
                communications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                9. Intellectual Property and Use of Consultation Materials
              </h2>
              <p className="mt-3">
                9.1 Unless expressly agreed otherwise in writing, all
                content provided by ME Consult in connection with the
                Services, including but not limited to documents, reports,
                templates, training materials, presentation slides, written
                or oral advice, legal opinions, and any related or
                supporting materials (collectively, the &ldquo;Consultation
                Materials&rdquo;), shall remain the sole and exclusive
                intellectual property of ME Consult.
              </p>
              <p className="mt-3">
                9.2 ME Consult grants the Client a limited, non-exclusive,
                non-transferable, revocable licence to use the Consultation
                Materials strictly and solely for the client&rsquo;s
                personal or organisational legal use. This licence does not
                permit the client to copy, reproduce, adapt, modify,
                publish, distribute, sub-license, sell, exploit
                commercially, or create derivative works based on the
                Consultation Materials, in whole or in part, without the
                prior written consent of ME Consult.
              </p>
              <p className="mt-3">
                9.3 Any unauthorised use, disclosure, or distribution of the
                Consultation Materials, whether for commercial gain or
                otherwise, is strictly prohibited and may result in legal
                action.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">10. Indemnity</h2>
              <p className="mt-3">
                10.1 The Client agrees to indemnify, defend, and hold
                harmless ME Consult, its partners, employees, agents, and
                representatives from and against any and all claims,
                demands, liabilities, damages, losses, costs, and expenses
                (including, without limitation, reasonable legal fees)
                arising out of or in connection with:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>any breach by the Client of these Terms;</li>
                <li>any misuse or improper use of the Services by the Client; or</li>
                <li>
                  any information or materials provided by the Client that
                  are inaccurate, misleading, or unlawful.
                </li>
              </ul>
              <p className="mt-3">
                10.2 This indemnity shall survive the termination or expiry
                of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                11. Limitation of Liability
              </h2>
              <p className="mt-3">
                11.1 Nothing in these Terms shall exclude or limit ME
                Consult&rsquo;s liability for:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>(a) death or personal injury resulting from its negligence;</li>
                <li>(b) fraud or fraudulent misrepresentation; or</li>
                <li>
                  (c) any liability which cannot lawfully be excluded or
                  limited under applicable Nigerian law or the Rules of
                  Professional Conduct for Legal Practitioners.
                </li>
              </ul>
              <p className="mt-3">
                11.2 Subject to Clause 11.1, ME Consult shall not be liable
                to the Client, whether in contract, tort (including
                negligence), breach of statutory duty, or otherwise, for
                any:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  (a) indirect, incidental, special, punitive, or
                  consequential loss or damage;
                </li>
                <li>
                  (b) loss of profits, revenue, business, contracts, data,
                  anticipated savings, or opportunity;
                </li>
                <li>(c) loss of goodwill or damage to reputation; or</li>
                <li>(d) any losses arising from third-party claims.</li>
              </ul>
              <p className="mt-3">
                11.3 Without prejudice to the generality of Clause 11.2, ME
                Consult shall have no liability whatsoever for any loss or
                damage arising out of or in connection with:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  (a) reliance on any advice, opinion, or information
                  provided during a consultation where no formal
                  solicitor-client relationship has been established;
                </li>
                <li>
                  (b) the limited, preliminary, or time-constrained nature
                  of the Services;
                </li>
                <li>
                  (c) any act or omission taken by the Client based on such
                  consultation;
                </li>
                <li>
                  (d) any inaccuracies, omissions, or misrepresentations in
                  the information supplied by the Client; or
                </li>
                <li>
                  (e) any failure by the Client to obtain further legal
                  advice or clarification.
                </li>
              </ul>
              <p className="mt-3">
                11.4 To the fullest extent permitted by applicable law, and
                notwithstanding any other provision of these Terms, ME
                Consult&rsquo;s total aggregate liability to the Client for
                all claims arising out of or in connection with the
                Services shall be strictly limited to the lesser of:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  (a) the fees actually paid by the Client for the specific
                  consultation giving rise to the claim; or
                </li>
                <li>(b) the sum of &#8358;100,000 (One Hundred Thousand Naira).</li>
              </ul>
              <p className="mt-3">
                11.5 Where no fee has been paid by the Client for the
                relevant consultation (including promotional or
                complimentary consultations), ME Consult shall have no
                liability whatsoever to the Client.
              </p>
              <p className="mt-3">
                11.6 The Client agrees that ME Consult shall not be liable
                for any loss or damage arising from:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  (a) any delay, interruption, or failure in the provision
                  of the Services caused by events beyond its reasonable
                  control, including those described in the Force Majeure
                  clause;
                </li>
                <li>
                  (b) any failure or disruption of internet services,
                  electronic communications, or third-party platforms; or
                </li>
                <li>
                  (c) any unauthorised access to or alteration of
                  transmissions or data not attributable to ME
                  Consult&rsquo;s wilful default.
                </li>
              </ul>
              <p className="mt-3">
                11.7 Any claim arising out of or in connection with the
                Services must be notified to ME Consult in writing within
                thirty (30) days of the Client becoming aware (or reasonably
                ought to have become aware) of the circumstances giving rise
                to the claim, and in any event commenced within six (6)
                months of such date, failing which such claim shall be
                deemed irrevocably waived, to the fullest extent permitted
                by law.
              </p>
              <p className="mt-3">
                11.8 The Client acknowledges and agrees that:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>(a) the Services are provided on a strictly limited and preliminary basis;</li>
                <li>(b) the fees charged reflect the allocation of risk under these Terms; and</li>
                <li>
                  (c) the Client has had the opportunity to obtain
                  independent legal advice before accepting these Terms.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                12. Conflict of Interest
              </h2>
              <p className="mt-3">
                12.1 ME Consult is bound by the professional obligations
                imposed under the Rules of Professional Conduct for Legal
                Practitioners in Nigeria, including the duty to avoid
                conflicts of interest.
              </p>
              <p className="mt-3">
                12.2 Prior to accepting any engagement beyond an initial
                consultation, ME Consult shall conduct a conflict-of-interest
                check based on the information provided by the Client.
              </p>
              <p className="mt-3">
                12.3 The Client acknowledges and agrees that:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  (a) ME Consult may be unable to act where a conflict of
                  interest exists or may arise;
                </li>
                <li>
                  (b) the provision of incomplete or inaccurate information
                  by the Client may affect the outcome of such conflict
                  checks; and
                </li>
                <li>
                  (c) ME Consult reserves the right to decline or cease
                  acting for the Client where required to do so in
                  compliance with professional obligations.
                </li>
              </ul>
              <p className="mt-3">
                12.4 Where a conflict of interest is identified, ME Consult
                shall not be obliged to disclose confidential information
                relating to any existing or former client.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                13. Scope of Advice and No Guarantee of Outcome
              </h2>
              <p className="mt-3">
                13.1 Any advice provided during the consultation is based
                solely on the information made available by the Client at
                the time and is intended for general guidance purposes
                only.
              </p>
              <p className="mt-3">13.2 The Client acknowledges that:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  (a) legal advice provided during a preliminary
                  consultation may be limited in scope and may not
                  constitute a full review of all relevant facts or
                  documents;
                </li>
                <li>
                  (b) further investigation or formal engagement may be
                  required before definitive legal advice can be given; and
                </li>
                <li>
                  (c) legal outcomes are inherently uncertain and dependent
                  on various factors beyond ME Consult&rsquo;s control.
                </li>
              </ul>
              <p className="mt-3">
                13.3 ME Consult makes no representation, warranty, or
                guarantee as to the outcome of any matter discussed during
                the consultation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                14. No Reliance / Limited Legal Advice Disclaimer
              </h2>
              <p className="mt-3">
                14.1 The Client agrees that any information or guidance
                provided through the Services, in the absence of a formal
                solicitor-client relationship, shall not be relied upon as a
                substitute for comprehensive legal advice obtained under a
                formal retainer.
              </p>
              <p className="mt-3">
                14.2 To the fullest extent permitted by applicable law, ME
                Consult disclaims liability for any loss arising from
                reliance on advice provided during a preliminary
                consultation where no formal engagement has been
                established.
              </p>
              <p className="mt-3">
                14.3 Nothing in this clause shall operate to exclude
                liability for fraud, wilful misconduct, or any liability
                which cannot be excluded under Nigerian law or the Rules of
                Professional Conduct.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                15. Termination of Agreement
              </h2>
              <p className="mt-3">
                15.1 ME Consult may terminate this agreement with immediate
                effect if:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>You breach any of these Terms.</li>
                <li>You are involved in fraud, corruption, or illegal activity.</li>
                <li>You engage in abuse, harassment, or misconduct towards our personnel.</li>
                <li>You violate any confidentiality, privacy, or Intellectual Property-related obligations.</li>
              </ul>
              <p className="mt-3">
                15.2 Clients may terminate this agreement by providing
                written notice prior to the consultation session. No
                refunds shall apply to sessions already held or late
                cancellations. See the section on Cancellations and Refund
                Policy for further details.
              </p>
              <p className="mt-3">
                15.3 Upon termination, ME Consult shall have no further
                obligations to the client, and any claims or expectations
                for future services shall be deemed null and void, unless
                expressly agreed in writing prior to termination.
              </p>
              <p className="mt-3">
                15.4 Following termination, the client may request a new
                consultation session by making a new booking through our
                official website or designated communication channels,
                subject to acceptance and availability at ME Consult&rsquo;s
                sole discretion. For further details, please see the
                section on Booking and Fees.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                16. Data Retention and Post-Termination Processing
              </h2>
              <p className="mt-3">
                16.1 Upon termination or expiry of this agreement, ME
                Consult shall retain the Client&rsquo;s personal data only
                for such period as is necessary to comply with its legal,
                regulatory, and professional obligations, including
                (without limitation) applicable record-keeping requirements
                under Nigerian law.
              </p>
              <p className="mt-3">
                16.2 Subject to such obligations, ME Consult shall securely
                delete or anonymise the Client&rsquo;s personal data within
                six (6) years from the date of termination of the Services,
                in accordance with the Nigeria Data Protection Act 2023 and
                the Nigeria Data Protection Regulation (NDPR) 2019.
              </p>
              <p className="mt-3">
                16.3 The Client may, at any time prior to such deletion,
                exercise their data protection rights as set out in section
                9 (Data Protection and Privacy) of these Terms.
              </p>
              <p className="mt-3">
                16.4 Following termination, ME Consult shall not process
                the Client&rsquo;s personal data for any purpose other than
                those expressly permitted under these Terms or required by
                applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">17. Force Majeure</h2>
              <p className="mt-3">
                17.1 ME Consult shall not be in breach of these Terms, nor
                liable for any delay or failure in the performance of its
                obligations, where such delay or failure results from
                events beyond its reasonable control. Such events shall
                include, but not be limited to:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>acts of God, flood, drought, earthquake, or other natural disasters;</li>
                <li>epidemic or pandemic;</li>
                <li>war, civil unrest, terrorism, or riots;</li>
                <li>strikes, lockouts, or other industrial disputes;</li>
                <li>interruption or failure of electricity, telecommunications, or internet services; or</li>
                <li>acts or omissions of third-party service providers.</li>
              </ul>
              <p className="mt-3">
                In such circumstances, ME Consult shall be entitled to a
                reasonable extension of time to perform its obligations.
              </p>
              <p className="mt-3">
                17.2 Where the period of delay or non-performance continues
                for more than thirty (30) days, ME Consult may suspend or
                terminate the affected Services upon written notice to the
                Client.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                18. Anti-Bribery, Corruption and Money Laundering
              </h2>
              <p className="mt-3">
                18.1 You agree and undertake that neither you, nor your
                agents, officers, principals, employees, contractors and/or
                consultants, shall offer, promise, give, request, or accept
                any bribe nor engage in any activity that contravenes
                Nigerian laws related to bribery, corruption, or money
                laundering in connection with the Services. ME Consult
                maintains strict compliance with:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Corrupt Practices and Other Related Offences Act</li>
                <li>Economic and Financial Crimes Commission Act</li>
                <li>Money Laundering (Prevention and Prohibition) Act 2022</li>
              </ul>
              <p className="mt-3">
                18.2 Clients must not use the consultation platform for any
                purpose that violates anti-money laundering laws.
              </p>
              <p className="mt-3">
                18.3 Suspicious activity will be reported to the relevant
                authorities, and ME Consult reserves the right to suspend or
                terminate any consultation, and/or the provision of the
                Services based on such suspicion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                19. Cancellations and Refund Policy
              </h2>
              <p className="mt-3">
                19.1 Cancellations made less than 12 (twelve) hours before
                the scheduled session are non-refundable, subject to ME
                Consult&rsquo;s discretion.
              </p>
              <p className="mt-3">
                19.2 Cancellations made more than 12 hours but less than 24
                hours before the scheduled session will be entitled to up
                to 50% (fifty percent) refund, less all applicable charges.
              </p>
              <p className="mt-3">
                19.3 Cancellations made more than 24 hours before the
                scheduled session are eligible for a refund (less all
                applicable charges), or a one-time reschedule without
                charge.
              </p>
              <p className="mt-3">
                19.4 If ME Consult cancels a session, a full refund or
                rescheduling option will be offered. All refund requests
                must be submitted in writing within 7 (seven) days of the
                scheduled session.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                20. Governing Law and Jurisdiction
              </h2>
              <p className="mt-3">
                These Terms shall be governed by and construed in
                accordance with the laws of the Federal Republic of Nigeria
                without regard to any conflict of law principles. Any
                disputes arising from, or in connection with, these Terms
                shall be subject to the exclusive jurisdiction of the
                courts of Nigeria.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                21. Complaints and Professional Regulation
              </h2>
              <p className="mt-3">
                Any complaints regarding the Services or professional
                conduct may be directed to ME Consult&rsquo;s official
                communication channels or the relevant regulatory body in
                Nigeria.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">22. Amendments</h2>
              <p className="mt-3">
                Any variation to these Terms must be agreed in writing and
                signed by ME Consult.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                23. Entire Agreement
              </h2>
              <p className="mt-3">
                These Terms constitute the entire agreement between ME
                Consult and the client regarding the use of the Services.
                Any variation must be agreed in writing and signed by ME
                Consult.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">24. Severability</h2>
              <p className="mt-3">
                If any provision of these Terms is found to be
                unenforceable, the remaining provisions shall remain in
                full force and effect.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                25. Contact Information
              </h2>
              <p className="mt-3">
                Mail:{" "}
                <a
                  href="mailto:contactus@me-consult.org"
                  className="font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
                >
                  contactus@me-consult.org
                </a>{" "}
                | Phone: +(234) 702-6839-242
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
