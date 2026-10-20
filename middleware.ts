// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const session = await auth()
  const isAuthenticated = !!session
  const pathname = req.nextUrl.pathname

  const protectedApiRoutes = [
    "/api/orders",
    "/api/seller",
    "/api/admin",
    "/api/shops/create",
  ]

  const protectedPageRoutes = [
    "/orders",
    "/seller",
    "/admin",
  ]

  const isProtectedApi = protectedApiRoutes.some(route => pathname.startsWith(route))
  const isProtectedPage = protectedPageRoutes.some(route => pathname.startsWith(route))

  if (isProtectedApi && !isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 })
  }

  if (isProtectedPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/orders/:path*",
    "/api/seller/:path*",
    "/api/admin/:path*",
    "/orders/:path*",
    "/seller/:path*",
    "/admin/:path*",
  ]
}