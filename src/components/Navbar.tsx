import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface NavLinkItem {
  label: string;
  href: string;
}

interface NavDropdown {
  label: string;
  children: NavLinkItem[];
}

type NavEntry = NavLinkItem | NavDropdown;

function isDropdown(entry: NavEntry): entry is NavDropdown {
  return "children" in entry;
}

const navLinks: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Corporate",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Mission And Vision", href: "/mission-vision" },
      { label: "Milestone", href: "/milestone" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Photo Gallery", href: "/photo-gallery" },
  {
    label: "Resources",
    children: [
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "ISO Certification", href: "/iso-certification" },
      { label: "Quality Policy", href: "/quality-policy" },
      { label: "Safety Policy", href: "/safety-policy" },
      { label: "Overseas Market", href: "/overseas-market" },
      { label: "Download", href: "/download" },
      { label: "Application Videos", href: "/application-videos" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "CSR", href: "/csr" },
  { label: "Contact Us", href: "/contact" },
];

const DropdownMenu = ({ item, pathname }: { item: NavDropdown; pathname: string }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const isActive = item.children.some((c) => pathname === c.href || pathname.startsWith(c.href.split("?")[0]));

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={`px-2 py-2 text-xs font-medium transition-colors font-heading uppercase tracking-wide flex items-center gap-0.5 whitespace-nowrap ${
          isActive ? "text-accent" : "text-primary/80 hover:text-accent"
        }`}
      >
        {item.label}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-xl min-w-[220px] py-2 z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm font-heading transition-colors ${
                pathname === child.href || pathname.startsWith(child.href.split("?")[0])
                  ? "text-accent bg-accent/5"
                  : "text-primary/80 hover:text-accent hover:bg-muted"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white shadow-none"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Swajit Engineering Pvt. Ltd." className="h-12 md:h-16 w-auto" />
        </Link>

        <div className="hidden xl:flex items-center gap-0">
          {navLinks.map((entry) =>
            isDropdown(entry) ? (
              <DropdownMenu key={entry.label} item={entry} pathname={location.pathname} />
            ) : (
              <Link
                key={entry.href}
                to={entry.href}
                className={`px-2 py-2 text-xs font-medium transition-colors font-heading uppercase tracking-wide whitespace-nowrap ${
                  location.pathname === entry.href
                    ? "text-accent"
                    : "text-primary/80 hover:text-accent"
                }`}
              >
                {entry.label}
              </Link>
            )
          )}
          <Link to="/contact">
            <Button className="ml-1 bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase text-[11px] tracking-wider px-3">
              <Phone className="w-3 h-3 mr-1" /> Request Quote
            </Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="xl:hidden text-primary p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-white border-t border-border pb-4 max-h-[80vh] overflow-y-auto">
          {navLinks.map((entry) =>
            isDropdown(entry) ? (
              <div key={entry.label}>
                <button
                  onClick={() => setExpandedMobile(expandedMobile === entry.label ? null : entry.label)}
                  className="flex items-center justify-between w-full text-left px-6 py-3 font-heading uppercase text-sm tracking-wide text-primary/80 hover:text-accent hover:bg-muted"
                >
                  {entry.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobile === entry.label ? "rotate-180" : ""}`} />
                </button>
                {expandedMobile === entry.label && (
                  <div className="bg-muted/50">
                    {entry.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setOpen(false)}
                        className={`block px-10 py-2.5 text-sm font-heading ${
                          location.pathname === child.href
                            ? "text-accent bg-muted"
                            : "text-primary/70 hover:text-accent"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={entry.href}
                to={entry.href}
                onClick={() => setOpen(false)}
                className={`block w-full text-left px-6 py-3 font-heading uppercase text-sm tracking-wide ${
                  location.pathname === entry.href
                    ? "text-accent bg-muted"
                    : "text-primary/80 hover:text-accent hover:bg-muted"
                }`}
              >
                {entry.label}
              </Link>
            )
          )}
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
