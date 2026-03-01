import { motion } from "framer-motion";

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
  return (
    <section className="py-16 border-b border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm font-body font-medium text-muted-foreground tracking-widest uppercase mb-10">
          As Featured In
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card/50 to-transparent z-10" />
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center min-w-[140px] opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 w-auto max-w-[140px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
