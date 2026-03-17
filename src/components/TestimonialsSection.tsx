import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", text: "The best dental experience I've ever had. The team is incredibly professional and caring. My smile has never looked better!", rating: 5 },
  { name: "James K.", text: "I was terrified of dentists until I found DentaCare. They made the entire process comfortable and painless. Highly recommend!", rating: 5 },
  { name: "Emily R.", text: "From booking to treatment, everything was seamless. The AI booking assistant made scheduling so easy. Love this clinic!", rating: 5 },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-dental-warm">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Patients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-card"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="font-body text-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <span className="font-body font-semibold text-foreground">{t.name}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
