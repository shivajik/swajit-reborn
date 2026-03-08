import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgConveyor from "@/assets/products/steel-conveyor-chain.jpg";
import imgVarnishing from "@/assets/products/steel-varnishing-machine.jpg";
import imgCooling from "@/assets/products/steel-cooling-bed.jpg";
import imgDrawBench from "@/assets/products/steel-draw-bench.jpg";
import imgMandrelBar from "@/assets/products/steel-mandrel-bar.jpg";
import imgMandrelExtractor from "@/assets/products/steel-mandrel-extractor.jpg";
import imgShellPusher from "@/assets/products/steel-shell-pusher.jpg";
import imgShellPusher4101 from "@/assets/products/steel-shell-pusher-4101.jpg";

const products: ProductItem[] = [
  { name: "Conveyor Chain – SWAJIT 4601", image: imgConveyor },
  { name: "Conveyor Chain for Varnishing Machine – SWAJIT 4401", image: imgVarnishing },
  { name: "Cooling Bed Conveyor Chain – SWAJIT 4501", image: imgCooling },
  { name: "Draw Bench Chain – SWAJIT 4001", image: imgDrawBench },
  { name: "Mandrel Bar Insert Chain – SWAJIT 4301", image: imgMandrelBar },
  { name: "Mandrel Extractor Chain – SWAJIT 4201", image: imgMandrelExtractor },
  { name: "Shell Pusher Chain", image: imgShellPusher },
  { name: "Shell Pusher Chain – SWAJIT 4101", image: imgShellPusher4101 },
];

const ProductSteel = () => (
  <PageLayout>
    <PageBanner
      title="Steel Industry"
      subtitle="Heavy-duty conveyor chains engineered for steel manufacturing and processing"
      breadcrumb="Products > Steel Industry"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductSteel;
