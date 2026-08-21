import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getClient } from "@/lib/clients";
import { formatNaira } from "@/lib/pricing";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;
  const client = await getClient(decodeURIComponent(email));

  if (!client) notFound();

  const { summary, bookings } = client;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className="flex items-center gap-1.5 text-sm text-[#222753]/60 hover:text-[#222753]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      <div className="rounded-xl border border-[#222753]/10 bg-white p-6">
        <h1 className="text-lg font-semibold text-[#222753]">{summary.name}</h1>
        <p className="text-sm text-[#222753]/50">
          {summary.email}
          {summary.phone && ` · ${summary.phone}`}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-[#222753]/5 pt-4">
          <div>
            <p className="text-xs text-[#222753]/40">Bookings</p>
            <p className="text-lg font-semibold text-[#222753]">{summary.bookingsCount}</p>
          </div>
          <div>
            <p className="text-xs text-[#222753]/40">Total paid</p>
            <p className="text-lg font-semibold text-[#222753]">
              {formatNaira(summary.totalPaidKobo)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#222753]/40">Last booking</p>
            <p className="text-lg font-semibold text-[#222753]">
              {new Date(summary.lastBookingAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Booked</th>
              <th className="px-6 py-3 font-medium">Regarding</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-[#222753]/5 last:border-0">
                <td className="px-6 py-3.5">
                  <Link href={`/admin/bookings/${b.id}`} className="text-[#222753] hover:underline">
                    {new Date(b.created_at).toLocaleDateString()}
                  </Link>
                </td>
                <td className="px-6 py-3.5 text-[#222753]/70">{b.service ?? "—"}</td>
                <td className="px-6 py-3.5 text-[#222753]/70">{b.status}</td>
                <td className="px-6 py-3.5 text-[#222753]/70">{formatNaira(b.amount_kobo)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
