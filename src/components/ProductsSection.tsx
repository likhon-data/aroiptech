import { motion } from "framer-motion";
import ecoProduct1 from "@/assets/eco-product-1.png";
import ecoProduct2 from "@/assets/eco-product-2.png";
import ecoProduct3 from "@/assets/eco-product-3.png";

const products = [
  {
    name: "Aroip Nexus",
    category: "Smart Hub",
    image: ecoProduct1,
    description: "Bamboo-crafted AI smart hub. Sustainable design, intelligent living.",
    material: "Bamboo & Recycled Aluminum",
  },
  {
    name: "Aroip Echo",
    category: "Earbuds",
    image: ecoProduct2,
    description: "Crystal clear audio in a bamboo case. Zero plastic, zero compromise.",
    material: "Bamboo & Bio-Plastic",
  },
  {
    name: "Aroip Pulse",
    category: "Smartwatch",
    image: ecoProduct3,
    description: "Health monitoring with an ocean plastic strap. Wear the change.",
    material: "Recycled Ocean Plastic",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body font-medium tracking-[0.25em] text-primary uppercase mb-4">
            Our Collection
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Designed with <span className="italic">Nature</span> in Mind
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
              whileHover={{ y: -6 }}
              className="bg-card rounded-xl overflow-hidden cursor-pointer border border-border hover:shadow-lg transition-all duration-500 group"
            >
              <div className="aspect-square overflow-hidden bg-accent/30 flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <p className="text-[10px] font-body font-medium tracking-[0.2em] text-primary uppercase mb-2">
                  {product.category}
                </p>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3 font-body">
                  {product.description}
                </p>
                <p className="text-xs text-primary font-body font-medium">
                  ♻ {product.material}
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
