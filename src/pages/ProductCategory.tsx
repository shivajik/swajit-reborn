import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageBanner from '@/components/PageBanner';
import ProductCategoryGrid from '@/components/ProductCategoryGrid';
import { useProductsByCategory } from '@/hooks/useSupabaseData';

const ProductCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, category, loading } = useProductsByCategory(slug || '');

  const productItems = products.map((p) => ({
    name: p.name,
    image: p.image_url,
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

  return (
    <PageLayout>
      <PageBanner
        title={category.name}
        subtitle={category.description || `Browse our ${category.name} products`}
        breadcrumb={`Products > ${category.name}`}
      />
      {productItems.length > 0 ? (
        <ProductCategoryGrid products={productItems} />
      ) : (
        <div className="section-padding bg-background text-center text-muted-foreground">
          No products found in this category yet.
        </div>
      )}
    </PageLayout>
  );
};

export default ProductCategory;
