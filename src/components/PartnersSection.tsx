import { motion } from "framer-motion";

const TechCrunchLogo = () => (
  <svg viewBox="0 0 220 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="24" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" letterSpacing="-1">TechCrunch</text>
  </svg>
);

const WiredLogo = () => (
  <svg viewBox="0 0 120 30" fill="currentColor" className="h-6 w-auto">
    <text x="0" y="24" fontFamily="Georgia, serif" fontWeight="400" fontSize="28" fontStyle="italic" letterSpacing="2">WIRED</text>
  </svg>
);

const TheVergeLogo = () => (
  <svg viewBox="0 0 160 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">THE VERGE</text>
  </svg>
);

const ForbesLogo = () => (
  <svg viewBox="0 0 130 30" fill="currentColor" className="h-6 w-auto">
    <text x="0" y="25" fontFamily="Georgia, serif" fontWeight="700" fontSize="28" fontStyle="italic" letterSpacing="1">Forbes</text>
  </svg>
);

const BloombergLogo = () => (
  <svg viewBox="0 0 200 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="23" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="700" fontSize="22" letterSpacing="2">Bloomberg</text>
  </svg>
);

const FastCompanyLogo = () => (
  <svg viewBox="0 0 220 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="23" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="20" letterSpacing="0">FAST COMPANY</text>
  </svg>
);

const EngadgetLogo = () => (
  <svg viewBox="0 0 170 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="24" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="700" fontSize="24" letterSpacing="-0.5">engadget</text>
  </svg>
);

const MITLogo = () => (
  <svg viewBox="0 0 240 30" fill="currentColor" className="h-5 w-auto">
    <text x="0" y="22" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="300" fontSize="18" letterSpacing="1">MIT Technology Review</text>
  </svg>
);

const partners = [
  { name: "TechCrunch", Logo: TechCrunchLogo },
  { name: "Wired", Logo: WiredLogo },
  { name: "The Verge", Logo: TheVergeLogo },
  { name: "Forbes", Logo: ForbesLogo },
  { name: "Bloomberg", Logo: BloombergLogo },
  { name: "Fast Company", Logo: FastCompanyLogo },
  { name: "Engadget", Logo: EngadgetLogo },
  { name: "MIT Tech Review", Logo: MITLogo },
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
                className="flex-shrink-0 flex items-center justify-center min-w-[140px] text-muted-foreground/35 hover:text-muted-foreground/60 transition-colors duration-300"
                aria-label={partner.name}
              >
                <partner.Logo />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
