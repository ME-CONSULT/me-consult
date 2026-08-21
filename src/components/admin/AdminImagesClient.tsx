"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Trash2, ImageOff, X, Copy, Check } from "lucide-react";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

type ImageItem = {
  key: string;
  size: number;
  lastModified: string | null;
  url: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminImagesClient({ initialImages }: { initialImages: ImageItem[] }) {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<ImageItem | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { confirm, dialog } = useConfirmDialog();

  async function loadImages() {
    const res = await fetch("/api/admin/images");
    if (res.ok) {
      const data = await res.json();
      setImages(data.images);
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/images", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: null }));
        setError(data.error ?? `Could not upload ${file.name}`);
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadImages();
  }

  async function handleDelete(key: string) {
    const ok = await confirm({ title: "Delete this image?", confirmLabel: "Delete" });
    if (!ok) return;
    setDeletingKey(key);

    const res = await fetch(`/api/admin/images?key=${encodeURIComponent(key)}`, {
      method: "DELETE",
    });

    setDeletingKey(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not delete image");
      return;
    }

    setSelected((prev) => (prev?.key === key ? null : prev));
    loadImages();
  }

  function handleCopy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#222753]/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#222753]">Site images</h2>
            <p className="mt-1 text-sm text-[#222753]/50">
              Stored in Cloudflare R2. JPEG, PNG, WebP, SVG or GIF, up to 8MB.
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
              multiple
              disabled={uploading}
              onChange={(e) => handleUpload(e.target.files)}
              className="hidden"
            />
          </label>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#222753]/15 bg-white py-16">
          <ImageOff className="h-8 w-8 text-[#222753]/20" />
          <p className="mt-3 text-sm text-[#222753]/50">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.key}
              className="group relative overflow-hidden rounded-xl border border-[#222753]/10 bg-white"
            >
              <button
                onClick={() => setSelected(img)}
                className="relative block aspect-square w-full bg-[#222753]/5"
              >
                <Image src={img.url} alt="" fill className="object-cover" unoptimized />
              </button>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-[#222753]/50">{formatSize(img.size)}</span>
                <button
                  onClick={() => handleDelete(img.key)}
                  disabled={deletingKey === img.key}
                  className="rounded-lg p-1 text-[#222753]/40 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  aria-label="Delete image"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#171b3d]/80 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-[#222753]/5">
              <Image src={selected.url} alt="" fill className="object-contain" unoptimized />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#222753]">{selected.key}</p>
                <p className="text-xs text-[#222753]/50">{formatSize(selected.size)}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => handleCopy(selected.url)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753]/70 hover:bg-[#222753]/5"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy URL"}
                </button>
                <button
                  onClick={() => handleDelete(selected.key)}
                  disabled={deletingKey === selected.key}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-1.5 text-[#222753]/40 hover:bg-[#222753]/5"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {dialog}
    </div>
  );
}
