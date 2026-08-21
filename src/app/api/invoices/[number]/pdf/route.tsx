import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { getClientByAuthUserId } from "@/lib/clients";
import { getInvoiceByNumber } from "@/lib/invoices";
import { getBooking } from "@/lib/bookings";
import { InvoicePdf } from "@/components/InvoicePdf";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { number } = await params;
  const invoiceNumber = Number(number);
  if (!Number.isFinite(invoiceNumber)) {
    return NextResponse.json({ error: "Invalid invoice number" }, { status: 400 });
  }

  const invoice = await getInvoiceByNumber(invoiceNumber);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const role = getUserRole(sessionUser);
  if (!isStaffRole(role)) {
    const client = await getClientByAuthUserId(sessionUser.id);
    if (!client || invoice.client_id !== client.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  const booking = await getBooking(invoice.booking_id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const buffer = await renderToBuffer(<InvoicePdf invoice={invoice} booking={booking} />);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${invoiceNumber}.pdf"`,
    },
  });
}
