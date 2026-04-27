import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="inline-block h-7 w-7 rounded-md bg-primary-600" aria-hidden />
            {t("site.name")}
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t("site.tagline")}</p>
        </div>

        <div>
          <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-primary-700">{t("nav.about")}</Link></li>
            <li><Link href="/bali-villa-connect" className="hover:text-primary-700">{t("nav.event")}</Link></li>
            <li><Link href="/members" className="hover:text-primary-700">{t("nav.members")}</Link></li>
            <li><Link href="/news" className="hover:text-primary-700">{t("nav.news")}</Link></li>
            <li><Link href="/sponsors" className="hover:text-primary-700">{t("nav.sponsors")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-muted-foreground" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-muted-foreground" />
              <a href="mailto:info@bvrma.org" className="hover:text-primary-700">info@bvrma.org</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
            {t("footer.newsletter")}
          </h4>
          <p className="mt-4 text-sm text-muted-foreground">{t("footer.newsletterDesc")}</p>
          {/* Newsletter form: implement when Resend audience is set up */}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <span>© {year} {t("site.name")}. {t("footer.rights")}</span>
          <span>Built with Next.js, Sanity & Supabase.</span>
        </div>
      </div>
    </footer>
  );
}
