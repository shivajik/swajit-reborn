import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain", image: "/products/chemical-bucket-elevator.jpg" },
  { name: "Coal Feeder Chain", image: "/products/cement-coal-feeder.jpg" },
  { name: "Drag Chain", image: "/products/cement-enmass-conveyor.jpg" },
  { name: "Enmass Conveyor Chain (Redler)", image: "/products/boiler-drag-redler.jpg" },
];

const ProductPaper = () => (
  <PageLayout>
    <PageBanner
      title="Paper Industry"
      subtitle="Reliable conveyor chains engineered for paper manufacturing processes"
      breadcrumb="Products > Paper Industry"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductPaper;
