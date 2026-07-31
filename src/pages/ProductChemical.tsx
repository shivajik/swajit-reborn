import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain", image: "/products/chemical-bucket-elevator.jpg" },
  { name: "Bucket Elevator Chain (Type 2)", image: "/products/chemical-bucket-elevator.jpg" },
  { name: "Bucket Elevator Chain – G2 Attachment", image: "/products/auto-conveyor-type-2.jpg" },
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
