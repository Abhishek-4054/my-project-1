import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  dueDate: text("due_date"),
  country: text("country"),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mediaType: text("media_type").notNull(), // "image" or "video"
  month: integer("month").notNull(),
  week: integer("week"),
  emotionTag: text("emotion_tag").notNull(), // "happy", "sleepy", "playful", "kicking", "calm"
  url: text("url").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const babyInfo = pgTable("baby_info", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name"),
  dueDate: text("due_date"),
  gender: text("gender"),
  doctorName: text("doctor_name"),
});

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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;

export type InsertBabyInfo = z.infer<typeof insertBabyInfoSchema>;
export type BabyInfo = typeof babyInfo.$inferSelect;

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
