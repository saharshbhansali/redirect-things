import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function createRedirectResponse(url: string): NextResponse {
  const htmlContent = `<html>
    <head>
      <title>Redirecting...</title>
      <link rel="canonical" href="${url}" />
      <meta charset="utf-8" />
      <meta http-equiv="refresh" content="0; url=${url}" />
    </head>
    <body>
      <p>Redirecting...</p>
    </body>
  </html>`;

  const response = new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Location: url,
    },
    status: 302,
  });

  return response;
}

const hostRedirectMap: { [key: string]: string } = {
  "resume.saharshbhansali.dev":
    "https://saharshbhansali.github.io/about-me/resume.pdf",
  "about.saharshbhansali.dev": "https://saharshbhansali.github.io/about-me/",
  // Add more host-URL mappings here
};

export default async function middleware(request: Request) {
  const host = request.headers.get("host");

  console.log("hostname", host);

  if (host && hostRedirectMap[host]) {
    return createRedirectResponse(hostRedirectMap[host]);
  }

  // Handle cases where the host is not found in the mapping
  // return new NextResponse('Not Found', { status: 404 });
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
