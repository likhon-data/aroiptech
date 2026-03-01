import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden bg-gradient-hero shadow-2xl"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-primary-foreground/10 blur-[80px]" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-primary-foreground">
              Ready to experience the future?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Join thousands who are already living tomorrow. Stay updated on new releases and exclusive drops.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 font-body text-sm backdrop-blur-sm"
              />
              <Button className="bg-card text-foreground hover:bg-card/90 font-heading font-semibold whitespace-nowrap group shadow-lg">
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
