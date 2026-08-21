"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/portal");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6fa] px-6 py-16">
      <div className="w-full max-w-sm">
        <Image
          src="/me-consult-logo.jpg"
          alt="ME Consult"
          width={44}
          height={44}
          className="h-11 w-11 rounded-lg"
        />

        <div className="mt-8">
          <h1 className="text-2xl font-semibold text-[#222753]">Client sign in</h1>
          <p className="mt-1 text-sm text-[#222753]/60">
            Manage your bookings, payments, and invoices.
          </p>
        </div>

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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#222753]">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2.5 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full rounded-lg bg-[#ffda00] py-2.5 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <Link
          href="/portal/forgot-password"
          className="mt-4 block text-center text-sm text-[#222753]/60 underline underline-offset-2"
        >
          Forgot your password?
        </Link>
      </div>
    </main>
  );
}
