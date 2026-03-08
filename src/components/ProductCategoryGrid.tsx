import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

export interface ProductItem {
  name: string;
  image: string;
}

interface ProductCategoryGridProps {
  products: ProductItem[];
}

const ProductCategoryGrid = ({ products }: ProductCategoryGridProps) => (
  <>
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-muted-foreground text-center mb-10">
            Showing all {products.length} products
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.name} delay={i * 60}>
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-accent/40 transition-all group h-full">
                <div className="aspect-square bg-muted flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 border-t border-border">
                  <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">
                    {product.name}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
          Need a Custom Solution?
        </h2>
        <p className="text-primary-foreground/60 mb-8 text-lg">
          Our engineering team can design and manufacture custom conveyor chains to meet your specific requirements.
        </p>
        <Link to="/contact">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm">
            <Phone className="w-4 h-4 mr-2" /> Request a Quote
          </Button>
        </Link>
      </div>
    </section>
  </>
);

export default ProductCategoryGrid;
