import Link from "next/link";
import { Users } from "lucide-react";
import { listClients } from "@/lib/clients";
import EmptyState from "@/components/admin/EmptyState";

function formatNaira(kobo: number) {
  return `₦${(kobo / 100).toLocaleString()}`;
}

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
    <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
            <th className="px-6 py-3 font-medium">Client</th>
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
                  {c.name}
                </Link>
                <p className="text-xs text-[#222753]/50">
                  {c.email}
                  {c.phone && ` · ${c.phone}`}
                </p>
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
