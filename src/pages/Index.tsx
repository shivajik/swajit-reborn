import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import ProductsSection from "@/components/ProductsSection";
import StatsSection from "@/components/StatsSection";
import ClientsSection from "@/components/ClientsSection";
import ExportSection from "@/components/ExportSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <InfrastructureSection />
    <ProductsSection />
    <StatsSection />
    <ClientsSection />
    <ExportSection />
    <CertificationsSection />
    <Footer />
  </div>
);

export default Index;
