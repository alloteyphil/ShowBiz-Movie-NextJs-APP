import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/helpers/generateSession";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();

    const pathname = req.nextUrl.pathname;

    const session = req.cookies.get("session");

    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const payload = await verifyToken(session?.value);

    if (!payload && pathname === "/dashboard") {
      return NextResponse.redirect("/login");
    }

    return res;
  } catch (error) {}
}

export const config = {
  matcher: ["/profile"],
};
