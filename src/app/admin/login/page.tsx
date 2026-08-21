"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 30;

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Could not send code. Please try again.");
      return;
    }

    setCode(Array(CODE_LENGTH).fill(""));
    setStep("code");
    setCooldown(RESEND_COOLDOWN);
    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  }

  async function verifyCode(fullCode: string) {
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: fullCode }),
    });

    setLoading(false);

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: null }));
      setError(error ?? "Could not verify code. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && next.every((d) => d)) {
      verifyCode(next.join(""));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((d, i) => (next[i] = d));
    setCode(next);
    const lastIndex = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputRefs.current[lastIndex]?.focus();
    if (pasted.length === CODE_LENGTH) {
      verifyCode(pasted);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[#171b3d] lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#ffda00] opacity-20 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#222753] opacity-60 blur-[100px]"
          aria-hidden
        />

        <Image
          src="/White logo.png"
          alt="ME Consult"
          width={48}
          height={48}
          className="relative h-11 w-11 rounded-lg"
        />

        <div className="relative">
          <h1 className="max-w-md text-3xl font-semibold leading-tight text-white">
            Legal advisory, secured.
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Sign in to manage bookings, client documents, and payments for ME Consult.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-sm">
          <Image
            src="/me-consult-logo.jpg"
            alt="ME Consult"
            width={44}
            height={44}
            className="h-11 w-11 rounded-lg lg:hidden"
          />

          {step === "email" ? (
            <>
              <div className="mt-8 lg:mt-0">
                <h2 className="text-2xl font-semibold text-[#222753]">Admin sign in</h2>
                <p className="mt-1 text-sm text-[#222753]/60">
                  Enter your email and we&apos;ll send you a one-time code.
                </p>
              </div>

              <form onSubmit={sendCode} className="mt-8 space-y-4">
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
                    placeholder="you@meconsult.com"
                    className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2.5 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full rounded-lg bg-[#ffda00] py-2.5 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
                >
                  {loading ? "Sending code..." : "Send code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mt-8 lg:mt-0">
                <h2 className="text-2xl font-semibold text-[#222753]">Enter your code</h2>
                <p className="mt-1 text-sm text-[#222753]/60">
                  We sent a {CODE_LENGTH}-digit code to{" "}
                  <span className="font-medium text-[#222753]">{email}</span>.{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError(null);
                    }}
                    className="font-medium text-[#222753] underline underline-offset-2"
                  >
                    Change email
                  </button>
                </p>
              </div>

              <div className="mt-8">
                <div className="flex justify-between gap-2">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      disabled={loading}
                      onChange={(e) => handleDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      className="h-14 w-12 rounded-lg border border-[#222753]/15 text-center text-lg font-semibold text-[#222753] outline-none focus:border-[#222753]/40 disabled:opacity-50"
                    />
                  ))}
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                <button
                  type="button"
                  onClick={() => verifyCode(code.join(""))}
                  disabled={loading || code.some((d) => !d)}
                  className="mt-6 w-full rounded-lg bg-[#ffda00] py-2.5 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & sign in"}
                </button>

                <button
                  type="button"
                  onClick={() => sendCode()}
                  disabled={cooldown > 0 || loading}
                  className="mt-4 w-full text-center text-sm text-[#222753]/60 underline underline-offset-2 disabled:no-underline disabled:opacity-40"
                >
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
