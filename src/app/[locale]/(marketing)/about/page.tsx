import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section eyebrow="About" title="The Bali Villa Rental Management Association"
      subtitle="BVRMA is the official body representing operators and stakeholders in Bali's villa-rental sector. We work alongside government, hospitality leaders, and academia to professionalize the industry."
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          BVRMA was founded to give Bali's villa rental industry a unified voice — one
          that advocates for sustainable practices, fair regulation, and the highest
          standard of guest hospitality.
        </p>
        <h3>What we do</h3>
        <ul>
          <li>Member directory & verification</li>
          <li>Industry research and policy advocacy</li>
          <li>Annual flagship event: Bali Villa Connect</li>
          <li>Sustainability initiatives & training</li>
        </ul>
      </div>
    </Section>
  );
}
