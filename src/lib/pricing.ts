export function computeTotal(feeKobo: number, vatRatePercent: number) {
  const vatKobo = Math.round(feeKobo * (vatRatePercent / 100));
  return { feeKobo, vatKobo, totalKobo: feeKobo + vatKobo };
}

export function formatNaira(kobo: number | null | undefined) {
  if (kobo === null || kobo === undefined) return "—";
  return `₦${(kobo / 100).toLocaleString()}`;
}

export type Currency = "NGN" | "USD" | "GBP";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
};

export const CURRENCY_RATE_FIELD = {
  NGN: "fee_kobo",
  USD: "fee_usd_cents",
  GBP: "fee_gbp_pence",
} as const;

/** Same minor-units-to-major math as computeTotal, currency-agnostic. */
export function computeMoneyTotal(minorUnits: number, vatRatePercent: number) {
  const vatMinor = Math.round(minorUnits * (vatRatePercent / 100));
  return { feeMinor: minorUnits, vatMinor, totalMinor: minorUnits + vatMinor };
}

export function formatMoney(minorUnits: number | null | undefined, currency: Currency) {
  if (minorUnits === null || minorUnits === undefined) return "—";
  return `${CURRENCY_SYMBOLS[currency]}${(minorUnits / 100).toLocaleString()}`;
}
