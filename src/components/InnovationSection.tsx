import { motion } from "framer-motion";
import { Leaf, Recycle, TreePine, Droplets } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Eco Materials",
    description: "Every device is built with sustainable bamboo, recycled metals, and bio-plastics.",
  },
  {
    icon: Recycle,
    title: "Circular Design",
    description: "Fully recyclable products designed for disassembly and second life.",
  },
  {
    icon: TreePine,
    title: "Carbon Neutral",
    description: "We offset every gram of carbon from production to delivery.",
  },
  {
    icon: Droplets,
    title: "Ocean Friendly",
    description: "Our packaging and select products use recovered ocean-bound plastic.",
  },
];

const InnovationSection = () => {
  return (
    <section id="sustainability" className="py-24 relative bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body font-medium tracking-[0.25em] text-primary uppercase mb-4">
            Sustainability
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Technology That <span className="italic">Cares</span>
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
              className="bg-background rounded-xl p-6 border border-border hover:shadow-md transition-all duration-500 group text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
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
