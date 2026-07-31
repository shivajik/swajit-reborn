import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Conveyor Chain – Type 1", image: "/products/auto-conveyor-type-1.jpg" },
  { name: "Conveyor Chain – Type 2", image: "/products/auto-conveyor-type-2.jpg" },
  { name: "Conveyor Chain – Type 3", image: "/products/auto-conveyor-type-3.jpg" },
  { name: "Conveyor Chain – Type 4", image: "/products/auto-conveyor-type-4.jpg" },
  { name: "Conveyor Chain – Type 5", image: "/products/auto-conveyor-type-5.jpg" },
  { name: "Slat Conveyor Chain", image: "/products/auto-slat-conveyor.jpg" },
];

const ProductAutomobile = () => (
  <PageLayout>
    <PageBanner
      title="Automobile"
      subtitle="Precision-engineered conveyor chains for the automobile industry"
      breadcrumb="Products > Automobile"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductAutomobile;
