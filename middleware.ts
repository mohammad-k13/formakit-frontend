import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
      const pathname = request.nextUrl.pathname;
      const loginUrl = new URL('/auth/login', request.url);

      if(pathname === '/') {
            return NextResponse.redirect(loginUrl);
      }
}

export const config = {
      matcher: [
            /*
             * Match all request paths except for the ones starting with:
             * - api (API routes)
             * - _next/static (static files)
             * - _next/image (image optimization files)
             * - favicon.ico, sitemap.xml, robots.txt (metadata files)
             */
            '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      ],
};
