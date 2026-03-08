import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Products", href: "/products" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-heading font-black text-lg">S</span>
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-primary-foreground font-heading font-bold text-sm md:text-base leading-tight block">
              SWAJIT ENGINEERING
            </span>
            <span className="text-accent text-[10px] md:text-xs tracking-widest">PVT. LTD.</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`px-3 py-2 text-sm font-medium transition-colors font-heading uppercase tracking-wide ${
                location.pathname === l.href
                  ? "text-accent"
                  : "text-primary-foreground/80 hover:text-accent"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button className="ml-4 bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase text-xs tracking-wider">
              <Phone className="w-3.5 h-3.5 mr-1" /> Request Quote
            </Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`block w-full text-left px-6 py-3 font-heading uppercase text-sm tracking-wide ${
                location.pathname === l.href
                  ? "text-accent bg-primary-foreground/5"
                  : "text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase text-xs">
                <Phone className="w-3.5 h-3.5 mr-1" /> Request Quote
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
