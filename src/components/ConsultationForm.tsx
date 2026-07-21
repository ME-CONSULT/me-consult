"use client";

import { useState } from "react";

export default function ConsultationForm({ className = "" }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={`text-sm text-[#222753] ${className}`}>
        Thank you. Your request has been received &mdash; our team will be
        in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#222753]">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#222753]">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#222753]">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
        />
      </div>
      <button
        type="submit"
        className="hover-glow w-full rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90"
      >
        Submit Request
      </button>
    </form>
  );
}
