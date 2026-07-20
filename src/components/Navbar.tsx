"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navItems } from "@/lib/nav";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/me-consult-icon.png"
            alt=""
            width={160}
            height={160}
            priority
            className="h-10 w-auto"
          />
          <span className="text-lg font-bold tracking-tight text-[#222753]">
            ME CONSULT
          </span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#222753] transition-colors hover:text-[#222753]/70"
              >
                {item.label}
                {item.children && (
                  <svg
                    className="h-3 w-3 text-[#222753]/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full w-72 rounded-lg border border-[#222753]/10 bg-white py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-[#222753] hover:bg-[#222753]/5"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/contact#online-consultation"
          className="hidden rounded-full bg-[#222753] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 lg:inline-block"
        >
          Book a Consultation
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#222753] lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#222753]/10 bg-white lg:hidden">
          <nav className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[#222753]/5 py-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="block flex-1 py-2 text-sm font-medium text-[#222753]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      className="p-2 text-[#222753]/60"
                      onClick={() =>
                        setMobileSubOpen((cur) => (cur === item.label ? null : item.label))
                      }
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          mobileSubOpen === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && mobileSubOpen === item.label && (
                  <div className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-1.5 text-sm text-[#222753]/70"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/contact#online-consultation"
              className="mt-4 block rounded-full bg-[#222753] px-5 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Book a Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
