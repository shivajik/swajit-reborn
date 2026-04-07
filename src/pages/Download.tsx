import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { FileDown, Building2 } from "lucide-react";
import officeImage from "@/assets/PLANT1.JPG";

const brochures = [
  {
    title: "SWAJIT – Cement, Power, Palm Oil, Chemical & Fertilizer",
    url: "https://www.swajit.com/wp-content/uploads/2025/09/Swajit-Cement-Steel-Power-Automobile-Palm-Oil-Catalogue.pdf",
  },
  {
    title: "SWAJIT – Sugar Industry Conveyor Catalogue",
    url: "https://www.swajit.com/wp-content/uploads/2025/09/Swajit_Sugar_Catalogue.pdf",
  },
  {
    title: "SWAJIT – Maintenance Manual",
    url: "https://www.swajit.com/wp-content/uploads/2025/09/SWAJIT-Maintenance-Manual.pdf",
  },
  {
    title: "SWAJIT – Sprocket, Bucket and Pan Catalogue",
    url: "https://swajit.com/wp-content/uploads/2021/05/SWAJIT-Sprocket-Bucket-and-Pan-Catalogue.pdf",
  },
  {
    title: "SWAJIT – Transmission Chain Brochure",
    url: "https://www.swajit.com/wp-content/uploads/2025/09/SWAJIT-Transmission-Chain.pdf",
  },
];

const Download = () => (
  <PageLayout>
    <PageBanner
      title="Download"
      subtitle="Download our catalogues and brochures"
      breadcrumb="Download"
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Image */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-accent" /> Office
              </h2>
              <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                <img
                  src={officeImage}
                  alt="Swajit Corporate Office"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Brochures */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
                <FileDown className="w-6 h-6 text-accent" /> Company Catalogues & Brochures
              </h2>
              <ul className="space-y-4">
                {brochures.map((b) => (
                  <li key={b.title}>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 bg-secondary rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all group"
                    >
                      <FileDown className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="font-heading font-semibold text-foreground text-sm">
                          {b.title}
                        </span>
                        <span className="block text-xs text-accent mt-1">Click to download</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageLayout>
);

export default Download;
