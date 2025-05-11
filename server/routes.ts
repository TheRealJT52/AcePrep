import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage, Message } from "./storage";
import { z } from "zod";
import { groq } from "./lib/openai";
import { v4 as uuidv4 } from "uuid";

const chatRequestSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    id: z.string(),
    role: z.enum(["user", "assistant", "system"]),
    content: z.string()
  }))
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const result = chatRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request format", 
          errors: result.error.errors 
        });
      }
      
      const { message, history } = result.data;
      
      // Get contextually relevant information from APUSH content
      const relevantContent = await getRelevantAPUSHContent(message);
      
      // Format messages for OpenAI
      const messages = formatMessagesForOpenAI(message, history, relevantContent);
      
      // Get response from Groq
      const aiResponse = await groq.chat.completions.create({
        model: "llama3-70b-8192", // Groq's high-performance model
        messages,
        temperature: 0.7,
        max_tokens: 800,
      });
      
      const responseContent = aiResponse.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
      
      return res.json({ message: responseContent });
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to get relevant APUSH content based on the user's message
async function getRelevantAPUSHContent(message: string): Promise<string> {
  // In a real implementation, we would:
  // 1. Generate an embedding for the user's message
  // 2. Find the most similar content using vector similarity search
  // Here we'll do a simple keyword search
  
  const results = await storage.searchApContent("APUSH", message);
  
  if (results.length === 0) {
    return "";
  }
  
  // Combine the most relevant content (limit to top 3 for context size management)
  return results.slice(0, 3).map(content => {
    return `TOPIC: ${content.title}\n${content.content}`;
  }).join("\n\n");
}

// Format messages for OpenAI API
function formatMessagesForOpenAI(
  currentMessage: string, 
  history: Message[], 
  context: string
): any[] {
  const systemMessage = {
    role: "system",
    content: `You are an expert AP U.S. History tutor that helps students understand historical concepts, events, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific historical periods, themes, and thinking skills from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the APUSH curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the APUSH exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, and emphasize key concepts.`
  };
  
  // Convert history to OpenAI message format
  const messageHistory = history.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
  
  // Add the current message
  const formattedMessages = [
    systemMessage,
    ...messageHistory,
    { role: "user", content: currentMessage }
  ];
  
  return formattedMessages;
}
