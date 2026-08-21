import { MessageSquare } from "lucide-react";
import EmptyState from "@/components/admin/EmptyState";

export default function AdminMessagesPage() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No messages yet"
      description="Messaging isn't connected to anything yet. This is a placeholder for when it is."
    />
  );
}
