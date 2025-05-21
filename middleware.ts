import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/about"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x.replace(/\*/g, ".*")}$`))
  );
};

export default authMiddleware({
  publicRoutes: ["/", "/about", "/pricing", "/sign-in", "/sign-up"],
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !isPublic(req.nextUrl.pathname)) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Redirect authenticated users to chat if they're on the home page
    if (auth.userId && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/chat', req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export const runtime = 'nodejs'; 