import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! 👋 Welcome to DentaCare Dental Clinic. I can help you book an appointment, check available time slots, and guide you through our services.\n\nHow can I help you today?",
};

const quickReplies = [
  "Book an appointment",
  "Teeth cleaning pricing",
  "Available time slots",
  "Emergency appointment",
];

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSessionId = () => {
    let sessionId = localStorage.getItem("dentacare_session_id");
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem("dentacare_session_id", sessionId);
    }
    return sessionId;
  };

  const sendMessageToN8n = async (userMessage: string) => {
    setIsTyping(true);

    try {
      if (!N8N_WEBHOOK_URL) {
        throw new Error("Missing VITE_N8N_WEBHOOK_URL in environment variables");
      }

      const sessionId = getSessionId();

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: userMessage,
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("n8n error response:", errorText);
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log("n8n success response:", data);

      const botReply =
        data.output ||
        data.response ||
        data.message ||
        data.text ||
        data.content ||
        data.data?.message ||
        "Sorry, I couldn't process that right now.";

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error("Error sending message to n8n:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I could not connect to the clinic assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    await sendMessageToN8n(message);
  };

  return (
    <div className="h-full min-h-0 bg-card border border-border rounded-2xl shadow-chat overflow-hidden flex flex-col">
      <div className="gradient-hero px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>

          <div>
            <h2 className="font-display font-semibold text-primary-foreground text-lg">
              DentaCare Receptionist
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "hsl(142, 71%, 60%)" }}
              />
              <span className="text-sm text-primary-foreground/85 font-body">
                Online
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Appointment Assistant
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 bg-background/40">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}

            <div
              className={`max-w-[82%] px-4 py-3 rounded-2xl font-body text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "gradient-hero text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 items-center"
          >
            <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-5 pt-3 pb-1 flex flex-wrap gap-2 border-t border-border bg-card flex-shrink-0">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSend(reply)}
              className="px-3 py-2 rounded-full border border-primary/20 text-primary text-xs font-body font-medium hover:bg-accent transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      <div className="p-5 border-t border-border flex-shrink-0 bg-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-2xl bg-muted text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isTyping}
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center text-primary-foreground disabled:opacity-50 transition-opacity hover:shadow-elevated"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;