import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductCategoryGrid, { ProductItem } from "@/components/ProductCategoryGrid";

import imgAppron from "@/assets/products/cement-appron-feeder.jpg";
import imgBucket0800 from "@/assets/products/cement-bucket-elevator-0800.jpg";
import imgBucket75mm from "@/assets/products/cement-bucket-elevator-75mm.jpg";
import imgCoal from "@/assets/products/cement-coal-feeder.jpg";
import imgDrag from "@/assets/products/boiler-ash-handling.jpg";
import imgEnmass from "@/assets/products/cement-enmass-conveyor.jpg";
import imgHaulege from "@/assets/products/cement-haulege.jpg";
import imgPan from "@/assets/products/cement-pan-conveyor.jpg";
import imgPaul from "@/assets/products/cement-paul-retarder.jpg";
import imgScrapper from "@/assets/products/cement-scrapper-reclaimer.jpg";
import imgTransport from "@/assets/products/cement-transportation.jpg";

const products: ProductItem[] = [
  { name: "Appron Feeder Chain", image: imgAppron },
  { name: "Bucket Elevator Chain – SWAJIT 0800 to 0864", image: imgBucket0800 },
  { name: "Bucket Elevator Chain – SWAJIT 2301 to 2308", image: imgBucket0800 },
  { name: "Bucket Elevator Chain 75 mm & 76.2 mm Pitch", image: imgBucket75mm },
  { name: "Coal Feeder Chain", image: imgCoal },
  { name: "Deep Bucket Elevator Chain", image: imgBucket75mm },
  { name: "Drag & Flow Conveyor Chain", image: imgDrag },
  { name: "Enmass Conveyor Chain", image: imgEnmass },
  { name: "Haulege Chain", image: imgHaulege },
  { name: "Pan Conveyor Chain", image: imgPan },
  { name: "Paul Retarder Chain", image: imgPaul },
  { name: "Scrapper Reclaimer Chain", image: imgScrapper },
  { name: "Transportation Chain", image: imgTransport },
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
