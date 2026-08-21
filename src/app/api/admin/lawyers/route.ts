import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { listLawyers, createLawyer } from "@/lib/lawyers";

const VALID_TIERS = ["consultant_associate", "lead_consultant", "of_counsel"];

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lawyers = await listLawyers();
  return NextResponse.json({ lawyers });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { first_name, last_name, tier, title } = body;

  if (!first_name || !last_name || !title) {
    return NextResponse.json({ error: "Name and title are required" }, { status: 400 });
  }
  if (!VALID_TIERS.includes(tier)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const lawyer = await createLawyer({
    first_name,
    last_name,
    tier,
    title,
    photo_url: body.photo_url ?? null,
    bio: body.bio ?? null,
    sort_order: Number.isFinite(body.sort_order) ? body.sort_order : 0,
  });

  return NextResponse.json({ lawyer });
}
