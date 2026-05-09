import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import config from './config/index.js';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors()); // Allows your frontend to talk to this API
app.use(express.json()); // Parses incoming JSON


// --- Health Check ---
app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: 'online', message: 'Foodie Server is cooking 🍳' });
});

const PORT = config.port;

// Start server
const server = app.listen(PORT, () => {
  console.log(`
  🚀 SEVER READY
  ---------------------------------------
  Local:   http://localhost:${PORT}
  Health:  http://localhost:${PORT}/ping
  ---------------------------------------
  `);
});

// Basic error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export { app, server };