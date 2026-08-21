import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getUserRole } from "@/lib/roles";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin/login";
  const isPortalRoute = pathname.startsWith("/portal");
  const isPortalPublicRoute = pathname === "/portal/login" || pathname === "/portal/forgot-password" || pathname === "/portal/reset-password";

  if (isAdminRoute && !isAdminLoginRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (isAdminLoginRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (isPortalRoute && !isPortalPublicRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/login";
    return NextResponse.redirect(url);
  }

  if (user) {
    const role = getUserRole(user);

    // A client account should never reach the admin dashboard or its login
    // (avoids exposing/attempting the admin OTP flow against a client account).
    if (role === "client" && isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }

    // An admin/staff session visiting the client portal gets sent back to
    // their own dashboard rather than looping between /portal and /portal/login.
    if (role !== "client" && isPortalRoute && !isPortalPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    // Record the client's first successful portal visit (fire-and-forget;
    // never blocks the response). Runs on every /portal/* request until the
    // field is set, then never again for that client.
    if (role === "client" && isPortalRoute && !isPortalPublicRoute) {
      const admin = supabaseAdmin();
      admin
        .from("clients")
        .update({ first_login_at: new Date().toISOString() })
        .eq("auth_user_id", user.id)
        .is("first_login_at", null)
        .then(() => {});
    }
  }

  return supabaseResponse;
}
