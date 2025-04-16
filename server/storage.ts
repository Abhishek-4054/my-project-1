import { users, media, babyInfo, type User, type InsertUser, type Media, type InsertMedia, type BabyInfo, type InsertBabyInfo } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  // Media operations
  createMedia(mediaData: InsertMedia): Promise<Media>;
  getMediaById(id: number): Promise<Media | undefined>;
  getMediaByUser(userId: number): Promise<Media[]>;
  getMediaByUserAndMonth(userId: number, month: number): Promise<Media[]>;
  getMediaByUserAndEmotion(userId: number, emotion: string): Promise<Media[]>;
  getMediaByUserMonthAndEmotion(userId: number, month: number, emotion: string): Promise<Media[]>;
  getRecentMediaByUser(userId: number, limit: number): Promise<Media[]>;

  // Baby info operations
  getBabyInfo(userId: number): Promise<BabyInfo | undefined>;
  createBabyInfo(babyData: InsertBabyInfo): Promise<BabyInfo>;
  updateBabyInfo(userId: number, babyData: Partial<BabyInfo>): Promise<BabyInfo | undefined>;

  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private mediaItems: Map<number, Media>;
  private babyInfos: Map<number, BabyInfo>;
  private currentUserId: number;
  private currentMediaId: number;
  private currentBabyInfoId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.mediaItems = new Map();
    this.babyInfos = new Map();
    this.currentUserId = 1;
    this.currentMediaId = 1;
    this.currentBabyInfoId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Create a demo user
    this.createUser({
      username: "demo",
      password: "password", // This will be hashed in auth.ts
      fullName: "Demo User",
      email: "demo@example.com",
      dueDate: "2023-11-15",
      country: "US"
    });
  }

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

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const currentUser = this.users.get(id);
    if (!currentUser) return undefined;
    
    const updatedUser = { ...currentUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createMedia(mediaData: InsertMedia): Promise<Media> {
    const id = this.currentMediaId++;
    const now = new Date();
    const media: Media = { 
      ...mediaData, 
      id, 
      createdAt: now
    };
    this.mediaItems.set(id, media);
    return media;
  }

  async getMediaById(id: number): Promise<Media | undefined> {
    return this.mediaItems.get(id);
  }

  async getMediaByUser(userId: number): Promise<Media[]> {
    return Array.from(this.mediaItems.values())
      .filter(media => media.userId === userId)
      .sort((a, b) => {
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      });
  }

  async getMediaByUserAndMonth(userId: number, month: number): Promise<Media[]> {
    return (await this.getMediaByUser(userId))
      .filter(media => media.month === month);
  }

  async getMediaByUserAndEmotion(userId: number, emotion: string): Promise<Media[]> {
    return (await this.getMediaByUser(userId))
      .filter(media => media.emotionTag === emotion);
  }

  async getMediaByUserMonthAndEmotion(userId: number, month: number, emotion: string): Promise<Media[]> {
    return (await this.getMediaByUser(userId))
      .filter(media => media.month === month && (emotion === 'all' || media.emotionTag === emotion));
  }

  async getRecentMediaByUser(userId: number, limit: number): Promise<Media[]> {
    return (await this.getMediaByUser(userId)).slice(0, limit);
  }

  async getBabyInfo(userId: number): Promise<BabyInfo | undefined> {
    return Array.from(this.babyInfos.values())
      .find(info => info.userId === userId);
  }

  async createBabyInfo(babyData: InsertBabyInfo): Promise<BabyInfo> {
    const id = this.currentBabyInfoId++;
    const info: BabyInfo = { ...babyData, id };
    this.babyInfos.set(id, info);
    return info;
  }

  async updateBabyInfo(userId: number, babyData: Partial<BabyInfo>): Promise<BabyInfo | undefined> {
    const currentInfo = Array.from(this.babyInfos.values())
      .find(info => info.userId === userId);
    
    if (!currentInfo) {
      if (!babyData.userId) return undefined;
      return this.createBabyInfo(babyData as InsertBabyInfo);
    }
    
    const updatedInfo = { ...currentInfo, ...babyData };
    this.babyInfos.set(currentInfo.id, updatedInfo);
    return updatedInfo;
  }
}

export const storage = new MemStorage();
