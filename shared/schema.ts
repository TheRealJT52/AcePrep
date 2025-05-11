import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chat sessions
export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  topic: text("topic"),
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).pick({
  userId: true,
  topic: true,
});

export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => chatSessions.id),
  role: text("role").notNull(), // 'user', 'assistant', 'system'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  role: true,
  content: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// AP Content
export const apContent = pgTable("ap_content", {
  id: serial("id").primaryKey(),
  course: text("course").notNull(), // 'APUSH', 'APWH', etc.
  title: text("title").notNull(),
  content: text("content").notNull(),
  period: text("period"), // For historical periods
  topic: text("topic"),
  embedding: jsonb("embedding"), // Vector embedding for RAG
});

export const insertApContentSchema = createInsertSchema(apContent).pick({
  course: true,
  title: true,
  content: true,
  period: true,
  topic: true,
});

export type InsertApContent = z.infer<typeof insertApContentSchema>;
export type ApContent = typeof apContent.$inferSelect;
