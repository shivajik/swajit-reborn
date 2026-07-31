import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Conveyor Chain – SWAJIT 4601", image: "/products/steel-conveyor-chain.jpg" },
  { name: "Conveyor Chain for Varnishing Machine – SWAJIT 4401", image: "/products/steel-varnishing-machine.jpg" },
  { name: "Cooling Bed Conveyor Chain – SWAJIT 4501", image: "/products/steel-cooling-bed.jpg" },
  { name: "Draw Bench Chain – SWAJIT 4001", image: "/products/steel-draw-bench.jpg" },
  { name: "Mandrel Bar Insert Chain – SWAJIT 4301", image: "/products/steel-mandrel-bar.jpg" },
  { name: "Mandrel Extractor Chain – SWAJIT 4201", image: "/products/steel-mandrel-extractor.jpg" },
  { name: "Shell Pusher Chain", image: "/products/steel-shell-pusher.jpg" },
  { name: "Shell Pusher Chain – SWAJIT 4101", image: "/products/steel-shell-pusher-4101.jpg" },
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
