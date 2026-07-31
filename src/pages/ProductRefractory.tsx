import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain 100 mm Pitch", image: "/products/boiler-drag-redler.jpg" },
  { name: "Bucket Elevator Chain 150 mm Pitch", image: "/products/boiler-drag-redler.jpg" },
  { name: "Drag / Enmass Conveyor Chain", image: "/products/cement-enmass-conveyor.jpg" },
  { name: "Redler Chain", image: "/products/boiler-drag-redler.jpg" },
];

const ProductRefractory = () => (
  <PageLayout>
    <PageBanner
      title="Refractory Industry"
      subtitle="High-temperature resistant conveyor chains for refractory manufacturing"
      breadcrumb="Products > Refractory Industry"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductRefractory;
