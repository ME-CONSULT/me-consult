import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSessionUser } from "@/lib/supabase/server";
import { getClientByAuthUserId } from "@/lib/clients";
import { getInvoiceByNumber } from "@/lib/invoices";
import { getBooking } from "@/lib/bookings";
import { formatNaira } from "@/lib/pricing";

export default async function PortalInvoicePage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const invoiceNumber = Number(number);

  const sessionUser = await getSessionUser();
  const client = sessionUser ? await getClientByAuthUserId(sessionUser.id) : null;
  if (!client) notFound();

  const invoice = Number.isFinite(invoiceNumber) ? await getInvoiceByNumber(invoiceNumber) : null;
  if (!invoice || invoice.client_id !== client.id) notFound();

  const booking = await getBooking(invoice.booking_id);
  if (!booking) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/portal"
        className="flex items-center gap-1.5 text-sm text-[#222753]/60 hover:text-[#222753]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to bookings
      </Link>

      <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#222753]">
              Invoice #{String(invoice.invoice_number).padStart(6, "0")}
            </h1>
            <p className="mt-1 text-sm text-[#222753]/50">
              {booking.title || booking.service || "Consultation"}
            </p>
          </div>
          <a
            href={`/api/invoices/${invoice.invoice_number}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] hover:brightness-95"
          >
            View / download PDF
          </a>
        </div>

        <div className="mt-4 space-y-1.5 border-t border-[#222753]/5 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-[#222753]/50">Issued</span>
            <span className="text-[#222753]">{new Date(invoice.issued_at).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-[#222753]/70">Total</span>
            <span className="text-[#222753]">{formatNaira(invoice.amount_kobo)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
