import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, GraduationCap, Bot, History, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage } from "@/components/ui/chat-message";
import { TopicPill } from "@/components/ui/topic-pill";
import { useChat } from "@/hooks/use-chat";
import { Link } from "wouter";

export default function APPsychTutorPage() {
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat("APPSYCH");

  const suggestedTopics = [
    "History & Approaches",
    "Research Methods",
    "Biological Bases of Behavior",
    "Sensation & Perception",
    "Learning",
    "Cognition",
    "Motivation & Emotion",
    "Developmental Psychology",
    "Personality",
    "Testing & Individual Differences",
    "Abnormal Psychology",
    "Treatment of Psychological Disorders",
    "Social Psychology"
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-500" />
            AP Psychology Tutor
          </h2>
          <div ref={chatContainerRef} className="chat-messages flex flex-col gap-2 max-h-80 overflow-y-auto mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.isUser ? "user" : "bot"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow rounded-l-full focus-visible:ring-purple-500 bg-neutral-200/20 border-neutral-200/30"
              placeholder="Ask a question about AP Psychology..."
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="rounded-r-full bg-purple-500 hover:bg-purple-600"
              disabled={isLoading}
            >
              {isLoading ? <Sparkles className="h-4 w-4" /> : <span>Send</span>}
            </Button>
          </form>
          <div className="mt-8">
            <h4 className="text-lg font-medium text-neutral-400 mb-4 flex items-center">
              <History className="h-4 w-4 mr-2 text-purple-500" />
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