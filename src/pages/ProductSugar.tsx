import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Drop Forged Chain", image: "/products/boiler-drag-redler.jpg" },
  { name: "Fabricated Carrier Chain", image: "/products/cement-enmass-conveyor.jpg" },
  { name: "Cane Carrier Chain", image: "/products/cement-appron-feeder.jpg" },
  { name: "Bagasse Carrier Chain", image: "/products/cement-coal-feeder.jpg" },
  { name: "Elevator Chain", image: "/products/chemical-bucket-elevator.jpg" },
];

const ProductSugar = () => (
  <PageLayout>
    <PageBanner
      title="Sugar Industry"
      subtitle="Durable conveyor chains designed for sugar mills and processing plants"
      breadcrumb="Products > Sugar Industry"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductSugar;
