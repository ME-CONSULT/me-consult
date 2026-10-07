import { NextResponse } from "next/server";

// Fixed-window limiter held in server memory. Each serverless instance keeps
// its own counts, so this is a brute-force speed bump rather than a hard
// global cap. Swap the store for a database table to make it global.
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Returns a 429 response when the caller is over the limit, otherwise null. */
export function rateLimit(
  request: Request,
  name: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): NextResponse | null {
  const now = Date.now();
  const key = `${name}:${clientIp(request)}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
  } else if (bucket.count >= limit) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  } else {
    bucket.count += 1;
  }

  // Opportunistic cleanup so the map can't grow without bound.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  return null;
}
