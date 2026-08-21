import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { listDurations, createDuration } from "@/lib/durations";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const durations = await listDurations();
  return NextResponse.json({ durations });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { minutes } = await request.json();

  if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) {
    return NextResponse.json({ error: "Enter a whole number of minutes (1-480)" }, { status: 400 });
  }

  try {
    const duration = await createDuration(minutes);
    return NextResponse.json({ duration });
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "23505") {
      return NextResponse.json({ error: "That duration already exists" }, { status: 409 });
    }
    throw err;
  }
}
