import { redirect } from "next/navigation";
import { CreditCard } from "lucide-react";
import { listPayments } from "@/lib/bookings";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/roles";
import EmptyState from "@/components/admin/EmptyState";

function formatNaira(kobo: number | null) {
  if (kobo === null) return "—";
  return `₦${(kobo / 100).toLocaleString()}`;
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-[#222753]/5 text-[#222753]/60",
  refunded: "bg-amber-100 text-amber-700",
};

export default async function AdminPaymentsPage() {
  const sessionUser = await getSessionUser();
  if (getUserRole(sessionUser) !== "admin") {
    redirect("/admin");
  }

  const payments = await listPayments();

  if (payments.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="No payments yet"
        description="Payments will appear here once bookings carry an amount. Paystack isn't connected yet, so nothing is marked paid automatically."
      />
    );
  }

  const totalPaidKobo = payments
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + (p.amount_kobo ?? 0), 0);
  const totalUnpaidKobo = payments
    .filter((p) => p.payment_status === "unpaid")
    .reduce((sum, p) => sum + (p.amount_kobo ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#222753]/10 bg-white p-5">
          <p className="text-sm text-[#222753]/50">Total paid</p>
          <p className="mt-1 text-2xl font-semibold text-[#222753]">
            {formatNaira(totalPaidKobo)}
          </p>
        </div>
        <div className="rounded-xl border border-[#222753]/10 bg-white p-5">
          <p className="text-sm text-[#222753]/50">Outstanding</p>
          <p className="mt-1 text-2xl font-semibold text-[#222753]">
            {formatNaira(totalUnpaidKobo)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Reference</th>
              <th className="px-6 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-[#222753]/5 last:border-0">
                <td className="px-6 py-3.5">
                  <p className="font-medium text-[#222753]">{p.client_name}</p>
                  <p className="text-xs text-[#222753]/50">{p.client_email}</p>
                </td>
                <td className="px-6 py-3.5 text-[#222753]/70">{formatNaira(p.amount_kobo)}</td>
                <td className="px-6 py-3.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[p.payment_status]}`}
                  >
                    {p.payment_status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-[#222753]/50">{p.paystack_reference ?? "—"}</td>
                <td className="px-6 py-3.5 text-[#222753]/70">
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
