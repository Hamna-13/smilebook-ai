import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! 👋 Welcome to DentaCare. I'm your AI receptionist. I can help you book an appointment, check available time slots, or answer questions about our services.\n\nHow can I help you today?",
};

const quickReplies = [
  "Book an appointment",
  "What services do you offer?",
  "Available time slots",
  "Emergency appointment",
];

const ChatInterface = ({ isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    const lower = userMessage.toLowerCase();

    let response = "";
    if (lower.includes("book") || lower.includes("appointment")) {
      response =
        "I'd be happy to help you book an appointment! 📅\n\nPlease provide:\n1. **Your preferred date** (e.g., March 20)\n2. **Preferred time** (Morning / Afternoon / Evening)\n3. **Type of service** (Checkup, Cleaning, Whitening, etc.)\n\nOr I can show you our next available slots!";
    } else if (lower.includes("service")) {
      response =
        "We offer a wide range of services:\n\n🦷 **General Checkup** — $75\n✨ **Teeth Whitening** — $250\n😁 **Cosmetic Dentistry** — from $500\n🔧 **Dental Implants** — from $1,200\n👶 **Pediatric Care** — $60\n🏥 **Root Canal** — from $800\n\nWould you like to book any of these?";
    } else if (lower.includes("time") || lower.includes("slot") || lower.includes("available")) {
      response =
        "Here are our next available slots:\n\n📅 **Tomorrow, March 18**\n• 9:00 AM — Dr. Smith\n• 11:30 AM — Dr. Johnson\n• 2:00 PM — Dr. Smith\n\n📅 **March 19**\n• 10:00 AM — Dr. Johnson\n• 1:00 PM — Dr. Smith\n• 4:30 PM — Dr. Johnson\n\nWould you like to reserve any of these?";
    } else if (lower.includes("emergency")) {
      response =
        "For dental emergencies, we have same-day appointments available! 🚨\n\nPlease call us directly at **(123) 456-7890** for immediate assistance, or I can schedule you for our next emergency slot.\n\nWhat is the nature of your emergency?";
    } else {
      response =
        "Thank you for your message! I'm here to help with:\n\n• 📅 Booking appointments\n• 🕐 Checking available time slots\n• 💰 Service information & pricing\n• 🚨 Emergency appointments\n\nWhat would you like to know more about?";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    simulateResponse(message);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 top-4 sm:top-auto sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-[420px] sm:h-[600px] bg-card rounded-2xl shadow-chat z-50 flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="gradient-hero px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary-foreground text-sm">
                    DentaCare Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-primary-foreground/80 font-body">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl font-body text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "gradient-hero text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="px-3 py-1.5 rounded-full border border-primary/20 text-primary text-xs font-body font-medium hover:bg-accent transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-muted text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground disabled:opacity-50 transition-opacity hover:shadow-elevated"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
