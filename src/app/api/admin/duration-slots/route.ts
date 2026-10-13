import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { setDurationSlots } from "@/lib/lawyerAvailability";
import { getLawyer } from "@/lib/lawyers";

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function PUT(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lawyer_id, duration_minutes, start_times } = await request.json();

  if (typeof lawyer_id !== "string" || !(await getLawyer(lawyer_id))) {
    return NextResponse.json({ error: "Unknown lawyer" }, { status: 400 });
  }
  if (!Number.isInteger(duration_minutes) || duration_minutes <= 0) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }
  if (
    !Array.isArray(start_times) ||
    start_times.length > 48 ||
    !start_times.every((t: unknown) => typeof t === "string" && TIME_RE.test(t))
  ) {
    return NextResponse.json({ error: "Invalid start times" }, { status: 400 });
  }

  await setDurationSlots(lawyer_id, duration_minutes, start_times);
  return NextResponse.json({ ok: true });
}
