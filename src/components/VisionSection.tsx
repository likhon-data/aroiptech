import { motion } from "framer-motion";
import { Eye, Target, Heart } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const iconMap: Record<string, any> = { "Our Vision": Eye, "Our Mission": Target, "Our Values": Heart };

const defaultData = {
  section_label: "Who We Are",
  heading: "Built with",
  heading_highlight: "Purpose",
  description: "Aroip was founded on a simple belief: the future of technology must be green. We're a team of engineers, designers, and environmentalists crafting smart devices that respect our planet.",
  pillars: [
    { title: "Our Vision", text: "A world where technology and nature coexist — where every device you hold is a step towards a healthier planet, not away from it." },
    { title: "Our Mission", text: "To design and build AI-powered hardware using biodegradable, recycled, and ethically sourced materials — proving that innovation doesn't require compromise." },
    { title: "Our Values", text: "Transparency in every chip. Sustainability in every circuit. We believe the best technology should leave the smallest footprint." },
  ],
  stats: [
    { value: "95%", label: "Recyclable Materials" },
    { value: "40%", label: "Less Energy Usage" },
    { value: "12+", label: "Global Partners" },
    { value: "Zero", label: "Carbon Footprint Goal" },
  ],
};

const VisionSection = () => {
  const { data: content } = useSiteContent("vision");
  const d = content || defaultData;

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">{d.section_label}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)" }}>
            {d.heading} <span className="text-gradient">{d.heading_highlight}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">{d.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(d.pillars || defaultData.pillars).map((pillar: any, i: number) => {
            const Icon = iconMap[pillar.title] || Eye;
            return (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border border-border bg-card text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {(d.stats || defaultData.stats).map((stat: any) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
