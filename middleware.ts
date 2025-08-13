import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Check if user has admin role
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
      }
    }

    // Check if user is trying to access API admin routes
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      // Check if user has admin role
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (
           req.nextUrl.pathname === "/auth/signin" ||
          req.nextUrl.pathname === "/" ||
          req.nextUrl.pathname.startsWith("/about") ||
          req.nextUrl.pathname.startsWith("/contact") ||
          req.nextUrl.pathname.startsWith("/rescue-stories") ||
          req.nextUrl.pathname.startsWith("/donate") ||
          req.nextUrl.pathname.startsWith("/api/donations") ||
          req.nextUrl.pathname.startsWith("/api/auth")
        ) {
          return true
        }

        // For protected routes, require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/profile/:path*"
  ]
}
