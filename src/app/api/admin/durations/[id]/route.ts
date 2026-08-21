import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { deleteDuration } from "@/lib/durations";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteDuration(id);
  return NextResponse.json({ ok: true });
}
