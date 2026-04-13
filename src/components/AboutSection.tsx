import { CheckCircle2, Award, Clock, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const reasons = [
  { icon: Award, title: "India's Topmost Manufacturer", desc: "Leading conveyor chain manufacturer with nationwide presence" },
  { icon: Shield, title: "ISI Specification Standards", desc: "All products manufactured to strict ISI specifications" },
  { icon: CheckCircle2, title: "Rigorous Quality Control", desc: "100-ton tensile testing and advanced quality assurance" },
  { icon: Clock, title: "Timely Delivery", desc: "Committed to on-time delivery with efficient production" },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="section-title text-foreground">About Our Company</h2>
        <div className="gold-underline" />
        <p className="section-subtitle">Delivering world-class conveyor chain solutions since 1991</p>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={100}>
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Swajit Engineering Pvt. Ltd.</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 1992 in Chhatrapati Sambhajinagar, Maharashtra, <strong className="text-foreground">Swajit Engineering Pvt. Ltd.</strong> has grown to become India's No. 1 conveyor chain manufacturer. With over three decades of expertise, we specialize in manufacturing high-quality industrial conveyor chains for diverse industries including Sugar, Cement, Steel, Chemical, Automobile, and Thermal Power sectors.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our state-of-the-art manufacturing facility spans over <strong className="text-foreground">1,20,000 sq ft</strong> and is equipped with advanced machinery, PLC-controlled heat treatment furnaces, and a dedicated quality testing lab. We proudly serve <strong className="text-foreground">300+ sugar factories</strong>, <strong className="text-foreground">100+ cement & steel plants</strong>, and export to <strong className="text-foreground">18+ countries</strong> worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ISO 9001:2015 certified, we maintain the highest standards of manufacturing excellence, ensuring every chain that leaves our facility meets rigorous quality benchmarks.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-secondary rounded-lg p-6 border border-border hover:border-accent/40 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <r.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2">{r.title}</h4>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
