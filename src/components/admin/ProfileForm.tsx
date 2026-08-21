"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({
  email,
  initialFullName,
  createdAt,
}: {
  email: string;
  initialFullName: string;
  createdAt: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialFullName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not save profile");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-4 rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6"
    >
      <div>
        <label className="block text-sm font-medium text-[#222753]">Display name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
        />
        <p className="mt-1 text-xs text-[#222753]/40">Shown in the dashboard greeting.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222753]">Email</label>
        <p className="mt-1.5 rounded-lg bg-[#222753]/5 px-3 py-2 text-sm text-[#222753]/60">
          {email}
        </p>
      </div>

      {createdAt && (
        <p className="text-xs text-[#222753]/40">
          Admin since {new Date(createdAt).toLocaleDateString()}
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
