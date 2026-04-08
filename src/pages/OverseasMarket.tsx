import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Globe } from "lucide-react";
import overseasMap from "@/assets/overseas-map.png";

const countries = [
  { name: "Philippines", code: "ph" },
  { name: "Mauritius", code: "mu" },
  { name: "Malaysia", code: "my" },
  { name: "Uganda", code: "ug" },
  { name: "Kenya", code: "ke" },
  { name: "Tanzania", code: "tz" },
  { name: "Zambia", code: "zm" },
  { name: "Indonesia", code: "id" },
  { name: "Rwanda", code: "rw" },
  { name: "Ethiopia", code: "et" },
  { name: "Spain", code: "es" },
  { name: "Jamaica", code: "jm" },
  { name: "Sudan", code: "sd" },
  { name: "Nepal", code: "np" },
  { name: "Vietnam", code: "vn" },
  { name: "Oman", code: "om" },
  { name: "Thailand", code: "th" },
  { name: "United Kingdom", code: "gb" },
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
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  alt={`${country.name} flag`}
                  className="w-8 h-5 object-cover rounded shrink-0"
                />
                <span className="font-heading font-semibold text-sm text-foreground">{country.name}</span>
              </div>
            ))}
          </div>

          {/* World Map */}
          <div className="mt-12">
            <img
              src={overseasMap}
              alt="Swajit Engineering international presence - world map showing export countries"
              className="w-full rounded-xl shadow-lg border border-border"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageLayout>
);

export default OverseasMarket;
