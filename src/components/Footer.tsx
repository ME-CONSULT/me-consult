import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Affiliated Platform", href: "/affiliated-platform" },
  { label: "Online Consultation", href: "/contact#online-consultation" },
];

export default function Footer() {
  return (
    <footer className="bg-[#222753] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1.5fr]">
          <div>
            <Image
              src="/White logo.png"
              alt="ME Consult"
              width={160}
              height={160}
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
              Legal advisory for modern business. Specialised corporate and
              commercial counsel for entities, MSMEs, and startups navigating
              the Nigerian regulatory environment.
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/80">
              <p>Phone: +(234) 702-6839-242</p>
              <p>Email: contactus@me-consult.org</p>
              <p>17 Ibikunle Street, Yaba, Lagos State.</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#ffda00]">
              Subscribe to our newsletter
            </p>
            <p className="mt-4 text-sm text-white/70">
              Curated legal updates, insights, and sector trends, published
              every two months.
            </p>
            <NewsletterForm variant="dark" className="mt-4" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ME Consult&trade;. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact#online-consultation" className="hover:text-white">
              Online Consultation T&amp;C
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookies-policy" className="hover:text-white">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
