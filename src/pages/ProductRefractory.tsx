import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgEnmass from "@/assets/products/cement-enmass-conveyor.jpg";
import imgRedler from "@/assets/products/boiler-drag-redler.jpg";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain 100 mm Pitch", image: imgRedler },
  { name: "Bucket Elevator Chain 150 mm Pitch", image: imgRedler },
  { name: "Drag / Enmass Conveyor Chain", image: imgEnmass },
  { name: "Redler Chain", image: imgRedler },
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
