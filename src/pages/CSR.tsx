import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";

const csrImages = [
  {
    src: "https://swajit.com/wp-content/uploads/2016/01/IMG_20150712_100351221-copy.jpg",
    alt: "Blood Donation Camp Event 1",
  },
  {
    src: "https://swajit.com/wp-content/uploads/2016/01/IMG_20150712_111031623-copy.jpg",
    alt: "Blood Donation Camp Event 2",
  },
  {
    src: "https://swajit.com/wp-content/uploads/2016/01/untitled5.jpg",
    alt: "Blood Donation Camp Event 3",
  },
];

const CSR = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <PageLayout>
      <PageBanner
        title="Corporate Social Responsibility"
        subtitle="Giving back to the community and making a difference"
        breadcrumb="CSR"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            {/* Blood Donation Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
                <Heart className="w-10 h-10 text-destructive" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Organized Blood Donation Camp
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                In the memory of Hon. Late Vishwasrao Chavan & Hon. Late Avinash V. Chavan.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {csrImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(img.src)}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
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
