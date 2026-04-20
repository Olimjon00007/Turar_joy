import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;

  // Protect /admin/dashboard and other admin subroutes
  if (path.startsWith("/admin/dashboard") || (path.startsWith("/admin") && path !== "/admin/login")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const decoded = await decrypt(session);
      if (!decoded) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect to dashboard if logged in and trying to access login page
  if (path === "/admin/login" && session) {
    try {
      const decoded = await decrypt(session);
      if (decoded) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    } catch (err) {
      // Ignore
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
