import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";

const QualityPolicy = () => (
  <PageLayout>
    <PageBanner
      title="Quality Policy"
      subtitle="Our commitment to excellence in every chain we manufacture"
      breadcrumb="Quality Policy"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-lg border border-border">
              <img
                src="http://swajit.com/wp-content/uploads/2016/01/QualityPolicy-680x1024.jpg"
                alt="Swajit Engineering Quality Policy Certificate"
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

export default QualityPolicy;
