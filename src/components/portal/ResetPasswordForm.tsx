"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const tokenHash = searchParams.get("token_hash");
    if (!tokenHash) {
      setError("This reset link is invalid or has expired.");
      return;
    }

    setLoading(true);
    const supabase = supabaseBrowser();

    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });

    if (verifyError) {
      setLoading(false);
      setError("This reset link is invalid or has expired.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError("Could not update your password. Please try again.");
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/portal");
      router.refresh();
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6fa] px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-[#222753]">Set a new password</h1>

        {done ? (
          <p className="mt-8 text-sm text-green-600">Password updated. Signing you in...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#222753]">
                New password
              </label>
              <input
                id="password"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#222753]">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#ffda00] py-2.5 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Set password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
