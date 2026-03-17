import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Home", "Services", "About", "Testimonials", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="hsl(var(--primary-foreground))">
              <path d="M7 2C4.5 2 3 4 3 6.5c0 2 .5 3.5 1.5 5C5.5 13 7 15.5 8 18c.8 2 1.5 4 4 4s3.2-2 4-4c1-2.5 2.5-5 3.5-6.5 1-1.5 1.5-3 1.5-5C21 4 19.5 2 17 2c-1.5 0-2.8.8-3.5 2h-3C9.8 2.8 8.5 2 7 2z" />
            </svg>
          </div>
          <span className="font-display text-xl font-bold text-foreground">DentaCare</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+1234567890" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="w-4 h-4" />
            (123) 456-7890
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
