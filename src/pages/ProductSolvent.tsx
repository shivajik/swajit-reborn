import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgBucket from "@/assets/products/chemical-bucket-elevator.jpg";
import imgDrag from "@/assets/products/cement-enmass-conveyor.jpg";
import imgExtractor from "@/assets/products/solvent-extractor.jpg";

const products: ProductItem[] = [
  { name: "Bucket Elevator Chain", image: imgBucket },
  { name: "Drag Chain / Enmass Conveyor Chain", image: imgDrag },
  { name: "Extractor Chain", image: imgExtractor },
];

const ProductSolvent = () => (
  <PageLayout>
    <PageBanner
      title="Solvent Plant"
      subtitle="Specialized conveyor chains for solvent extraction and processing plants"
      breadcrumb="Products > Solvent Plant"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductSolvent;
