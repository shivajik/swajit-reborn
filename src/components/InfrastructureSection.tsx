import { Factory, Flame, Hammer, Wrench, Cpu } from "lucide-react";

const facilities = [
  { icon: Factory, name: "Machine Shop", area: "30,000 sq ft", desc: "CNC machines, lathes, milling & drilling for precision machining" },
  { icon: Flame, name: "Heat Treatment Shop", area: "25,000 sq ft", desc: "Oil-fired & gas-fired furnaces for hardening and tempering" },
  { icon: Hammer, name: "Press Shop", area: "25,000 sq ft", desc: "Power presses from 50 to 500 tons for forging operations" },
  { icon: Wrench, name: "Assembly Shop", area: "25,000 sq ft", desc: "Dedicated assembly lines with quality inspection stations" },
  { icon: Cpu, name: "PLC Controlled HT Shop", area: "15,000 sq ft", desc: "Fully automated PLC-controlled heat treatment furnaces" },
];

const InfrastructureSection = () => (
  <section id="infrastructure" className="section-padding bg-secondary">
    <div className="max-w-7xl mx-auto">
      <h2 className="section-title text-foreground">Manufacturing Infrastructure</h2>
      <div className="gold-underline" />
      <p className="section-subtitle">
        1,20,000+ sq ft of state-of-the-art manufacturing facility
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <div
            key={f.name}
            className="bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:border-accent/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
              <f.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-1">{f.name}</h3>
            <span className="inline-block bg-accent/15 text-accent-foreground text-xs font-heading font-bold px-3 py-1 rounded-full mb-3">
              {f.area}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InfrastructureSection;
