import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import ChatInterface from "@/components/ChatInterface";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onBookClick={() => navigate("/book-appointment")} />
      <ServicesSection />
      <TestimonialsSection />
      <FooterSection />
      

      {/* Floating chat button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-hero text-primary-foreground shadow-elevated hover:shadow-chat transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
