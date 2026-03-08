import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgBucket from "@/assets/products/chemical-bucket-elevator.jpg";
import imgDrag from "@/assets/products/boiler-drag-redler.jpg";
import imgEnmass from "@/assets/products/cement-enmass-conveyor.jpg";
import imgAppron from "@/assets/products/cement-appron-feeder.jpg";
import imgCoal from "@/assets/products/cement-coal-feeder.jpg";

const products: ProductItem[] = [
  { name: "Drop Forged Chain", image: imgDrag },
  { name: "Fabricated Carrier Chain", image: imgEnmass },
  { name: "Cane Carrier Chain", image: imgAppron },
  { name: "Bagasse Carrier Chain", image: imgCoal },
  { name: "Elevator Chain", image: imgBucket },
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
