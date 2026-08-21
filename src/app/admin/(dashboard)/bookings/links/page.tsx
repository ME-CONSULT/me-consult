import { listLawyers } from "@/lib/lawyers";
import { listBookingLinks } from "@/lib/bookingLinks";
import CreateBookingLinkForm from "@/components/admin/CreateBookingLinkForm";

export default async function AdminBookingLinksPage() {
  const [lawyers, links] = await Promise.all([listLawyers(true), listBookingLinks()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-[#222753]">Booking links</h1>
        <p className="mt-1 text-sm text-[#222753]/60">
          Create a bespoke, shareable link with a custom price and one or more consultants — send
          it directly to a client to complete and pay. Attach more than one consultant to let the
          client pick a combined session.
        </p>
      </div>

      <CreateBookingLinkForm lawyers={lawyers} initialLinks={links} />
    </div>
  );
}
