import { motion } from "framer-motion";
import { Cpu, Shield, Zap, Wifi, Database, Cloud } from "lucide-react";

const techItems = [
  { icon: Cpu, name: "Neural Processing", desc: "Custom AI chips built with sustainable silicon" },
  { icon: Shield, name: "Bio-Secure Auth", desc: "Privacy-first biometric authentication" },
  { icon: Zap, name: "Low-Power Core", desc: "Ultra-efficient energy consumption design" },
  { icon: Wifi, name: "Green Mesh Network", desc: "Self-healing mesh with minimal radiation" },
  { icon: Database, name: "Edge Computing", desc: "On-device processing, no cloud dependency" },
  { icon: Cloud, name: "Carbon-Neutral Cloud", desc: "100% renewable-powered cloud infrastructure" },
];

const TechStackSection = () => {
  return (
    <section id="tech" className="py-24 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)" }}>
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Pioneering hardware innovation with sustainability at every layer of our technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {item.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
