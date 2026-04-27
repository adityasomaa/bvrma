import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";

export default async function SustainabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section eyebrow="Sustainability" title="A responsible villa industry"
      subtitle="BVRMA is committed to supporting members in adopting sustainable practices that benefit local communities and Bali's environment.">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Content coming soon — this page is structured to receive content from the CMS.</p>
      </div>
    </Section>
  );
}
