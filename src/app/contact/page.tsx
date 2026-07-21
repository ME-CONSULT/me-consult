import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact Us | ME Consult",
  description:
    "Get in touch with ME Consult. Office information and online consultation for individuals, startups, MSMEs, and international investors.",
};

const officeInfo = [
  {
    label: "Office Hours",
    value: "Mon – Fri: 9am – 5pm",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Address",
    value: "17 Ibikunle Street, Yaba, Lagos State.",
    icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Phone",
    value: "+(234) 702-6839-242",
    href: "tel:+2347026839242",
    icon: "M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.05 11.05 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    label: "Email",
    value: "contactus@me-consult.org",
    href: "mailto:contactus@me-consult.org",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get In Touch"
        description="Whether you require a preliminary regulatory assessment, a review of commercial documentation, or strategic governance advice, our team provides a direct and efficient channel to engage."
      />

      {/* Office Information */}
      <section id="office-information" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                  Office Information
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753]">
                  Visit or Reach Us
                </h2>

                <dl className="mt-8 space-y-5">
                  {officeInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#222753]/5 text-[#222753]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.icon} />
                        </svg>
                      </span>
                      <div>
                        <dt className="text-sm font-semibold text-[#222753]/60">
                          {item.label}
                        </dt>
                        <dd className="mt-1 text-base text-[#222753]">
                          {item.href ? (
                            <a href={item.href} className="hover:underline">
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={150} className="flex items-center justify-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5">
                <p className="text-center text-sm leading-6 text-[#222753]/60">
                  17 Ibikunle Street, Yaba, Lagos State.
                  <br />
                  Map coming soon.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Online Consultation */}
      <section id="online-consultation" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#222753] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
                  Online Consultation
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                  A Direct Channel to Engage With Our Team
                </h2>
                <div className="mt-6 space-y-5 text-base leading-7 text-white/70">
                  <p>
                    In line with our commitment to accessibility and modern
                    service delivery, ME Consult offers a dedicated online
                    consultation service designed for the digital-first
                    business environment. This platform allows individuals,
                    startups, MSMEs, and international investors to secure
                    legal advisory services through a virtual interface.
                  </p>
                  <p>
                    To ensure a structured and professional engagement,
                    clients wishing to utilise this service are required to
                    complete a digital sign-up process and agree to our
                    Standard Terms and Conditions. This onboarding framework
                    is designed to provide clarity on the scope of the
                    services, ensure regulatory compliance, and safeguard the
                    interests of both the client and the firm.
                  </p>
                  <p>
                    By integrating technology with technical expertise, we
                    ensure that geography is never a barrier to receiving the
                    legal support for businesses operating in Nigeria.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={150} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5">
                <h3 className="text-lg font-semibold text-[#222753]">
                  Request a Consultation
                </h3>
                <p className="mt-2 text-sm text-[#222753]/60">
                  Tell us briefly what you need help with and our team will
                  get back to you.
                </p>
                <ConsultationForm className="mt-6" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
