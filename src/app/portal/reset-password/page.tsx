import { Suspense } from "react";
import ResetPasswordForm from "@/components/portal/ResetPasswordForm";

export default function PortalResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
