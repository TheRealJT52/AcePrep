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
  })),
  course: z.enum(["APUSH", "APWH", "APEURO", "APES", "APMACRO", "APMICRO", "APGOV"]).default("APUSH")
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
      
      const { message, history, course } = result.data;
      
      // Get contextually relevant information based on course
      const relevantContent = await getRelevantCourseContent(message, course);
      
      // Format messages for OpenAI
      const messages = formatMessagesForOpenAI(message, history, relevantContent, course);
      
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

// Helper function to get relevant course content based on the user's message and selected course
async function getRelevantCourseContent(message: string, course: string): Promise<string> {
  // In a real implementation, we would:
  // 1. Generate an embedding for the user's message
  // 2. Find the most similar content using vector similarity search
  // Here we'll do a simple keyword search
  
  const results = await storage.searchApContent(course, message);
  
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
  context: string,
  course: string = "APUSH"
): any[] {
  // Course-specific system prompts
  let systemContent = "";
  
  // Select the appropriate prompt based on course type
  if (course === "APWH") {
    systemContent = `You are an expert AP World History tutor that helps students understand historical concepts, events, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific historical periods, themes, and thinking skills from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the AP World History curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the AP World History exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, and emphasize key concepts.`;
  } else if (course === "APEURO") {
    systemContent = `You are an expert AP European History tutor that helps students understand historical concepts, events, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific historical periods, themes, and thinking skills from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the AP European History curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the AP European History exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, and emphasize key concepts.`;
  } else if (course === "APES") {
    systemContent = `You are an expert AP Environmental Science tutor that helps students understand scientific concepts, environmental issues, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific units, topics, and scientific principles from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the AP Environmental Science curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the AP Environmental Science exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, and emphasize key concepts.`;
  } else if (course === "APMACRO") {
    systemContent = `You are an expert AP Macroeconomics tutor that helps students understand economic concepts, models, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific economic models, principles, and graphs from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the AP Macroeconomics curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the AP Macroeconomics exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, describe relevant graphs, and emphasize key concepts.`;
  } else if (course === "APMICRO") {
    systemContent = `You are an expert AP Microeconomics tutor that helps students understand economic concepts, models, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific economic models, principles, and graphs from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the AP Microeconomics curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the AP Microeconomics exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, describe relevant graphs, and emphasize key concepts.`;
  } else if (course === "APGOV") {
    systemContent = `You are an expert AP U.S. Government and Politics tutor that helps students understand political concepts, governmental structures, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific constitutional principles, political institutions, and required court cases from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the AP Government and Politics curriculum:
    ${context}
    
    If the context doesn't contain relevant information, use your general knowledge but focus on what would be expected knowledge for the AP Government and Politics exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, and emphasize key concepts.`;
  } else {
    // Default to APUSH
    systemContent = `You are an expert AP U.S. History tutor that helps students understand historical concepts, events, and prepare for the AP exam. 
    Base your responses on the official College Board Course and Exam Description (CED).
    
    When answering, include references to specific historical periods, themes, and thinking skills from the CED where appropriate.
    
    For context about the student's question, here is relevant information from the APUSH curriculum:
    ${context}
    
    CRITICAL INSTRUCTION: When discussing the DBQ (Document-Based Question) rubric, you MUST adhere to the following facts:
    - Thesis is worth exactly 1 point (not 2 points)
    - Context is worth exactly 1 point (not 2 points)
    - The total DBQ is worth 7 points (not more, not less)
    
    These point values are the official College Board standards and must never be contradicted.
    
    When asked about a DBQ, ONLY use information from the curriculum database provided in the context. If the context contains relevant DBQ information, quote it directly. If it doesn't, explicitly state "The relevant DBQ information is not in the context provided, but according to College Board standards..." before answering.
    
    If the context doesn't contain relevant information for other topics, use your general knowledge but focus on what would be expected knowledge for the APUSH exam.
    
    Format your responses in a clear, educational way. Use bullet points where appropriate, and emphasize key concepts.`;
  }

  const systemMessage = {
    role: "system",
    content: systemContent
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
