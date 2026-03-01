import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const defaultData = {
  subtitle: "What People Say",
  title: "Trusted by Innovators",
  items: [
    { name: "Sarah Chen", role: "Product Designer, Figma", quote: "Aroip's commitment to sustainability without compromising on performance is remarkable. The Eco-Chip X1 is genuinely the best hardware I've used.", rating: 5, avatar: "SC" },
    { name: "Marcus Okafor", role: "CTO, GreenScale", quote: "We replaced our entire office setup with Aroip devices. Energy savings are measurable, and the team loves the build quality.", rating: 5, avatar: "MO" },
    { name: "Lena Johansson", role: "Sustainability Lead, Volvo", quote: "Finally, a tech company that walks the talk. Their materials transparency reports set a new industry standard.", rating: 5, avatar: "LJ" },
    { name: "David Park", role: "Freelance Developer", quote: "The Eco-Pad Lite is my daily driver now. Lightweight, powerful, and I feel good knowing it's made from recycled materials.", rating: 4, avatar: "DP" },
  ],
};

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { data: content } = useSiteContent("testimonials");
  const d = content || defaultData;
  const testimonials = d.items || defaultData.items;

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-card/50 border-y border-border">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-center text-sm font-body font-medium text-muted-foreground tracking-widest uppercase mb-3">
          {d.subtitle || defaultData.subtitle}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
          {d.title || defaultData.title}
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < testimonials[current].rating ? "text-primary fill-primary" : "text-muted"} />
                ))}
              </div>
              <blockquote className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed max-w-2xl mx-auto mb-8">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="font-body font-semibold text-foreground text-sm">{testimonials[current].name}</p>
                  <p className="font-body text-muted-foreground text-xs">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-10">
            <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-accent transition-colors" aria-label="Previous testimonial">
              <ChevronLeft size={18} className="text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_: any, i: number) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full border border-border hover:bg-accent transition-colors" aria-label="Next testimonial">
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
