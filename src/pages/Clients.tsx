import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ClientsSection from "@/components/ClientsSection";
import ExportSection from "@/components/ExportSection";

const Clients = () => (
  <PageLayout>
    <PageBanner
      title="Our Valued Clients"
      subtitle="Trusted by 300+ factories and industry leaders across India and 18+ countries"
      breadcrumb="Clients"
    />
    <ClientsSection />
    <ExportSection />
  </PageLayout>
);

export default Clients;
