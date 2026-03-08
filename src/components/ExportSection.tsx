import { Globe } from "lucide-react";

const countries = [
  "Philippines", "Mauritius", "Malaysia", "Uganda", "Kenya", "Tanzania",
  "Zambia", "Indonesia", "Rwanda", "Ethiopia", "Spain", "Jamaica",
  "Sudan", "Nepal", "Vietnam", "Oman", "Thailand", "United Kingdom",
];

const ExportSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <h2 className="section-title text-foreground">Global Export Reach</h2>
      <div className="gold-underline" />
      <p className="section-subtitle">
        Proudly exporting to 18+ countries across Asia, Africa, Europe & the Americas
      </p>

      <div className="flex justify-center mb-10">
        <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center">
          <Globe className="w-10 h-10 text-accent" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {countries.map((c) => (
          <span
            key={c}
            className="px-4 py-2 bg-secondary rounded-full text-sm font-heading font-medium text-foreground border border-border hover:border-accent/50 hover:bg-accent/10 transition-colors"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default ExportSection;
