import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const host = request.nextUrl.host;

  const response = new NextResponse(`<html>
  <head>
    <title>Redirecting...</title>
    <link rel="canonical" href="https://saharshbhansali.github.io/about-me/resume.pdf" />
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=https://saharshbhansali.github.io/about-me/resume.pdf" />
  </head>
  <body>
    <p>Redirecting...</p>
  </body>
</html>
`);

  response.headers.set('Content-Type', 'text/html; charset=utf-8');

  console.log("hostname", host);

  if (host === "resume.saharshbhansali.dev") {
    return response;
  }

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
