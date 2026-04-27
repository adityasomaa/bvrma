import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next internals
  // - studio (Sanity Studio mounted at /studio)
  // - files with extensions (favicon, images, etc.)
  matcher: ["/((?!api|_next|studio|.*\\..*).*)"],
};
