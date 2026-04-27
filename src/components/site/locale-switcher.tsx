"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (l: "en" | "id") => {
    startTransition(() => {
      router.replace(pathname, { locale: l });
    });
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border p-0.5" aria-label={t("language")}>
      <Globe size={14} className="ml-1 text-muted-foreground" aria-hidden />
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          disabled={isPending}
          aria-pressed={locale === l}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium uppercase transition-colors",
            locale === l ? "bg-primary-600 text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
