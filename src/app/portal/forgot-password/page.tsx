"use client";

import { useState } from "react";
import Link from "next/link";

export default function PortalForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/portal/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setSent(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6fa] px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-[#222753]">Reset your password</h1>
        <p className="mt-1 text-sm text-[#222753]/60">
          Enter your account email and we&apos;ll send you a reset link.
        </p>

        {sent ? (
          <p className="mt-8 text-sm text-[#222753]/70">
            If an account exists for that email, a reset link is on its way. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#222753]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2.5 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full rounded-lg bg-[#ffda00] py-2.5 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <Link
          href="/portal/login"
          className="mt-4 block text-center text-sm text-[#222753]/60 underline underline-offset-2"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
