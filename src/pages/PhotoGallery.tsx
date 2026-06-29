import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import vsi1 from "@/assets/vsi/vsi-1.jpeg";
import vsi2 from "@/assets/vsi/vsi-2.jpeg";
import vsi3 from "@/assets/vsi/vsi-3.jpeg";

interface GallerySection {
  title: string;
  images: { src: string; alt: string }[];
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
      { src: vsi1.url, alt: "VSI Expo Invitation" },
      { src: vsi2.url, alt: "VSI Expo - Swajit Team with Visitors" },
      { src: vsi3.url, alt: "VSI Expo - Sugar Industry Chains Brochure" },
      // <!-- Add 5-6 more VSI Expo images here -->
      // { src: "/path/to/vsi-4.jpg", alt: "VSI Expo 4" },
      // { src: "/path/to/vsi-5.jpg", alt: "VSI Expo 5" },
      // { src: "/path/to/vsi-6.jpg", alt: "VSI Expo 6" },
      // { src: "/path/to/vsi-7.jpg", alt: "VSI Expo 7" },
      // { src: "/path/to/vsi-8.jpg", alt: "VSI Expo 8" },
      // { src: "/path/to/vsi-9.jpg", alt: "VSI Expo 9" },
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
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

        if (!item.image_url) {
          return acc;
        }

        if (!acc[sectionTitle]) {
          acc[sectionTitle] = { title: sectionTitle, images: [] };
        }

        acc[sectionTitle].images.push({
          src: item.image_url,
          alt: imageAlt,
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
                      onClick={() => setLightboxImage(img.src)}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover overlay */}
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
          <img
            src={lightboxImage}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default PhotoGallery;
