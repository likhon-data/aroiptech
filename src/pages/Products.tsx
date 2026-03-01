import { motion } from "framer-motion";
import { Crown, Leaf, Cpu, Wifi, Battery, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ecoChipX1 from "@/assets/eco-chip-x1.png";
import ecoSensePro from "@/assets/eco-sense-pro.png";
import ecoPadLite from "@/assets/eco-pad-lite.png";
import ecoLinkBand from "@/assets/eco-link-band.png";
import ecoStationMini from "@/assets/eco-station-mini.png";
import ecoVisionGlass from "@/assets/eco-vision-glass.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

type Status = "available" | "coming-soon" | "sold-out";

const statusConfig: Record<Status, { label: string; icon: typeof CheckCircle; className: string }> = {
  "available": { label: "Available", icon: CheckCircle, className: "bg-primary/10 text-primary" },
  "coming-soon": { label: "Coming Soon", icon: Clock, className: "bg-accent text-muted-foreground" },
  "sold-out": { label: "Sold Out", icon: AlertCircle, className: "bg-destructive/10 text-destructive" },
};

const products = [
  {
    name: "AroCore X1",
    tagline: "Neural AI Processor",
    desc: "Our flagship bio-chip featuring recycled silicon architecture with 40% less energy consumption. Each unit is individually numbered.",
    image: ecoChipX1,
    edition: "Limited to 500 units",
    status: "coming-soon" as Status,
    specs: [
      { icon: Cpu, label: "Neural 8-Core" },
      { icon: Battery, label: "Ultra Low Power" },
      { icon: Leaf, label: "95% Recycled" },
    ],
  },
  {
    name: "AroSense Pro",
    tagline: "Smart Environment Hub",
    desc: "A biodegradable smart home hub that monitors air quality, energy usage, and connects your eco-friendly devices through green mesh networking.",
    image: ecoSensePro,
    edition: "Limited to 1,000 units",
    status: "coming-soon" as Status,
    specs: [
      { icon: Wifi, label: "Green Mesh" },
      { icon: Shield, label: "Bio-Secure" },
      { icon: Leaf, label: "Biodegradable" },
    ],
  },
  {
    name: "AroPad Lite",
    tagline: "Sustainable Tablet",
    desc: "A lightweight tablet crafted with bamboo-composite casing and an e-ink hybrid display that lasts weeks on a single charge.",
    image: ecoPadLite,
    edition: "Limited to 750 units",
    status: "coming-soon" as Status,
    specs: [
      { icon: Battery, label: "30-Day Battery" },
      { icon: Leaf, label: "Bamboo Body" },
      { icon: Cpu, label: "AroCore Inside" },
    ],
  },
  {
    name: "AroLink Band",
    tagline: "Eco Fitness Wearable",
    desc: "Health tracking meets sustainability — a fitness band made from ocean-recycled plastics with solar-assisted charging.",
    image: ecoLinkBand,
    edition: "Limited to 2,000 units",
    status: "coming-soon" as Status,
    specs: [
      { icon: Battery, label: "Solar Charge" },
      { icon: Shield, label: "Health AI" },
      { icon: Leaf, label: "Ocean Plastic" },
    ],
  },
  {
    name: "AroStation Mini",
    tagline: "Edge Compute Node",
    desc: "A palm-sized edge computing device for on-device AI processing. Zero cloud dependency, carbon-neutral manufacturing.",
    image: ecoStationMini,
    edition: "Limited to 300 units",
    status: "coming-soon" as Status,
    specs: [
      { icon: Cpu, label: "Edge AI" },
      { icon: Shield, label: "Privacy First" },
      { icon: Leaf, label: "Carbon Neutral" },
    ],
  },
  {
    name: "AroVision Glass",
    tagline: "AR Smart Glasses",
    desc: "Augmented reality glasses with frames made from recycled titanium and plant-based polymers. See the world differently.",
    image: ecoVisionGlass,
    edition: "Limited to 200 units",
    status: "coming-soon" as Status,
    specs: [
      { icon: Cpu, label: "AR Engine" },
      { icon: Battery, label: "All-Day Use" },
      { icon: Leaf, label: "Recycled Ti" },
    ],
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Limited Edition</span>
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our <span className="text-gradient italic">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
              Every Aroip product is a limited edition — numbered, certified, and built with 
              premium sustainable materials. Once they're gone, they're gone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {products.map((product, i) => {
            const status = statusConfig[product.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 bg-secondary/50 flex items-center justify-center p-8 md:p-12">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-w-[240px] h-auto object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${status.className}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        <Crown className="w-3 h-3" />
                        {product.edition}
                      </span>
                    </div>

                    <h2
                      className="text-2xl md:text-3xl font-bold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {product.name}
                    </h2>
                    <p className="text-sm text-primary font-semibold mt-1 mb-3">{product.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{product.desc}</p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {product.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center gap-2 bg-secondary/60 px-3 py-2 rounded-lg"
                        >
                          <spec.icon className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-foreground">{spec.label}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Button
                        disabled={product.status === "sold-out"}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg"
                      >
                        {product.status === "sold-out"
                          ? "Sold Out"
                          : product.status === "coming-soon"
                          ? "Notify Me"
                          : "Learn More"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Products;
