import { db } from "../drizzle.config";
import {
  users,
  media,
  babyInfo,
  userSessions,
  type User,
  type InsertUser,
  type Media,
  type InsertMedia,
  type BabyInfo,
  type InsertBabyInfo,
  type UserSession,
  type InsertUserSession,
} from "@shared/schema";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import createPGStore from "connect-pg-simple";
import pg from "pg";

const PGStore = createPGStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  createMedia(mediaData: InsertMedia): Promise<Media>;
  getMediaById(id: number): Promise<Media | undefined>;
  getMediaByUser(userId: number): Promise<Media[]>;
  getMediaByUserAndMonth(userId: number, month: number): Promise<Media[]>;
  getMediaByUserAndEmotion(userId: number, emotion: string): Promise<Media[]>;
  getMediaByUserMonthAndEmotion(userId: number, month: number, emotion: string): Promise<Media[]>;
  getRecentMediaByUser(userId: number, limit: number): Promise<Media[]>;

  getBabyInfo(userId: number): Promise<BabyInfo | undefined>;
  createBabyInfo(babyData: InsertBabyInfo): Promise<BabyInfo>;
  updateBabyInfo(userId: number, babyData: Partial<BabyInfo>): Promise<BabyInfo | undefined>;

  createSession(sessionData: InsertUserSession): Promise<UserSession>;
  getSessionByToken(sessionToken: string): Promise<UserSession | undefined>;

  sessionStore: session.Store;
}

export class DBStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    const pgPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.sessionStore = new PGStore({
      pool: pgPool,
      tableName: "user_sessions",
      createTableIfMissing: true, // Ensure the table is created if it doesn't exist
    });

    this.sessionStore.on('connect', () => {
      console.log('Session store connected successfully');
    });

    this.sessionStore.on('error', (err) => {
      console.error('Session store error:', err);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw new Error('Failed to fetch user by username');
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const [newUser] = await db.insert(users).values(user).returning();
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    try {
      const [updated] = await db.update(users).set(userData).where(eq(users.id, id)).returning();
      return updated;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async createMedia(mediaData: InsertMedia): Promise<Media> {
    try {
      const [newMedia] = await db.insert(media).values(mediaData).returning();
      return newMedia;
    } catch (error) {
      console.error('Error creating media:', error);
      throw new Error('Failed to create media');
    }
  }

  async getMediaById(id: number): Promise<Media | undefined> {
    try {
      const result = await db.select().from(media).where(eq(media.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching media by ID:', error);
      throw new Error('Failed to fetch media by ID');
    }
  }

  async getMediaByUser(userId: number): Promise<Media[]> {
    try {
      return await db.select().from(media).where(eq(media.userId, userId)).orderBy(media.createdAt);
    } catch (error) {
      console.error('Error fetching media by user:', error);
      throw new Error('Failed to fetch media by user');
    }
  }

  async getMediaByUserAndMonth(userId: number, month: number): Promise<Media[]> {
    try {
      return await db.select().from(media).where(and(eq(media.userId, userId), eq(media.month, month)));
    } catch (error) {
      console.error('Error fetching media by user and month:', error);
      throw new Error('Failed to fetch media by user and month');
    }
  }

  async getMediaByUserAndEmotion(userId: number, emotion: string): Promise<Media[]> {
    try {
      return await db.select().from(media).where(and(eq(media.userId, userId), eq(media.emotionTag, emotion)));
    } catch (error) {
      console.error('Error fetching media by user and emotion:', error);
      throw new Error('Failed to fetch media by user and emotion');
    }
  }

  async getMediaByUserMonthAndEmotion(userId: number, month: number, emotion: string): Promise<Media[]> {
    try {
      return await db.select().from(media).where(
        and(
          eq(media.userId, userId),
          eq(media.month, month),
          ...(emotion === "all" ? [] : [eq(media.emotionTag, emotion)])
        )
      );
    } catch (error) {
      console.error('Error fetching media by user, month, and emotion:', error);
      throw new Error('Failed to fetch media by user, month, and emotion');
    }
  }

  async getRecentMediaByUser(userId: number, limit: number): Promise<Media[]> {
    try {
      return await db.select().from(media).where(eq(media.userId, userId)).orderBy(media.createdAt).limit(limit);
    } catch (error) {
      console.error('Error fetching recent media by user:', error);
      throw new Error('Failed to fetch recent media by user');
    }
  }

  async getBabyInfo(userId: number): Promise<BabyInfo | undefined> {
    try {
      const result = await db.select().from(babyInfo).where(eq(babyInfo.userId, userId));
      return result[0];
    } catch (error) {
      console.error('Error fetching baby info:', error);
      throw new Error('Failed to fetch baby info');
    }
  }

  async createBabyInfo(babyData: InsertBabyInfo): Promise<BabyInfo> {
    try {
      const [info] = await db.insert(babyInfo).values(babyData).returning();
      return info;
    } catch (error) {
      console.error('Error creating baby info:', error);
      throw new Error('Failed to create baby info');
    }
  }

  async updateBabyInfo(userId: number, babyData: Partial<BabyInfo>): Promise<BabyInfo | undefined> {
    try {
      const [existing] = await db.select().from(babyInfo).where(eq(babyInfo.userId, userId));
      if (!existing) {
        return this.createBabyInfo(babyData as InsertBabyInfo);
      }
      const [updated] = await db.update(babyInfo).set(babyData).where(eq(babyInfo.userId, userId)).returning();
      return updated;
    } catch (error) {
      console.error('Error updating baby info:', error);
      throw new Error('Failed to update baby info');
    }
  }

  async createSession(sessionData: InsertUserSession): Promise<UserSession> {
    try {
      const [newSession] = await db.insert(userSessions).values(sessionData).returning();
      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Failed to create session');
    }
  }

  async getSessionByToken(sessionToken: string): Promise<UserSession | undefined> {
    try {
      const result = await db.select().from(userSessions).where(eq(userSessions.sessionToken, sessionToken));
      return result[0];
    } catch (error) {
      console.error('Error fetching session by token:', error);
      throw new Error('Failed to fetch session by token');
    }
  }
}

export const storage = new DBStorage();
