import { useState } from "react";
import { useChat } from "../hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Send, Book, Brain, Users, Clock, Eye, MessageSquare, Lightbulb } from "lucide-react";

export default function APPsychTutorPage() {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useChat("APPSYCH");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const suggestedTopics = [
    "Quiz me on Unit 1",
    "Explain classical conditioning", 
    "What is the difference between implicit and explicit memory?",
    "Overview of Unit 3",
    "Tell me about Freud's personality theory",
    "What are the Big Five personality traits?",
    "Explain the difference between positive and negative reinforcement"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <Brain className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AP Psychology AI Tutor
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Master psychological concepts with personalized AI tutoring based on the College Board CED
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Book className="h-3 w-3 mr-1" />
              7 Units Covered
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Brain className="h-3 w-3 mr-1" />
              Powered by Groq AI
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Chat with Your AP Psychology Tutor
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Ask questions about psychological concepts, theories, and get quiz practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Chat Messages */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4 opacity-50" />
                      <p className="text-slate-400 mb-2">Hello! I'm your AP Psychology tutor.</p>
                      <p className="text-slate-500 text-sm">
                        I can help you understand psychological concepts, theories, research methods, and answer questions based on the official College Board CED. What would you like to learn about today?
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-slate-700/50 text-slate-100 border border-slate-600/50"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700/50 text-slate-100 border border-slate-600/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about psychological concepts, theories, or request a quiz..."
                    className="flex-1 bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Topics */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  Quick Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3 text-slate-300 hover:text-slate-100 hover:bg-slate-700/50"
                      onClick={() => !isLoading && sendMessage(topic)}
                      disabled={isLoading}
                    >
                      <div className="text-sm">{topic}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Units Overview */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Book className="h-5 w-5 text-purple-400" />
                  Course Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { unit: "Unit 1", title: "Biological Bases of Behavior", icon: Brain },
                    { unit: "Unit 2", title: "Sensation and Perception", icon: Eye },
                    { unit: "Unit 3", title: "Learning", icon: Lightbulb },
                    { unit: "Unit 4", title: "Cognitive Psychology", icon: Brain },
                    { unit: "Unit 5", title: "Developmental Psychology", icon: Clock },
                    { unit: "Unit 6", title: "Personality", icon: Users },
                    { unit: "Unit 7", title: "Abnormal Behavior", icon: MessageSquare }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-colors"
                      onClick={() => !isLoading && sendMessage(`Overview of ${item.unit}`)}
                    >
                      <div className="p-2 bg-purple-500/20 rounded-md">
                        <item.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">{item.unit}</div>
                        <div className="text-xs text-slate-400">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}