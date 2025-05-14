import { NextResponse } from "next/server";

export const config = { matcher: ["/"] };

export default function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  return NextResponse.next();
}