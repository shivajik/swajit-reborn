import { MessageCircle, Facebook, Linkedin, Twitter, Youtube, Instagram, Mail } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const socialIcons = [
  { key: "social_facebook", icon: Facebook, label: "Facebook" },
  { key: "social_linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "social_twitter", icon: Twitter, label: "Twitter" },
  { key: "social_youtube", icon: Youtube, label: "YouTube" },
  { key: "social_instagram", icon: Instagram, label: "Instagram" },
];

const TopStrip = () => {
  const { settings } = useSiteSettings();
  const whatsapp = settings.company_whatsapp || "+91 9922941689";
  const waDigits = whatsapp.replace(/[^\d]/g, "");
  const activeSocials = socialIcons.filter((s) => settings[s.key]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-primary text-primary-foreground text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 md:px-8 h-8 md:h-9">
        <a
          href={`https://wa.me/${waDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-heading font-semibold tracking-wide hover:text-accent transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-accent" />
          <span className="hidden sm:inline">WhatsApp:</span>
          <span>{whatsapp}</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="mailto:marketing@swajit.com"
            className="hidden md:flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Mail className="w-3 h-3 text-accent" />
            <span>marketing@swajit.com</span>
          </a>
          {activeSocials.length > 0 && (
            <div className="flex items-center gap-1.5">
              {activeSocials.map((s) => (
                <a
                  key={s.key}
                  href={settings[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-6 h-6 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
                >
                  <s.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopStrip;
