import { Link2, Building2, HardHat, FlaskConical, Car, Flame, Droplets, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const products = [
  { icon: Link2, category: "Sugar Industry", href: null, items: ["Drop Forged Chain", "Fabricated Carrier Chain", "Cane Carrier Chain", "Bagasse Carrier Chain", "Elevator Chain"] },
  { icon: Building2, category: "Cement Industry", href: "/products/cement-sector", items: ["Apron Feeder Chain", "Bucket Elevator Chain", "Pan Conveyor Chain", "Drag Chain", "Reclaimer Chain"] },
  { icon: HardHat, category: "Steel Industry", href: null, items: ["Cooling Bed Conveyor", "Draw Bench Chain", "Slab Caster Chain", "Hot Rolling Mill Chain"] },
  { icon: FlaskConical, category: "Chemical & Fertilizer", href: null, items: ["Redler Chain", "Scraper Chain", "Drag Conveyor Chain", "Bucket Elevator Chain"] },
  { icon: Car, category: "Automobile Industry", href: "/products/automobile", items: ["Overhead Conveyor Chain", "Floor Conveyor Chain", "Slat Conveyor Chain"] },
  { icon: Flame, category: "Boiler & Thermal Power", href: "/products/boiler-thermal-power", items: ["Coal Handling Chain", "Travelling Grate Chain", "Stoker Chain", "Ash Handling Chain"] },
  { icon: Droplets, category: "Solvent Industries", href: null, items: ["Extractor Chain", "Drag Chain Conveyor", "Miscella Chain"] },
  { icon: Cog, category: "Heavy Duty Equipment", href: null, items: ["Heavy Duty Conveyor Chain", "Mining Chain", "Industrial Sprockets"] },
];

const ProductsSection = () => (
  <section id="products" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="section-title text-foreground">Product Portfolio</h2>
        <div className="gold-underline" />
        <p className="section-subtitle">Comprehensive range of conveyor chains engineered for diverse industries</p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => {
          const content = (
            <div className="bg-card rounded-xl border border-border p-6 hover:shadow-xl hover:border-accent/40 transition-all group cursor-pointer h-full">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                <p.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-3">{p.category}</h3>
              <ul className="space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {p.href && (
                <p className="mt-4 text-xs font-heading font-semibold text-accent uppercase tracking-wider group-hover:underline">
                  View Products →
                </p>
              )}
            </div>
          );

          return (
            <ScrollReveal key={p.category} delay={i * 75}>
              {p.href ? <Link to={p.href}>{content}</Link> : content}
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProductsSection;
