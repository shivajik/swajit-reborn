import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Globe, MapPin } from "lucide-react";

const countries = [
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Mauritius", flag: "🇲🇺" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Jamaica", flag: "🇯🇲" },
  { name: "Sudan", flag: "🇸🇩" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "United Kingdom", flag: "🇬🇧" },
];

const OverseasMarket = () => (
  <PageLayout>
    <PageBanner
      title="Overseas Market"
      subtitle="Exporting quality conveyor chains to 18+ countries worldwide"
      breadcrumb="Overseas Market"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Globe className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Our Global Presence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Swajit Engineering has been exporting high-quality conveyor chains and components to customers across the globe, serving diverse industries in multiple countries.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {countries.map((country) => (
              <div
                key={country.name}
                className="flex items-center gap-3 p-4 bg-secondary rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all"
              >
                <span className="text-2xl shrink-0">{country.flag}</span>
                <span className="font-heading font-semibold text-sm text-foreground">{country.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageLayout>
);

export default OverseasMarket;
