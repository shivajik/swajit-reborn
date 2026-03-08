import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgBucket from "@/assets/products/chemical-bucket-elevator.jpg";
import imgCoal from "@/assets/products/cement-coal-feeder.jpg";
import imgDrag from "@/assets/products/cement-enmass-conveyor.jpg";
import imgRedler from "@/assets/products/boiler-drag-redler.jpg";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain", image: imgBucket },
  { name: "Coal Feeder Chain", image: imgCoal },
  { name: "Drag Chain", image: imgDrag },
  { name: "Enmass Conveyor Chain (Redler)", image: imgRedler },
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
