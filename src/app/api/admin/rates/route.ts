import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import {
  listRates,
  upsertRate,
  deleteRate,
  deleteRates,
  type RateCurrencyField,
} from "@/lib/consultationRates";
import { listDurations } from "@/lib/durations";

const CURRENCY_FIELDS: RateCurrencyField[] = ["fee_kobo", "fee_usd_cents", "fee_gbp_pence"];

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rates = await listRates();
  return NextResponse.json({ rates });
}

export async function PATCH(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { lawyer_id, duration_minutes } = body;

  if (typeof lawyer_id !== "string") {
    return NextResponse.json({ error: "lawyer_id is required" }, { status: 400 });
  }

  const durations = await listDurations();
  if (!durations.some((d) => d.minutes === duration_minutes)) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  const amounts: Partial<Record<RateCurrencyField, number | null>> = {};
  for (const field of CURRENCY_FIELDS) {
    if (body[field] === undefined) continue;
    if (body[field] === null) {
      amounts[field] = null;
      continue;
    }
    if (!Number.isFinite(body[field]) || body[field] < 0) {
      return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 });
    }
    amounts[field] = Math.round(body[field]);
  }

  if (Object.keys(amounts).length === 0) {
    return NextResponse.json({ error: "No prices provided" }, { status: 400 });
  }

  const rate = await upsertRate(lawyer_id, duration_minutes, amounts);
  return NextResponse.json({ rate });
}

export async function DELETE(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    await deleteRate(id);
    return NextResponse.json({ ok: true });
  }

  const body = await request.json().catch(() => null);
  const ids = Array.isArray(body?.ids) ? body.ids.filter((v: unknown) => typeof v === "string") : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: "Missing id or ids" }, { status: 400 });
  }

  await deleteRates(ids);
  return NextResponse.json({ ok: true, deleted: ids.length });
}
