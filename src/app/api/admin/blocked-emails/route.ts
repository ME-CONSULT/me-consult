import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { listBlockedEmails, addBlockedEmail } from "@/lib/blockedEmails";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await listBlockedEmails();
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pattern, reason } = await request.json();
  if (typeof pattern !== "string" || !pattern.trim()) {
    return NextResponse.json({ error: "An email or @domain is required" }, { status: 400 });
  }

  const normalized = pattern.trim().toLowerCase();
  if (!normalized.includes("@")) {
    return NextResponse.json({ error: "Enter a full email or @domain.com" }, { status: 400 });
  }

  const entry = await addBlockedEmail(normalized, typeof reason === "string" ? reason.trim() || null : null, sessionUser.id);
  return NextResponse.json({ entry });
}
