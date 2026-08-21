import Link from "next/link";
import { CalendarClock, FileText } from "lucide-react";
import { getSessionUser } from "@/lib/supabase/server";
import { getClientByAuthUserId } from "@/lib/clients";
import { listBookingsByClientId } from "@/lib/bookings";
import { listLawyers, type Lawyer } from "@/lib/lawyers";
import { listInvoicesForClient } from "@/lib/invoices";
import { formatNaira } from "@/lib/pricing";

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  completed: "bg-[#222753]/10 text-[#222753]/60",
  cancelled: "bg-red-100 text-red-700",
};

export default async function PortalDashboardPage() {
  const sessionUser = await getSessionUser();
  const client = sessionUser ? await getClientByAuthUserId(sessionUser.id) : null;

  if (!client) {
    return (
      <p className="text-sm text-[#222753]/60">
        We couldn&apos;t find your client record. Please contact us for help.
      </p>
    );
  }

  const [bookings, lawyers, invoices] = await Promise.all([
    listBookingsByClientId(client.id),
    listLawyers(),
    listInvoicesForClient(client.id),
  ]);

  const lawyerById = new Map<string, Lawyer>(lawyers.map((l) => [l.id, l]));
  const invoiceNumberByBookingId = new Map(invoices.map((inv) => [inv.booking_id, inv.invoice_number]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#222753]">Your bookings</h1>
        <p className="mt-1 text-sm text-[#222753]/60">
          View upcoming and past consultations, reschedule, or view an invoice.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-[#222753]/10 bg-white p-8 text-center">
          <p className="text-sm text-[#222753]/50">You don&apos;t have any bookings yet.</p>
          <Link
            href="/book"
            className="mt-4 inline-block rounded-full bg-[#222753] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#222753]/90"
          >
            Book a consultation
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const lawyer = b.lawyer_id ? lawyerById.get(b.lawyer_id) : undefined;
            const canReschedule = b.status === "pending" || b.status === "active";
            return (
              <div key={b.id} className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[#222753]">
                      {b.title || b.service || "Consultation"}
                    </p>
                    <p className="mt-0.5 text-sm text-[#222753]/50">
                      {lawyer ? `${lawyer.first_name} ${lawyer.last_name} · ` : ""}
                      {b.scheduled_at
                        ? new Date(b.scheduled_at).toLocaleString("en-NG", {
                            timeZone: "Africa/Lagos",
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "To be arranged"}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[b.status]}`}>
                    {b.status}
                  </span>
                </div>

                {b.meeting_url && b.status === "active" && (
                  <a
                    href={b.meeting_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block rounded-lg bg-[#ffda00] px-3 py-1.5 text-xs font-semibold text-[#222753] hover:brightness-95"
                  >
                    Join video call
                  </a>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#222753]/5 pt-3 text-sm">
                  <span className="text-[#222753]/60">{formatNaira(b.amount_kobo)}</span>
                  {canReschedule && (
                    <Link
                      href={`/portal/bookings/${b.id}/reschedule`}
                      className="flex items-center gap-1 text-[#222753] hover:underline"
                    >
                      <CalendarClock className="h-3.5 w-3.5" />
                      Reschedule
                    </Link>
                  )}
                  {invoiceNumberByBookingId.has(b.id) && (
                    <Link
                      href={`/portal/invoices/${invoiceNumberByBookingId.get(b.id)}`}
                      className="flex items-center gap-1 text-[#222753] hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Invoice
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
