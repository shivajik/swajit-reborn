import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Award } from "lucide-react";

const ISOCertification = () => (
  <PageLayout>
    <PageBanner
      title="ISO Certification"
      subtitle="ISO 9001:2015 Certified by TUV NORD (Germany)"
      breadcrumb="ISO Certification"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              ISO 9001:2015 Certified Company
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Swajit Engineering Pvt. Ltd. is an ISO 9001:2015 certified company by TUV NORD (Germany), ensuring the highest quality standards in manufacturing.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-lg border border-border">
              <img
                src="http://swajit.com/wp-content/uploads/2016/01/Iso-Certifictate-till-2016.jpg"
                alt="ISO 9001:2015 Certificate - TUV NORD"
                className="w-full max-w-xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageLayout>
);

export default ISOCertification;
