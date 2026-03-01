import { motion } from "framer-motion";

const partners = [
  { name: "TechCrunch", logo: "TC" },
  { name: "Wired", logo: "W" },
  { name: "The Verge", logo: "TV" },
  { name: "Forbes", logo: "F" },
  { name: "MIT Tech Review", logo: "MIT" },
  { name: "Bloomberg", logo: "B" },
  { name: "Fast Company", logo: "FC" },
  { name: "Engadget", logo: "E" },
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
                className="flex-shrink-0 flex items-center justify-center min-w-[120px]"
              >
                <span className="font-heading text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
