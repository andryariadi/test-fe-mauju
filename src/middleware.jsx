// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Tentukan rute yang akan dijalankan middleware-nya
export const config = {
  matcher: ["/", "/user/:path*"],
};
