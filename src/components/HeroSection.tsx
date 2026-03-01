import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/use-site-content";

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
    <div ref={ref} className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </div>
  );
};

const FloatingDots = () => (
  <>
    <div className="floating-dot w-3 h-3 top-[20%] left-[8%] animate-float" style={{ animationDelay: "0s" }} />
    <div className="floating-dot w-5 h-5 top-[60%] left-[5%] animate-float" style={{ animationDelay: "1s" }} />
    <div className="floating-dot w-4 h-4 top-[35%] right-[7%] animate-float" style={{ animationDelay: "2s" }} />
    <div className="floating-dot w-6 h-6 top-[70%] right-[10%] animate-float" style={{ animationDelay: "0.5s" }} />
    <div className="floating-dot w-3 h-3 top-[85%] left-[30%] animate-float" style={{ animationDelay: "1.5s" }} />
    <div className="floating-dot w-4 h-4 top-[15%] right-[25%] animate-float" style={{ animationDelay: "3s" }} />
  </>
);

// Fallback data
const defaultData = {
  badge_text: "Eco-Friendly Smart Technology",
  since_label: "Since 2025",
  title_line1: "Smart Devices,",
  title_line2: "Greener Planet",
  subtitle: "Premium eco-friendly AI hardware and smart devices built with sustainable materials for a greener tomorrow",
  cta_primary: "Explore Collection",
  cta_secondary: "Learn More",
  stats: [
    { value: 50, suffix: "+", label: "PRODUCTS" },
    { value: 100, suffix: "%", label: "SUSTAINABLE" },
    { value: 500, suffix: "+", label: "HAPPY CLIENTS" },
  ],
};

const HeroSection = () => {
  const { data: content } = useSiteContent("hero");
  const d = content || defaultData;
  const statsData = d.stats || defaultData.stats;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FloatingDots />
      <div className="max-w-6xl mx-auto px-6 pt-36 md:pt-40 pb-16 relative z-10 w-full">
        <motion.div style={{ y: textY, opacity: contentOpacity }} className="flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-card text-sm font-body font-medium text-muted-foreground shadow-sm">
              <Leaf className="w-4 h-4 text-primary" />
              {d.badge_text}
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="decorative-line text-xs font-body font-medium tracking-[0.25em] text-muted-foreground uppercase mb-8">
            {d.since_label}
          </motion.div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 md:mb-8 max-w-4xl px-2">
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="block">
                {String(d.title_line1).split("").map((char: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: "easeOut" }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : undefined }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} className="block italic">
                {String(d.title_line2).split("").map((char: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.04, ease: "easeOut" }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : undefined }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-8 md:mb-10 font-body px-2">
            {d.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-14 md:mb-20 w-full px-4 sm:px-0">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold text-sm px-6 sm:px-8 py-5 sm:py-6 rounded-lg group w-full sm:w-auto">
              {d.cta_primary}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-secondary font-body font-semibold text-sm px-6 sm:px-8 py-5 sm:py-6 rounded-lg w-full sm:w-auto">
              <Play className="mr-2 h-4 w-4" />
              {d.cta_secondary}
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.85 }} className="flex gap-8 sm:gap-12 md:gap-20">
            {statsData.map((stat: any) => (
              <div key={stat.label} className="text-center">
                <CountUp target={Number(stat.value)} suffix={stat.suffix} />
                <div className="text-muted-foreground text-[10px] md:text-xs tracking-[0.2em] font-body font-medium mt-2 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
