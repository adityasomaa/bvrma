// Fallback root — should never render in practice because next-intl middleware
// redirects every request to /en or /id. Kept as a safety redirect.
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootRedirect() {
  redirect(`/${routing.defaultLocale}`);
}
