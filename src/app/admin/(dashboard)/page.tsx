import { CalendarClock, CalendarCheck, Users, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { listImages } from "@/lib/r2";
import { listBookings, listBookingsBetween } from "@/lib/bookings";
import { listClients } from "@/lib/clients";
import { listLawyers } from "@/lib/lawyers";
import { mondayOf, todayLagosDateStr, weekRangeUTC } from "@/lib/calendarWeek";
import DashboardWeekCalendar from "@/components/admin/DashboardWeekCalendar";

async function getStats() {
  const admin = supabaseAdmin();
  const [{ data: usersData }, images, pending, active, clients] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 200 }),
    listImages(),
    listBookings("pending"),
    listBookings("active"),
    listClients(),
  ]);

  return {
    admins: usersData?.users.length ?? 0,
    images: images.length,
    pending: pending.length,
    active: active.length,
    clients: clients.length,
  };
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const todayStr = todayLagosDateStr();
  const mondayStr = mondayOf(week && /^\d{4}-\d{2}-\d{2}$/.test(week) ? week : todayStr);
  const { startISO, endISO } = weekRangeUTC(mondayStr);

  const [stats, weekBookings, lawyers] = await Promise.all([
    getStats(),
    listBookingsBetween(startISO, endISO),
    listLawyers(),
  ]);

  const cards = [
    { label: "Pending bookings", value: stats.pending, icon: CalendarClock, href: "/admin/bookings/pending" },
    { label: "Active bookings", value: stats.active, icon: CalendarCheck, href: "/admin/bookings/active" },
    { label: "Clients", value: stats.clients, icon: Users, href: "/admin/clients" },
    { label: "Admins", value: stats.admins, icon: ShieldCheck, href: "/admin/users" },
    { label: "Images", value: stats.images, icon: ImageIcon, href: "/admin/images" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.label}
              href={card.href}
              className="rounded-xl border border-[#222753]/10 bg-white p-5 transition hover:border-[#222753]/20"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#222753]/5">
                <Icon className="h-4 w-4 text-[#222753]/60" />
              </div>
              <p className="mt-4 text-2xl font-semibold text-[#222753]">{card.value}</p>
              <p className="text-sm text-[#222753]/50">{card.label}</p>
            </a>
          );
        })}
      </div>

      <DashboardWeekCalendar
        bookings={weekBookings}
        lawyers={lawyers}
        mondayStr={mondayStr}
        todayStr={todayStr}
      />
    </div>
  );
}
