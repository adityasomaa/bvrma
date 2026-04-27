import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative isolate overflow-hidden">
      {/* Subtle aurora gradient — single ramp per skill rule */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_30%_-20%,oklch(0.75_0.10_195_/_0.35),transparent_60%),radial-gradient(ellipse_45%_45%_at_85%_10%,oklch(0.85_0.12_75_/_0.30),transparent_55%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_30%_-20%,oklch(0.45_0.12_195_/_0.40),transparent_60%),radial-gradient(ellipse_45%_45%_at_85%_10%,oklch(0.55_0.13_75_/_0.25),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-28 md:pt-32 md:pb-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden />
            {t("heroEyebrow")} · 26 May 2026 · Bali
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            {t("heroSubtitle")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/bali-villa-connect#tickets">
                {t("heroCta")} <ArrowRight size={16} className="ml-1.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/bali-villa-connect">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
