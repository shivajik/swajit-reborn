import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Award, Clock, Shield, Link2, Building2, HardHat, FlaskConical } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import ScrollReveal from "@/components/ScrollReveal";

const previewProducts = [
  { icon: Link2, category: "Sugar Industry" },
  { icon: Building2, category: "Cement Industry" },
  { icon: HardHat, category: "Steel Industry" },
  { icon: FlaskConical, category: "Chemical & Fertilizer" },
];

const reasons = [
  { icon: Award, text: "India's Topmost Manufacturer" },
  { icon: Shield, text: "ISI Specification Standards" },
  { icon: CheckCircle2, text: "Rigorous Quality Control" },
  { icon: Clock, text: "Timely Delivery" },
];

const Index = () => (
  <PageLayout>
    <div className="-mt-16 md:-mt-20">
      <HeroSection />
    </div>

    {/* About Preview */}
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-foreground">About Our Company</h2>
          <div className="gold-underline" />
        </ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={100}>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 1991 in Chhatrapati Sambhajinagar, Maharashtra, <strong className="text-foreground">Swajit Engineering Pvt. Ltd.</strong> has grown to become India's No. 1 conveyor chain manufacturer with over three decades of expertise serving diverse industries.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our state-of-the-art facility spans <strong className="text-foreground">1,20,000+ sq ft</strong>, equipped with PLC-controlled heat treatment furnaces and advanced testing labs.
              </p>
              <Link to="/about">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider text-xs">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {reasons.map((r) => (
                <div key={r.text} className="bg-secondary rounded-lg p-5 border border-border group hover:border-accent/40 transition-colors">
                  <r.icon className="w-8 h-8 text-accent mb-3" />
                  <p className="font-heading font-bold text-sm text-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Products Preview */}
    <section className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="section-title text-foreground">Our Products</h2>
          <div className="gold-underline" />
          <p className="section-subtitle">Comprehensive range of conveyor chains for 8+ industries</p>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {previewProducts.map((p) => (
              <div key={p.category} className="bg-card rounded-xl border border-border p-6 hover:shadow-xl hover:border-accent/40 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-accent group-hover:scale-110 transition-all">
                  <p.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">{p.category}</h3>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <Link to="/products">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider text-xs">
            View All Products <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </section>

    <StatsSection />

    {/* Client Logo Carousel */}
    <ClientLogoCarousel />

    {/* CTA Section */}
    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="section-title text-foreground">Ready to Get Started?</h2>
          <div className="gold-underline" />
          <p className="text-muted-foreground mb-8 text-lg">
            Get in touch with our team for customized conveyor chain solutions tailored to your industry requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm">
                Request a Quote
              </Button>
            </Link>
            <Link to="/clients">
              <Button variant="outline" className="border-border hover:bg-secondary font-heading uppercase tracking-wider px-8 py-6 text-sm">
                View Our Clients
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageLayout>
);

export default Index;
