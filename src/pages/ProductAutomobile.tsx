import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgType1 from "@/assets/products/auto-conveyor-type-1.jpg";
import imgType2 from "@/assets/products/auto-conveyor-type-2.jpg";
import imgType3 from "@/assets/products/auto-conveyor-type-3.jpg";
import imgType4 from "@/assets/products/auto-conveyor-type-4.jpg";
import imgType5 from "@/assets/products/auto-conveyor-type-5.jpg";
import imgSlat from "@/assets/products/auto-slat-conveyor.jpg";

const products: ProductItem[] = [
  { name: "Conveyor Chain – Type 1", image: imgType1 },
  { name: "Conveyor Chain – Type 2", image: imgType2 },
  { name: "Conveyor Chain – Type 3", image: imgType3 },
  { name: "Conveyor Chain – Type 4", image: imgType4 },
  { name: "Conveyor Chain – Type 5", image: imgType5 },
  { name: "Slat Conveyor Chain", image: imgSlat },
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
