import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import vsi1 from "@/assets/vsi/vsi-1.jpeg";
import vsi2 from "@/assets/vsi/vsi-2.jpeg";
import vsi3 from "@/assets/vsi/vsi-3.jpeg";
import vsi4 from "@/assets/vsi/vsi-4.jpeg";
import vsi5 from "@/assets/vsi/vsi-5.jpeg";
import vsi6 from "@/assets/vsi/vsi-6.jpeg";
import vsi7 from "@/assets/vsi/vsi-7.jpeg";
import boilerSea1 from "@/assets/boiler/boiler-sea-1.jpeg";
import boilerIndia2024 from "@/assets/boiler/boiler-india-2024.jpeg";
  
interface GallerySection {
  title: string;
  images: { src: string; alt: string; isVideo?: boolean }[];
}

const gallerySections: GallerySection[] = [
  {
    title: "MAC Expo@ Chhatrapati Sambhajinagar",
    images: [
      {
        src: "https://swajit.com/wp-content/uploads/2015/11/Mr.Manohar-Parrikar-Defence-Mininster-of-India.jpg",
        alt: "Mr. Manohar Parrikar - Defence Minister of India",
      },
      {
        src: "https://swajit.com/wp-content/uploads/2015/11/Mr.Anant-GiteMinster-for-heavy-engineering.jpg",
        alt: "Mr. Anant Gite - Minister for Heavy Engineering",
      },
    ],
  },
  // Vasantdada Sugar Institute (VSI) - Expo
  {
    title: "Vasantdada Sugar Institute (VSI) — Expo",
    images: [
      { src: vsi1, alt: "VSI Expo Invitation" },
      { src: vsi2, alt: "VSI Expo - Swajit Team with Visitors" },
      { src: vsi3, alt: "VSI Expo - Sugar Industry Chains Brochure" },
      { src: vsi4, alt: "VSI Expo - Visitors at Swajit booth" },
      { src: vsi5, alt: "VSI Expo - Swajit team" },
      { src: vsi6, alt: "VSI Expo - Customer brochure handover" },
      { src: vsi7, alt: "VSI Expo - Group photo at booth" },
    ],
  },
  {
    title: "Boiler World S.E.A. — Bangkok, Thailand",
    images: [
      { src: boilerSea1, alt: "Boiler World S.E.A. 2025 - Welcome Onboard, Booth 42" },
    ],
  },
  {
    title: "Boiler India 2024 — Mumbai",
    images: [
      { src: boilerIndia2024, alt: "Boiler India 2024 - Visit Swajit at Booth A67" },
    ],
  },
  // Germany Hannover Exhibition — hidden (do not remove)
  // {
  //   title: "Germany Hannover Exhibition",
  //   images: [
  //     { src: "https://swajit.com/wp-content/uploads/2015/11/IMG_0320-300x225.jpg", alt: "Hannover Exhibition - Booth Display" },
  //     { src: "https://swajit.com/wp-content/uploads/2015/11/IMG_0376-300x225.jpg", alt: "Hannover Exhibition - Team" },
  //     { src: "https://swajit.com/wp-content/uploads/2015/11/IMG_0312-300x225.jpg", alt: "Hannover Exhibition - Products" },
  //   ],
  // },
  {
    title: "Dealers Meet 2018",
    images: [
      {
        src: "https://swajit.com/wp-content/uploads/2015/11/5.jpg",
        alt: "Dealers Meet 2018 - Event 1",
      },
      {
        src: "https://swajit.com/wp-content/uploads/2015/11/6.jpg",
        alt: "Dealers Meet 2018 - Event 2",
      },
      {
        src: "https://swajit.com/wp-content/uploads/2015/11/7.jpg",
        alt: "Dealers Meet 2018 - Event 3",
      },
    ],
  },
];

const fallbackGallerySections = gallerySections;

const PhotoGallery = () => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; isVideo: boolean } | null>(null);
  const [dbItems, setDbItems] = useState<GallerySection[]>([]);

  useEffect(() => {
    const loadGallery = async () => {
      const { data } = await supabase
        .from("page_content")
        .select("id, title, image_url, section_key, metadata")
        .eq("page_key", "photo_gallery")
        .order("section_key");

      if (!data || data.length === 0) {
        setDbItems([]);
        return;
      }

      const grouped = data.reduce<Record<string, GallerySection>>((acc, item) => {
        const metadata = (item.metadata ?? {}) as Record<string, unknown>;
        const sectionTitle = String(metadata.section || item.title || item.section_key || "Photo Gallery");
        const imageAlt = String(metadata.alt || item.title || sectionTitle);
        const videoUrl = typeof metadata.video_url === "string" ? metadata.video_url : "";
        const mediaSrc = videoUrl || item.image_url;
        const isVideo = !!videoUrl || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(item.image_url || "");

        if (!mediaSrc) {
          return acc;
        }

        if (!acc[sectionTitle]) {
          acc[sectionTitle] = { title: sectionTitle, images: [] };
        }

        acc[sectionTitle].images.push({
          src: mediaSrc,
          alt: imageAlt,
          isVideo,
        });

        return acc;
      }, {});

      setDbItems(Object.values(grouped).filter((section) => section.images.length > 0));
    };

    loadGallery();

    const channel = supabase
      .channel("photo-gallery-content")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "page_content" },
        (payload) => {
          const pageKey = (payload.new as { page_key?: string } | null)?.page_key
            ?? (payload.old as { page_key?: string } | null)?.page_key;

          if (pageKey === "photo_gallery") {
            loadGallery();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sectionsToRender = useMemo(
    () => (dbItems.length > 0 ? dbItems : fallbackGallerySections),
    [dbItems],
  );

  return (
    <PageLayout>
      <PageBanner
        title="Exhibitions"
        subtitle="Capturing our journey — exhibitions, events, and milestones"
        breadcrumb="Exhibitions"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {sectionsToRender.map((section, sIdx) => (
            <ScrollReveal key={sIdx}>
              <div className="mb-16 last:mb-0">
                {/* Section Title */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-8 bg-accent rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground pt-4">
                    {section.title}
                  </h2>
                </div>
                <div className="h-px bg-border mb-8" />

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.images.map((img, iIdx) => (
                    <button
                      key={iIdx}
                      onClick={() => setLightboxImage({ src: img.src, isVideo: !!img.isVideo })}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {img.isVideo ? (
                        <video
                          src={img.src}
                          className="w-full h-full object-contain bg-black"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-contain bg-muted transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-primary-foreground font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/90 px-4 py-2 rounded-full">
                          {img.isVideo ? "Play" : "View"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>
          {lightboxImage.isVideo ? (
            <video
              src={lightboxImage.src}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightboxImage.src}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default PhotoGallery;
