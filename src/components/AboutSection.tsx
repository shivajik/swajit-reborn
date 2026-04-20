import { CheckCircle2, Award, Clock, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const reasons = [
  { icon: Award, title: "Topmost Manufacturer in India", desc: "One of the topmost transmission and conveyor chain manufacturers in India." },
  { icon: Shield, title: "ISI Specification Standards", desc: "We follow and continuously update all ISI specifications to set international standards." },
  { icon: CheckCircle2, title: "Rigorous Quality Control", desc: "Our highly qualified QC team examines products on multiple parameters for flawless performance and durability." },
  { icon: Clock, title: "Timely & Cost-Effective Delivery", desc: "We prioritize delivering rich-quality products and services within the agreed timeframe." },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="section-title text-foreground">About Our Company</h2>
        <div className="gold-underline" />
        <p className="section-subtitle">India's No.1 customized solution provider for industrial chains — since 1991</p>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={100}>
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Welcome to Swajit Engineering Pvt. Ltd.
            </h3>
            <p className="text-sm font-heading uppercase tracking-wider text-accent mb-4">
              Conveyor chains, slats, and scrapers manufacturers and suppliers in Aurangabad, Maharashtra, India
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Swajit Engineering Pvt. Ltd.</strong> based at Aurangabad (M.S.), India has great pleasure to introduce as India's No.1 & one of the leading Brands with <em>"Customize Solution Provider for Industrial Chains"</em>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Since the inception in <strong className="text-foreground">1991</strong>, Swajit has emerged as the leading manufacturer of all types of Roller Conveyor Chains and any type of Link, Pin and Bush Mechanism Heavy Duty Chains for Material Handling Systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Swajit is equipped with the latest technology comprising a <strong className="text-foreground">'State-of-the-Art Plant'</strong> with all infrastructure facilities & processes, and an advanced metallurgical laboratory to manufacture all types of Conveyor chains and Sprockets of the finest quality.
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
