import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
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
    "/profile/:path*"
  ]
}
