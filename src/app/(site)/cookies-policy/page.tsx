import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookies Policy | ME Consult",
  description:
    "How ME Consult uses cookies and similar tracking technologies on www.me-consult.org.",
};

export default function CookiesPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookies Policy"
        description="Last Updated: 3rd April 2026"
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-12 text-base leading-7 text-[#222753]/80">
            <div>
              <h2 className="text-xl font-bold text-[#222753]">1. Introduction</h2>
              <p className="mt-3">
                This Cookies Policy explains how ME Consult (&ldquo;we&rdquo;,
                &ldquo;our&rdquo;, or &ldquo;us&rdquo;) uses cookies and
                similar tracking technologies on this website:
                www.me-consult.org. It sets out what cookies are, the types
                we use, the purposes they serve, and how you can manage your
                cookie preferences.
              </p>
              <p className="mt-3">
                This Cookies Policy should be read alongside our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
                >
                  Privacy Policy
                </Link>
                , which explains how we collect, use, and protect personal
                data in accordance with applicable laws and regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">2. What Are Cookies?</h2>
              <p className="mt-3">
                Cookies are small text files that are stored on your device
                (computer, phone, tablet, etc.) when you visit a website.
                They help websites function more effectively by remembering
                your preferences and collecting information about your
                interaction with the site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">3. Types of Cookies We Use</h2>
              <p className="mt-3">We use the following categories of cookies:</p>
              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.1 Strictly Necessary Cookies
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    These are essential to enable you to navigate the
                    website and use its features (e.g., secure log-ins,
                    page navigation). These ensure a smooth usage of our
                    website.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.2 Performance Cookies
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    These collect information about how visitors use our
                    site, such as which pages are visited most often, and
                    whether they receive error messages. These cookies help
                    us improve the website&rsquo;s performance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.3 Functionality Cookies
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    These allow our site to remember your preferences (e.g.,
                    language or region) and provide enhanced, more
                    personalized features.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.4 Targeting Cookies
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    These cookies may be used to build a profile of your
                    interests and send you notifications about our free
                    webinars, such as the ME Consult Business Law Series on
                    X (formerly known as Twitter), or other activities that
                    may benefit you as our clients.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">
                    3.5 Analytics Cookies
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    These cookies collect anonymous information about how
                    visitors use our site. They help us understand traffic
                    patterns, identify pages that are useful or problematic,
                    and make data-driven improvements.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">4. Why We Use Cookies</h2>
              <p className="mt-3">We use cookies to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>provide a smooth and secure browsing experience;</li>
                <li>understand how visitors use our site;</li>
                <li>remember your preferences and settings;</li>
                <li>improve website performance and functionality;</li>
                <li>help tailor communications and content.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">5. Consent to Use Cookies</h2>
              <p className="mt-3">
                When you first visit our website, we will ask for your
                consent to use cookies (except strictly necessary cookies).
                You may withdraw your consent at any time by adjusting your
                browser settings or contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                6. Managing Your Cookie Preferences
              </h2>
              <p className="mt-3">
                You may manage or disable cookies through your browser
                settings. You can control and/or delete cookies as you wish
                by:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  accepting or declining cookies via the cookie banner that
                  appears on your first visit;
                </li>
                <li>
                  adjusting your browser settings to refuse all or some
                  cookies, or to alert you when websites set or access
                  cookies;
                </li>
                <li>deleting cookies already stored on your device.</li>
              </ul>
              <p className="mt-3">
                Please note that disabling some cookies may affect your
                experience on our website or limit the functionality of
                certain services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                7. Use of IP Addresses and Web Logs
              </h2>
              <p className="mt-3">
                We may collect your IP address and browser type for system
                administration, security, and to gather aggregate
                information. This does not directly identify you unless
                combined with other identifying information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                8. Email Tracking and Webinars
              </h2>
              <p className="mt-3">
                Our webinar invites may contain a unique tracking pixel to
                understand open rates and user engagement. If you prefer not
                to be tracked, you may disable image loading or avoid
                clicking links in emails.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                9. Third-Party Cookies and Websites
              </h2>
              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#222753]">9.1 Third Party Sites</h3>
                  <p className="mt-1 text-sm leading-6">
                    Our site may include links to third-party websites or
                    embedded content. These sites may use their own
                    cookies, which are not controlled by ME Consult. Please
                    review their cookie policies independently.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#222753]">9.2 Third Party Services</h3>
                  <p className="mt-1 text-sm leading-6">
                    Please be informed that we may allow third-party
                    services (such as Google Analytics) to place cookies on
                    your device to help us analyse traffic and usage
                    patterns. These third parties may collect information
                    about your online activities over time and across
                    different websites.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">
                10. Changes to This Cookies Policy
              </h2>
              <p className="mt-3">
                We may update this policy from time to time in line with
                changes to the law or our data practices. Please check this
                page regularly to stay informed. The latest version will
                always reflect the date of revision.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222753]">11. Contact Us</h2>
              <p className="mt-3">
                If you have questions about this Cookies Policy or your data
                privacy rights, please contact us at{" "}
                <a
                  href="mailto:contactus@me-consult.org"
                  className="font-semibold text-[#222753] underline decoration-[#ffda00] decoration-2 underline-offset-4"
                >
                  contactus@me-consult.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
