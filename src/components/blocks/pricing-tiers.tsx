import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingTiers() {
  const t = useTranslations("home.tiers");

  // Static tier definitions until pricing CMS schema is wired.
  // Numbers are placeholders — replace with actual BVC 2026 pricing.
  const tiers = [
    {
      name: t("earlyBird"),
      price: "Rp 1,500,000",
      perks: ["2-day conference pass", "Networking lounge access", "Lunch & refreshments", "Conference materials"],
      cta: "Get Early Bird",
      featured: false,
    },
    {
      name: t("vip"),
      price: "Rp 3,500,000",
      perks: ["Everything in Early Bird", "VIP seating", "Speaker meet & greet", "VIP-only networking session", "Premium badge & gift"],
      cta: "Get VIP",
      featured: true,
    },
    {
      name: t("vvip"),
      price: "Rp 7,500,000",
      perks: ["Everything in VIP", "Gala Dinner invitation", "Reserved table", "Sponsor recognition", "Private chauffeur transfer"],
      cta: "Get VVIP",
      featured: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="tickets">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "relative rounded-2xl border bg-card p-8 flex flex-col transition-all",
            tier.featured
              ? "border-primary-600 shadow-lg ring-1 ring-primary-600/20 scale-[1.02]"
              : "border-border"
          )}
        >
          {tier.featured && (
            <div className="absolute -top-3 left-6 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
              Most Popular
            </div>
          )}
          <h3 className="font-display text-2xl font-semibold tracking-tight">{tier.name}</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold tabular-nums">{tier.price}</span>
            <span className="text-sm text-muted-foreground">/ pass</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm flex-1">
            {tier.perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <Check size={16} className="mt-0.5 shrink-0 text-primary-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8 w-full" variant={tier.featured ? "primary" : "outline"}>
            <Link href="/join-now">{tier.cta}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
