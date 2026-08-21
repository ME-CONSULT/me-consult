import { getSettings } from "@/lib/settings";
import { listLawyers } from "@/lib/lawyers";
import { listRates } from "@/lib/consultationRates";
import { listAvailability } from "@/lib/lawyerAvailability";
import { listDurations } from "@/lib/durations";
import { listBlockedEmails } from "@/lib/blockedEmails";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/roles";
import SettingsBusinessForm from "@/components/admin/SettingsBusinessForm";
import SettingsLawyersManager from "@/components/admin/SettingsLawyersManager";
import SettingsDurationsManager from "@/components/admin/SettingsDurationsManager";
import SettingsRatesEditor from "@/components/admin/SettingsRatesEditor";
import SettingsAvailabilityEditor from "@/components/admin/SettingsAvailabilityEditor";
import SettingsBlocklistManager from "@/components/admin/SettingsBlocklistManager";
import SettingsDefaultBookingForm from "@/components/admin/SettingsDefaultBookingForm";

export default async function AdminSettingsPage() {
  const sessionUser = await getSessionUser();
  const isAdmin = getUserRole(sessionUser) === "admin";

  const [settings, lawyers, rates, availability, durations, blockedEmails] = await Promise.all([
    getSettings(),
    listLawyers(),
    listRates(),
    listAvailability(),
    listDurations(),
    listBlockedEmails(),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-3 text-base font-semibold text-[#222753]">Business</h2>
        <SettingsBusinessForm initialSettings={settings} canEditVatRate={isAdmin} />
      </section>

      <section>
        <h2 className="border-b border-[#222753]/10 pb-2 text-base font-semibold text-[#222753]">
          Booking settings
        </h2>

        <div className="mt-5 space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#222753]">Lawyers</h3>
            <SettingsLawyersManager initialLawyers={lawyers} />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#222753]">Consultation durations</h3>
            <SettingsDurationsManager initialDurations={durations} />
          </div>

          {isAdmin && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#222753]">Consultation rates</h3>
              <SettingsRatesEditor initialRates={rates} lawyers={lawyers} durations={durations} />
            </div>
          )}

          {isAdmin && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#222753]">Default booking page</h3>
              <SettingsDefaultBookingForm initialSettings={settings} lawyers={lawyers} durations={durations} />
            </div>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#222753]">Lawyer availability</h3>
            <SettingsAvailabilityEditor lawyers={lawyers} initialAvailability={availability} />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#222753]">Blocked emails</h3>
            <p className="mb-3 text-sm text-[#222753]/50">
              Block a specific email or an entire domain (e.g. <code>@example.com</code>) from
              submitting bookings.
            </p>
            <SettingsBlocklistManager initialEntries={blockedEmails} />
          </div>
        </div>
      </section>
    </div>
  );
}
