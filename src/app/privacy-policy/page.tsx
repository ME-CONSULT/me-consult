import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | ME Consult",
  description:
    "How ME Consult collects, uses, and protects your personal data on www.me-consult.org.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy and Cookie Policy"
        description="Updated 3rd April 2026"
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-12 text-base leading-7 text-[#222753]/80">
            <div>
              <h2 className="text-xl font-bold text-[#222753]">1. Introduction</h2>
              <div className="mt-3 space-y-3">
                <p>
                  At ME Consult (&ldquo;ME Consult&rdquo; or &ldquo;we&rdquo;
                  or &ldquo;us&rdquo; or &ldquo;our&rdquo;), we aim to
                  protect your privacy and treat your Personal Data (defined
                  below) responsibly. We will always keep your Personal Data
                  safe, and we are transparent about how and why we collect
                  and process your Personal Data.
                </p>
                <p>This Privacy and Cookie Policy (the &ldquo;Policy&rdquo;) describes:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    the Personal Data we collect and process, but it may not
                    address all possible data processing scenarios;
                  </li>
                  <li>the purpose of collecting and processing your Personal Data;</li>
                  <li>the standards we apply to your Personal Data;</li>
                  <li>the use of cookies; and</li>
                  <li>your rights in connection with the processing of your Personal Data.</li>
                </ul>
                <p>
                  Please read this Policy (and any amendments) before you
                  become a business or private user of our website
                  (www.me-consult.org) or any of our services, and
                  throughout the period you use the website or our
                  services.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">2. Personal Data and Cookies</h2>
              <div className="mt-3 space-y-3">
                <p>
                  Personal Data is any information relating to you,
                  including but not limited to your name, address,
                  photograph, email address, bank details, posts on social
                  networking websites, medical information, identification
                  number, location data, an online identifier or to one or
                  more factors specific to your physical, physiological,
                  genetic, mental, economic, cultural or social identity,
                  unique identifier such as, but not limited to MAC
                  address, IP address, IMEI number, IMSI number, SIM, and
                  information that can be used on its own or with other
                  information to identify, contact, or locate you, or to
                  identify you in a context.
                </p>
                <p>
                  A cookie is a file in your web browser which asks
                  permission to be placed on your computer&rsquo;s hard
                  drive and enables us to recognise your computer when you
                  visit our website. A cookie does not provide us with your
                  Personal Data. Therefore, if you have not supplied us
                  with any Personal Data, you can still browse our site
                  anonymously.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">3. Data Collection</h2>
              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.1 Personal Data that ME Consult Collects Directly from You
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    ME Consult collects Personal Data from you when you use
                    our website or service. The type of Personal Data that
                    we collect from you depends on your particular
                    interaction with the website or the service you seek
                    to access. We may collect the following information
                    from you: name, sex, country of residence, office or
                    residential address, phone number, job title, company,
                    investor type, e-mail address, details of next of kin,
                    marketing and communication preferences, username, and
                    password.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.2 Personal Data that ME Consult Collects Automatically
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    ME Consult may use cookies, web beacons, and other
                    tracking technologies to automatically collect your
                    Personal Data as you use the website. This Personal
                    Data includes information automatically sent to ME
                    Consult by your computer, mobile phone or other
                    electronic access devices &ndash; data about the pages
                    you access, IP address, device ID or unique identifier,
                    device type, geo-location information, device and
                    connection information, mobile network information,
                    statistics on page views, traffic to and from the
                    sites, referral URL, ad data, the dates and time of
                    your use of the website and standard web log data.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.3 Personal Data that ME Consult Collects from Third Parties
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    ME Consult collects information about you from
                    third-party sources such as identity verification
                    services and analytics providers in accordance with
                    the provisions of a written contract between ME
                    Consult and the third party. We also receive Personal
                    Data from individuals and entities that you have
                    authorised to transfer your Personal Data to us. These
                    parties are responsible for managing their use of your
                    Personal Data. The Personal Data that ME Consult
                    collects about you from third parties includes, but is
                    not limited to, your name, date of birth, and contact
                    details.
                  </p>
                </div>
                <p>
                  We only collect Personal Data that is adequate, relevant,
                  and limited to what is necessary in relation to the
                  purposes for which it is processed.
                </p>
                <div>
                  <h3 className="font-semibold text-[#222753]">3.5 Children&rsquo;s Data</h3>
                  <p className="mt-1 text-sm leading-6">
                    We do not knowingly collect Personal Data from children
                    under the age of 18 without verified parental or
                    guardian consent. If you are a parent or guardian and
                    believe your child has provided us with Personal Data
                    without your consent, please contact us so that we can
                    take appropriate steps.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                4. Grounds for Processing Your Personal Data and Cookies
              </h2>
              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#222753]">4.1 Personal Data</h3>
                  <p className="mt-1 text-sm leading-6">
                    We rely on one or more lawful bases to collect and
                    process your Personal Data, with your consent, which
                    you may withdraw at any time. We process your Personal
                    Data for:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6">
                    <li>
                      the performance of a contract to which you are a
                      party or in order to take steps at your request prior
                      to entering into a contract;
                    </li>
                    <li>compliance with a legal obligation to which you are subject;</li>
                    <li>
                      the protection of your vital interests or that of
                      another natural person; or
                    </li>
                    <li>
                      the performance of a task carried out in the public
                      interest or in the exercise of official public
                      mandate vested in us;
                    </li>
                    <li>
                      our legitimate interests, provided these are not
                      overridden by your fundamental rights and freedoms.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">4.2 Cookies</h3>
                  <p className="mt-1 text-sm leading-6">
                    Upon entering our website, you were immediately
                    requested to enable cookies on your browser. Once you
                    enable or reject cookies, the cookie file is added, and
                    the cookie helps analyse web traffic or lets you know
                    when you visit a particular site. Please see our{" "}
                    <Link
                      href="/cookies-policy"
                      className="font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
                    >
                      Cookies Policy
                    </Link>{" "}
                    for more information.
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    You do not need to have cookies turned on to visit most
                    parts of the website. Some of our services, including
                    logging into our secured area, however, require
                    cookies in your browser to view and use them. Refusing
                    the use of cookies may, therefore, have an impact on
                    the functionality of our website.
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    We shall process your Personal Data lawfully, fairly,
                    in a transparent manner and with respect for your
                    dignity.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    4.3 Data Protection Impact Assessments
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    ME Consult shall carry out a Data Protection Impact
                    Assessment (DPIA) where processing operations are
                    likely to result in a high risk to the rights and
                    freedoms of data subjects. This complies with
                    applicable data protection laws, including the
                    Nigerian Data Protection Act (the NDPA) 2023 and the
                    Nigerian Data Protection Regulation 2019 (the NDPR), as
                    may be amended, extended, re-enacted, or consolidated
                    from time to time.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                5. How ME Consult Uses the Personal Data and Cookies It Collects
              </h2>
              <p className="mt-3">ME Consult uses your Personal Data and cookies to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  communicate with you, including to respond to your
                  comments or requests for information, to request
                  feedback on our products and services, and to notify you
                  about changes to your subscriptions/registration or to
                  the services you use;
                </li>
                <li>
                  help us understand you, to tailor and enhance ME
                  Consult&rsquo;s product and service offerings, anticipate
                  and resolve problems with any products or services
                  supplied to you, create products or services that may
                  meet your needs;
                </li>
                <li>provide access to restricted pages or contents of the website;</li>
                <li>
                  comply with legal and/or regulatory requirements and
                  cooperate with regulators and law enforcement bodies;
                </li>
                <li>
                  facilitate your activity and to identify you when you log
                  into your account on the website;
                </li>
                <li>
                  send you marketing communications and advertising in line
                  with your communication preferences, and where permitted
                  by applicable law, about products, services and
                  opportunities that we believe would be of interest to
                  you, including products and services offered by third
                  parties or to provide you with products and services
                  that you request from us;
                </li>
                <li>protect our rights, your rights, and the rights of others;</li>
                <li>meet ME Consult&rsquo;s own high standards of business practice;</li>
                <li>
                  ensure that the content in our website is presented to
                  you in the most effective manner and to improve the
                  content of our website;
                </li>
                <li>manage and administer the products and services provided to you;</li>
                <li>
                  keep you updated as a client in relation to changes to
                  our services and relevant matters;
                </li>
                <li>provide, improve, test, and monitor the effectiveness of our services; and</li>
                <li>
                  monitor metrics such as total number of visitors,
                  traffic, and demographic patterns.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">6. Third Parties Access</h2>
              <p className="mt-3">We may disclose your Personal Data to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  third-party vendors and service providers in the course
                  of dealing with you. Any third parties that we may share
                  your Personal Data with are obliged to keep your
                  Personal Data securely, and to use them only to fulfil
                  the service they provide you on our behalf. When they no
                  longer need your Personal Data to fulfil this service,
                  they will dispose of your Personal Data in line with
                  established procedures;
                </li>
                <li>
                  public bodies such as regulatory, government agency,
                  court or other third parties such as but not limited to,
                  the police authorities, and the tax agencies, where we
                  believe disclosure is necessary (i) as a matter of
                  applicable law or regulation, (ii) to exercise, defend or
                  establish our legal rights or (iii) to protect your
                  interest or those of any other person; or
                </li>
                <li>
                  our auditors, legal representatives, employees, advisors
                  and any other person in connection with any advisory
                  service they provide in the course of our legitimate
                  business purposes.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">7. Transfer of Personal Data</h2>
              <div className="mt-3 space-y-3">
                <p>
                  In the event of any arrangement whereby ME Consult sells
                  or transfers all, or a portion of, its business or
                  assets (including in the event of a reorganisation,
                  dissolution or liquidation) to third parties, you hereby
                  consent that your Personal Data held with ME Consult can
                  be transferred or assigned to third parties who may
                  become the controllers and/or processors of your
                  Personal Data that was held by ME Consult prior to such
                  arrangement. ME Consult shall at all times ensure that
                  you are notified when your Personal Data is intended to
                  be transferred to third parties in the circumstances
                  outlined in this paragraph.
                </p>
                <p>
                  You consent to the transfer of your Personal Data to a
                  recipient in a foreign country or to an international
                  organisation located outside of Nigeria, if we comply
                  with the Data Protection laws in force at the time.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">8. Security and Protection</h2>
              <div className="mt-3 space-y-3">
                <p>
                  ME Consult takes the security of your Personal Data very
                  seriously, and will take all appropriate technical
                  measures using recognised security procedures and tools
                  in accordance with good industry practice, to protect
                  your Personal Data. In addition to general security
                  safeguards, ME Consult shall adopt encryption protocols,
                  access control mechanisms, and periodic security audits
                  to prevent unauthorised access, data loss, or
                  compromise.
                </p>
                <p>
                  Whilst ME Consult uses all reasonable endeavours to
                  protect your security in the manner described above, ME
                  Consult considers that it is only appropriate to advise
                  users that data transmission over the internet and the
                  World Wide Web cannot be guaranteed as completely secure
                  and, therefore, that you use the website and our
                  services at your own risk.
                </p>
                <p>
                  To the extent allowed by law, ME Consult assumes no
                  liability for any damages you may suffer as a result of
                  interception, alteration, or misuse of information
                  transmitted over the internet.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                9. Data Integrity, Storage and Retention
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  We take reasonable steps to ensure that Personal Data we
                  process is reliable for its intended use, accurate, and
                  complete as necessary to carry out the purposes
                  described in this Policy.
                </p>
                <p>
                  Personal Data will be stored in one of our data centres
                  or in the data centres of our approved vendors.
                </p>
                <p>
                  We shall retain and use your Personal Data only as long
                  as is necessary to implement, administer and manage your
                  request and contract with ME Consult, or as required to
                  comply with legal or regulatory obligations, including
                  under tax and security laws.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">10. User Obligations</h2>
              <div className="mt-3 space-y-3">
                <p>
                  You are required to familiarise yourself with this
                  Policy and to ensure that the information you provide to
                  us is complete, accurate and up to date.
                </p>
                <p>ME Consult recommends that you do the following:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    keep your user login details such as your user ID and
                    password confidential. ME Consult will never ask you
                    for your password in any unsolicited communication
                    (such as letters, phone calls or e-mail messages);
                  </li>
                  <li>utilise a unique password and change it frequently;</li>
                  <li>
                    make sure no one is watching you enter your login
                    details, including your user ID and/or password on
                    your keyboard when using protected elements of the
                    digital services or website;
                  </li>
                  <li>do not leave your device unattended while logged onto the website or our digital service; and</li>
                  <li>when you finish accessing your information, exit the protected area.</li>
                </ul>
                <p>
                  Please keep your Personal Data up to date and inform us
                  of any significant changes to your Personal Data.
                </p>
                <p>
                  You agree to inform your dependents whose Personal Data
                  you provide to us about the content of this Policy, and
                  where relevant, to obtain their consent for the use
                  (including transfer and disclosure) of that Personal
                  Data by ME Consult as set out in this Policy.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                11. Access, Correction, Erasure, Questions, and Complaints
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  You have the right to access, correct, delete, restrict,
                  or object to the processing of your Personal Data. You
                  may also request data portability, withdraw consent at
                  any time, or request information on automated
                  decision-making. You may exercise these rights regarding
                  your Personal Data by contacting us. If you have any
                  questions or concerns about how we process your Personal
                  Data or if you wish to request access, correction,
                  cessation or restriction of use, anonymisation,
                  suppression, deletion or a copy or portability of your
                  Personal Data (to the extent these rights are provided
                  to you by applicable law and is not inconsistent with
                  other obligations), please contact us via the contact
                  details below, stating clearly in the subject, that your
                  request concerns a privacy matter and whether it is a
                  request to access, to correct or to delete.
                </p>
                <p>
                  Please note, however, that certain Personal Data may be
                  exempt from such requests and we may require some form
                  of identification (International Passport, Drivers&rsquo;
                  Licence, National Identity Card, Permanent Voter&rsquo;s
                  Card) before processing your request.
                </p>
                <p>
                  We will respond to your request as soon as reasonably
                  practicable in accordance with applicable law. If
                  circumstances cause any delay in our response, you will
                  be promptly notified and provided a date for our
                  response.
                </p>
                <p>We can deny you access to the information where we determine that your request is unreasonable.</p>
                <p>
                  If you have any questions, comments or complaints about
                  our collection, use or disclosure of Personal Data, or
                  if you believe that we have not complied with this
                  Policy or relevant Nigerian laws, please contact our
                  Data Protection Officer at{" "}
                  <a
                    href="mailto:contactus@me-consult.org"
                    className="font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
                  >
                    contactus@me-consult.org
                  </a>
                  .
                </p>
                <p>
                  You may lodge a complaint with the NITDA about the
                  collection or processing of your Personal Data. This
                  right shall only become exercisable after you have
                  first contacted us and given us a reasonable opportunity
                  to resolve your concern.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">12. Links to Third Party Sites</h2>
              <div className="mt-3 space-y-3">
                <p>
                  Our website may contain links to other websites owned
                  and operated by third parties. These links are provided
                  for your information and convenience only and are not an
                  endorsement by us of the content of such linked websites
                  or third parties. The information that we collect from
                  you will become available to these websites if you
                  click the link to the websites.
                </p>
                <p>
                  These linked websites are neither under our control nor
                  our responsibility. ME Consult, therefore, makes no
                  warranties or representations, express or implied about
                  the safety of such linked websites, the third parties
                  they are owned and operated by, and the suitability or
                  quality of information contained on them.
                </p>
                <p>
                  This Policy does not apply to these websites, thus, if
                  you decide to access these linked third party websites
                  and/or make use of the information contained on them,
                  you do so entirely at your own risk. ME Consult accepts
                  no liability for any damage or loss, however caused, in
                  connection with accessing, the use of or reliance on any
                  information, material, products or services contained
                  on or accessed through any such linked website. We
                  advise that you contact those websites directly for
                  information on their privacy policy, security, data
                  collection and distribution policies.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">13. Violations of This Policy</h2>
              <div className="mt-3 space-y-3">
                <p>
                  We have put in place procedures to deal with any
                  suspected Personal Data breach and will notify you of
                  any Personal Data breach and let you know the steps we
                  have taken to remedy the breach and the security
                  measures we have applied to render your Personal Data
                  unintelligible. In the event of a personal data breach,
                  ME Consult shall notify the Nigerian Data Protection
                  Commission within 72 hours of becoming aware of such
                  breach, in accordance with the NDPA.
                </p>
                <p>
                  If you know or suspect that a personal data breach has
                  occurred, you should immediately contact us at{" "}
                  <a
                    href="mailto:contactus@me-consult.org"
                    className="font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
                  >
                    contactus@me-consult.org
                  </a>
                  .
                </p>
                <p>ME Consult will not be responsible for any personal data breach which occurs as a result of:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>an event which is beyond the control of ME Consult;</li>
                  <li>an act or a threat of terrorism;</li>
                  <li>
                    an act of God (such as, but not limited to fires,
                    explosions, earthquakes, drought, tidal waves and
                    floods) which compromises our data protection
                    measures;
                  </li>
                  <li>
                    war, hostilities (whether war be declared or not),
                    invasion, act of foreign enemies, mobilisation,
                    requisition, or embargo;
                  </li>
                  <li>
                    rebellion, revolution, insurrection, or military or
                    usurped power, or civil war, which compromises our
                    data protection measures;
                  </li>
                  <li>the transfer of your personal data to a third party on your instructions; and</li>
                  <li>the use of your personal data by a third party designated by you.</li>
                </ul>
                <p>
                  Any person subject to this Policy who is found to be in
                  breach of this Policy by:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    failure to implement safeguards required by the NDPR
                    or any of the security measures provided in this
                    Policy;
                  </li>
                  <li>failure to mitigate the damage once it has occurred; or</li>
                  <li>failure to timely notify the affected individuals;</li>
                </ul>
                <p>
                  may be liable, in addition to any other civil
                  liabilities, to the penalties provided in the NDPR.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                14. Revisions to the Data Privacy and Cookie Policy
              </h2>
              <p className="mt-3">
                ME Consult may revise this Policy from time to time. Each
                revised version shall be dated and posted on the website.
                We recommend that you review the website from time to time
                and take note of any changes. If you do not agree with the
                Policy, you should not, or no longer access, or use the
                website and/or service. By continuing to use the website
                and/or service, you accept any changes made to the Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
