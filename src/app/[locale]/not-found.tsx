import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <div className="font-display text-7xl font-semibold tracking-tight">404</div>
      <p className="mt-3 text-lg text-muted-foreground">This page doesn't exist (yet).</p>
      <Button asChild className="mt-8">
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
