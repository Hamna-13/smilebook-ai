import {
  CalendarCheck,
  Shield,
  Star,
  Clock3,
  Sparkles,
  Baby,
  Stethoscope,
  Smile,
} from "lucide-react";

const services = [
  {
    title: "General Checkup",
    price: "Starts from $75",
    description: "Routine dental examination, consultation, and oral health assessment.",
    icon: Stethoscope,
  },
  {
    title: "Teeth Cleaning",
    price: "Starts from $90",
    description: "Professional cleaning to remove plaque, tartar, and surface stains.",
    icon: Sparkles,
  },
  {
    title: "Teeth Whitening",
    price: "Starts from $250",
    description: "Brighten your smile with safe and effective whitening treatments.",
    icon: Smile,
  },
  {
    title: "Pediatric Dentistry",
    price: "Starts from $60",
    description: "Gentle dental care designed especially for children and teens.",
    icon: Baby,
  },
  {
    title: "Root Canal Treatment",
    price: "Starts from $800",
    description: "Relieve pain and save damaged teeth with expert endodontic care.",
    icon: Shield,
  },
  {
    title: "Dental Implants",
    price: "Starts from $1,200",
    description: "Long-lasting tooth replacement solutions with a natural look and feel.",
    icon: CalendarCheck,
  },
];

const ServicesPanel = () => {
  return (
    <div className="h-full min-h-0 bg-card border border-border rounded-2xl shadow-chat overflow-hidden flex flex-col">
      <div className="gradient-hero px-6 py-3 flex-shrink-0">
        <h2 className="font-display text-2xl font-semibold text-primary-foreground">
          Services & Pricing
        </h2>
        <p className="text-primary-foreground/80 text-sm font-body mt-1">
          Choose your desired service
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-border bg-background/70 p-4 hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl gradient-hero flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-2">
                  {service.title}
                </h3>

                <p className="text-primary font-semibold font-body text-sm mb-2">
                  {service.price}
                </p>

                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4">
          <p className="text-sm text-foreground font-body leading-relaxed">
            Our receptionist will help you select a service, collect your details,
            check availability, and confirm your booking instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPanel;