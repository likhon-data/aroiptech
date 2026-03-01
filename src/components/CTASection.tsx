import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/use-site-content";

const defaultData = {
  label: "Early Access",
  heading: "Join the",
  heading_highlight: "Waitlist",
  description: "Be the first to experience our eco-friendly smart devices. Sign up for early access and sustainability updates.",
  button_text: "Join Waitlist",
  privacy_note: "No spam, ever. We respect your privacy.",
  success_title: "You're on the list!",
  success_message: "We'll notify you when our first eco-friendly devices are ready for early access.",
};

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data: content } = useSiteContent("cta");
  const d = content || defaultData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("waitlist").insert({ email: trimmed });
    setLoading(false);
    if (error) {
      if (error.code === "23505") { toast({ title: "Already on the list!", description: "This email is already registered." }); setSubmitted(true); }
      else toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="rounded-2xl p-12 md:p-16 text-center relative overflow-hidden bg-primary">
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary-foreground/60" />
                    <p className="text-primary-foreground/60 text-xs font-medium tracking-[0.25em] uppercase">{d.label}</p>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {d.heading} <span className="italic">{d.heading_highlight}</span>
                  </h2>
                  <p className="text-primary-foreground/70 text-base md:text-lg max-w-lg mx-auto mb-8">{d.description}</p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" maxLength={255}
                      className="w-full px-5 py-3 rounded-lg bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 text-sm" />
                    <Button type="submit" disabled={loading} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold whitespace-nowrap group rounded-lg">
                      {loading ? "Joining..." : d.button_text}
                      {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                  <p className="text-primary-foreground/40 text-xs mt-4">{d.privacy_note}</p>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-4">
                  <CheckCircle className="w-14 h-14 text-primary-foreground/80 mx-auto mb-5" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary-foreground" style={{ fontFamily: "var(--font-heading)" }}>{d.success_title}</h2>
                  <p className="text-primary-foreground/70 text-lg max-w-md mx-auto">{d.success_message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
