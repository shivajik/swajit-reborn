import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ProductsSection from "@/components/ProductsSection";
import ExportSection from "@/components/ExportSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Products = () => (
  <PageLayout>
    <PageBanner
      title="Our Product Range"
      subtitle="Comprehensive conveyor chain solutions engineered for diverse industries"
      breadcrumb="Products"
    />
    <ProductsSection />
    <ExportSection />

    {/* CTA */}
    <section className="section-padding bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
          Need a Custom Solution?
        </h2>
        <p className="text-primary-foreground/60 mb-8 text-lg">
          Our engineering team can design and manufacture custom conveyor chains to meet your specific requirements.
        </p>
        <Link to="/contact">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm">
            <Phone className="w-4 h-4 mr-2" /> Request a Quote
          </Button>
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default Products;
