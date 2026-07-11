import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, Play, Sprout } from "lucide-react";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import tree1 from "@/assets/tree-plantation-1.jpg";
import tree2 from "@/assets/tree-plantation-2.jpg";
import tree3 from "@/assets/tree-plantation-3.jpg";

const csrImages = [
  {
    src: "/blood/blood-donation-poster.jpg",
    alt: "Blood Donation Camp Event 1",
  },
  {
    src: "/blood/blood-donation2.jpg",
    alt: "Blood Donation Camp Event 2",
  },
  {
    src: "/blood/blood-donation3.jpg",
    alt: "Blood Donation Camp Event 3",
  },
];

const treePlantationImages = [
  { src: tree1, alt: "Tree Plantation Drive - Watering the newly planted sapling" },
  { src: tree2, alt: "Tree Plantation Drive - Planting a mango sapling" },
  { src: tree3, alt: "Tree Plantation Drive - Nurturing the young tree" },
];

type TabId = "blood-donation" | "tree-plantation";

const tabs: { id: TabId; label: string; icon: typeof Heart }[] = [
  { id: "blood-donation", label: "Blood Donation Camp", icon: Heart },
  { id: "tree-plantation", label: "Tree Plantation Drive", icon: Sprout },
];

const CSR = () => {
  const [activeTab, setActiveTab] = useState<TabId>("blood-donation");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="Corporate Social Responsibility"
        subtitle="Giving back to the community and making a difference"
        breadcrumb="CSR"
      />

      {/* Tabs */}
      <section className="pt-10 md:pt-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12">
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-lg ring-2 ring-accent ring-offset-2 ring-offset-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-accent-foreground" : ""}`} />
                    {label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {activeTab === "blood-donation" && (
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10 mb-4">
                <Heart className="w-7 h-7 text-destructive" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Blood Donation Camp
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A blood donation camp is being organized every year on 14th February, in the loving memory of our respected Chairman, Mr. Anil Chavan, as a humble tribute to his inspiring life and unwavering dedication to society.
              </p>
            </div>

            {/* Video + Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Video */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-auto block"
                  controls={isPlaying}
                  preload="metadata"
                  poster=""
                  src="https://res.cloudinary.com/dog6ygkwz/video/upload/v1776054367/WhatsApp_Video_2026-04-13_at_9.02.51_AM_dboydr.mp4#t=0.1"
                >
                  Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-accent-foreground ml-0.5" />
                    </div>
                  </button>
                )}
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-3">
                {csrImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(img.src)}
                    className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-muted focus:outline-none focus:ring-2 focus:ring-accent ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-primary-foreground font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/90 px-4 py-2 rounded-full">
                        View
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      )}

      {activeTab === "tree-plantation" && (
      <section className="py-10 md:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <Sprout className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                🌱 Tree Plantation Drive – A Step Towards a Greener Tomorrow
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                As part of our Corporate Social Responsibility (CSR) initiative, we successfully conducted a tree plantation drive to promote environmental sustainability and contribute to a greener future.
              </p>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3">
                Together, let's nurture nature and create a better world for generations to come. 🌿
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {treePlantationImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(img.src)}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[3/4] bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-primary-foreground font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/90 px-4 py-2 rounded-full">
                      View
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-50">
            <X className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="CSR" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </PageLayout>
  );
};

export default CSR;
