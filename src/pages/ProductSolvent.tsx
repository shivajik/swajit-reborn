import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain", image: "/products/chemical-bucket-elevator.jpg" },
  { name: "Drag Chain / Enmass Conveyor Chain", image: "/products/cement-enmass-conveyor.jpg" },
  { name: "Extractor Chain", image: "/products/solvent-extractor.jpg" },
];

const ProductSolvent = () => (
  <PageLayout>
    <PageBanner
      title="Edible Oil"
      subtitle="Specialized conveyor chains for edible oil extraction and processing plants"
      breadcrumb="Products > Edible Oil"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductSolvent;
