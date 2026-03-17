import { Phone, Mail, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">D</span>
              </div>
              <span className="font-display text-xl font-bold">DentaCare</span>
            </div>
            <p className="font-body text-sm opacity-70 leading-relaxed">
              Providing exceptional dental care with modern technology and a compassionate approach since 2010.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Services", "About", "Testimonials"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 font-body text-sm opacity-70">
                <Phone className="w-4 h-4 shrink-0" /> (123) 456-7890
              </div>
              <div className="flex items-center gap-3 font-body text-sm opacity-70">
                <Mail className="w-4 h-4 shrink-0" /> hello@dentacare.com
              </div>
              <div className="flex items-center gap-3 font-body text-sm opacity-70">
                <MapPin className="w-4 h-4 shrink-0" /> 123 Smile Avenue, New York
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center">
          <p className="font-body text-sm opacity-50">© 2026 DentaCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
