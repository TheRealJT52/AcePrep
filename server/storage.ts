import { v4 as uuidv4 } from "uuid";
import { 
  User, 
  InsertUser, 
  ChatSession, 
  InsertChatSession, 
  ChatMessage, 
  InsertChatMessage,
  ApContent,
  InsertApContent
} from "@shared/schema";

// Define a Message type for the chat interface
export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat methods
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: number): Promise<ChatSession | undefined>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]>;
  
  // AP Content methods
  addApContent(content: InsertApContent): Promise<ApContent>;
  getApContentByCourse(course: string): Promise<ApContent[]>;
  searchApContent(course: string, query: string): Promise<ApContent[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatSessions: Map<number, ChatSession>;
  private chatMessages: Map<number, ChatMessage>;
  private apContent: Map<number, ApContent>;
  
  private currentUserId: number;
  private currentSessionId: number;
  private currentMessageId: number;
  private currentContentId: number;

  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.apContent = new Map();
    
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentMessageId = 1;
    this.currentContentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Chat session methods
  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const id = this.currentSessionId++;
    const now = new Date();
    const chatSession: ChatSession = { 
      ...session, 
      id, 
      createdAt: now,
      userId: session.userId || null,
      topic: session.topic || null
    };
    this.chatSessions.set(id, chatSession);
    return chatSession;
  }
  
  async getChatSession(id: number): Promise<ChatSession | undefined> {
    return this.chatSessions.get(id);
  }
  
  // Chat message methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentMessageId++;
    const now = new Date();
    const chatMessage: ChatMessage = {
      ...message,
      id,
      createdAt: now,
      sessionId: message.sessionId || null
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  // AP Content methods
  async addApContent(content: InsertApContent): Promise<ApContent> {
    const id = this.currentContentId++;
    const apContent: ApContent = {
      ...content,
      id,
      topic: content.topic || null,
      period: content.period || null,
      embedding: null // We'd generate this with an embedding model in a real implementation
    };
    this.apContent.set(id, apContent);
    return apContent;
  }
  
  async getApContentByCourse(course: string): Promise<ApContent[]> {
    return Array.from(this.apContent.values())
      .filter(content => content.course === course);
  }
  
  async searchApContent(course: string, query: string): Promise<ApContent[]> {
    // In a real implementation, we would use vector similarity search
    // Here we're just doing a simple text search
    const lowercaseQuery = query.toLowerCase();
    
    // Extract key terms from common question patterns
    let searchTerms = lowercaseQuery;
    
    // Remove common question words and phrases
    const questionPatterns = [
      /^what is (the )?/,
      /^tell me about (the )?/,
      /^explain (the )?/,
      /^describe (the )?/,
      /^what are (the )?/,
      /\?$/
    ];
    
    for (const pattern of questionPatterns) {
      searchTerms = searchTerms.replace(pattern, '').trim();
    }
    
    // Split compound queries into individual search terms
    // Handle "and", "or", commas, and other separators
    const individualTerms = searchTerms
      .split(/\s+(?:and|or|,)\s+|\s*,\s*|\s+/)
      .map(term => term.trim())
      .filter(term => term.length > 2); // Filter out very short terms
    
    console.log(`Original query: "${query}" -> Search terms: ${JSON.stringify(individualTerms)}`);
    
    const allContent = Array.from(this.apContent.values());
    const courseContent = allContent.filter(content => content.course === course);
    
    const results = courseContent.filter(content => {
      const titleLower = content.title.toLowerCase();
      const contentLower = content.content.toLowerCase();
      const topicLower = content.topic?.toLowerCase() || '';
      
      // Check if any of the individual search terms match
      return individualTerms.some(term => 
        titleLower.includes(term) || 
        contentLower.includes(term) || 
        topicLower.includes(term)
      );
    });
    return results;
  }
}

export const storage = new MemStorage();

// Initialize with content for all courses
import { apushContent } from "./lib/apush-data.fixed";
import { apwhContent } from "./lib/apwh-data";
import { apeuroContent } from "./lib/apeuro-data";
import { apesContent } from "./lib/apes-data";
import { apmacroContent } from "./lib/apmacro-data";
import { apmicroContent } from "./lib/apmicro-data";
import { apgovContent } from "./lib/apgov-data";
import { apbioContent } from "./lib/apbio-data";

(async function initializeStorage() {
  // Add APUSH content to storage
  for (const content of apushContent) {
    await storage.addApContent({
      course: "APUSH",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APWH content to storage
  for (const content of apwhContent) {
    await storage.addApContent({
      course: "APWH",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APEURO content to storage
  for (const content of apeuroContent) {
    await storage.addApContent({
      course: "APEURO",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APES content to storage
  for (const content of apesContent) {
    await storage.addApContent({
      course: "APES",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APMACRO content to storage
  for (const content of apmacroContent) {
    await storage.addApContent({
      course: "APMACRO",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APMICRO content to storage
  for (const content of apmicroContent) {
    await storage.addApContent({
      course: "APMICRO",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APGOV content to storage
  for (const content of apgovContent) {
    await storage.addApContent({
      course: "APGOV",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  // Add APBIO content to storage
  for (const content of apbioContent) {
    await storage.addApContent({
      course: "APBIO",
      title: content.title,
      content: content.content,
      period: content.period,
      topic: content.topic
    });
  }
  
  console.log("Initialized storage with course content");
})();
