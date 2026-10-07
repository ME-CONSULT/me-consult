import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { getSettings, updateSettings } from "@/lib/settings";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
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
  // VAT rate is payment-related and admin-only; silently ignored (not
  // rejected) for staff so the rest of a combined business-settings save
  // still goes through even though the form always includes this field.
  if (Number.isFinite(body.vat_rate) && getUserRole(sessionUser) === "admin") {
    fields.vat_rate = body.vat_rate;
  }
  if (Array.isArray(body.business_days)) {
    fields.business_days = body.business_days.filter(
      (d: unknown) => Number.isInteger(d) && (d as number) >= 0 && (d as number) <= 6
    );
  }

  // Default-booking-page pricing is admin-only, same posture as VAT rate.
  if (getUserRole(sessionUser) === "admin") {
    if (typeof body.default_lawyer_id === "string" || body.default_lawyer_id === null) {
      fields.default_lawyer_id = body.default_lawyer_id;
    }
    if (Number.isFinite(body.default_duration_minutes) || body.default_duration_minutes === null) {
      fields.default_duration_minutes = body.default_duration_minutes;
    }
    if (Number.isFinite(body.default_fee_kobo) || body.default_fee_kobo === null) {
      fields.default_fee_kobo = body.default_fee_kobo;
    }
  }

  const settings = await updateSettings(fields);
  return NextResponse.json({ settings });
}
