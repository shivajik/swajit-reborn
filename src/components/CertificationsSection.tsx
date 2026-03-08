import { ShieldCheck, Microscope, Gauge, TestTube } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const certs = [
  { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Certified quality management system ensuring consistent product excellence" },
  { icon: Gauge, title: "100-Ton Tensile Testing", desc: "In-house tensile testing up to 100 tons for chain strength verification" },
  { icon: Microscope, title: "Digital Microscope", desc: "Metallurgical analysis with advanced digital microscopy" },
  { icon: TestTube, title: "Hardness Testing", desc: "Brinell & Rockwell hardness testers for material quality assurance" },
];

const CertificationsSection = () => (
  <section className="section-padding bg-primary">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="section-title text-primary-foreground">Certifications & Testing</h2>
        <div className="gold-underline" />
        <p className="text-primary-foreground/60 text-center max-w-2xl mx-auto mb-12">
          Quality is at the core of everything we manufacture
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certs.map((c, i) => (
          <ScrollReveal key={c.title} delay={i * 100}>
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6 text-center hover:border-accent/40 transition-colors group h-full">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/25 transition-colors">
                <c.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-primary-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{c.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
