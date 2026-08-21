import { headers } from "next/headers";
import type { Currency } from "@/lib/pricing";

function currencyForCountry(countryCode: string | null): Currency {
  if (countryCode === "NG") return "NGN";
  if (countryCode === "GB") return "GBP";
  return "USD";
}

async function lookupCountryByIp(ip: string): Promise<string | null> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.countryCode === "string" ? data.countryCode : null;
  } catch {
    return null;
  }
}

/** Best-effort visitor currency, defaulting to NGN (the business's home
 * currency) whenever geolocation is unavailable or inconclusive. */
export async function detectCurrency(): Promise<Currency> {
  const h = await headers();

  // Set automatically by Vercel's edge network when deployed there.
  const vercelCountry = h.get("x-vercel-ip-country");
  if (vercelCountry) return currencyForCountry(vercelCountry);

  const forwardedFor = h.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.")) {
    return "NGN";
  }

  const country = await lookupCountryByIp(ip);
  return currencyForCountry(country);
}
