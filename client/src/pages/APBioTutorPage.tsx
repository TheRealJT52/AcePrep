
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage } from "@/components/ui/chat-message";
import { TopicPill } from "@/components/ui/topic-pill";
import { Dna, Send, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useChat } from "@/hooks/use-chat";
import { usePasswordProtection } from "@/hooks/use-password-protection";

export default function APBioTutorPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat("APBIO");
  const { isPasswordProtected, showPasswordDialog, setShowPasswordDialog, validatePassword } = usePasswordProtection("APBIO_PASSWORD");

  // Password protection check
  if (isPasswordProtected && !showPasswordDialog) {
    return (
      <PasswordDialog
        isOpen={true}
        onClose={() => setShowPasswordDialog(false)}
        onSuccess={() => setShowPasswordDialog(false)}
        courseName="AP Biology"
      />
    );
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    await sendMessage(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickTopics = [
    "Cell Structure & Function",
    "DNA & Gene Expression", 
    "Evolution & Natural Selection",
    "Ecology & Ecosystems",
    "Cellular Respiration",
    "Photosynthesis",
    "Genetics & Heredity",
    "Cell Division & Mitosis"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/courses">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Courses
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Dna className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AP Biology Tutor</h1>
                <p className="text-sm text-gray-600">Molecular to ecosystem-level biology</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <Card className="mb-6 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                  <Dna className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome to your AP Biology Tutor! 🧬
                </h2>
                <p className="text-gray-600 mb-4">
                  I'm here to help you master biological concepts from cells to ecosystems. Ask me about any topic from the AP Biology curriculum!
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {quickTopics.map((topic) => (
                    <TopicPill
                      key={topic}
                      topic={topic}
                      onClick={() => setInput(`Tell me about ${topic.toLowerCase()}`)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              variant={message.role === 'user' ? 'user' : 'assistant'}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="sticky bottom-4">
          <Card className="border-emerald-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cell biology, genetics, evolution, or any AP Bio topic..."
                  className="flex-1 focus-visible:ring-emerald-500"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
