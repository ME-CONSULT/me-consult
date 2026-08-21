import Link from "next/link";
import { Users } from "lucide-react";
import { listClients, type ClientStatus } from "@/lib/clients";
import EmptyState from "@/components/admin/EmptyState";

function formatNaira(kobo: number) {
  return `₦${(kobo / 100).toLocaleString()}`;
}

const STATUS_LABEL: Record<ClientStatus, string> = {
  not_sent: "Not sent",
  login_sent: "Login sent",
  active: "Active",
};

const STATUS_STYLE: Record<ClientStatus, string> = {
  not_sent: "bg-[#222753]/5 text-[#222753]/50",
  login_sent: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
};

export default async function AdminClientsPage() {
  const clients = await listClients();

  if (clients.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No clients yet"
        description="Client records build up here automatically from bookings."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#222753]/10 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
            <th className="px-6 py-3 font-medium">Client</th>
            <th className="px-6 py-3 font-medium">Account</th>
            <th className="px-6 py-3 font-medium">Bookings</th>
            <th className="px-6 py-3 font-medium">Total paid</th>
            <th className="px-6 py-3 font-medium">Last booking</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.email} className="border-b border-[#222753]/5 last:border-0">
              <td className="px-6 py-3.5">
                <Link
                  href={`/admin/clients/${encodeURIComponent(c.email)}`}
                  className="font-medium text-[#222753] hover:underline"
                >
                  {c.name ?? c.email}
                </Link>
                <p className="text-xs text-[#222753]/50">
                  {c.email}
                  {c.phone && ` · ${c.phone}`}
                </p>
              </td>
              <td className="px-6 py-3.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[c.status]}`}>
                  {STATUS_LABEL[c.status]}
                </span>
              </td>
              <td className="px-6 py-3.5 text-[#222753]/70">{c.bookingsCount}</td>
              <td className="px-6 py-3.5 text-[#222753]/70">{formatNaira(c.totalPaidKobo)}</td>
              <td className="px-6 py-3.5 text-[#222753]/70">
                {new Date(c.lastBookingAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
