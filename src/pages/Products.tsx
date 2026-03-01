import { motion } from "framer-motion";
import { Crown, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { useProducts, DBProduct } from "@/hooks/use-products";
import { Cpu, Wifi, Battery, Shield, Leaf, Zap, Eye, Heart, Globe, Layers, Sparkles, Gauge } from "lucide-react";

const iconMap: Record<string, typeof Cpu> = { Cpu, Wifi, Battery, Shield, Leaf, Zap, Eye, Heart, Globe, Layers, Sparkles, Gauge };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; className: string }> = {
  "available": { label: "Available", icon: CheckCircle, className: "bg-primary/10 text-primary" },
  "coming-soon": { label: "Coming Soon", icon: Clock, className: "bg-accent text-muted-foreground" },
  "sold-out": { label: "Sold Out", icon: AlertCircle, className: "bg-destructive/10 text-destructive" },
};

const Products = () => {
  const { products, loading } = useProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aroip Products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Product", name: p.name, description: p.description, offers: { "@type": "Offer", price: p.price.replace("$", ""), priceCurrency: "USD" } },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Products – Aroip Limited Edition Eco-Tech" description="Explore Aroip's limited edition sustainable smart devices." canonical="https://aroiptech.lovable.app/products" jsonLd={jsonLd} />
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Limited Edition</span>
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-gradient italic">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
              Every Aroip product is a limited edition — numbered, certified, and built with premium sustainable materials.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products available yet.</div>
          ) : (
            products.map((product, i) => {
              const status = statusConfig[product.status] || statusConfig["coming-soon"];
              const StatusIcon = status.icon;
              return (
                <motion.div key={product.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="glass-card rounded-2xl overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 bg-secondary/50 flex items-center justify-center p-8 md:p-12">
                      <img src={product.image_url} alt={product.name} className="w-full max-w-[240px] h-auto object-contain" loading="lazy" />
                    </div>
                    <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${status.className}`}>
                          <StatusIcon className="w-3.5 h-3.5" /> {status.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                          <Crown className="w-3 h-3" /> {product.edition}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{product.name}</h2>
                      <p className="text-sm text-primary font-semibold mt-1 mb-1">{product.tagline}</p>
                      <p className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>{product.price}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {product.specs.map((spec) => {
                          const Icon = iconMap[spec.icon] || Leaf;
                          return (
                            <div key={spec.label} className="flex items-center gap-2 bg-secondary/60 px-3 py-2 rounded-lg">
                              <Icon className="w-4 h-4 text-primary" />
                              <span className="text-xs font-medium text-foreground">{spec.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <Link to={`/products/${product.slug}`}>
                          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg">
                            {product.status === "sold-out" ? "View Details" : product.status === "coming-soon" ? "Learn More" : "Pre-Order Now"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Products;
