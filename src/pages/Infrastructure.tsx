import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import InfrastructureSection from "@/components/InfrastructureSection";
import CertificationsSection from "@/components/CertificationsSection";
import StatsSection from "@/components/StatsSection";

const Infrastructure = () => (
  <PageLayout>
    <PageBanner
      title="Manufacturing Infrastructure"
      subtitle="State-of-the-art facilities spanning over 1,20,000 sq ft"
      breadcrumb="Infrastructure"
    />
    <InfrastructureSection />
    <StatsSection />
    <CertificationsSection />
  </PageLayout>
);

export default Infrastructure;
