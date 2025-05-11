import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, GraduationCap, Bot, History, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage } from "@/components/ui/chat-message";
import { TopicPill } from "@/components/ui/topic-pill";
import { useChat } from "@/hooks/use-chat";
import { Link } from "wouter";

export default function APEuroTutorPage() {
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat();

  const suggestedTopics = [
    "Renaissance",
    "Reformation",
    "French Revolution",
    "Industrial Revolution",
    "Imperialism",
    "World War I",
    "World War II",
    "Cold War"
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

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-6 gap-2">
            <Link href="/courses">
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Bot className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Learning</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-accent glow-accent">AP European History</span> AI Tutor
          </h1>
          
          <p className="text-neutral-400 max-w-3xl mx-auto">
            Ask questions about any AP European History topic and get accurate, contextual answers based on the official College Board Course and Exam Description.
          </p>
        </div>
        
        {/* Tutor Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="border border-neutral-200/20 shadow-xl shadow-accent/5 bg-neutral-100/20 backdrop-blur-sm overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-accent/80 to-accent text-black p-4 flex items-center">
              <div className="bg-black/20 p-2 rounded-full mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">AP European History AI Tutor</h3>
                <p className="text-xs text-black/80">Powered by Groq AI</p>
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
                  <div className="h-8 w-8 rounded-full bg-accent text-black flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="chat-message bg-accent-light shadow-sm">
                    <CardContent className="p-3 flex space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
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
                  className="flex-grow rounded-l-full focus-visible:ring-accent bg-neutral-200/20 border-neutral-200/30"
                  placeholder="Ask a question about AP European History..."
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="rounded-r-full bg-accent hover:bg-accent-hover text-black"
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
              <History className="h-4 w-4 mr-2 text-accent" />
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
    </section>
  );
}