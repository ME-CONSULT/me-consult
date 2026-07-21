"use client";

import { useEffect, useRef, useState } from "react";

type Card = {
  title: string;
  body: string;
  icon: string;
};

export default function FeatureCards({ cards }: { cards: Card[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Safety fallback: guarantee visibility even if the observer never fires.
    const fallback = setTimeout(() => setVisible(true), 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-5 px-8 sm:grid-cols-2 sm:px-12 lg:grid-cols-3 lg:px-16"
    >
      {cards.map((card, i) => (
        <div
          key={card.title}
          style={{ transitionDelay: visible ? `${i * 130}ms` : "0ms" }}
          className={`hover-glow group rounded-2xl bg-[#222753]/[0.03] p-6 text-[#222753] transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#222753] hover:text-white hover:shadow-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#222753]/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
            <svg
              className="h-5 w-5 text-[#222753] transition-colors duration-500 group-hover:text-[#ffda00]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={card.icon} />
            </svg>
          </span>
          <p className="mt-5 text-base font-semibold">{card.title}</p>
          <p className="mt-2 text-sm leading-6 text-[#222753]/60 transition-colors duration-500 group-hover:text-white/70">
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}
