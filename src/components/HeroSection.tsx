import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDevice from "@/assets/hero-device.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-primary font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-6"
            >
              The Future is Hardware
            </motion.p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              Built for
              <br />
              <span className="text-gradient">Tomorrow.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-8 leading-relaxed">
              Aroip designs next-generation AI hardware and smart devices that redefine how you interact with technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold group">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-heading font-semibold">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src={heroDevice}
                alt="Aroip futuristic AI device"
                className="w-full max-w-lg animate-float rounded-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
