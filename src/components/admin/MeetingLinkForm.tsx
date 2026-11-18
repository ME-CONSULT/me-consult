"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MeetingLinkForm({
  bookingId,
  initialUrl,
}: {
  bookingId: string;
  initialUrl: string | null;
}) {
  const router = useRouter();
  const [url, setUrl] = useState(initialUrl ?? "");
  const [saved, setSaved] = useState(initialUrl ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const trimmed = url.trim();
  const unchanged = trimmed === saved;

  async function submit() {
    if (!/^https:\/\/\S+$/i.test(trimmed)) {
      setMessage({ ok: false, text: "Paste a full link starting with https://" });
      return;
    }
    setBusy(true);
    setMessage(null);
    const res = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meeting_url: trimmed, resend_meeting_email: unchanged }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setMessage({ ok: false, text: data.error ?? "Couldn't save the link. Try again." });
      return;
    }
    setSaved(trimmed);
    setMessage({ ok: true, text: "Saved and emailed to the client. It's now in their account." });
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setMessage(null);
          }}
          placeholder="https://meet.google.com/... or Zoom link"
          className="min-w-0 flex-1 rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
        />
        <button
          onClick={submit}
          disabled={busy || !trimmed}
          className="shrink-0 rounded-lg bg-[#222753] px-4 py-2 text-sm font-medium text-white hover:bg-[#222753]/90 disabled:opacity-50"
        >
          {busy ? "Sending..." : saved && unchanged ? "Resend to client" : "Save & send to client"}
        </button>
      </div>
      {message && (
        <p className={`mt-1.5 text-xs ${message.ok ? "text-green-700" : "text-red-600"}`}>{message.text}</p>
      )}
    </div>
  );
}
