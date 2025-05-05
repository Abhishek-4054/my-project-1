import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { uploadMediaSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import session from 'express-session'; 
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

// PostgreSQL session store setup
const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD),
  database: process.env.PG_DB,
});

const PgSession = connectPgSimple(session);

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage2,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and MP4 files are allowed.') as any);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session Middleware: Ensure it is before any routes using `req.session`
  app.use(
    session({
      store: new PgSession({
        pool: pool, 
        tableName: 'sessions', // Store sessions in PostgreSQL
      }),
      secret: 'your-session-secret', // Replace with a real secret in production
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true if using HTTPS in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration time
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Ensure expires is set
      },
    })
  );

  setupAuth(app);

  // Protected Route Example (e.g. baby-info)
  app.get('/api/baby-info', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    try {
      const babyInfo = await storage.getBabyInfo(req.user!.id);
      res.json(babyInfo || {});
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch baby info' });
    }
  });

  // Upload Media
  app.post('/api/media', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    try {
      const validationResult = uploadMediaSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: fromZodError(validationResult.error).message 
        });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const url = `/uploads/${req.file.filename}`;
      const mediaData = {
        ...validationResult.data,
        userId: req.user!.id,
        url
      };
      
      const newMedia = await storage.createMedia(mediaData);
      res.status(201).json(newMedia);
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload media' });
    }
  });

  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }
    next();
  }, express.static(uploadDir));

  // Creating the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
