import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { createBookingLink, listBookingLinks } from "@/lib/bookingLinks";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await listBookingLinks();
  return NextResponse.json({ links });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, duration_minutes, fee_kobo, lawyer_ids, expires_at } = body;

  if (!Number.isFinite(duration_minutes) || duration_minutes <= 0) {
    return NextResponse.json({ error: "A valid duration is required" }, { status: 400 });
  }
  if (!Number.isFinite(fee_kobo) || fee_kobo < 0) {
    return NextResponse.json({ error: "A valid fee is required" }, { status: 400 });
  }
  if (!Array.isArray(lawyer_ids) || lawyer_ids.length === 0 || !lawyer_ids.every((id) => typeof id === "string")) {
    return NextResponse.json({ error: "Select at least one consultant" }, { status: 400 });
  }

  const link = await createBookingLink({
    title: typeof title === "string" ? title.trim() || null : null,
    duration_minutes,
    fee_kobo,
    lawyer_ids,
    expires_at: typeof expires_at === "string" && expires_at ? expires_at : null,
    created_by: sessionUser.id,
  });

  return NextResponse.json({ link });
}
