import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDevice from "@/assets/hero-device.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Top gradient blob */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-hero opacity-[0.12] blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-warm opacity-[0.10] blur-[100px]" />

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
              className="text-gradient font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-6"
            >
              The Future is Hardware
            </motion.p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] mb-6 text-foreground">
              Built for
              <br />
              <span className="text-gradient">Tomorrow.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-8 leading-relaxed">
              Aroip designs next-generation AI hardware and smart devices that redefine how you interact with technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-heading font-semibold shadow-lg group">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="gradient-border text-foreground hover:bg-secondary font-heading font-semibold">
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
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-[60px] rounded-full scale-75" />
              <img
                src={heroDevice}
                alt="Aroip futuristic AI device"
                className="w-full max-w-lg animate-float rounded-2xl relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
