import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroChip from "@/assets/hero-chip.png";

const statsData = [
  { value: 10, suffix: "x", label: "Faster Processing" },
  { value: 50, suffix: "+", label: "Smart Devices" },
  { value: 99.9, suffix: "%", label: "Uptime" , decimals: 1 },
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
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={ref} className="font-heading text-3xl md:text-4xl font-bold text-gradient">
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

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] right-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl from-purple-400/25 via-pink-300/15 to-transparent blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[50%] rounded-full bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-transparent blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[0%] right-[20%] w-[35%] h-[35%] rounded-full bg-gradient-to-tl from-pink-400/15 via-orange-300/10 to-transparent blur-[100px] animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="max-w-6xl mx-auto px-6 pt-36 md:pt-44 pb-16 relative z-10">
        {/* Two-column hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left: Text content */}
          <motion.div style={{ y: textY, opacity }} className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm text-xs font-heading font-medium text-muted-foreground shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-hero animate-pulse-glow" />
                Aroip Gen 2 — Now Available
                <ChevronRight className="w-3 h-3" />
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-6">
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
                  Starts <span className="italic font-light text-muted-foreground">Here.</span>
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mb-8"
            >
              Aroip designs next-generation smart devices and AI-native hardware that redefine how you live, work, and connect.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-heading font-semibold shadow-xl text-sm px-7 py-5 rounded-xl group">
                <Cpu className="mr-2 h-4 w-4" />
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="gradient-border text-foreground hover:bg-secondary font-heading font-semibold text-sm px-7 py-5 rounded-xl">
                <Zap className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats inline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex gap-8"
            >
              {statsData.map((stat) => (
                <div key={stat.label}>
                  <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  <div className="text-muted-foreground text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Hero image */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Glowing ring behind image */}
              <div className="absolute inset-[-15%] rounded-full bg-gradient-hero opacity-[0.08] blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
              
              <img
                src={heroChip}
                alt="Aroip Gen 2 AI Processor – next-generation AI hardware chip"
                className="w-full max-w-lg xl:max-w-xl h-auto relative z-10 drop-shadow-2xl animate-float"
                loading="eager"
              />

              {/* Floating accent cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -left-4 top-1/4 glass-card rounded-xl px-4 py-3 shadow-lg z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-heading font-semibold text-foreground">AI Ready</div>
                    <div className="text-[10px] text-muted-foreground">On-device ML</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -right-2 bottom-1/3 glass-card rounded-xl px-4 py-3 shadow-lg z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-heading font-semibold text-foreground">5nm Process</div>
                    <div className="text-[10px] text-muted-foreground">Ultra efficient</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
