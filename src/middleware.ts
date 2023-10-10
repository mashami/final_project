export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
export const config = {
  matcher: ["/dev-profile/:path* ", "/payment/:path"]
}

export async function middleware(req: NextRequest) {
  const session = await getToken({ req })
  const url = req.nextUrl
  const path = url.pathname
  if (
    !session &&
    (path.startsWith("/profile") || path.startsWith("/account"))
  ) {
    const url = req.nextUrl.clone()
    url.pathname = "/signin"
    return NextResponse.redirect(url)
  }
}
