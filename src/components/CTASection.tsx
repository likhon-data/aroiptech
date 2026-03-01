import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
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
            <p className="text-primary-foreground/60 text-xs font-body font-medium tracking-[0.25em] uppercase mb-4">
              Join the Movement
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-primary-foreground">
              Ready to Go <span className="italic">Green?</span>
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-lg mx-auto mb-8 font-body">
              Stay updated on new eco-friendly releases and sustainability initiatives from Aroip.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-lg bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 font-body text-sm"
              />
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-body font-semibold whitespace-nowrap group rounded-lg">
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
