import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

const Footer = () => {
  const { settings } = useSiteSettings();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-black text-lg">S</span>
              </div>
              <div>
                <span className="font-heading font-bold text-sm block">SWAJIT ENGINEERING</span>
                <span className="text-accent text-[10px] tracking-widest">PVT. LTD.</span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              India's No. 1 conveyor chain manufacturer. Delivering precision-engineered industrial chains since 1992.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-accent mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="hover:text-accent transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-accent mb-4 uppercase text-sm tracking-wider">Industries</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Sugar", "Cement", "Steel", "Chemical", "Automobile", "Boiler & Thermal", "Solvent"].map((i) => (
                <li key={i}>
                  <Link to="/products" className="hover:text-accent transition-colors">{i}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-accent mb-4 uppercase text-sm tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{settings.company_address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>{settings.company_phone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>{settings.company_email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} {settings.company_name}. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/30 flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
