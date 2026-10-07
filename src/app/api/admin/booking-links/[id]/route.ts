import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { updateBookingLinkStatus } from "@/lib/bookingLinks";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (status !== "revoked") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const link = await updateBookingLinkStatus(id, "revoked");
  return NextResponse.json({ link });
}
