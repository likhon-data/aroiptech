import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-12 md:p-16 text-center relative overflow-hidden bg-primary"
        >
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary-foreground/60" />
                    <p className="text-primary-foreground/60 text-xs font-medium tracking-[0.25em] uppercase">
                      Early Access
                    </p>
                  </div>
                  <h2
                    className="text-3xl md:text-5xl font-bold mb-4 text-primary-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Join the <span className="italic">Waitlist</span>
                  </h2>
                  <p className="text-primary-foreground/70 text-base md:text-lg max-w-lg mx-auto mb-8">
                    Be the first to experience our eco-friendly smart devices.
                    Sign up for early access and sustainability updates.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      maxLength={255}
                      className="w-full px-5 py-3 rounded-lg bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 text-sm"
                    />
                    <Button
                      type="submit"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold whitespace-nowrap group rounded-lg"
                    >
                      Join Waitlist
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                  <p className="text-primary-foreground/40 text-xs mt-4">
                    No spam, ever. We respect your privacy.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-4"
                >
                  <CheckCircle className="w-14 h-14 text-primary-foreground/80 mx-auto mb-5" />
                  <h2
                    className="text-3xl md:text-4xl font-bold mb-3 text-primary-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    You're on the list!
                  </h2>
                  <p className="text-primary-foreground/70 text-lg max-w-md mx-auto">
                    We'll notify you when our first eco-friendly devices are
                    ready for early access.
                  </p>
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
