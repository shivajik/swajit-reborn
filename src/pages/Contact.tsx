import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Contact = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      lines: settings.company_address.split(",").length > 2
        ? [settings.company_address.split(",").slice(0, 2).join(",") + ",", settings.company_address.split(",").slice(2).join(",").trim()]
        : [settings.company_address],
    },
    {
      icon: Phone,
      title: "Phone",
      lines: [settings.company_phone, "+91 240 2484034 (Fax)"],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [settings.company_email, "sales@swajit.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <PageLayout>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch for customized conveyor chain solutions"
        breadcrumb="Contact"
      />

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">Fill out the form and our team will respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Full Name *</label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Email Address *</label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Phone Number</label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Company Name</label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your company"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Message *</label>
                  <Textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    className="bg-secondary border-border resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm"
                >
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">We'd love to hear from you. Reach out through any of these channels.</p>

              {contactInfo.map((c) => (
                <div key={c.title} className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">{c.title}</h4>
                    {c.lines.map((line) => (
                      <p key={line} className="text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="rounded-xl overflow-hidden border border-border h-[400px]">
            <iframe
              src={settings.company_map_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.228!2d75.3834!3d19.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98fd7a0e9b97%3A0x6c6c14d2e32c1e0!2sMIDC%20Chikalthana%2C%20Aurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${settings.company_name} Location`}
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
