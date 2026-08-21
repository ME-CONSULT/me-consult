import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { deleteBlockedEmail } from "@/lib/blockedEmails";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteBlockedEmail(id);
  return NextResponse.json({ ok: true });
}
