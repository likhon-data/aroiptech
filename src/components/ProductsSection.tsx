import { motion } from "framer-motion";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";

const products = [
  {
    name: "Aroip Nexus",
    category: "AI Smart Hub",
    image: product1,
    description: "Your home's brain. Adaptive AI that learns your patterns.",
    gradient: "from-purple-500/10 via-pink-500/10 to-orange-500/10",
  },
  {
    name: "Aroip Pulse",
    category: "AI Wearable",
    image: product2,
    description: "Health meets intelligence. Real-time biometric AI companion.",
    gradient: "from-cyan-500/10 via-blue-500/10 to-purple-500/10",
  },
  {
    name: "Aroip Echo",
    category: "Neural Earbuds",
    image: product3,
    description: "Beyond sound. AI-powered spatial audio and voice control.",
    gradient: "from-pink-500/10 via-rose-500/10 to-red-500/10",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-soft opacity-50 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gradient font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Products
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Devices that <span className="text-gradient">think ahead</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl overflow-hidden cursor-pointer border border-border shadow-sm hover:glow-border-intense transition-all duration-500"
            >
              <div className={`aspect-square overflow-hidden bg-gradient-to-br ${product.gradient} flex items-center justify-center p-8`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <p className="text-gradient text-xs font-heading font-semibold tracking-[0.15em] uppercase mb-2">
                  {product.category}
                </p>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
