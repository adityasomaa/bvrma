"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { label: t("about"), href: "/about" },
    { label: t("event"), href: "/bali-villa-connect" },
    { label: t("members"), href: "/members" },
    { label: t("news"), href: "/news" },
    { label: t("sponsors"), href: "/sponsors" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background,backdrop-filter,border-color] duration-200",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-block h-7 w-7 rounded-md bg-primary-600" aria-hidden />
          {tSite("name")}
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="text-foreground/80 hover:text-foreground transition-colors">
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/join-now">{t("joinNow")}</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 grid gap-3">
            {items.map((it) => (
              <Link key={it.href} href={it.href} className="py-2 text-base" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="/join-now" onClick={() => setOpen(false)}>{t("joinNow")}</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
