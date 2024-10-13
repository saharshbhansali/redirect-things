import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const host = request.nextUrl.host;

  console.log("hostname", host);

  if (host === "resume.saharshbhansali.dev") {
    return NextResponse.redirect(
      "https://saharshbhansali.github.io/about-me/resume.pdf",
    );
  }
  if (host === "my-resume.saharshbhansali.dev") {
    return NextResponse.redirect(
      "https://saharshbhansali.github.io/about-me/resume.pdf",
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
