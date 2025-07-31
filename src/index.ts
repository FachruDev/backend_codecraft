import { Prisma, PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import express from 'express'
import dotenv from 'dotenv'

// Middleware
import { 
  securityMiddleware, 
  rateLimiter, 
  errorHandler, 
  notFound,
  requestLogger 
} from './middleware/middleware'

// Routes
import authRoutes from './routes/auth'


// Load env
dotenv.config()

const prisma = new PrismaClient().$extends(withAccelerate())

const app = express()

// Trust proxy for correct IP address handling
app.set('trust proxy', 1)

// Security middleware
app.use(securityMiddleware)

// Parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
app.use(requestLogger)

// Global rate limiting
app.use(rateLimiter)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API routes
app.use('/api/auth', authRoutes)

// 404 handler
app.use(notFound)

// Error handling middleware (must be last)
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server ready at: http://localhost:${PORT}
📚 API Documentation:
   POST /api/auth/register - Register new user
   POST /api/auth/login - Login user
   POST /api/auth/refresh - Refresh access token
   POST /api/auth/logout - Logout user
   POST /api/auth/logout-all - Logout from all devices
   GET  /api/auth/tokens - Get user's active tokens
   GET  /api/auth/me - Get current user profile
   GET  /api/auth/verify - Verify token
   GET  /health - Health check
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`)
})

export { app, server, prisma }
