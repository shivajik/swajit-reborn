import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Agriculture Industry", image: "/products/other-agriculture.jpg" },
  { name: "Asphalt Manufacturing", image: "/products/other-asphalt.jpg" },
  { name: "Bakeries", image: "/products/other-bakeries.jpg" },
  { name: "Escalator Industry", image: "/products/other-escalator.jpg" },
  { name: "Food Processing Industry", image: "/products/other-food-processing.jpg" },
];

const ProductOther = () => (
  <PageLayout>
    <PageBanner
      title="Other Industries"
      subtitle="Versatile conveyor chain solutions for diverse industrial applications"
      breadcrumb="Products > Other Industries"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductOther;
