import { motion } from "framer-motion";
import { CalendarCheck, Star, Shield } from "lucide-react";
import heroImage from "@/assets/hero-dental.jpg";

interface HeroSectionProps {
  onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroSectionProps) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with subtle image */}
      <div className="absolute inset-0 bg-dental-warm" />
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern dental clinic interior"
          className="w-full h-full object-cover opacity-[0.08]"
        />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <img
          src={heroImage}
          alt="Modern dental clinic interior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dental-warm via-dental-warm/70 to-dental-warm/20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4 text-secondary" />
            Trusted by 10,000+ patients
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Your Smile,{" "}
            <span className="text-primary">Our Passion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
          >
            Experience world-class dental care with cutting-edge technology and a compassionate team 
            dedicated to making every visit comfortable and stress-free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button
              onClick={onBookClick}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl gradient-hero text-primary-foreground font-body font-semibold text-base shadow-elevated hover:shadow-chat transition-all duration-300 hover:scale-[1.02]"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Your Appointment Now
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary/20 text-primary font-body font-semibold text-base hover:bg-accent transition-all duration-300"
            >
              Our Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: Shield, text: "Certified Dentists" },
              { icon: Star, text: "5-Star Rated" },
              { icon: CalendarCheck, text: "Same-Day Appointments" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="w-4 h-4 text-secondary" />
                <span className="font-body font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
