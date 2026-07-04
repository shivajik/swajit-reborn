import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useProductsByCategory } from "@/hooks/useSupabaseData";
import { slugify } from "@/lib/slugify";
import { findProductSpecs } from "@/data/productSpecs";

const ProductDetail = () => {
  const { slug, productSlug } = useParams<{ slug: string; productSlug: string }>();
  const { products, category, loading } = useProductsByCategory(slug || "");

  const product = useMemo(
    () => products.find((p) => slugify(p.name) === productSlug),
    [products, productSlug],
  );

  if (loading) {
    return (
      <PageLayout>
        <PageBanner title="Loading..." subtitle="" breadcrumb="Products" />
        <div className="section-padding bg-background text-center text-muted-foreground">
          Loading product...
        </div>
      </PageLayout>
    );
  }

  // No product OR no description → redirect back to category grid
  if (!product || !product.description?.trim()) {
    return <Navigate to={`/products/${slug}`} replace />;
  }

  const paragraphs = product.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const specs = findProductSpecs(product.name, slug);

  return (
    <PageLayout>
      <PageBanner
        title={product.name}
        subtitle={category?.name || ""}
        breadcrumb={`Products > ${category?.name || ""} > ${product.name}`}
      />

      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Link
              to={`/products/${slug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8 font-heading"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {category?.name || "Products"}
            </Link>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal>
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
                <div className="aspect-square bg-muted flex items-center justify-center p-8">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div>
                <p className="text-xs font-heading font-semibold text-accent uppercase tracking-widest mb-3">
                  {category?.name}
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-5">
                  {product.name}
                </h2>
                <div className="w-16 h-1 bg-accent mb-6" />

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                      <span>{para}</span>
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider">
                      <Phone className="w-4 h-4 mr-2" /> Request Quote
                    </Button>
                  </Link>
                  <Link to={`/products/${slug}`}>
                    <Button variant="outline" className="font-heading font-bold uppercase tracking-wider">
                      View All Products
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="section-padding bg-secondary/40 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-foreground mb-2">
                Technical Specifications
              </h2>
              <div className="w-16 h-1 bg-accent mb-8" />
            </ScrollReveal>

            <div className="space-y-10">
              {specs.map((spec, si) => (
                <ScrollReveal key={si} delay={si * 80}>
                  <div className="bg-card border border-border rounded-2xl shadow-md overflow-hidden">
                    {spec.title && (
                      <div className="px-5 py-4 border-b border-border bg-muted/40">
                        <h3 className="text-lg font-heading font-bold text-foreground">
                          {spec.title}
                        </h3>
                        {spec.subtitle && (
                          <p className="text-sm text-muted-foreground mt-1">{spec.subtitle}</p>
                        )}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-primary/5 text-foreground">
                          <tr>
                            {spec.columns.map((c, ci) => (
                              <th
                                key={ci}
                                className="px-3 py-2 text-left font-heading font-semibold whitespace-nowrap border-b border-border"
                              >
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {spec.rows.map((row, ri) => (
                            <tr key={ri} className="odd:bg-background even:bg-muted/20">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className="px-3 py-2 whitespace-nowrap border-b border-border/50 text-muted-foreground"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {spec.notes && spec.notes.length > 0 && (
                      <div className="px-5 py-3 text-xs text-muted-foreground bg-muted/30 border-t border-border">
                        {spec.notes.map((n, ni) => (
                          <p key={ni}>* {n}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
    </PageLayout>
  );
};

export default ProductDetail;