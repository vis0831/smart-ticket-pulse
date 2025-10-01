import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/lib/types";

interface ChatbotProps {
  onCreateTicket?: (category: string, subCategory: string) => void;
  onViewKB?: (articleId: string) => void;
}

export function Chatbot({ onCreateTicket, onViewKB }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm your IT support assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateResponse = (query: string): ChatMessage => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("vpn") || lowerQuery.includes("network")) {
      return {
        id: Date.now().toString(),
        text: "It looks like you're having VPN connection issues. I found a helpful Knowledge Base article that might resolve your issue. Would you like to create a ticket if this doesn't help?",
        isUser: false,
        timestamp: new Date().toISOString(),
        suggestions: [
          { label: "View KB Article", action: "view_kb", articleId: "KB-002" },
          { label: "Create Ticket", action: "create_ticket", category: "Network", subCategory: "VPN" },
        ],
      };
    } else if (lowerQuery.includes("password") || lowerQuery.includes("login")) {
      return {
        id: Date.now().toString(),
        text: "I can help you with password reset. Here's a guide that explains the process. If you need immediate assistance, I can create a ticket for you.",
        isUser: false,
        timestamp: new Date().toISOString(),
        suggestions: [
          { label: "View KB Article", action: "view_kb", articleId: "KB-001" },
          {
            label: "Create Ticket",
            action: "create_ticket",
            category: "Authentication",
            subCategory: "Password Reset",
          },
        ],
      };
    } else if (lowerQuery.includes("laptop") || lowerQuery.includes("hardware")) {
      return {
        id: Date.now().toString(),
        text: "For hardware issues like laptop problems, I recommend checking our diagnostics guide. If the issue persists, I can help you create a ticket for the hardware team.",
        isUser: false,
        timestamp: new Date().toISOString(),
        suggestions: [
          { label: "View KB Article", action: "view_kb", articleId: "KB-003" },
          {
            label: "Create Ticket",
            action: "create_ticket",
            category: "Hardware",
            subCategory: "Laptop",
          },
        ],
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "I understand you need help. Could you provide more details about your issue? You can also create a general ticket, and our team will assist you.",
        isUser: false,
        timestamp: new Date().toISOString(),
        suggestions: [
          { label: "Create Ticket", action: "create_ticket", category: "General", subCategory: "Other" },
        ],
      };
    }
  };

  const handleSuggestionClick = (action: string, category?: string, subCategory?: string, articleId?: string) => {
    if (action === "create_ticket" && category && subCategory && onCreateTicket) {
      onCreateTicket(category, subCategory);
    } else if (action === "view_kb" && articleId && onViewKB) {
      onViewKB(articleId);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">IT Support Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%] space-y-2">
                  <div
                    className={`rounded-lg p-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.suggestions && (
                    <div className="flex flex-col gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleSuggestionClick(
                              suggestion.action,
                              suggestion.category,
                              suggestion.subCategory,
                              suggestion.articleId
                            )
                          }
                        >
                          {suggestion.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
