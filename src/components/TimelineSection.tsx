import { motion } from "framer-motion";
import { Leaf, Rocket, Award, Globe, Zap, TreePine } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const iconList = [Rocket, Leaf, Zap, Award, Globe, TreePine];

const defaultData = {
  section_label: "Our Journey",
  heading: "Milestones &",
  heading_highlight: "Impact",
  description: "Every step we take is a step toward a more sustainable future.",
  milestones: [
    { year: "2025", title: "Aroip Founded", desc: "Born from a bold idea.", upcoming: false },
    { year: "2025", title: "Research & Development", desc: "Began developing prototypes.", upcoming: false },
    { year: "2026", title: "First Prototype", desc: "Unveiling bio-chip prototype.", upcoming: true },
    { year: "2026", title: "Beta Testing", desc: "Opening early access.", upcoming: true },
    { year: "2027", title: "Product Launch", desc: "Official launch.", upcoming: true },
    { year: "2028", title: "Carbon Neutral Goal", desc: "Full carbon neutrality.", upcoming: true },
  ],
};

const TimelineSection = () => {
  const { data: content } = useSiteContent("timeline");
  const d = content || defaultData;
  const milestones = d.milestones || defaultData.milestones;

  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">{d.section_label}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)" }}>
            {d.heading} <span className="text-gradient">{d.heading_highlight}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">{d.description}</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
          <div className="space-y-12 md:space-y-16">
            {milestones.map((m: any, i: number) => {
              const isLeft = i % 2 === 0;
              const Icon = iconList[i % iconList.length];
              return (
                <motion.div key={i} initial={{ opacity: 0, x: isLeft ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0 md:text-right" : "md:pl-0 md:text-left"}`}>
                    <div className={`glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow ${m.upcoming ? "border border-dashed border-primary/30" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>{m.year}</span>
                        {m.upcoming && <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Upcoming</span>}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mt-1 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{m.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
