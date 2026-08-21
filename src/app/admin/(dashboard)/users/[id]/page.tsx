import { notFound } from "next/navigation";
import { supabaseServerAuth } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import UserDetailClient from "@/components/admin/UserDetailClient";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ data: sessionData }, { data: targetData }] = await Promise.all([
    (await supabaseServerAuth()).auth.getUser(),
    supabaseAdmin().auth.admin.getUserById(id),
  ]);

  if (!targetData?.user) notFound();

  return (
    <UserDetailClient
      user={{
        id: targetData.user.id,
        email: targetData.user.email ?? "",
        createdAt: targetData.user.created_at,
        lastSignInAt: targetData.user.last_sign_in_at ?? null,
      }}
      isSelf={targetData.user.id === sessionData.user?.id}
    />
  );
}
