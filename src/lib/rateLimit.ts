import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Fixed-window limiter. Counts live in the rate_limits table (migration
// 0016) so the cap holds across serverless instances; if that table isn't
// there yet, falls back to per-instance memory.
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

function hitMemory(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
  } else {
    bucket.count += 1;
  }

  // Opportunistic cleanup so the map can't grow without bound.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  return buckets.get(key)!.count <= limit;
}

async function hitDatabase(key: string, limit: number, windowMs: number) {
  const { data, error } = await supabaseAdmin().rpc("hit_rate_limit", {
    p_key: key,
    p_limit: limit,
    p_window_seconds: Math.ceil(windowMs / 1000),
  });
  if (error || typeof data !== "boolean") return null;
  return data;
}

/** Returns a 429 response when the caller is over the limit, otherwise null. */
export async function rateLimit(
  request: Request,
  name: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): Promise<NextResponse | null> {
  const key = `${name}:${clientIp(request)}`;
  const allowed = (await hitDatabase(key, limit, windowMs)) ?? hitMemory(key, limit, windowMs);

  if (allowed) return null;

  return NextResponse.json(
    { error: "Too many attempts. Please wait a few minutes and try again." },
    { status: 429, headers: { "Retry-After": String(Math.ceil(windowMs / 1000)) } }
  );
}
