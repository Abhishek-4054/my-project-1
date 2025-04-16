import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { uploadMediaSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";

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
  // Sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Get baby info
  app.get('/api/baby-info', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    try {
      const babyInfo = await storage.getBabyInfo(req.user!.id);
      res.json(babyInfo || {});
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch baby info' });
    }
  });

  // Create or update baby info
  app.post('/api/baby-info', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    try {
      const data = {
        ...req.body,
        userId: req.user!.id
      };
      
      const babyInfo = await storage.updateBabyInfo(req.user!.id, data);
      res.json(babyInfo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update baby info' });
    }
  });

  // Upload media
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

  // Get all media for the current user
  app.get('/api/media', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    try {
      const media = await storage.getMediaByUser(req.user!.id);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch media' });
    }
  });

  // Get recent media for the current user
  app.get('/api/media/recent', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
    
    try {
      const media = await storage.getRecentMediaByUser(req.user!.id, limit);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch recent media' });
    }
  });

  // Get media by month
  app.get('/api/media/month/:month', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    const month = parseInt(req.params.month);
    if (isNaN(month) || month < 1 || month > 9) {
      return res.status(400).json({ message: 'Invalid month parameter' });
    }
    
    try {
      const media = await storage.getMediaByUserAndMonth(req.user!.id, month);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch media for month' });
    }
  });

  // Get media by month and emotion
  app.get('/api/media/month/:month/emotion/:emotion', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    const month = parseInt(req.params.month);
    if (isNaN(month) || month < 1 || month > 9) {
      return res.status(400).json({ message: 'Invalid month parameter' });
    }
    
    const emotion = req.params.emotion;
    
    try {
      const media = await storage.getMediaByUserMonthAndEmotion(req.user!.id, month, emotion);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch media' });
    }
  });

  // Get a specific media item
  app.get('/api/media/:id', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid media ID' });
    }
    
    try {
      const mediaItem = await storage.getMediaById(id);
      
      if (!mediaItem) {
        return res.status(404).json({ message: 'Media not found' });
      }
      
      if (mediaItem.userId !== req.user!.id) {
        return res.status(403).json({ message: 'Unauthorized access to media' });
      }
      
      res.json(mediaItem);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch media item' });
    }
  });

  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }
    next();
  }, express.static(uploadDir));

  // Update user profile
  app.post('/api/profile', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    
    try {
      const updatedUser = await storage.updateUser(req.user!.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Update the session with the new user data
      req.login(updatedUser, (err) => {
        if (err) return res.status(500).json({ message: 'Session update failed' });
        
        // Don't send the password back to the client
        const { password, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
