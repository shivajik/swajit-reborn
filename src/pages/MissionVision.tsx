import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Target, Eye, Heart } from "lucide-react";

const sections = [
  {
    icon: Target,
    title: "MISSION",
    items: [
      "Providing products as complete solutions.",
      "Establishment as leading name in global market by providing the Best performance.",
      "Retaining ourselves as the first choice for the established trade.",
      "Accountability for Human resource development, occupational, health & safety.",
    ],
  },
  {
    icon: Eye,
    title: "VISION",
    items: [
      "Establishment of brand associated with quality and consistency in manufacturing all kind of chains in Asia & Europe.",
      "Perfect Implementation Of Occupational Health and Safety Management System (OHSAS).",
      "Improving employee skills, involvement & Quality of Life (QOL).",
    ],
  },
  {
    icon: Heart,
    title: "VALUES",
    items: [
      "Ethical Business Practices.",
      "Excellent Services.",
      "Continuous Customer Focus.",
      "Technology Enhancement.",
    ],
  },
];

const MissionVision = () => (
  <PageLayout>
    <PageBanner
      title="Mission And Vision"
      subtitle="Customized Solution Provider for Industrial Chains"
      breadcrumb="Mission & Vision"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((s) => (
            <ScrollReveal key={s.title}>
              <div className="p-6 bg-secondary rounded-xl border border-border h-full">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <s.icon className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">{s.title}</h2>
                <ol className="space-y-3">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="font-heading font-bold text-accent shrink-0">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default MissionVision;
