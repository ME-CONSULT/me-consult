import { supabaseServerAuth } from "@/lib/supabase/server";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function AdminProfilePage() {
  const supabase = await supabaseServerAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName =
    typeof user?.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "";

  return (
    <ProfileForm
      email={user?.email ?? ""}
      initialFullName={fullName}
      createdAt={user?.created_at ?? ""}
    />
  );
}
