import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, GraduationCap, Bot, History, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage } from "@/components/ui/chat-message";
import { TopicPill } from "@/components/ui/topic-pill";
import { PasswordDialog } from "@/components/ui/password-dialog";
import { useChat } from "@/hooks/use-chat";
import { usePasswordProtection } from "@/hooks/use-password-protection";
import { Link } from "wouter";

export default function APMicroTutorPage() {
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat("APMICRO");
  const { isUnlocked, PasswordDialogComponent } = usePasswordProtection("APMICRO_PASSWORD");

  const suggestedTopics = [
    "Economic Principles",
    "Supply and Demand",
    "Elasticity",
    "Production Costs",
    "Perfect Competition",
    "Monopoly",
    "Oligopoly",
    "Factor Markets",
    "Market Failure",
    "FRQ Practice"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleTopicClick = (topic: string) => {
    setInputValue(`Tell me about ${topic}`);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isUnlocked) {
    return PasswordDialogComponent;
  }

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-6 gap-2">
            <Link href="/courses">
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </Button>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Bot className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Learning</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            <span className="text-primary glow-primary">AP Microeconomics</span> AI Tutor
          </h1>

          <p className="text-neutral-400 max-w-3xl mx-auto">
            Ask questions about any AP Microeconomics topic and get accurate, contextual answers based on the official College Board Course and Exam Description.
          </p>
        </div>

        {/* Tutor Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="border border-neutral-200/20 shadow-xl shadow-primary/5 bg-neutral-100/20 backdrop-blur-sm overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary/80 to-primary text-white p-4 flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">AP Microeconomics AI Tutor</h3>
                <p className="text-xs text-white/80">Powered by Groq AI</p>
              </div>
            </div>

            {/* Chat messages container */}
            <div 
              ref={chatContainerRef}
              className="chat-container overflow-y-auto p-4 bg-neutral-100/30"
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  role={message.role}
                />
              ))}

              {isLoading && (
                <div className="flex mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="chat-message bg-primary-light shadow-sm">
                    <CardContent className="p-3 flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="border-t border-neutral-200/20 p-4 bg-neutral-100/50">
              <form onSubmit={handleSubmit} className="flex">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-grow rounded-l-full focus-visible:ring-primary bg-neutral-200/20 border-neutral-200/30"
                  placeholder="Ask a question about Microeconomics..."
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="rounded-r-full bg-primary hover:bg-primary-hover"
                  disabled={isLoading}
                >
                  {isLoading ? <Sparkles className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </Card>

          {/* Topic suggestions */}
          <div className="mt-8">
            <h4 className="text-lg font-medium text-neutral-400 mb-4 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-primary" />
              Suggested Topics to Explore:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => (
                <TopicPill
                  key={topic}
                  topic={topic}
                  onClick={() => handleTopicClick(topic)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {PasswordDialogComponent}
    </section>
  );
}