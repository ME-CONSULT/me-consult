"use client";

import { AlertTriangle } from "lucide-react";

export type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

export default function ConfirmDialog({
  options,
  onConfirm,
  onCancel,
}: {
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", destructive = true } = options;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171b3d]/40 p-6">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          {destructive && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold text-[#222753]">{title}</h2>
            {description && <p className="mt-1 text-sm text-[#222753]/60">{description}</p>}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753]/70 hover:bg-[#222753]/5"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium text-white ${
              destructive ? "bg-red-600 hover:bg-red-700" : "bg-[#222753] hover:bg-[#222753]/90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
