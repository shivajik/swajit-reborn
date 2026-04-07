import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Mail, Send, Users, TrendingUp, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const perks = [
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Continuous learning and career advancement paths." },
  { icon: Users, title: "Collaborative Culture", desc: "Work with experienced engineers and metallurgists." },
  { icon: Heart, title: "Employee Welfare", desc: "Comprehensive benefits and a supportive work environment." },
];

const Careers = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Resume Submitted!", description: "Thank you for your interest. Our HR team will review your application." });
    setForm({ name: "", email: "", phone: "", position: "", message: "" });
  };

  return (
    <PageLayout>
      <PageBanner
        title="Careers"
        subtitle="Join India's No. 1 Conveyor Chain Manufacturer"
        breadcrumb="Careers"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            {/* Why Work With Us */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                A Few Things You Can Expect From Working Here
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {perks.map((p) => (
                <div key={p.title} className="text-center p-6 bg-secondary rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <p.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Application Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Submit Your Resume</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and our HR team will get back to you.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Full Name *</label>
                      <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="bg-secondary border-border" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Email *</label>
                      <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="bg-secondary border-border" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Phone</label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="bg-secondary border-border" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Position Applying For</label>
                      <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="e.g. CNC Operator" className="bg-secondary border-border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">Cover Letter / Message</label>
                    <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about yourself and your experience..." className="bg-secondary border-border resize-none" />
                  </div>
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm">
                    <Send className="w-4 h-4 mr-2" /> Submit Application
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Contact HR</h2>
                <div className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">Email Resume To</h4>
                    <a href="mailto:hr@swajit.com" className="text-sm text-accent hover:underline">hr@swajit.com</a>
                  </div>
                </div>
                <div className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">Work Location</h4>
                    <p className="text-sm text-muted-foreground">K-9, M.I.D.C., Waluj</p>
                    <p className="text-sm text-muted-foreground">Aurangabad-431136, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">Why Swajit?</h4>
                    <p className="text-sm text-muted-foreground">30+ years of excellence, 250+ team members, ISO certified workplace</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
