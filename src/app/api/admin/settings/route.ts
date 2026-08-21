import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getSettings, updateSettings } from "@/lib/settings";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const fields: Record<string, unknown> = {};

  if (typeof body.business_email === "string") fields.business_email = body.business_email;
  if (typeof body.business_phone === "string" || body.business_phone === null) {
    fields.business_phone = body.business_phone;
  }
  if (Number.isFinite(body.booking_notice_hours)) {
    fields.booking_notice_hours = body.booking_notice_hours;
  }
  if (Number.isFinite(body.vat_rate)) fields.vat_rate = body.vat_rate;
  if (Array.isArray(body.business_days)) {
    fields.business_days = body.business_days.filter(
      (d: unknown) => Number.isInteger(d) && (d as number) >= 0 && (d as number) <= 6
    );
  }

  const settings = await updateSettings(fields);
  return NextResponse.json({ settings });
}
