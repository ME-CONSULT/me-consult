import { randomInt, createHash, timingSafeEqual } from "crypto";

export const OTP_CODE_LENGTH = 6;
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export type AdminOtpChallenge = {
  codeHash: string;
  tokenHash: string;
  expiresAt: number;
  attempts: number;
};

export function generateOtpCode() {
  return randomInt(0, 1_000_000).toString().padStart(OTP_CODE_LENGTH, "0");
}

function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export function createChallenge(code: string, tokenHash: string): AdminOtpChallenge {
  return {
    codeHash: hashCode(code),
    tokenHash,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  };
}

export function checkChallenge(
  challenge: AdminOtpChallenge | null | undefined,
  code: string
): { ok: true } | { ok: false; reason: "missing" | "expired" | "too_many_attempts" | "mismatch" } {
  if (!challenge) return { ok: false, reason: "missing" };
  if (Date.now() > challenge.expiresAt) return { ok: false, reason: "expired" };
  if (challenge.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "too_many_attempts" };

  const a = Buffer.from(hashCode(code));
  const b = Buffer.from(challenge.codeHash);
  const matches = a.length === b.length && timingSafeEqual(a, b);

  return matches ? { ok: true } : { ok: false, reason: "mismatch" };
}
