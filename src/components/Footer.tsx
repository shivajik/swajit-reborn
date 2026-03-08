import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-black text-lg">S</span>
              </div>
              <div>
                <span className="font-heading font-bold text-sm block">SWAJIT ENGINEERING</span>
                <span className="text-accent text-[10px] tracking-widest">PVT. LTD.</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              India's No. 1 conveyor chain manufacturer. Delivering precision-engineered industrial chains since 1992.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-accent mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Home", "About Us", "Products", "Clients", "Career", "Contact Us"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="hover:text-accent transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-heading font-bold text-accent mb-4 uppercase text-sm tracking-wider">Industries</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Sugar", "Cement", "Steel", "Chemical", "Automobile", "Boiler & Thermal", "Solvent"].map((i) => (
                <li key={i} className="hover:text-accent transition-colors cursor-pointer">{i}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-accent mb-4 uppercase text-sm tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Plot No. C-1 to C-5, MIDC Chikalthana, Aurangabad - 431006, Maharashtra, India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+91 240 2484032 / 33</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@swajit.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Swajit Engineering Pvt. Ltd. All rights reserved.
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
