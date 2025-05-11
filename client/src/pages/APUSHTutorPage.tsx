import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChatMessage } from "@/components/ui/chat-message";
import { TopicPill } from "@/components/ui/topic-pill";
import { useChat } from "@/hooks/use-chat";

export default function APUSHTutorPage() {
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat();

  const suggestedTopics = [
    "Colonial America",
    "Civil War",
    "Progressive Era",
    "Great Depression",
    "Cold War",
    "Civil Rights Movement",
    "SAQ Practice",
    "DBQ Tips"
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium text-neutral-500 mb-4">
            AP U.S. History AI Tutor
          </h1>
          <p className="text-neutral-400 max-w-3xl mx-auto">
            Ask questions about any APUSH topic and get accurate, contextual answers based on the official College Board Course and Exam Description.
          </p>
        </div>
        
        {/* Tutor Interface */}
        <div className="max-w-4xl mx-auto bg-neutral-100 rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Chat header */}
          <div className="bg-primary text-white p-4 flex items-center">
            <span className="mr-2">🤖</span>
            <h3 className="font-medium">APUSH AI Tutor</h3>
          </div>
          
          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            className="chat-container overflow-y-auto p-4"
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
                  <span className="text-sm">🤖</span>
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
          <div className="border-t border-neutral-200 p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow rounded-r-none focus:ring-primary"
                placeholder="Ask a question about APUSH..."
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="rounded-l-none"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        {/* Topic suggestions */}
        <div className="max-w-4xl mx-auto mt-8">
          <h4 className="text-lg font-medium text-neutral-500 mb-4">
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
    </section>
  );
}
