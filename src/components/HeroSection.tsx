import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroSlides } from "@/hooks/useSupabaseData";
import hero1 from "@/assets/FIRST.jpg";
import hero2 from "@/assets/SUGAR.jpg";
import hero3 from "@/assets/CEMENT.jpg";
import hero4 from "@/assets/PALM OIL.jpg";
import hero5 from "@/assets/POWER.jpg";
import hero6 from "@/assets/CHEMICAL & FERTILIZER.jpg";
import hero7 from "@/assets/AUTOMOBILE.jpg";
import hero8 from "@/assets/DRIVER CHAIN & SPROCKET.jpg";

const fallbackSlides = [
  {
    title: "",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero1,
  },
  {
    title: "SUGAR",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero2,
  },
  {
    title: "CEMENT",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero3,
  },
  {
    title: "PALM OIL",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero4,
  },
  {
    title: "POWER",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero5,
  },
  {
    title: "CHEMICAL & FERTILIZER",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero6,
  },
  {
    title: "AUTOMOBILE",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero7,
  },
  {
    title: "DRIVER CHAIN & SPROCKET",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: hero8,
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { slides: dbSlides } = useHeroSlides();

  const slides = dbSlides.length > 0
    ? dbSlides.map((s) => ({
        title: s.title,
        subtitle: s.subtitle,
        cta_text: s.cta_text,
        cta_link: s.cta_link,
        image_url: s.image_url,
      }))
    : fallbackSlides;

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative min-h-[70vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background images with Ken Burns effect */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{
              animation: i === current ? 'kenburns 8s ease-in-out forwards' : 'none',
            }}
          />
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border border-accent/40 rounded-full" />
        <div className="absolute bottom-20 left-10 w-64 h-64 border border-accent/30 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-accent/20 rounded-full" />
      </div>

      {/* Content - Mobile: badge top, title bottom. Desktop: all together center-left */}
      {(() => {
        const slide = slides[current];
        const hasTitle = slide.title && slide.title.trim();
        const hasSubtitle = slide.subtitle && slide.subtitle.trim();
        const hasCta = slide.cta_text && slide.cta_text.trim() && slide.cta_link && slide.cta_link.trim();
        const hasContent = hasTitle || hasSubtitle || hasCta;

        if (!hasContent) return null;

        return (
          <>
            {/* Mobile layout: Badge at top */}
            <div className="absolute top-20 left-4 right-4 z-10 md:hidden">
              <div className="inline-block bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="text-accent text-xs font-heading font-semibold tracking-wider uppercase">
                  Since 1992 — Chhatrapati Sambhajinagar, India
                </span>
              </div>
            </div>

            {/* Mobile layout: Title at bottom */}
            <div className="absolute bottom-14 left-4 right-4 z-10 md:hidden">
              {hasTitle && (
                <h1
                  key={`mobile-${current}`}
                  className="text-2xl sm:text-3xl font-heading font-black text-primary-foreground leading-[1.1] mb-2 break-words animate-fade-in"
                >
                  {slide.title}
                </h1>
              )}
              {hasTitle && <div className="w-16 h-1 bg-accent rounded-full mb-2" />}
              {hasSubtitle && (
                <p className="text-sm text-primary-foreground/80 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '150ms' }}>
                  {slide.subtitle}
                </p>
              )}
              {hasCta && (
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <Link to={slide.cta_link}>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-6 py-5 text-xs w-full sm:w-auto">
                      {slide.cta_text}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Desktop layout: All together */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full hidden md:block">
              <div className="max-w-3xl">
                <div className="inline-block bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                  <span className="text-accent text-sm font-heading font-semibold tracking-wider uppercase">
                    Since 1992 — Chhatrapati Sambhajinagar, India
                  </span>
                </div>
                {hasTitle && (
                  <h1 key={current} className="text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-primary-foreground leading-[1.1] mb-6 break-words animate-fade-in">
                    {slide.title}
                  </h1>
                )}
                {hasTitle && <div className="w-24 h-1 bg-accent rounded-full mb-6" />}
                {hasSubtitle && (
                  <p key={`sub-${current}`} className="text-lg lg:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '150ms' }}>
                    {slide.subtitle}
                  </p>
                )}
                {hasCta && (
                  <div className="flex flex-row gap-4">
                    <Link to={slide.cta_link}>
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm">
                        {slide.cta_text}
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" className="border-accent/60 text-primary-foreground hover:bg-accent/20 hover:border-accent font-heading uppercase tracking-wider px-8 py-6 text-sm">
                        About Us
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      })()}

      {/* Slide indicators - bottom left on mobile, bottom center on desktop */}
      <div className="absolute bottom-4 md:bottom-10 left-4 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
              i === current ? "w-6 sm:w-12 bg-accent" : "w-2.5 sm:w-4 bg-primary-foreground/25 hover:bg-primary-foreground/40"
            }`}
          />
        ))}
        <span className="ml-2 sm:ml-3 text-primary-foreground/60 text-xs sm:text-sm font-heading font-semibold">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-primary-foreground/30 hover:text-accent transition-colors p-2 hidden md:block">
        <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
      </button>
      <button onClick={next} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-primary-foreground/30 hover:text-accent transition-colors p-2 hidden md:block">
        <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
      </button>
    </section>
  );
};

export default HeroSection;
