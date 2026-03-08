import { Link2, Building2, HardHat, FlaskConical, Car, Flame, Droplets, Cog, FileText, Layers, Factory, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { useCategories } from "@/hooks/useSupabaseData";

const iconMap: Record<string, LucideIcon> = {
  Link2, Building2, HardHat, FlaskConical, Car, Flame, Droplets, Cog, FileText, Layers, Factory,
};

const fallbackProducts = [
  { icon: Link2, category: "Sugar Industry", href: "/products/sugar-industry", items: ["Drop Forged Chain", "Fabricated Carrier Chain", "Cane Carrier Chain", "Bagasse Carrier Chain", "Elevator Chain"] },
  { icon: Building2, category: "Cement Industry", href: "/products/cement-sector", items: ["Apron Feeder Chain", "Bucket Elevator Chain", "Pan Conveyor Chain", "Drag Chain", "Reclaimer Chain"] },
  { icon: HardHat, category: "Steel Industry", href: "/products/steel-industry", items: ["Cooling Bed Conveyor", "Draw Bench Chain", "Slab Caster Chain", "Hot Rolling Mill Chain"] },
  { icon: FlaskConical, category: "Chemical & Fertilizer", href: "/products/chemical-fertilizer", items: ["Bucket Elevator Chain", "Bucket Elevator Chain – G2 Attachment"] },
  { icon: Car, category: "Automobile Industry", href: "/products/automobile", items: ["Conveyor Chain Types 1–5", "Slat Conveyor Chain"] },
  { icon: Flame, category: "Boiler & Thermal Power", href: "/products/boiler-thermal-power", items: ["Ash Handling Chain", "Drag/Redler Chain", "Gate Chain", "Traveling Grate Chain"] },
  { icon: Droplets, category: "Solvent Plant", href: "/products/solvent-plant", items: ["Bucket Elevator Chain", "Drag / Enmass Conveyor Chain", "Extractor Chain"] },
  { icon: FileText, category: "Paper Industry", href: "/products/paper-industry", items: ["Bucket Elevator Chain", "Coal Feeder Chain", "Drag Chain", "Enmass Conveyor Chain"] },
  { icon: Layers, category: "Refractory Industry", href: "/products/refractory-industry", items: ["Bucket Elevator Chain", "Drag / Enmass Conveyor Chain", "Redler Chain"] },
  { icon: Factory, category: "Other Industries", href: "/products/other-industry", items: ["Agriculture", "Asphalt Manufacturing", "Bakeries", "Escalator", "Food Processing"] },
];

const ProductsSection = () => {
  const { categories, loading } = useCategories();

  const products = categories.length > 0
    ? categories.map((cat) => ({
        icon: iconMap[cat.icon_name] || Factory,
        category: cat.name,
        href: `/products/${cat.slug}`,
        items: cat.description ? cat.description.split(',').map((s) => s.trim()) : [],
      }))
    : fallbackProducts;

  return (
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
};

export default ProductsSection;
