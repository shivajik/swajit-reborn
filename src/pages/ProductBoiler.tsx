import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgAsh from "@/assets/products/boiler-ash-handling.jpg";
import imgDrag from "@/assets/products/boiler-drag-redler.jpg";
import imgGate from "@/assets/products/boiler-gate-chain.jpg";
import imgGrate from "@/assets/products/boiler-travelling-grate.jpg";

const products: ProductItem[] = [
  { name: "Ash Handling Chain", image: imgAsh },
  { name: "Drag/Redler Chain", image: imgDrag },
  { name: "Gate Chain", image: imgGate },
  { name: "Traveling Grate Chain", image: imgGrate },
];

const ProductBoiler = () => (
  <PageLayout>
    <PageBanner
      title="Boiler & Thermal Power Plant"
      subtitle="Heavy-duty chains engineered for boiler and thermal power plant applications"
      breadcrumb="Products > Boiler & Thermal Power Plant"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductBoiler;
