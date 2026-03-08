import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgBucket from "@/assets/products/chemical-bucket-elevator.jpg";
import imgG2 from "@/assets/products/auto-conveyor-type-2.jpg";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain", image: imgBucket },
  { name: "Bucket Elevator Chain (Type 2)", image: imgBucket },
  { name: "Bucket Elevator Chain – G2 Attachment", image: imgG2 },
];

const ProductChemical = () => (
  <PageLayout>
    <PageBanner
      title="Chemical & Fertilizer Industry"
      subtitle="Corrosion-resistant conveyor chains for chemical and fertilizer processing"
      breadcrumb="Products > Chemical & Fertilizer"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductChemical;
