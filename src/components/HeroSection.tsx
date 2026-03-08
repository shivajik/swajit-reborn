import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroSlides } from "@/hooks/useSupabaseData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const fallbackSlides = [
  {
    title: "India's No. 1 Conveyor Chain Manufacturer",
    subtitle: "Precision-engineered industrial chains trusted by 300+ factories nationwide",
    cta_text: "Explore Products",
    cta_link: "/products",
    image_url: hero1,
  },
  {
    title: "32+ Years of Engineering Excellence",
    subtitle: "Founded in 1992, delivering world-class conveyor solutions across 18+ countries",
    cta_text: "Know More",
    cta_link: "/about",
    image_url: hero2,
  },
  {
    title: "Customized Solutions for Every Industry",
    subtitle: "Sugar, Cement, Steel, Chemical, Automobile — tailored chain solutions for all",
    cta_text: "View Industries",
    cta_link: "/products",
    image_url: hero3,
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const { slides: dbSlides, loading } = useHeroSlides();

  const slides = dbSlides.length > 0
    ? dbSlides.map((s) => ({
        title: s.title,
        subtitle: s.subtitle,
        cta_text: s.cta_text,
        cta_link: s.cta_link,
        image_url: s.image_url,
      }))
    : fallbackSlides;

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={slide.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      ))}

      <div className="absolute inset-0 bg-primary/75" />

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border border-accent/30 rounded-full" />
        <div className="absolute bottom-20 left-10 w-64 h-64 border border-accent/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl">
          <div className="inline-block bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="text-accent text-sm font-heading font-semibold tracking-wider uppercase">
              Since 1992 — Aurangabad, India
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary-foreground leading-tight mb-6 transition-all duration-500 break-words">
            {slides[current].title}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl leading-relaxed">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to={slides[current].cta_link}>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm">
                {slides[current].cta_text}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading uppercase tracking-wider px-8 py-6 text-sm">
                About Us
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-10 bg-accent" : "w-4 bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-accent transition-colors hidden md:block">
        <ChevronLeft className="w-10 h-10" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-accent transition-colors hidden md:block">
        <ChevronRight className="w-10 h-10" />
      </button>
    </section>
  );
};

export default HeroSection;
