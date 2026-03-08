import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "India's No. 1 Conveyor Chain Manufacturer",
    subtitle: "Precision-engineered industrial chains trusted by 300+ factories nationwide",
    cta: "Explore Products",
    bg: "from-primary via-primary/95 to-primary/80",
  },
  {
    title: "32+ Years of Engineering Excellence",
    subtitle: "Founded in 1992, delivering world-class conveyor solutions across 18+ countries",
    cta: "Know More",
    bg: "from-primary/90 via-primary to-primary/85",
  },
  {
    title: "Customized Solutions for Every Industry",
    subtitle: "Sugar, Cement, Steel, Chemical, Automobile — tailored chain solutions for all",
    cta: "View Industries",
    bg: "from-primary/85 via-primary/95 to-primary",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].bg} transition-all duration-700`} />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 border border-accent/30 rounded-full" />
        <div className="absolute bottom-20 left-10 w-64 h-64 border border-accent/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-primary-foreground/10 rounded-full" />
      </div>

      {/* Chain pattern overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(var(--accent)) 40px, hsl(var(--accent)) 42px)`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl">
          <div className="inline-block bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-accent text-sm font-heading font-semibold tracking-wider uppercase">
              Since 1992 — Aurangabad, India
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-primary-foreground leading-tight mb-6 transition-all duration-500">
            {slides[current].title}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl leading-relaxed">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => scrollTo("#products")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm"
            >
              {slides[current].cta}
            </Button>
            <Button
              onClick={() => scrollTo("#about")}
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading uppercase tracking-wider px-8 py-6 text-sm"
            >
              About Us
            </Button>
          </div>
        </div>

        {/* Slide indicators */}
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

      {/* Nav arrows */}
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
