import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI-Native Hardware",
    description: "Every chip is designed with machine learning at its core, not as an afterthought.",
  },
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description: "Edge computing meets precision engineering for real-time responsiveness.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "On-device processing ensures your data stays yours. Always.",
  },
  {
    icon: Globe,
    title: "Connected Ecosystem",
    description: "Seamless interoperability across all Aroip devices and platforms.",
  },
];

const InnovationSection = () => {
  return (
    <section id="innovation" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Innovation
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Engineering the <span className="text-gradient">impossible</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:glow-border transition-shadow duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
