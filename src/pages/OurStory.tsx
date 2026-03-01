import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisionSection from "@/components/VisionSection";
import TimelineSection from "@/components/TimelineSection";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { BookOpen, Users, Lightbulb, Leaf } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Our Story</span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The <span className="text-gradient italic">Journey</span> Behind Aroip
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
              From a single idea to a movement — here's how Aroip is reshaping the relationship 
              between technology and the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line mb-4">
                Where It Began
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Problem Worth <span className="text-gradient italic">Solving</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2025, we looked at the tech industry and saw a contradiction: 
                  devices designed to make life better were making the planet worse. 
                  Mountains of e-waste, toxic manufacturing, and planned obsolescence 
                  had become the norm.
                </p>
                <p>
                  We asked ourselves: <em>What if we could build smart devices that 
                  give back more than they take?</em> That question became the seed of Aroip.
                </p>
                <p>
                  Starting from a small R&D lab, we began experimenting with biodegradable 
                  substrates, recycled silicon, and AI architectures that require a fraction 
                  of the energy. The results exceeded our expectations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Lightbulb, label: "Innovation-Driven" },
                { icon: Leaf, label: "Eco-First Approach" },
                { icon: Users, label: "Community-Focused" },
                { icon: BookOpen, label: "Transparent Process" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Team Spirit */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">
              The People
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built by <span className="text-gradient italic">Dreamers & Doers</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Aroip is powered by a diverse team of engineers, environmental scientists, 
                industrial designers, and sustainability advocates who share one belief: 
                technology should heal, not harm.
              </p>
              <p>
                We come from different backgrounds but unite around a common mission — 
                to create premium, limited-edition smart devices that set a new standard 
                for what responsible innovation looks like.
              </p>
              <p className="font-semibold text-foreground">
                We're not just building products. We're building a legacy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <VisionSection />

      {/* Timeline */}
      <TimelineSection />

      {/* Waitlist */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default OurStory;
