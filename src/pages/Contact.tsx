import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@aroip.com", href: "mailto:hello@aroip.com" },
  { icon: Phone, label: "Phone", value: "+1 (800) AROIP-01", href: "tel:+18002764701" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/aroip" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/aroip" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/aroip" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@aroip" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message, subject } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      if (error) throw error;
      setSent(true);
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us – Aroip"
        description="Get in touch with Aroip. Questions, partnerships, or just saying hello — we'd love to hear from you."
        canonical="https://aroiptech.lovable.app/contact"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">
              Get In Touch
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mt-4 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let's <span className="text-gradient italic">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
              Have a question, partnership idea, or just want to say hello?
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div {...fadeUp} className="lg:col-span-3">
            {!sent ? (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Send us a message
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} maxLength={100} placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} maxLength={255} placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} maxLength={200} placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} maxLength={1000} rows={5} placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
                </div>
                <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg group">
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>Message Sent!</h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24–48 hours.
                </p>
                <Button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} variant="outline" className="mt-6 rounded-lg">
                  Send another message
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div {...fadeUp} className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-heading)" }}>Contact Info</h3>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <a key={item.label} href={item.href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-heading)" }}>Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors group">
                    <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
