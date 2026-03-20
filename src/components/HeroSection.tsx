import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroSlides } from "@/hooks/useSupabaseData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const fallbackSlides = [
  {
    title: "India's Leading Conveyor Chain Manufacturer",
    subtitle: "Precision-engineered chains powering cement plants across the nation — built to endure the toughest industrial environments",
    cta_text: "Explore Products",
    cta_link: "/products",
    image_url: hero1,
  },
  {
    title: "Trusted by Chemical & Fertilizer Giants",
    subtitle: "Corrosion-resistant conveyor solutions designed for chemical processing and fertilizer production lines worldwide",
    cta_text: "View Industries",
    cta_link: "/products",
    image_url: hero2,
  },
  {
    title: "Powering 300+ Sugar Factories Nationwide",
    subtitle: "From cane handling to bagasse conveyors — our chains keep India's sugar industry moving with zero downtime",
    cta_text: "Our Clients",
    cta_link: "/clients",
    image_url: hero3,
  },
  {
    title: "Palm Oil & Edible Oil Industry Experts",
    subtitle: "Heavy-duty chain systems engineered for palm oil mills, extraction plants, and refinery operations across 18+ countries",
    cta_text: "Export Reach",
    cta_link: "/about",
    image_url: hero4,
  },
  {
    title: "32+ Years of Engineering Excellence",
    subtitle: "State-of-the-art CNC machining, precision heat treatment, and world-class assembly — delivering unmatched quality since 1992",
    cta_text: "Our Infrastructure",
    cta_link: "/infrastructure",
    image_url: hero5,
  },
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
    <section id="home" className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border border-accent/40 rounded-full" />
        <div className="absolute bottom-20 left-10 w-64 h-64 border border-accent/30 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-accent/20 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-16 md:py-0">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-block bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 mb-4 md:mb-6 backdrop-blur-sm transition-all duration-700"
            style={{ opacity: 1, transform: 'translateY(0)' }}
          >
            <span className="text-accent text-xs sm:text-sm font-heading font-semibold tracking-wider uppercase">
              Since 1992 — Aurangabad, India
            </span>
          </div>

          {/* Title */}
          <h1
            key={current}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-primary-foreground leading-[1.1] mb-4 md:mb-6 break-words animate-fade-in"
          >
            {slides[current].title}
          </h1>

          {/* Accent bar */}
          <div className="w-16 md:w-24 h-1 bg-accent rounded-full mb-4 md:mb-6" />

          {/* Subtitle */}
          <p
            key={`sub-${current}`}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 md:mb-8 max-w-2xl leading-relaxed animate-fade-in"
            style={{ animationDelay: '150ms' }}
          >
            {slides[current].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to={slides[current].cta_link}>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-6 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm w-full sm:w-auto">
                {slides[current].cta_text}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading uppercase tracking-wider px-6 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm w-full sm:w-auto">
                About Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 sm:gap-3 mt-8 md:mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 sm:w-12 bg-accent" : "w-3 sm:w-4 bg-primary-foreground/25 hover:bg-primary-foreground/40"
              }`}
            />
          ))}
          <span className="ml-3 text-primary-foreground/40 text-xs font-heading hidden sm:inline">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
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
