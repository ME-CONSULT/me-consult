import { listLawyers } from "@/lib/lawyers";
import { listRates } from "@/lib/consultationRates";
import { listDurations } from "@/lib/durations";
import { getSettings } from "@/lib/settings";
import CreateBookingForm from "@/components/admin/CreateBookingForm";

export default async function AdminCreateBookingPage() {
  const [lawyers, rates, durations, settings] = await Promise.all([
    listLawyers(true),
    listRates(),
    listDurations(),
    getSettings(),
  ]);

  return (
    <CreateBookingForm
      lawyers={lawyers}
      rates={rates}
      durations={durations}
      vatRate={settings.vat_rate}
    />
  );
}
