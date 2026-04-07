import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck, HardHat, AlertTriangle, Eye, HeartPulse, Users } from "lucide-react";

const safetyPrinciples = [
  { icon: ShieldCheck, title: "Zero Accident Goal", desc: "We strive for zero workplace accidents through preventive measures and continuous improvement." },
  { icon: HardHat, title: "Personal Protective Equipment", desc: "Mandatory use of PPE across all manufacturing areas to ensure worker safety." },
  { icon: AlertTriangle, title: "Hazard Identification", desc: "Regular risk assessments and hazard identification to mitigate potential dangers." },
  { icon: Eye, title: "Safety Audits", desc: "Periodic internal and external safety audits to maintain highest safety standards." },
  { icon: HeartPulse, title: "Emergency Preparedness", desc: "Comprehensive emergency response plans and regular fire & safety drills." },
  { icon: Users, title: "Safety Training", desc: "Regular safety awareness programs and training for all employees." },
];

const SafetyPolicy = () => (
  <PageLayout>
    <PageBanner
      title="Safety Policy"
      subtitle="Ensuring a safe and healthy work environment for all"
      breadcrumb="Safety Policy"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Our Safety Principles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Swajit Engineering, the safety and health of our employees is our top priority. We are committed to maintaining a safe working environment across all our facilities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyPrinciples.map((item) => (
              <div key={item.title} className="p-6 bg-secondary rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageLayout>
);

export default SafetyPolicy;
