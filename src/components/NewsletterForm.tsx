"use client";

import { useState } from "react";

export default function NewsletterForm({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  const isDark = variant === "dark";

  if (submitted) {
    return (
      <p className={`text-sm ${isDark ? "text-[#ffda00]" : "text-[#222753]"} ${className}`}>
        Thanks for subscribing! Watch your inbox for our next newsletter.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none ${
          isDark
            ? "border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-[#ffda00]"
            : "border-[#222753]/20 bg-white text-[#222753] placeholder:text-[#222753]/40 focus:border-[#222753]"
        }`}
      />
      <button
        type="submit"
        className="hover-glow shrink-0 rounded-full bg-[#ffda00] px-5 py-2.5 text-sm font-semibold text-[#222753] transition-colors hover:bg-[#ffda00]/90"
      >
        Subscribe
      </button>
    </form>
  );
}
