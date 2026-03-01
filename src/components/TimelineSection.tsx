import { motion } from "framer-motion";
import { Leaf, Rocket, Award, Globe, Zap, TreePine } from "lucide-react";

const milestones = [
  {
    year: "2020",
    icon: Rocket,
    title: "Aroip Founded",
    desc: "Started with a vision to merge AI hardware with sustainable design in a small garage lab.",
  },
  {
    year: "2021",
    icon: Leaf,
    title: "First Bio-Chip Prototype",
    desc: "Developed our first neural processor using 80% recycled silicon and biodegradable substrates.",
  },
  {
    year: "2022",
    icon: Award,
    title: "Green Tech Award",
    desc: "Recognized by the Global Sustainability Council for innovation in eco-friendly electronics.",
  },
  {
    year: "2023",
    icon: Globe,
    title: "Global Expansion",
    desc: "Partnered with 12+ manufacturers across 3 continents committed to zero-waste production.",
  },
  {
    year: "2024",
    icon: Zap,
    title: "40% Energy Reduction",
    desc: "Our devices achieved 40% lower power consumption compared to industry standards.",
  },
  {
    year: "2025",
    icon: TreePine,
    title: "Carbon Neutral Operations",
    desc: "Reached full carbon neutrality across all manufacturing and shipping operations.",
  },
];

const TimelineSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground decorative-line justify-center mb-4">
            Our Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Milestones & <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Every step we take is a step toward a more sustainable future.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0 md:text-right" : "md:pl-0 md:text-left"}`}>
                    <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <span
                        className="text-sm font-semibold text-primary tracking-wider"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {m.year}
                      </span>
                      <h3
                        className="text-xl font-bold text-foreground mt-1 mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                    <m.icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Spacer for opposite side */}
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
