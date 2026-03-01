import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDevice from "@/assets/hero-device-light.png";

const statsData = [
  { value: 10, suffix: "x", label: "Faster AI Processing" },
  { value: 50, suffix: "+", label: "Smart Devices" },
  { value: 99.9, suffix: "%", label: "Uptime Guarantee", decimals: 1 },
];

const CountUp = ({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
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
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={ref} className="font-heading text-2xl md:text-3xl font-bold text-gradient mb-1">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-purple-400/30 via-pink-300/20 to-transparent blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-blue-400/25 via-cyan-300/15 to-transparent blur-[100px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[0%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-pink-400/20 via-orange-300/15 to-transparent blur-[100px] animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="max-w-6xl mx-auto px-6 pt-36 md:pt-40 pb-12 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ y: textY, opacity }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-hero text-primary-foreground text-xs font-heading font-semibold tracking-wide shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            Introducing Aroip Gen 2 — Now Available
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ y: textY, opacity }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1] tracking-[-0.04em] text-foreground">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Hardware
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gradient"
                style={{ WebkitBackgroundClip: "text" }}
              >
                Reimagined
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                for the <span className="italic font-light text-muted-foreground">AI Era</span>
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ y: textY, opacity }}
          className="text-center text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Aroip builds next-gen AI devices and smart gadgets that feel like the future — because they are.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ y: textY, opacity }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 font-heading font-semibold shadow-xl text-base px-8 py-6 group">
            <Cpu className="mr-2 h-5 w-5" />
            Explore Products
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="gradient-border text-foreground hover:bg-secondary font-heading font-semibold text-base px-8 py-6">
            <Zap className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Hero Image with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{ y: imageY, scale: imageScale }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src={heroDevice}
              alt="Aroip Gen 2 AI Hardware - Next generation processing chip"
              className="w-full h-auto"
              loading="eager"
            />
          </div>
          {/* Glow under the image */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-hero opacity-20 blur-[60px] rounded-full" />
        </motion.div>

        {/* Stats bar with count-up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 flex items-center justify-around gap-4 shadow-lg">
            {statsData.map((stat) => (
              <div key={stat.label} className="text-center flex-1">
                <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                <div className="text-muted-foreground text-xs md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
