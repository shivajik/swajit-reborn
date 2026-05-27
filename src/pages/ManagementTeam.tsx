import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import anilImg from "@/assets/team/anil-chavan.jpg";
import ajeetImg from "@/assets/team/ajeet-chavan.jpg";
import virendraImg from "@/assets/team/virendra-chavan.jpg";

const team = [
  {
    name: "Late Shri Anil V. Chavan",
    role: "Former Chairman & Founder",
    image: anilImg,
    bio: "The visionary founder of Swajit Engineering, Shri Anil V. Chavan laid the foundation in 1991 with a commitment to engineering excellence and integrity. His leadership shaped the company into India's leading conveyor chain manufacturer.",
  },
  {
    name: "Mr. Ajeet A. Chavan",
    role: "Managing Director",
    image: ajeetImg,
    bio: "Leading Swajit Engineering into its next era of growth, Mr. Ajeet A. Chavan drives strategic vision, global expansion, and operational excellence across all manufacturing verticals.",
  },
  {
    name: "Mr. Virendra A. Chavan",
    role: "Director",
    image: virendraImg,
    bio: "Overseeing operations and quality, Mr. Virendra A. Chavan ensures world-class manufacturing standards and continuous innovation in product engineering and customer delivery.",
  },
];

const ManagementTeam = () => (
  <PageLayout>
    <PageBanner
      title="Management Team"
      subtitle="Meet the leadership steering Swajit Engineering forward"
      breadcrumb="Management Team"
    />
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-foreground">Our Leadership</h2>
          <div className="gold-underline" />
          <p className="section-subtitle">
            Three generations of vision, dedication, and engineering excellence guiding Swajit Engineering.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {team.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 120}>
              <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-accent/40 transition-all duration-500 h-full flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-heading font-bold text-foreground">{m.name}</h3>
                  <p className="text-accent font-heading font-semibold uppercase tracking-wider text-xs mt-1">
                    {m.role}
                  </p>
                  <div className="gold-underline !mx-0 !my-4 !w-12" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.bio}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ManagementTeam;