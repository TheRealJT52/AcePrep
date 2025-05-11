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
    return Array.from(this.apContent.values())
      .filter(content => 
        content.course === course && 
        (content.title.toLowerCase().includes(lowercaseQuery) || 
         content.content.toLowerCase().includes(lowercaseQuery))
      );
  }
}

export const storage = new MemStorage();

// Initialize with content for all courses
import { apushContent } from "./lib/apush-data";
import { apwhContent } from "./lib/apwh-data";
import { apeuroContent } from "./lib/apeuro-data";

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
})();
