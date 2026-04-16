import { useCounterAnimation } from "@/hooks/useCounterAnimation";

const stats = [
  { value: 35, suffix: "+", label: "Years of Experience" },
  { value: 300, suffix: "+", label: "Sugar Factory Clients" },
  { value: 100, suffix: "+", label: "Cement & Steel Plants" },
  { value: 250, suffix: "+", label: "Team Members" },
  { value: 18, suffix: "+", label: "Export Countries" },
  { value: 105, suffix: " Cr", label: "Annual Turnover (₹)" },
];

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCounterAnimation(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading font-black text-accent mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-primary-foreground/70 font-heading uppercase tracking-wider">{label}</div>
    </div>
  );
};

const StatsSection = () => (
  <section className="section-padding bg-primary">
    <div className="max-w-7xl mx-auto">
      <h2 className="section-title text-primary-foreground">Key Indicators</h2>
      <div className="gold-underline" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
