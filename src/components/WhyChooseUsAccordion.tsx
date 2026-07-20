"use client";

import { useState } from "react";

const items = [
  {
    title: "Agile Structure",
    body: "Our streamlined, non-traditional structure allows us to provide practical, solution-oriented legal support. By moving away from the bureaucratic overhead of traditional models, we consistently deliver high-quality legal services and offer a transparent, flexible billing system designed for today's technologically driven businesses.",
  },
  {
    title: "Culture-Driven",
    body: "ME Consult is a firm built on professional empathy and collaboration. We recognise that our people are our most significant asset, and we prioritise an internal culture that fosters dedication and excellence. This ethos translates directly into the quality of service we provide to our clients.",
  },
  {
    title: "Client-Centric Partnership",
    body: "We are focused on preserving and growing long-term relationships through personalised service and consistent engagement. Our goal is to manage the legal complexities of business operations, allowing our clients to remain focused on their core objectives: building sustainable enterprises and increasing commercial impact.",
  },
  {
    title: "Strategic Expertise",
    body: "With a team of lawyers whose experience spans diverse sectors, the firm is well-positioned to provide nuanced legal services to corporate entities at every level. In collaboration with our strategic partners, we provide the technical expertise required to assist in the expansion of your business. Our ethical approach ensures that every client receives counsel tailored to their specific commercial context.",
  },
];

export default function WhyChooseUsAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = i === openIndex;
        return (
          <div
            key={item.title}
            className={`rounded-2xl border transition-colors ${
              isOpen
                ? "border-[#222753]/10 bg-[#222753]/[0.03]"
                : "border-[#222753]/10 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-lg font-semibold text-[#222753]">{item.title}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#222753]/20 text-[#222753] transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6">
                <p className="text-sm leading-6 text-[#222753]/70">{item.body}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
