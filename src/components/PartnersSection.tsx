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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
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

        {/* Staggered logo grid on desktop, scroll on mobile */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="group flex items-center justify-center rounded-xl border border-transparent hover:border-border hover:bg-card/80 hover:shadow-lg py-8 px-6 transition-colors duration-300 cursor-default"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 lg:h-12 w-auto max-w-[160px] object-contain grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-400"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: two-row infinite scroll */}
        <div className="md:hidden space-y-4">
          {[0, 1].map((row) => (
            <div key={row} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              <motion.div
                className="flex items-center gap-8"
                animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {[...partners.slice(row * 4, row * 4 + 4), ...partners.slice(row * 4, row * 4 + 4)].map((partner, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center justify-center px-4 py-4"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-10 w-auto max-w-[130px] object-contain grayscale opacity-35"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
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
