import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavItems, NavItem, NAV_GROUP_LABELS, NavGroupKey } from "@/hooks/useNavItems";
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

const GROUP_ORDER: NavGroupKey[] = ["corporate", "resources"];

/**
 * Build the final nav list:
 * 1. Render visible nav items in admin order.
 * 2. Build dropdowns from admin-assigned groups.
 * 3. Insert Corporate after Home and Resources after Products.
 */
function buildNavEntries(items: NavItem[]): NavEntry[] {
  const visibleItems = items
    .filter((i) => i.visible)
    .sort((a, b) => a.sort_order - b.sort_order)
;

  const topLevelItems = visibleItems
    .filter((i) => !i.group)
    .map<NavLinkItem>((i) => ({ label: i.label, href: i.href }));

  const dropdowns = new Map<NavGroupKey, NavDropdown>();
  GROUP_ORDER.forEach((group) => {
    const children = visibleItems
      .filter((item) => item.group === group)
      .map<NavLinkItem>((item) => ({ label: item.label, href: item.href }));

    if (children.length > 0) {
      dropdowns.set(group, { label: NAV_GROUP_LABELS[group], children });
    }
  });

  const result: NavEntry[] = [];
  const insertedGroups = new Set<NavGroupKey>();

  for (const item of topLevelItems) {
    result.push(item);
    if (item.href === "/" && dropdowns.has("corporate")) {
      result.push(dropdowns.get("corporate")!);
      insertedGroups.add("corporate");
    }
    if (item.href === "/products" && dropdowns.has("resources")) {
      result.push(dropdowns.get("resources")!);
      insertedGroups.add("resources");
    }
  }

  GROUP_ORDER.forEach((group) => {
    if (!insertedGroups.has(group) && dropdowns.has(group)) {
      if (group === "corporate") result.unshift(dropdowns.get(group)!);
      else result.push(dropdowns.get(group)!);
    }
  });

  return result;
}

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
  const { navItems } = useNavItems();

  const navLinks = useMemo(() => buildNavEntries(navItems), [navItems]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-8 md:top-9 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white shadow-none"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Swajit Engineering Pvt. Ltd." className="h-12 md:h-16 w-auto" />
        </Link>

        <div className="hidden xl:flex items-center gap-0">
          {navLinks.map((entry, idx) =>
            isDropdown(entry) ? (
              <DropdownMenu key={`drop-${entry.label}-${idx}`} item={entry} pathname={location.pathname} />
            ) : (
              <Link
                key={`link-${entry.href}-${idx}`}
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
          {navLinks.map((entry, idx) =>
            isDropdown(entry) ? (
              <div key={`mdrop-${entry.label}-${idx}`}>
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
                key={`mlink-${entry.href}-${idx}`}
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
