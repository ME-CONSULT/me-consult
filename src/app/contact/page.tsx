import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConsultationForm from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Contact Us | ME Consult",
  description:
    "Get in touch with ME Consult. Office information and online consultation for individuals, startups, MSMEs, and international investors.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get In Touch"
        description="Whether you require a preliminary regulatory assessment, a review of commercial documentation, or strategic governance advice, our team provides a direct and efficient channel to engage."
      />

      {/* Office Information */}
      <section id="office-information" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Office Information
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753]">
                Visit or Reach Us
              </h2>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-[#222753]/60">
                    Office Hours
                  </dt>
                  <dd className="mt-1 text-base text-[#222753]">
                    Mon &ndash; Fri: 9am &ndash; 5pm
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-[#222753]/60">
                    Address
                  </dt>
                  <dd className="mt-1 text-base text-[#222753]">
                    17 Ibikunle Street, Yaba, Lagos State.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-[#222753]/60">
                    Phone
                  </dt>
                  <dd className="mt-1 text-base text-[#222753]">
                    <a href="tel:+2347026839242" className="hover:underline">
                      +(234) 702-6839-242
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-[#222753]/60">
                    Email
                  </dt>
                  <dd className="mt-1 text-base text-[#222753]">
                    <a
                      href="mailto:contactus@me-consult.org"
                      className="hover:underline"
                    >
                      contactus@me-consult.org
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex items-center justify-center rounded-2xl bg-[#222753]/[0.03] p-8">
              <p className="text-center text-sm leading-6 text-[#222753]/60">
                17 Ibikunle Street, Yaba, Lagos State.
                <br />
                Map coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Consultation */}
      <section id="online-consultation" className="scroll-mt-24 bg-[#222753]/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Online Consultation
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753]">
                A Direct Channel to Engage With Our Team
              </h2>
              <div className="mt-6 space-y-5 text-base leading-7 text-[#222753]/80">
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
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5">
              <h3 className="text-lg font-semibold text-[#222753]">
                Request a Consultation
              </h3>
              <p className="mt-2 text-sm text-[#222753]/60">
                Tell us briefly what you need help with and our team will
                get back to you.
              </p>
              <ConsultationForm className="mt-6" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
