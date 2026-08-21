"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type BookingResult = {
  id: string;
  clientName: string;
  clientEmail: string;
  status: "pending" | "active" | "completed" | "cancelled";
};

type AdminResult = { id: string; email: string };

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingResult[]>([]);
  const [admins, setAdmins] = useState<AdminResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) return;

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings);
        setAdmins(data.admins);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const hasResults = bookings.length > 0 || admins.length > 0;

  function goTo(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#222753]/30" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Search bookings, clients, admins..."
        className="w-full rounded-lg border border-[#222753]/15 bg-[#f5f6fa] py-2 pl-9 pr-3 text-sm text-[#222753] outline-none placeholder:text-[#222753]/40 focus:border-[#222753]/30 focus:bg-white"
      />

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[#222753]/10 bg-white shadow-lg">
          {!hasResults ? (
            <p className="px-4 py-6 text-center text-sm text-[#222753]/40">No results.</p>
          ) : (
            <>
              {bookings.length > 0 && (
                <div className="py-2">
                  <p className="px-4 py-1 text-xs font-medium uppercase tracking-wide text-[#222753]/40">
                    Bookings
                  </p>
                  {bookings.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => goTo(`/admin/bookings/${b.id}`)}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-[#222753]/5"
                    >
                      <span>
                        <span className="font-medium text-[#222753]">{b.clientName}</span>
                        <span className="ml-2 text-[#222753]/50">{b.clientEmail}</span>
                      </span>
                      <span className="text-xs text-[#222753]/40">{b.status}</span>
                    </button>
                  ))}
                </div>
              )}
              {admins.length > 0 && (
                <div className="border-t border-[#222753]/5 py-2">
                  <p className="px-4 py-1 text-xs font-medium uppercase tracking-wide text-[#222753]/40">
                    Admins
                  </p>
                  {admins.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => goTo(`/admin/users/${a.id}`)}
                      className="block w-full px-4 py-2 text-left text-sm text-[#222753] hover:bg-[#222753]/5"
                    >
                      {a.email}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
