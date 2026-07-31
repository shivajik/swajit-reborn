import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Ash Handling Chain", image: "/products/boiler-ash-handling.jpg" },
  { name: "Drag/Redler Chain", image: "/products/boiler-drag-redler.jpg" },
  { name: "Gate Chain", image: "/products/boiler-gate-chain.jpg" },
  { name: "Traveling Grate Chain", image: "/products/boiler-travelling-grate.jpg" },
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
