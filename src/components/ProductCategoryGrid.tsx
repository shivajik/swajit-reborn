import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ProductItem {
  name: string;
  image: string;
  description?: string;
}

interface ProductCategoryGridProps {
  products: ProductItem[];
}

const ProductCategoryGrid = ({ products }: ProductCategoryGridProps) => {
  const [openProduct, setOpenProduct] = useState<ProductItem | null>(null);
  return (
  <>
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-muted-foreground text-center mb-10">
            Showing all {products.length} products
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product, i) => {
            const hasDescription = !!product.description?.trim();
            return (
            <ScrollReveal key={product.name} delay={i * 60} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
              <button
                type="button"
                onClick={() => hasDescription && setOpenProduct(product)}
                disabled={!hasDescription}
                aria-disabled={!hasDescription}
                className={`text-left w-full bg-card rounded-xl border border-border overflow-hidden transition-all group h-full focus:outline-none ${
                  hasDescription
                    ? 'hover:shadow-xl hover:border-accent/40 focus:ring-2 focus:ring-accent cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                <div className="aspect-square bg-muted flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      hasDescription ? 'group-hover:scale-105' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="p-4 border-t border-border">
                  <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">
                    {product.name}
                  </h3>
                </div>
              </button>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>

    <Dialog open={!!openProduct} onOpenChange={(o) => !o && setOpenProduct(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading">{openProduct?.name}</DialogTitle>
        </DialogHeader>
        {openProduct?.image && (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center p-4 overflow-hidden">
            <img
              src={openProduct.image}
              alt={openProduct.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {openProduct?.description}
        </div>
      </DialogContent>
    </Dialog>

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
};

export default ProductCategoryGrid;
