import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/helpers/generateSession";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();

    const pathname = req.nextUrl.pathname;

    const session = req.cookies.get("session");

    if (!session && pathname === "/dashboard") {
      return NextResponse.redirect("/login");
    }

    const payload = await verifyToken(session?.value);

    if (!payload && pathname === "/dashboard") {
      return NextResponse.redirect("/login");
    }

    // console.log(payload);
  } catch (error) {}
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
