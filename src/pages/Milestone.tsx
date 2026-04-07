import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Flag } from "lucide-react";

const milestones = [
  { year: "1990", text: "Started business with first Fabrication shop at Waluj MIDC." },
  { year: "1995", text: "Began manufacturing conveyor chains for the Sugar industry." },
  { year: "2000", text: "Expanded product range to include Steel and Cement industry chains." },
  { year: "2004", text: "Achieved ISO 9001:2000 certification from TUV NORD (Germany)." },
  { year: "2007", text: "Started exports to international markets across Asia and Africa." },
  { year: "2010", text: "Expanded manufacturing facility to over 50,000 sq ft." },
  { year: "2013", text: "Upgraded to ISO 9001:2008 certification." },
  { year: "2015", text: "Crossed 300+ domestic clients milestone." },
  { year: "2017", text: "Upgraded to ISO 9001:2015 certification. Expanded to 1,20,000+ sq ft facility." },
  { year: "2019", text: "Exports expanded to 18+ countries worldwide." },
  { year: "2022", text: "Introduced advanced CNC machining and automated heat treatment." },
  { year: "2024", text: "Continuing to grow as India's leading conveyor chain manufacturer." },
];

const Milestone = () => (
  <PageLayout>
    <PageBanner
      title="Milestone"
      subtitle="Our journey of growth and excellence since 1990"
      breadcrumb="Milestone"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year}>
                <div className="flex gap-6 relative">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0 z-10 bg-background">
                    <Flag className="w-5 h-5 text-accent" />
                  </div>
                  <div className="pt-2">
                    <span className="font-heading font-bold text-accent text-lg">{m.year}</span>
                    <p className="text-muted-foreground mt-1">{m.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Milestone;
