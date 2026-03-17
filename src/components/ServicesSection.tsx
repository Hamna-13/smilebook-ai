import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, Smile, Stethoscope, Baby } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Professional whitening for a brighter, more confident smile." },
  { icon: Shield, title: "Dental Implants", desc: "Permanent solutions that look and feel like natural teeth." },
  { icon: Smile, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers tailored to you." },
  { icon: Heart, title: "Root Canal", desc: "Painless root canal therapy with modern techniques." },
  { icon: Stethoscope, title: "General Checkup", desc: "Comprehensive oral exams and preventive care." },
  { icon: Baby, title: "Pediatric Care", desc: "Gentle dental care designed for your little ones." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            From routine cleanings to advanced procedures, we provide a full range of dental services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:gradient-hero group-hover:text-primary-foreground transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
