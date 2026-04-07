import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useClients } from "@/hooks/useSupabaseData";
import ambuja from "@/assets/clients/ambuja-cement.jpg";
import arm from "@/assets/clients/arm-cement.jpg";
import bhel from "@/assets/clients/bhel.png";
import bienHua from "@/assets/clients/bien-hua-sugar.png";
import shreeRenuka from "@/assets/clients/shree-renuka.jpg";
import sls from "@/assets/clients/sls-export.jpg";
import scoul from "@/assets/clients/scoul-export.jpg";
import addax from "@/assets/clients/addax-bioenergy.jpg";
import omifco from "@/assets/clients/omifco.jpg";
import kjs from "@/assets/clients/kjs-cement.jpg";

const fallbackLogos = [
  { src: ambuja, alt: "Ambuja Cement" },
  { src: bhel, alt: "BHEL" },
  { src: arm, alt: "ARM Cement" },
  { src: kjs, alt: "KJS Cement" },
  { src: shreeRenuka, alt: "Shree Renuka Sugars" },
  { src: bienHua, alt: "Bien Hua Sugar" },
  { src: omifco, alt: "OMIFCO" },
  { src: addax, alt: "Addax Bioenergy" },
  { src: sls, alt: "SLS" },
  { src: scoul, alt: "SCOUL" },
];

const ClientLogoCarousel = () => {
  const { clients: dbClients } = useClients();

  // Use DB clients that have logos; if fewer than fallback count, merge with fallback
  const dbLogos = dbClients.filter((c) => c.logo_url).map((c) => ({ src: c.logo_url, alt: c.name }));
  const logos = dbLogos.length > 0 ? dbLogos : fallbackLogos;

  // Ensure enough logos for seamless infinite scroll (at least 3x duplication)
  const repeatCount = Math.max(3, Math.ceil(20 / logos.length));
  const allLogos = Array.from({ length: repeatCount }, () => logos).flat();

  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="section-title text-foreground">Trusted By Industry Leaders</h2>
        <div className="gold-underline" />
        <p className="section-subtitle">Partnering with 300+ factories and top brands worldwide</p>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative">
        <div className="flex animate-marquee gap-8">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex-shrink-0 w-36 h-24 bg-card border border-border rounded-xl flex items-center justify-center p-4 hover:border-accent/40 hover:shadow-md transition-all"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/clients">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider text-xs">
            View All Clients <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ClientLogoCarousel;
