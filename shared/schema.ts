import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  dueDate: text("due_date"),
  country: text("country"),
});

// Define the media table
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mediaType: text("media_type").notNull(),
  month: integer("month").notNull(),
  week: integer("week"),
  emotionTag: text("emotion_tag").notNull(),
  url: text("url").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define the baby_info table
export const babyInfo = pgTable("baby_info", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name"),
  dueDate: text("due_date"),
  gender: text("gender"),
  doctorName: text("doctor_name"),
});

// Define the premium_videos table
export const premiumVideos = pgTable("premium_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url").notNull(),
  isPremium: varchar("is_premium", { length: 5 }).default("true"),
});

// Define the user_sessions table (new)
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),  // Foreign key to users table
  sessionToken: text("session_token").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Insert schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  dueDate: true,
  country: true,
});

export const insertMediaSchema = createInsertSchema(media).pick({
  userId: true,
  mediaType: true,
  month: true,
  week: true,
  emotionTag: true,
  url: true,
  notes: true,
});

export const insertBabyInfoSchema = createInsertSchema(babyInfo).pick({
  userId: true,
  name: true,
  dueDate: true,
  gender: true,
  doctorName: true,
});

export const insertPremiumVideoSchema = createInsertSchema(premiumVideos).pick({
  title: true,
  description: true,
  thumbnailUrl: true,
  videoUrl: true,
  isPremium: true,
});

// Insert schema for user_sessions
export const insertUserSessionSchema = createInsertSchema(userSessions).pick({
  userId: true,
  sessionToken: true,
  expiresAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;

export type InsertBabyInfo = z.infer<typeof insertBabyInfoSchema>;
export type BabyInfo = typeof babyInfo.$inferSelect;

export type InsertPremiumVideo = z.infer<typeof insertPremiumVideoSchema>;
export type PremiumVideo = typeof premiumVideos.$inferSelect;

export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type UserSession = typeof userSessions.$inferSelect;

// Login data type
export type LoginData = Pick<InsertUser, "username" | "password">;

// Extended schemas for form validation
export const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

export const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const uploadMediaSchema = insertMediaSchema.omit({
  userId: true,
  url: true,
});
