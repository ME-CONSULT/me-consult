import type { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#222753]/15 bg-white py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#222753]/5">
        <Icon className="h-5 w-5 text-[#222753]/40" />
      </div>
      <h2 className="mt-4 text-sm font-semibold text-[#222753]">{title}</h2>
      <p className="mt-1 max-w-xs text-sm text-[#222753]/50">{description}</p>
    </div>
  );
}
