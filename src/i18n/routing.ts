import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  localePrefix: "always", // /en/ is implicit, /id/ is shown
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
