import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI-Native Hardware",
    description: "Every chip is designed with machine learning at its core, not as an afterthought.",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description: "Edge computing meets precision engineering for real-time responsiveness.",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "On-device processing ensures your data stays yours. Always.",
    gradient: "from-cyan-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Connected Ecosystem",
    description: "Seamless interoperability across all Aroip devices and platforms.",
    gradient: "from-orange-500 to-pink-500",
  },
];

const InnovationSection = () => {
  return (
    <section id="innovation" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gradient-warm font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Innovation
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Engineering the <span className="text-gradient-warm">impossible</span>
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
              className="bg-card rounded-2xl p-6 border border-border hover:glow-border transition-all duration-500 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
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
