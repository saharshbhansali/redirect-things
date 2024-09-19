import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hostRedirectMap: { [key: string]: string } = {
  "resume.saharshbhansali.dev": "https://saharshbhansali.github.io/about-me/resume.pdf",
  // Add more host-URL mappings here
};

function createRedirectResponse(url: string): NextResponse {
  return new NextResponse(`<html>
    <head>
      <title>Redirecting...</title>
      <link rel="canonical" href="${url}" />
      <meta charset="utf-8" />
      <meta http-equiv="refresh" content="0; url=${url}" />
    </head>
    <body>
      <p>Redirecting...</p>
    </body>
  </html>`, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}

export default async function middleware(request: NextRequest){
  const host = request.headers.get('host');

  console.log("hostname", host);

  if (host && hostRedirectMap[host]) {
    return createRedirectResponse(hostRedirectMap[host]);
  }

  // Handle cases where the host is not found in the mapping
  return new NextResponse('Not Found', { status: 404 });
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
