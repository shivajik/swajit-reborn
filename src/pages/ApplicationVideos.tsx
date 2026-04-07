import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Play } from "lucide-react";

interface VideoItem {
  title: string;
  videoId: string;
}

interface VideoCategory {
  category: string;
  slug: string;
  videos: VideoItem[];
}

const videoCategories: VideoCategory[] = [
  {
    category: "Sugar Industry Application",
    slug: "sugar",
    videos: [
      { title: "Feeder Table for Cane Feeding Application", videoId: "KDev8zyX4Xo" },
      { title: "Cane Carrier Chain", videoId: "GlCRSSPfut8" },
      { title: "Laxivation Chain Baggase Carrier Application", videoId: "DaDmXSLVugE" },
      { title: "Rake Carrier Chain", videoId: "ZgrqsBPnhk0" },
    ],
  },
  {
    category: "Steel Industry Chain Applications",
    slug: "steel",
    videos: [
      { title: "I Beam Manufacturing Process", videoId: "bVRjBQRSYAk" },
      { title: "Cold Rolling Mill", videoId: "74GIgHnertE" },
      { title: "Hot Strip Mill", videoId: "nvaz3WidGmo" },
      { title: "Sintering Plant", videoId: "CPkDyTKp3kQ" },
      { title: "Continuous Casting Plant (CCP)", videoId: "ykENjactybs" },
    ],
  },
  {
    category: "Cement Chain Application",
    slug: "cement",
    videos: [
      { title: "Drag Application", videoId: "bunnIV4_23w" },
      { title: "Fly Ash Bucket Elevator", videoId: "BfMmGwNtAdI" },
      { title: "Fly Ash Drag Feeder", videoId: "pBhOmEQzNH0" },
      { title: "Ropeway", videoId: "V_wJEVnPXvA" },
      { title: "Slat Conveyor for Captive Power Plant", videoId: "qC6mlcKBKpo" },
    ],
  },
  {
    category: "Chemical & Fertilizer Application",
    slug: "chemical",
    videos: [
      { title: "Chemical Plant Conveyor Chain", videoId: "bunnIV4_23w" },
      { title: "Fertilizer Industry Application", videoId: "BfMmGwNtAdI" },
    ],
  },
];

const ApplicationVideos = () => {
  // Read tab from URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const initialTab = searchParams.get("tab") || videoCategories[0].slug;
  const [activeCategory, setActiveCategory] = useState(initialTab);
  const current = videoCategories.find((c) => c.slug === activeCategory) || videoCategories[0];

  return (
    <PageLayout>
      <PageBanner
        title="Application Videos"
        subtitle="See our conveyor chains in action across various industries"
        breadcrumb="Application Videos"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Category Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {videoCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all ${
                    activeCategory === cat.slug
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Videos Grid */}
          <ScrollReveal key={activeCategory}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
              {current.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {current.videos.map((video) => (
                <div key={video.videoId} className="space-y-3">
                  <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                    <Play className="w-4 h-4 text-accent" />
                    {video.title}
                  </h3>
                  <div className="h-px bg-border" />
                  <div className="aspect-video rounded-xl overflow-hidden shadow-md border border-border">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default ApplicationVideos;
