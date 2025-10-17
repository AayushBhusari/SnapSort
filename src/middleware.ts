import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/", // homepage
  "/about", // example
  "/contact", // example
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Await the auth() call
  const { userId, redirectToSignIn } = await auth();

  // If route is NOT public and user is NOT signed in → redirect
  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

// Matcher config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
