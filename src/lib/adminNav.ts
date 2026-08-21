import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  CalendarCheck,
  CreditCard,
  Users,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
};

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
    children: [
      { label: "Pending", href: "/admin/bookings/pending" },
      { label: "Active", href: "/admin/bookings/active" },
      { label: "Create booking", href: "/admin/bookings/new" },
      { label: "Settings", href: "/admin/bookings/settings" },
    ],
  },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Users", href: "/admin/users", icon: ShieldCheck },
  { label: "Images", href: "/admin/images", icon: ImageIcon },
];
