import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import gigcategoriesRoute from "./routes/gigcategories.route.js"
import orderTrackingRoute from "./routes/ordertracking.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import http from "http";
import https from "https";

// Import security middleware
import {
  createRateLimiter,
  securityHeaders,
  xssProtection,
  noSqlInjectionProtection,
  hppProtection,
  sessionConfig,
  requestLogger,
  errorHandler
} from "./middleware/security.js";

// Import HTTPS configuration
import { createHTTPSOptions, createHTTPSServer, securityHeaders as httpsHeaders } from "./config/https.js";

const app = express();
dotenv.config();

// Set mongoose options
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// Security Headers
app.use(securityHeaders);

// CORS Configuration
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:5173", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// XSS Protection
app.use(xssProtection);

// NoSQL Injection Protection
app.use(noSqlInjectionProtection);

// HTTP Parameter Pollution Protection
app.use(hppProtection);

// Session configuration with MongoDB store
const sessionConfigWithStore = {
  ...sessionConfig,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO,
    collectionName: 'sessions'
  })
};

app.use(session(sessionConfigWithStore));

// Request logging
app.use(requestLogger);

// Global rate limiting
app.use(createRateLimiter());

// API Routes with specific rate limiting
app.use("/api/auth", authRoute);
app.use("/api/users", createRateLimiter(15 * 60 * 1000, 200), userRoute);
app.use("/api/gigs", createRateLimiter(15 * 60 * 1000, 300), gigRoute);
app.use("/api/gig_categories", createRateLimiter(15 * 60 * 1000, 100), gigcategoriesRoute);
app.use("/api/orderTracking", createRateLimiter(15 * 60 * 1000, 150), orderTrackingRoute);
app.use("/api/orders", createRateLimiter(15 * 60 * 1000, 200), orderRoute);
app.use("/api/conversations", createRateLimiter(15 * 60 * 1000, 150), conversationRoute);
app.use("/api/messages", createRateLimiter(15 * 60 * 1000, 300), messageRoute);
app.use("/api/reviews", createRateLimiter(15 * 60 * 1000, 100), reviewRoute);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 8800;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

// Create HTTP server
const httpServer = http.createServer(app);

// Create HTTPS server if certificates are available
const httpsOptions = createHTTPSOptions();
const httpsServer = httpsOptions ? createHTTPSServer(app, httpsOptions) : null;

// Start servers
const startServers = () => {
  connect();
  
  // Start HTTP server
  httpServer.listen(PORT, () => {
    console.log(`HTTP server is running on port ${PORT}!`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
  
  // Start HTTPS server if available
  if (httpsServer) {
    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`HTTPS server is running on port ${HTTPS_PORT}!`);
      console.log('SSL/TLS encryption enabled');
    });
  } else {
    console.log('HTTPS server not started (SSL certificates not found)');
  }
};

startServers();
