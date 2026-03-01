import { motion } from "framer-motion";
import { Leaf, Crown, Diamond, ShieldCheck, Globe, Sparkles, Award, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteContent } from "@/hooks/use-site-content";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const valueIcons: Record<string, any> = {
  "Premium Craftsmanship": Crown, "Limited Edition Releases": Diamond, "Uncompromising Quality": ShieldCheck,
  "Sustainable by Design": Leaf, "Ethical Supply Chain": Globe, "Innovation First": Sparkles,
};

const defaultData = {
  hero_label: "Premium Eco-Tech",
  hero_title_prefix: "About",
  hero_title_brand: "AROIP",
  hero_description: "Aroip is a premium technology brand that proves luxury and sustainability aren't opposites — they're inseparable.",
  story_label: "Our Story", story_title: "Born from a", story_title_highlight: "Bold Vision",
  story_paragraphs: ["Founded in 2025..."],
  promise_title: "Limited Edition Promise", promise_description: "Every product we launch is produced in limited quantities.", promise_badge: "Numbered & Certified",
  values_label: "What Defines Us", values_title: "Our", values_title_highlight: "Core Values",
  values: [], stats: [],
  philosophy_title: "Why", philosophy_title_highlight: "Limited Edition?", philosophy_paragraphs: [],
};

const About = () => {
  const { data: content } = useSiteContent("about");
  const d = content || defaultData;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="About Aroip – Premium Eco-Tech Brand" description="Aroip is a premium technology brand proving luxury and sustainability are inseparable." canonical="https://aroiptech.lovable.app/about" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Gem className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">{d.hero_label}</span>
              <Gem className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {d.hero_title_prefix} <span className="text-foreground">ARO</span><span className="text-primary">IP</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">{d.hero_description}</p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line mb-4">{d.story_label}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                {d.story_title} <span className="text-gradient italic">{d.story_title_highlight}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {(d.story_paragraphs || []).map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-3xl p-10 text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>{d.promise_title}</h3>
                <p className="text-muted-foreground leading-relaxed">{d.promise_description}</p>
                <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  <Crown className="w-4 h-4" /> {d.promise_badge}
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
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">{d.values_label}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)" }}>
              {d.values_title} <span className="text-gradient">{d.values_title_highlight}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(d.values || []).map((item: any, i: number) => {
              const Icon = valueIcons[item.title] || Sparkles;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-8 hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(d.stats || []).map((stat: any) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              {d.philosophy_title} <span className="italic text-gradient">{d.philosophy_title_highlight}</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
              {(d.philosophy_paragraphs || []).map((p: string, i: number) => (
                <p key={i} className={i === (d.philosophy_paragraphs || []).length - 1 ? "font-semibold text-foreground" : ""}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
