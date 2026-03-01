import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const statsData = [
  { value: 10, suffix: "x", label: "Faster Processing" },
  { value: 50, suffix: "+", label: "Smart Devices" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
];

const CountUp = ({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 1500 / steps);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={ref} className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </div>
  );
};

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.75]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Video background */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster=""
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/80 to-background"
      />

      {/* Color gradient accents over video */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-500/15" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pt-36 md:pt-44 pb-20 relative z-10 w-full">
        <motion.div style={{ y: textY, opacity: contentOpacity }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-md text-xs font-heading font-medium text-primary-foreground/90 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-hero animate-pulse-glow" />
              Aroip Gen 2 — Now Available
              <ChevronRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.05] tracking-[-0.04em] text-primary-foreground mb-6 max-w-3xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
                className="block"
              >
                The Future of
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="block text-gradient"
              >
                AI Hardware
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease }}
                className="block"
              >
                Starts Here.
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-primary-foreground/70 text-base md:text-lg max-w-lg leading-relaxed mb-10"
          >
            Aroip designs next-generation smart devices and AI-native hardware that redefine how you live, work, and connect.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-heading font-semibold shadow-xl text-sm px-7 py-5 rounded-xl group">
              <Cpu className="mr-2 h-4 w-4" />
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-heading font-semibold text-sm px-7 py-5 rounded-xl">
              <Zap className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex gap-10 md:gap-14"
          >
            {statsData.map((stat, i) => (
              <div key={stat.label} className="flex flex-col">
                <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                <div className="text-primary-foreground/50 text-xs mt-1 font-medium">{stat.label}</div>
                {i < statsData.length - 1 && <div className="hidden" />}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[3]" />
    </section>
  );
};

export default HeroSection;
