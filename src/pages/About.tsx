import { motion } from "framer-motion";
import { Leaf, Crown, Diamond, ShieldCheck, Globe, Sparkles, Award, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const values = [
  { icon: Crown, title: "Premium Craftsmanship", desc: "Every device is precision-engineered with the finest sustainable materials, handpicked for durability and elegance." },
  { icon: Diamond, title: "Limited Edition Releases", desc: "Each product is released as a limited edition — once it's gone, it's gone. Exclusivity meets sustainability." },
  { icon: ShieldCheck, title: "Uncompromising Quality", desc: "Rigorous testing at every stage. We don't ship until perfection is achieved, backed by a lifetime eco-warranty." },
  { icon: Leaf, title: "Sustainable by Design", desc: "From biodegradable casings to recycled silicon chips, every component is chosen to minimize environmental impact." },
  { icon: Globe, title: "Ethical Supply Chain", desc: "We partner only with manufacturers committed to fair labor, zero-waste production, and carbon-neutral shipping." },
  { icon: Sparkles, title: "Innovation First", desc: "Proprietary AI hardware that learns and adapts — pushing the boundaries of what eco-friendly tech can achieve." },
];

const stats = [
  { value: "100%", label: "Sustainably Sourced Materials" },
  { value: "Limited", label: "Edition Per Product Line" },
  { value: "5+", label: "Years of Innovation" },
  { value: "Zero", label: "Compromise on Quality" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Gem className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Premium Eco-Tech</span>
              <Gem className="w-5 h-5 text-primary" />
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About <span className="text-foreground">ARO</span><span className="text-primary">IP</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
              Aroip is a premium technology brand that proves luxury and sustainability aren't opposites — 
              they're inseparable. Every product we create is a <strong>limited edition</strong>, 
              crafted with the planet in mind and designed to be timeless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line mb-4">
                Our Story
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Born from a <span className="text-gradient italic">Bold Vision</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2025, Aroip was born from a simple yet radical idea: 
                  what if the most advanced technology in the world was also the most responsible?
                </p>
                <p>
                  We saw an industry drowning in e-waste, built on planned obsolescence and disposable design. 
                  We chose a different path — one where every chip, every casing, every component is 
                  designed to last and designed to return to the earth when its journey ends.
                </p>
                <p>
                  As a premium brand, we don't mass-produce. <strong>Every Aroip product is a limited edition</strong>, 
                  numbered and authenticated. This isn't just about exclusivity — it's about responsibility. 
                  Fewer units means less waste, higher quality, and a deeper connection between you and your device.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-3xl p-10 text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Limited Edition Promise
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every product we launch is produced in limited quantities. 
                  Each unit is individually numbered, registered, and comes with a certificate of 
                  authenticity and sustainability.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  <Crown className="w-4 h-4" />
                  Numbered & Certified
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">
              What Defines Us
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mt-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our <span className="text-gradient">Core Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-3xl md:text-4xl font-bold text-primary-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/60 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2
              className="text-3xl md:text-5xl font-bold text-foreground mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why <span className="italic text-gradient">Limited Edition?</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
              <p>
                In a world of mass production, we chose scarcity with purpose. 
                Every Aroip product is released in a controlled, limited run — 
                not to create artificial demand, but to ensure every unit meets our 
                exacting standards of quality and sustainability.
              </p>
              <p>
                Limited production means we source only the best recycled and biodegradable materials. 
                It means our artisans have time to perfect every detail. It means less waste, 
                fewer carbon emissions, and a product you'll treasure for years.
              </p>
              <p className="font-semibold text-foreground">
                When you own an Aroip device, you own something rare — a piece of technology 
                that was made with intention, numbered by hand, and built to outlast trends.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
