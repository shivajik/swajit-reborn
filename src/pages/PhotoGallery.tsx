import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import vsi1 from "@/../public/vsi/vsi-1.jpeg";
import vsi2 from "@/../public/vsi/vsi-2.jpeg";
import vsi3 from "@/../public/vsi/vsi-3.jpeg";
import vsi4 from "@/../public/vsi/vsi-4.jpeg";
import vsi5 from "@/../public/vsi/vsi-5.jpeg";
import vsi6 from "@/../public/vsi/vsi-6.jpeg";
import vsi7 from "@/../public/vsi/vsi-7.jpeg";
import boilerSea1 from "@/assets/boiler/boiler-sea-1.jpeg";
import boilerIndia2024 from "@/assets/boiler/boiler-india-2024.jpeg";
  
interface GallerySection {
  title: string;
  images: {
    src: string;
    alt: string;
    isVideo?: boolean;
    youtubeId?: string;
    youtubeEmbedSrc?: string;
    isYouTubeShort?: boolean;
    videoSrc?: string;
  }[];
}

const VIDEO_EXTENSION_RE = /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i;

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // Support pasted <iframe ... src="..."> embed codes
  const iframeMatch = url.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  if (iframeMatch) url = iframeMatch[1];
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "").replace(/^m\./, "");
    if (host === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0] || null;
    if (host.endsWith("youtube.com")) {
      const watchId = parsed.searchParams.get("v");
      if (watchId) return watchId;
      const [type, id] = parsed.pathname.split("/").filter(Boolean);
      if (["shorts", "embed", "live"].includes(type) && id) return id;
    }
  } catch {
    // Fall back to regex for pasted values without protocol.
  }
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return m ? m[1] : null;
}

function isYouTubeShort(url: string): boolean {
  return /youtube\.com\/shorts\//i.test(url);
}

function getYouTubeEmbedSrc(youtubeId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    origin: window.location.origin,
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

function getVideoPreviewSrc(src: string): string {
  return src.includes("#") ? src : `${src}#t=1`;
}

const DirectVideoPreview = ({ src, alt }: { src: string; alt: string }) => {
  const [ready, setReady] = useState(false);

  const seekToPreviewFrame = (video: HTMLVideoElement) => {
    try {
      const target = Number.isFinite(video.duration) && video.duration > 1 ? Math.min(1, video.duration * 0.1) : 0.1;
      if (Math.abs(video.currentTime - target) > 0.05) video.currentTime = target;
    } catch {
      setReady(true);
    }
  };

  return (
    <>
      <video
        src={src}
        aria-label={alt}
        className={`w-full h-full object-cover bg-black transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        onLoadedMetadata={(event) => seekToPreviewFrame(event.currentTarget)}
        onLoadedData={() => setReady(true)}
        onSeeked={() => setReady(true)}
      />
      {!ready && <div className="absolute inset-0 bg-muted" />}
    </>
  );
};

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
  const [lightboxImage, setLightboxImage] = useState<
    {
      src: string;
      isVideo: boolean;
      youtubeId?: string;
      youtubeEmbedSrc?: string;
      isYouTubeShort?: boolean;
      videoSrc?: string;
    } | null
  >(null);
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
        const videoUrl = typeof metadata.video_url === "string" ? metadata.video_url.trim() : "";
        const rawSrc = videoUrl || item.image_url;
        const youtubeId = extractYouTubeId(rawSrc);
        const isDirectVideo =
          !youtubeId &&
          (!!videoUrl || VIDEO_EXTENSION_RE.test(rawSrc || ""));
        // Grid preview: YouTube -> hq thumbnail jpg; direct video -> video URL with #t fragment to force a first-frame preview; else the image.
        const mediaSrc = youtubeId
          ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
          : isDirectVideo
          ? getVideoPreviewSrc(rawSrc)
          : rawSrc;
        const isVideo = !!youtubeId || isDirectVideo;

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
          youtubeId: youtubeId || undefined,
          youtubeEmbedSrc: youtubeId ? getYouTubeEmbedSrc(youtubeId) : undefined,
          isYouTubeShort: youtubeId ? isYouTubeShort(rawSrc) : undefined,
          videoSrc: isDirectVideo ? rawSrc : undefined,
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
                      onClick={() =>
                        setLightboxImage({
                          src: img.src,
                          isVideo: !!img.isVideo,
                          youtubeId: img.youtubeId,
                          youtubeEmbedSrc: img.youtubeEmbedSrc,
                          isYouTubeShort: img.isYouTubeShort,
                          videoSrc: img.videoSrc,
                        })
                      }
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {img.isVideo ? (
                        img.youtubeId ? (
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            className="w-full h-full object-cover bg-black transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <DirectVideoPreview src={img.src} alt={img.alt} />
                        )
                      ) : (
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-contain bg-muted transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {img.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-2xl">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-accent-foreground ml-1">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
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
          {lightboxImage.youtubeId ? (
            <div
              className={lightboxImage.isYouTubeShort
                ? "h-[85vh] max-h-[85vh] aspect-[9/16] max-w-full rounded-lg overflow-hidden shadow-2xl bg-black"
                : "w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-2xl bg-black"}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={lightboxImage.youtubeEmbedSrc || getYouTubeEmbedSrc(lightboxImage.youtubeId)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : lightboxImage.isVideo ? (
            <video
              src={lightboxImage.videoSrc || lightboxImage.src}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl bg-black"
              controls
              autoPlay
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"

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
