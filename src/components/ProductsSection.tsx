import { Link2, Building2, HardHat, FlaskConical, Car, Flame, Droplets, Cog } from "lucide-react";

const products = [
  {
    icon: Link2,
    category: "Sugar Industry",
    items: ["Drop Forged Chain", "Fabricated Carrier Chain", "Cane Carrier Chain", "Bagasse Carrier Chain", "Elevator Chain"],
  },
  {
    icon: Building2,
    category: "Cement Industry",
    items: ["Apron Feeder Chain", "Bucket Elevator Chain", "Pan Conveyor Chain", "Drag Chain", "Reclaimer Chain"],
  },
  {
    icon: HardHat,
    category: "Steel Industry",
    items: ["Cooling Bed Conveyor", "Draw Bench Chain", "Slab Caster Chain", "Hot Rolling Mill Chain"],
  },
  {
    icon: FlaskConical,
    category: "Chemical & Fertilizer",
    items: ["Redler Chain", "Scraper Chain", "Drag Conveyor Chain", "Bucket Elevator Chain"],
  },
  {
    icon: Car,
    category: "Automobile Industry",
    items: ["Overhead Conveyor Chain", "Floor Conveyor Chain", "Slat Conveyor Chain"],
  },
  {
    icon: Flame,
    category: "Boiler & Thermal Power",
    items: ["Coal Handling Chain", "Travelling Grate Chain", "Stoker Chain", "Ash Handling Chain"],
  },
  {
    icon: Droplets,
    category: "Solvent Industries",
    items: ["Extractor Chain", "Drag Chain Conveyor", "Miscella Chain"],
  },
  {
    icon: Cog,
    category: "Heavy Duty Equipment",
    items: ["Heavy Duty Conveyor Chain", "Mining Chain", "Industrial Sprockets"],
  },
];

const ProductsSection = () => (
  <section id="products" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <h2 className="section-title text-foreground">Product Portfolio</h2>
      <div className="gold-underline" />
      <p className="section-subtitle">
        Comprehensive range of conveyor chains engineered for diverse industries
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.category}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-xl hover:border-accent/40 transition-all group cursor-pointer"
          >
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
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
