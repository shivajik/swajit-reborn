import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Sent!",
      description: "Thank you for your feedback. We appreciate your input.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageLayout>
      <PageBanner
        title="Feedback"
        subtitle="We value your feedback and suggestions"
        breadcrumb="Feedback"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Your Name (required)
                </label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Your Email (required)
                </label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Subject
                </label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Your Message
                </label>
                <Textarea
                  rows={8}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-secondary border-border resize-none"
                />
              </div>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider px-8 py-6 text-sm"
              >
                <Send className="w-4 h-4 mr-2" /> Send Feedback
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Feedback;
