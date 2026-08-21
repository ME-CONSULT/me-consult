import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { listAvailability, upsertAvailability } from "@/lib/lawyerAvailability";
import { getLawyer } from "@/lib/lawyers";

const TIME_RE = /^\d{2}:\d{2}$/;

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const availability = await listAvailability();
  return NextResponse.json({ availability });
}

export async function PATCH(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lawyer_id, weekday, start_time, end_time } = await request.json();

  if (typeof lawyer_id !== "string" || !(await getLawyer(lawyer_id))) {
    return NextResponse.json({ error: "Unknown lawyer" }, { status: 400 });
  }
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    return NextResponse.json({ error: "Invalid weekday" }, { status: 400 });
  }
  if (!TIME_RE.test(start_time) || !TIME_RE.test(end_time)) {
    return NextResponse.json({ error: "Invalid time format" }, { status: 400 });
  }
  if (start_time >= end_time) {
    return NextResponse.json({ error: "End time must be after start time" }, { status: 400 });
  }

  const row = await upsertAvailability(lawyer_id, weekday, start_time, end_time);
  return NextResponse.json({ availability: row });
}
