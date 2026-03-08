import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgAgriculture from "@/assets/products/other-agriculture.jpg";
import imgAsphalt from "@/assets/products/other-asphalt.jpg";
import imgBakeries from "@/assets/products/other-bakeries.jpg";
import imgEscalator from "@/assets/products/other-escalator.jpg";
import imgFood from "@/assets/products/other-food-processing.jpg";

const products: ProductItem[] = [
  { name: "Agriculture Industry", image: imgAgriculture },
  { name: "Asphalt Manufacturing", image: imgAsphalt },
  { name: "Bakeries", image: imgBakeries },
  { name: "Escalator Industry", image: imgEscalator },
  { name: "Food Processing Industry", image: imgFood },
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
