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
  course: z.enum(["APUSH", "APWH", "APEURO", "APES", "APMACRO", "APMICRO", "APGOV", "APBIO"]).default("APUSH")
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
  const messageLower = message.toLowerCase();
  
  // Check for specific unit overview keywords first
  const hasOverviewKeywords = messageLower.includes('overview') || 
                             messageLower.includes('summary') || 
                             messageLower.includes('tell me about') ||
                             messageLower.includes('about');
  
  // Extract unit/period patterns (single unit or range like "units 1-3")
  const unitMatch = messageLower.match(/(units?|periods?)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)(?:-(\d+|one|two|three|four|five|six|seven|eight|nine|ten))?/);
  
  // Only activate unit search if we have BOTH keywords AND unit patterns
  const isUnitOverviewRequest = hasOverviewKeywords && unitMatch;
  
  // Convert written numbers to digits
  const numberMap: { [key: string]: string } = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
  };
  
  if (isUnitOverviewRequest && unitMatch) {
    const startUnit = unitMatch[2]; // Starting unit number
    const endUnit = unitMatch[3]; // Ending unit number (for ranges like "units 1-3")
    
    // Convert written numbers to digits
    const convertNumber = (num: string) => numberMap[num] || num;
    const startNum = convertNumber(startUnit);
    const endNum = endUnit ? convertNumber(endUnit) : startNum;
    
    // Generate array of unit numbers to search for
    const unitsToSearch: string[] = [];
    for (let i = parseInt(startNum); i <= parseInt(endNum); i++) {
      unitsToSearch.push(i.toString());
    }
    
    // Search for all content related to the specified unit(s)
    const allContent = await storage.getApContentByCourse(course);
    const unitResults = allContent.filter(content => {
      const contentLower = content.content.toLowerCase();
      const titleLower = content.title.toLowerCase();
      const periodLower = content.period?.toLowerCase() || '';
      
      return unitsToSearch.some(unitNum => {
        const unitPatterns = [
          `unit ${unitNum}`,
          `unit${unitNum}`, 
          `unit: ${unitNum}`,
          `unit  ${unitNum}`,
          `period ${unitNum}`,
          `period${unitNum}`,
          `period: ${unitNum}`,
          `period  ${unitNum}`
        ];
        
        return unitPatterns.some(pattern => 
          contentLower.includes(pattern) || 
          titleLower.includes(pattern) ||
          periodLower.includes(pattern)
        );
      });
    });
    
    if (unitResults.length > 0) {
      // Return ALL content for the unit(s)
      return unitResults.map(content => {
        return `TOPIC: ${content.title}\n${content.content}`;
      }).join("\n\n");
    }
  }
  
  // Regular search - now returns ALL results with no limit and includes unit attribution
  const results = await storage.searchApContent(course, message);

  if (results.length === 0) {
    return "";
  }

  // Collect unique units from search results
  const unitsList = results.map(content => `${content.period}: ${content.title}`);
  const unitsFound = Array.from(new Set(unitsList));
  
  // Return ALL matching content with unit attribution
  const contentText = results.map(content => {
    return `TOPIC: ${content.title}\n${content.content}`;
  }).join("\n\n");
  
  // Add unit attribution at the end
  const unitAttribution = unitsFound.length > 0 
    ? `\n\nThis content is found in: ${unitsFound.join(", ")}`
    : "";
    
  return contentText + unitAttribution;
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
    systemContent = `You are an AP World History tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add historical thinking skills, essay writing tips, or exam strategies unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else if (course === "APEURO") {
    systemContent = `You are an AP European History tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add historical thinking skills, essay writing tips, or exam strategies unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else if (course === "APES") {
    systemContent = `You are an AP Environmental Science tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add study tips, exam strategies, or additional explanations unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else if (course === "APMACRO") {
    systemContent = `You are an AP Macroeconomics tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add study tips, exam strategies, or additional explanations unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else if (course === "APMICRO") {
    systemContent = `You are an AP Microeconomics tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add study tips, exam strategies, or additional explanations unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else if (course === "APGOV") {
    systemContent = `You are an AP U.S. Government and Politics tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add study tips, exam strategies, or additional explanations unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else if (course === "APBIO") {
    systemContent = `You are an AP Biology tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    RESPONSE STRUCTURE GUIDELINES:
    - When answering specific biological term questions, provide a comprehensive response using ALL relevant information from the context
    - Include the definition, functions, and any related processes mentioned in the same content section
    - Connect the term to related concepts that appear in the same curriculum material
    - Structure your response with clear organization: definition first, then functions, then relationships to other concepts
    - Use all available details from the context to provide the most complete explanation possible
    - When unit attribution appears at the end of the context (format: "This content is found in: Unit X: Name"), include this information at the end of your response to help students understand which units contain the topic

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add study tips, exam strategies, or additional explanations unless they appear in the provided context.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
  } else {
    // Default to APUSH
    systemContent = `You are an AP U.S. History tutor that EXCLUSIVELY uses the provided curriculum content.

    CRITICAL INSTRUCTION: You must ONLY reference information that appears in the context provided below. If the context does not contain information to answer a question, you must respond: "I don't have that information in the curriculum content provided. Please ask about topics covered in the materials."

    DO NOT use any general knowledge, outside information, or synthesize beyond what is explicitly stated in the context.

    SPECIAL UNIT OVERVIEW INSTRUCTION: When providing unit overviews or summaries, present ONLY the pure content from the curriculum materials. Do not add historical thinking skills, essay writing tips, or exam strategies unless they appear in the provided context.

    SPECIAL DBQ INSTRUCTION: When discussing the DBQ (Document-Based Question) rubric, you MUST cite it VERBATIM from the provided context. If DBQ information is in the context, quote it exactly with: "Here is the exact DBQ rubric from the College Board:" followed by the complete verbatim citation.

    For context about the student's question, here is the curriculum content:
    ${context}

    ONLY answer based on the information above. If the context is empty or doesn't contain relevant information, state that you don't have that information available.`;
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