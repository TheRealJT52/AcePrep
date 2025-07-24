import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, sendChatMessage, CourseType } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

export function useChat(course: CourseType = "APUSH") {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getWelcomeMessage = (course: CourseType): string => {
    switch (course) {
      case "APWH":
        return "Hello! I'm your AP World History tutor. I can help you understand key concepts, historical events, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APEURO":
        return "Hello! I'm your AP European History tutor. I can help you understand key concepts, historical events, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APES":
        return "Hello! I'm your AP Environmental Science tutor. I can help you understand key scientific concepts, environmental issues, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APMACRO":
        return "Hello! I'm your AP Macroeconomics tutor. I can help you understand economic concepts, models, graphs, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APMICRO":
        return "Hello! I'm your AP Microeconomics tutor. I can help you understand economic concepts, models, graphs, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APGOV":
        return "Hello! I'm your AP U.S. Government and Politics tutor. I can help you understand political concepts, governmental structures, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APBIO":
        return "Hello! I'm your AP Biology tutor. I can help you understand key biological concepts, cellular processes, genetics, evolution, and answer questions based on the official College Board CED. What would you like to learn about today?";
      case "APUSH":
      default:
        return "Hello! I'm your AP U.S. History tutor. I can help you understand key concepts, historical events, and answer questions based on the official College Board CED. What would you like to learn about today?";
    }
  };

  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: getWelcomeMessage(course)
    };
    
    setMessages([welcomeMessage]);
  }, [course]);

  const sendMessage = async (content: string) => {
    try {
      // Add user message to the chat
      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      
      // Send to API
      const response = await sendChatMessage(content, messages, course);
      
      // Add response to chat
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.message
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response from the AI tutor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading
  };
}
