import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import bannerBg from "@/assets/banner-bg.jpg";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}

const PageBanner = ({ title, subtitle, breadcrumb }: PageBannerProps) => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    {/* Background image */}
    <img
      src={bannerBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-primary/80" />
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-4 font-heading">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <ArrowRight className="w-3 h-3" />
        <span className="text-accent">{breadcrumb}</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-heading font-black text-primary-foreground mb-3">{title}</h1>
      {subtitle && (
        <p className="text-primary-foreground/60 max-w-2xl text-lg">{subtitle}</p>
      )}
    </div>
  </section>
);

export default PageBanner;
