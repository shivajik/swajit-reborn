import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageBanner from '@/components/PageBanner';
import ProductCategoryGrid from '@/components/ProductCategoryGrid';
import { useProductsByCategory } from '@/hooks/useSupabaseData';
import ScrollReveal from '@/components/ScrollReveal';

const ProductCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, category, loading } = useProductsByCategory(slug || '');

  const productItems = products.map((p) => ({
    name: p.name,
    image: p.image_url,
    description: p.description || '',
  }));

  if (loading) {
    return (
      <PageLayout>
        <PageBanner title="Loading..." subtitle="" breadcrumb="Products" />
        <div className="section-padding bg-background text-center text-muted-foreground">
          Loading products...
        </div>
      </PageLayout>
    );
  }

  if (!category) {
    return (
      <PageLayout>
        <PageBanner title="Category Not Found" subtitle="This product category could not be found" breadcrumb="Products" />
        <div className="section-padding bg-background text-center text-muted-foreground">
          No category found for this URL.
        </div>
      </PageLayout>
    );
  }

  // Single-page stacked layout for Transmission Chain (all sub-products on one page)
  if (slug === 'transmission-chain') {
    return (
      <PageLayout>
        <PageBanner
          title={category.name}
          subtitle={category.description || 'Simplex, Duplex & Triplex transmission chains'}
          breadcrumb={`Products > ${category.name}`}
        />
        <section className="section-padding bg-background">
          <div className="max-w-5xl mx-auto space-y-14">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <article className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-10">
                  <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10 items-start">
                    {p.image_url && (
                      <div className="bg-muted rounded-xl p-4 flex items-center justify-center aspect-square">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div className={p.image_url ? '' : 'md:col-span-2'}>
                      <h2 className="text-2xl md:text-3xl font-heading font-black text-primary mb-2">
                        {p.name}
                      </h2>
                      <div className="w-14 h-1 bg-accent mb-5" />
                      <div className="space-y-4 text-muted-foreground leading-relaxed">
                        {(p.description || '')
                          .split(/\n\s*\n/)
                          .map((para) => para.trim())
                          .filter(Boolean)
                          .map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
            {products.length === 0 && (
              <p className="text-center text-muted-foreground">
                No products found in this category yet.
              </p>
            )}
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner
        title={category.name}
        subtitle={category.description || `Browse our ${category.name} products`}
        breadcrumb={`Products > ${category.name}`}
      />
      {productItems.length > 0 ? (
        <ProductCategoryGrid products={productItems} categorySlug={slug} />
      ) : (
        <div className="section-padding bg-background text-center text-muted-foreground">
          No products found in this category yet.
        </div>
      )}
    </PageLayout>
  );
};

export default ProductCategory;
