import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}

const PageBanner = ({ title, subtitle, breadcrumb }: PageBannerProps) => (
  <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-10 right-20 w-72 h-72 border border-accent/30 rounded-full" />
      <div className="absolute bottom-5 left-10 w-48 h-48 border border-accent/20 rounded-full" />
    </div>
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
