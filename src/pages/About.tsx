import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import AboutSection from "@/components/AboutSection";
import CertificationsSection from "@/components/CertificationsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Factory } from "lucide-react";

const milestones = [
  { year: "1992", event: "Founded in Aurangabad, Maharashtra" },
  { year: "2000", event: "Expanded manufacturing to 50,000 sq ft" },
  { year: "2005", event: "Started export operations to Southeast Asia" },
  { year: "2010", event: "ISO 9001:2008 Certification achieved" },
  { year: "2015", event: "Upgraded to ISO 9001:2015 standards" },
  { year: "2018", event: "Facility expanded to 1,20,000+ sq ft" },
  { year: "2024", event: "Serving 300+ sugar factories & 18+ export countries" },
];

const About = () => (
  <PageLayout>
    <PageBanner
      title="About Swajit Engineering"
      subtitle="Three decades of manufacturing excellence in industrial conveyor chains"
      breadcrumb="About Us"
    />

    {/* Reuse AboutSection component */}
    <AboutSection />

    {/* Timeline */}
    <section className="section-padding bg-secondary">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-foreground">Our Journey</h2>
        <div className="gold-underline" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
          {milestones.map((m, i) => (
            <div key={m.year} className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                <div className="bg-card border border-border rounded-lg p-4 inline-block">
                  <p className="text-sm text-muted-foreground">{m.event}</p>
                </div>
              </div>
              <div className="relative z-10 w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 ml-0 md:ml-0">
                <span className="text-accent-foreground font-heading font-bold text-[10px]">{m.year.slice(2)}</span>
              </div>
              <div className="flex-1">
                <span className="font-heading font-bold text-accent text-lg">{m.year}</span>
                <p className="text-sm text-muted-foreground md:hidden">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Vision / Mission */}
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Factory, title: "Our Mission", text: "To manufacture world-class conveyor chains that exceed industry standards, delivering reliability and performance to every client." },
            { icon: Globe, title: "Our Vision", text: "To be the global leader in conveyor chain manufacturing, expanding our presence across all continents while maintaining uncompromising quality." },
            { icon: Users, title: "Our Values", text: "Integrity, innovation, and customer satisfaction drive everything we do. We believe in building lasting partnerships through trust and excellence." },
          ].map((item) => (
            <div key={item.title} className="bg-secondary border border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CertificationsSection />
  </PageLayout>
);

export default About;
