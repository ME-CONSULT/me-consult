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
  /** Hide this item for anyone below this role (only "admin" is used today). */
  minRole?: "admin";
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
      { label: "Booking links", href: "/admin/bookings/links" },
      { label: "Settings", href: "/admin/bookings/settings" },
    ],
  },
  { label: "Payments", href: "/admin/payments", icon: CreditCard, minRole: "admin" },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Users", href: "/admin/users", icon: ShieldCheck },
  { label: "Images", href: "/admin/images", icon: ImageIcon },
];
