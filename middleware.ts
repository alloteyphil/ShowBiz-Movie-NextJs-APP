import { NextResponse, type NextRequest } from "next/server";
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

    if (!payload && pathname === "/profile") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  matcher: ["/profile", "/profile/editProfile"],
};
