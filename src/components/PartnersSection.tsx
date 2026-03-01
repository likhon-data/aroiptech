import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "TechCrunch", logo: "/logos/techcrunch.svg" },
  { name: "Wired", logo: "/logos/wired.svg" },
  { name: "The Verge", logo: "/logos/theverge.svg" },
  { name: "Forbes", logo: "/logos/forbes.svg" },
  { name: "Bloomberg", logo: "/logos/bloomberg.svg" },
  { name: "Fast Company", logo: "/logos/fastcompany.svg" },
  { name: "Engadget", logo: "/logos/engadget.svg" },
  { name: "Reuters", logo: "/logos/reuters.svg" },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header with decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border" />
          <p className="text-xs font-body font-semibold text-muted-foreground tracking-[0.25em] uppercase">
            As Featured In
          </p>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border" />
        </motion.div>

        {/* Logo marquee */}
        <div className="relative">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center px-8 md:px-12 group cursor-default"
                >
                  <div className="relative py-6 px-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-7 md:h-9 w-auto max-w-[150px] object-contain grayscale opacity-30 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center"
        />
      </div>
    </section>
  );
};

export default PartnersSection;
