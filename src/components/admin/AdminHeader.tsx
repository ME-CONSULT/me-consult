import Link from "next/link";
import { Menu, MessageSquare } from "lucide-react";
import { timeGreeting } from "@/lib/greeting";
import GlobalSearch from "@/components/admin/GlobalSearch";
import AdminAvatarMenu from "@/components/admin/AdminAvatarMenu";

export default function AdminHeader({
  email,
  displayName,
  onMenuClick,
}: {
  email: string;
  displayName: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-[#222753]/10 bg-white px-4 py-4 sm:gap-6 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#222753]/60 hover:bg-[#222753]/5 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden shrink-0 sm:block">
        <h1 className="text-lg font-semibold text-[#222753]">
          {timeGreeting()}, {displayName}
        </h1>
      </div>

      <div className="flex-1">
        <GlobalSearch />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/admin/messages"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#222753]/50 hover:bg-[#222753]/5 hover:text-[#222753]"
          aria-label="Messages"
        >
          <MessageSquare className="h-4 w-4" />
        </Link>
        <AdminAvatarMenu email={email} displayName={displayName} />
      </div>
    </header>
  );
}
