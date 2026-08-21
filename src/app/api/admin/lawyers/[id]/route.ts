import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { updateLawyer, deleteLawyer } from "@/lib/lawyers";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const fields: Record<string, unknown> = {};

  for (const key of ["first_name", "last_name", "tier", "title", "photo_url", "bio", "sort_order", "active"]) {
    if (body[key] !== undefined) fields[key] = body[key];
  }

  const lawyer = await updateLawyer(id, fields);
  return NextResponse.json({ lawyer });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteLawyer(id);
  return NextResponse.json({ ok: true });
}
