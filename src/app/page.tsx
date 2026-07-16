import Link from "next/link";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto px-3 pb-6 sm:px-4 lg:px-6 lg:pb-8">
          <div className="relative isolate h-[80vh] max-h-[760px] min-h-[520px] overflow-hidden rounded-3xl">
            {/* Placeholder background: swap for a real office / team photo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,_#3a4283_0%,_#222753_45%,_#171b3d_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16">
              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Comprehensive Legal and Governance Risk Management.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/80">
                We help businesses navigate the complexities of the Nigerian
                regulatory environment through specialised advisory,
                confident governance, and practical execution.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact#online-consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#222753] transition-colors hover:bg-white/90"
                >
                  Book a Consultation
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 hidden rounded-2xl bg-white/10 p-5 backdrop-blur-md sm:block">
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
              <p className="mt-3 text-2xl font-bold text-white">18+ Years</p>
              <p className="text-sm text-white/70">
                Combined legal &amp; governance expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ME Consult for Startups & MSMEs */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
                Startups &amp; MSMEs
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
                ME Consult for Startups &amp; MSMEs
              </h2>
            </div>
            <p className="text-base leading-7 text-[#222753]/70">
              At ME Consult, we recognise that startups and MSMEs are the
              engines of economic development. A significant portion of our
              practice is dedicated to providing specialised legal advisory
              support to growth-phase businesses across diverse industries.
              We provide the technical expertise required for scaling,
              delivered through a flexible and accessible partnership model
              that understands the unique constraints and ambitions of
              emerging ventures.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/advisory-services#startup-advisory-services"
              className="text-sm font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
            >
              Explore Startup Advisory Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA banner */}
      <section className="bg-[#ffda00]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            ME Consult: Legal Advisory for Modern Business
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#222753]/80">
            Our team provides the technical legal expertise required to
            navigate the Nigerian business environment and support clients&rsquo;
            commercial objectives.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact#online-consultation"
              className="rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90"
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
        </div>
      </section>
    </>
  );
}
