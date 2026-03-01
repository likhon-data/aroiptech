import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisionSection from "@/components/VisionSection";
import TimelineSection from "@/components/TimelineSection";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { BookOpen, Users, Lightbulb, Leaf } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const badgeIcons: Record<string, any> = { "Innovation-Driven": Lightbulb, "Eco-First Approach": Leaf, "Community-Focused": Users, "Transparent Process": BookOpen };

const defaultData = {
  hero_label: "Our Story", hero_title: "The", hero_title_highlight: "Journey", hero_title_suffix: "Behind Aroip",
  hero_description: "From a single idea to a movement.",
  origin_label: "Where It Began", origin_title: "A Problem Worth", origin_title_highlight: "Solving",
  origin_paragraphs: [], origin_badges: ["Innovation-Driven", "Eco-First Approach", "Community-Focused", "Transparent Process"],
  team_label: "The People", team_title: "Built by", team_title_highlight: "Dreamers & Doers", team_paragraphs: [],
};

const OurStory = () => {
  const { data: content } = useSiteContent("our_story");
  const d = content || defaultData;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Our Story – How Aroip Started" description="From a single idea to a movement — discover how Aroip is reshaping the relationship between technology and the planet." canonical="https://aroiptech.lovable.app/our-story" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">{d.hero_label}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {d.hero_title} <span className="text-gradient italic">{d.hero_title_highlight}</span> {d.hero_title_suffix}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">{d.hero_description}</p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line mb-4">{d.origin_label}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                {d.origin_title} <span className="text-gradient italic">{d.origin_title_highlight}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {(d.origin_paragraphs || []).map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(d.origin_badges || defaultData.origin_badges).map((label: string, i: number) => {
                const Icon = badgeIcons[label] || BookOpen;
                return (
                  <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-6 text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Team Spirit */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">{d.team_label}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              {d.team_title} <span className="text-gradient italic">{d.team_title_highlight}</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              {(d.team_paragraphs || []).map((p: string, i: number) => (
                <p key={i} className={i === (d.team_paragraphs || []).length - 1 ? "font-semibold text-foreground" : ""}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <VisionSection />
      <TimelineSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default OurStory;
