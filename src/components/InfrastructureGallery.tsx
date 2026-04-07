import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Add your infrastructure images here — just import the image and add a title
import machine1 from "@/assets/infrastructure/CHAIN-ASSEMBLY-LINE.jpg";
import machine2 from "@/assets/infrastructure/CNC TURNING CENTRE.jpg";
import machine3 from "@/assets/infrastructure/COMPUTER NUMERICAL CONTROLLED CIRCULAR SAW.jpg";
import machine4 from "@/assets/infrastructure/VERTICAL MACHINING CENTERS.jpg";
import machine5 from "@/assets/infrastructure/800 TON MECHANICAL PRESS MACHINE.jpg";
import machine6 from "@/assets/infrastructure/circular saw.jpg";
import machine7 from "@/assets/infrastructure/CNC BAND SAW.jpg";
import machine8 from "@/assets/infrastructure/GANG DRILLING CENTER.jpg";
import machine9 from "@/assets/infrastructure/HEAVY DUTY PRESS SHOP.jpg";
import machine10 from "@/assets/infrastructure/HYDRAULIC PRESS BRAKE CAP.600T..jpg";
import machine11 from "@/assets/infrastructure/INDUCTION GEAD FORFGING.jpg";
import machine12 from "@/assets/infrastructure/INDUCTION HARDENING.jpg";
import machine13 from "@/assets/infrastructure/INDUCTION HEATING FURNANCE.jpg";
import machine14 from "@/assets/infrastructure/LINK HARRDENING & TEMPERING FACILITY.jpg";
import machine15 from "@/assets/infrastructure/PILLAR DIE SET.jpg";
import machine16 from "@/assets/infrastructure/PNEUMATIC CANTROL PRESS-CAP. 150 T TO 600T.jpg";
import machine17 from "@/assets/infrastructure/SEALED QUENCH GAS CARBURIZING FURNANCE.jpg";
import machine18 from "@/assets/infrastructure/SHEARING MACHINE.jpg";
import machine19 from "@/assets/infrastructure/SPM-BUSH MILLING-1.jpg";
import machine20 from "@/assets/infrastructure/SPM-FACILITIES.jpg";
import machine21 from "@/assets/infrastructure/SPM-FORGED LINK BORING.jpg";
import machine22 from "@/assets/infrastructure/SPM-PIN DRILLING.jpg";

const infrastructureImages = [
  { src: machine1, title: "CHAIN ASSEMBLY LINE" },
  { src: machine2, title: "CNC TURNING CENTRE" },
  { src: machine3, title: "COMPUTER NUMERICAL CONTROLLED CIRCULAR SAW" },
  { src: machine4, title: "VERTICAL MACHINING CENTERS" },
  { src: machine5, title: "800 TON MECHANICAL PRESS MACHINE" },
  { src: machine6, title: "CIRCULAR SAW" },
  { src: machine7, title: "CNC BAND SAW" },
  { src: machine8, title: "GANG DRILLING CENTER" },
  { src: machine9, title: "HEAVY DUTY PRESS SHOP" },
  { src: machine10, title: "HYDRAULIC PRESS BRAKE" },
  { src: machine11, title: "INDUCTION HEAD FORGING" },
  { src: machine12, title: "INDUCTION HARDENING" },
  { src: machine13, title: "INDUCTION HEATING FURNANCE" },
  { src: machine14, title: "LINK HARDENING & TEMPERING FACILITY" },
  { src: machine15, title: "PILLAR DIE SET" },
  { src: machine16, title: "PNEUMATIC CONTROL PRESS (150T–600T)" },
  { src: machine17, title: "SEALED QUENCH GAS CARBURIZING FURNACE" },
  { src: machine18, title: "SHEARING MACHINE" },
  { src: machine19, title: "SPM BUSH MILLING" },
  { src: machine20, title: "SPM FACILITIES" },
  { src: machine21, title: "SPM FORGED LINK BORING" },
  { src: machine22, title: "SPM PIN DRILLING" },
];

const InfrastructureGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + infrastructureImages.length) % infrastructureImages.length : null));
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % infrastructureImages.length : null));

  if (infrastructureImages.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-foreground">Our Machinery & Equipment</h2>
          <div className="gold-underline" />
          <p className="section-subtitle">A glimpse into our advanced manufacturing equipment</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructureImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-lg transition-all"
                onClick={() => openLightbox(i)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-card">
                  <h3 className="font-heading font-bold text-sm text-foreground">{img.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          {infrastructureImages.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white/70 hover:text-white"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                className="absolute right-4 text-white/70 hover:text-white"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={infrastructureImages[lightbox].src}
              alt={infrastructureImages[lightbox].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <p className="text-white font-heading font-bold mt-4 text-center">
              {infrastructureImages[lightbox].title}
            </p>
            <span className="text-white/50 text-sm mt-1">
              {lightbox + 1} / {infrastructureImages.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default InfrastructureGallery;
