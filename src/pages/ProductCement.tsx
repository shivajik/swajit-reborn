import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

const products: ProductItem[] = [
  { name: "Appron Feeder Chain", image: "/products/cement-appron-feeder.jpg" },
  { name: "Bucket Elevator Chain – SWAJIT 0800 to 0864", image: "/products/cement-bucket-elevator-0800.jpg" },
  { name: "Bucket Elevator Chain – SWAJIT 2301 to 2308", image: "/products/cement-bucket-elevator-0800.jpg" },
  { name: "Bucket Elevator Chain 75 mm & 76.2 mm Pitch", image: "/products/cement-bucket-elevator-75mm.jpg" },
  { name: "Coal Feeder Chain", image: "/products/cement-coal-feeder.jpg" },
  { name: "Deep Bucket Elevator Chain", image: "/products/cement-bucket-elevator-75mm.jpg" },
  { name: "Drag & Flow Conveyor Chain", image: "/products/boiler-ash-handling.jpg" },
  { name: "Enmass Conveyor Chain", image: "/products/cement-enmass-conveyor.jpg" },
  { name: "Haulege Chain", image: "/products/cement-haulege.jpg" },
  { name: "Pan Conveyor Chain", image: "/products/cement-pan-conveyor.jpg" },
  { name: "Paul Retarder Chain", image: "/products/cement-paul-retarder.jpg" },
  { name: "Scrapper Reclaimer Chain", image: "/products/cement-scrapper-reclaimer.jpg" },
  { name: "Transportation Chain", image: "/products/cement-transportation.jpg" },
];

const ProductCement = () => (
  <PageLayout>
    <PageBanner
      title="Cement Sector"
      subtitle="Comprehensive range of conveyor chains for cement manufacturing and material handling"
      breadcrumb="Products > Cement Sector"
    />
    <ProductCategoryGrid products={products} />
  </PageLayout>
);

export default ProductCement;
