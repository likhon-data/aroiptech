import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, CheckCircle, Clock, AlertCircle, Leaf, Package, Recycle, ChevronRight, Cpu, Wifi, Battery, Shield, Zap, Eye, Heart, Globe, Layers, Sparkles, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useProduct } from "@/hooks/use-products";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, typeof Cpu> = { Cpu, Wifi, Battery, Shield, Leaf, Zap, Eye, Heart, Globe, Layers, Sparkles, Gauge };

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; className: string }> = {
  available: { label: "Available", icon: CheckCircle, className: "bg-primary/10 text-primary" },
  "coming-soon": { label: "Coming Soon", icon: Clock, className: "bg-accent text-muted-foreground" },
  "sold-out": { label: "Sold Out", icon: AlertCircle, className: "bg-destructive/10 text-destructive" },
};

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { product, loading } = useProduct(slug);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24 text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-24">
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Product not found</h1>
          <Button onClick={() => navigate("/products")} variant="outline">Back to Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const status = statusConfig[product.status] || statusConfig["coming-soon"];
  const StatusIcon = status.icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: { "@type": "Offer", price: product.price.replace("$", ""), priceCurrency: "USD" },
  };

  const handlePreOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert({ email });
      if (error) {
        if (error.code === "23505") toast({ title: "Already registered!", description: "You're already on the list." });
        else throw error;
      } else {
        toast({ title: "You're on the list! 🎉", description: `We'll notify you when ${product.name} is available.` });
        setEmail("");
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${product.name} – ${product.tagline} | Aroip`} description={product.description} canonical={`https://aroiptech.lovable.app/products/${product.slug}`} type="product" jsonLd={jsonLd} />
      <Navbar />

      <div className="pt-24 pb-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-8 md:p-12 flex items-center justify-center aspect-square bg-secondary/30">
                <img src={product.image_url} alt={product.name} className="w-full max-w-[360px] h-auto object-contain" />
              </div>
            </div>

            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${status.className}`}>
                    <StatusIcon className="w-3.5 h-3.5" /> {status.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    <Crown className="w-3 h-3" /> {product.edition}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>{product.name}</h1>
                <p className="text-primary font-semibold text-lg mt-1">{product.tagline}</p>
                <p className="text-3xl font-bold text-foreground mt-4" style={{ fontFamily: "var(--font-heading)" }}>{product.price}</p>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                {product.specs.map((spec) => {
                  const Icon = iconMap[spec.icon] || Leaf;
                  return (
                    <div key={spec.label} className="flex items-center gap-2 bg-secondary/60 px-4 py-2.5 rounded-xl">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{spec.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                    {product.status === "sold-out" ? "Sold Out" : product.status === "coming-soon" ? "Get Notified" : "Pre-Order Now"}
                  </h3>
                </div>
                {product.status !== "sold-out" ? (
                  <form onSubmit={handlePreOrder} className="flex flex-col sm:flex-row gap-3">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                      className="flex-1 px-4 py-3 rounded-xl bg-secondary/80 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    <Button type="submit" disabled={submitting} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl px-6">
                      {submitting ? "..." : product.status === "coming-soon" ? "Notify Me" : "Pre-Order"}
                    </Button>
                  </form>
                ) : (
                  <p className="text-muted-foreground text-sm">This edition has sold out. Join the waitlist for future drops.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Technical Specs</h2>
            </div>
            <dl className="space-y-4">
              {product.full_specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{spec.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h2>
            </div>
            <ul className="space-y-4">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Recycle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Eco Materials</h2>
            </div>
            <ul className="space-y-4">
              {product.materials.map((mat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Leaf className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{mat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/products">
            <Button variant="outline" className="rounded-xl gap-2">
              <ArrowLeft className="w-4 h-4" /> View All Products
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
