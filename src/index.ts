import prisma from './utils/prisma'
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
import aboutOurRoutes from './routes/singleton/aboutOurRoutes'
import contactInformation from './routes/singleton/contactInformationRoutes'
import contactSection from './routes/singleton/contactSectionRoutes'
import heroSection from './routes/singleton/heroSectionRoutes'
import portfolioSection from './routes/singleton/portfolioSectionRoutes'
import webSetting from './routes/singleton/webSettingRoutes'
import whyWe from './routes/singleton/whyWeRoutes'
import user from './routes/userRoutes'
import profile from './routes/profileRoutes'
import permission from './routes/permissionRoutes'
import group from './routes/groupRoutes'
import articleCategory from './routes/article/articleCategoryRoutes'
import article from './routes/article/articleRoutes'
import qa from './routes/service/qaRoutes'
import service from './routes/service/layananRoutes'
import serviceExcellence from './routes/service/serviceExcellenceRoutes'
import serviceProcess from './routes/service/serviceProcessRoutes'
import serviceSection from './routes/service/serviceSectionRoutes'
import subService from './routes/service/subServiceRoutes'
import achievement from './routes/achievementRoutes'
import callToAction from './routes/callToActionRoutes'
import client from './routes/clientRoutes'
import contactForm from './routes/contactFormRoutes'
import portfolio from './routes/portfolioRoutes'
import seoMetadata from './routes/seoMetadataRoutes'
import socialMedia from './routes/socialMediaRoutes'

// Load env
dotenv.config() 

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
app.use('/api/about-our', aboutOurRoutes)
app.use('/api/contact-information', contactInformation)
app.use('/api/contact-section', contactSection)
app.use('/api/hero-section', heroSection)
app.use('/api/portfolio-section', portfolioSection)
app.use('/api/web-setting', webSetting)
app.use('/api/why-we', whyWe)
app.use('/api/user', user)
app.use('/api/profile', profile)
app.use('/api/permission', permission)
app.use('/api/group', group)
app.use('/api/article-category', articleCategory)
app.use('/api/article', article)
app.use('/api/qa', qa)
app.use('/api/service', service)
app.use('/api/service-excellence', serviceExcellence)
app.use('/api/service-process', serviceProcess)
app.use('/api/service-section', serviceSection)
app.use('/api/sub-service', subService)
app.use('/api/achievement', achievement)
app.use('/api/call-to-action', callToAction)
app.use('/api/client', client)
app.use('/api/contact-form', contactForm)
app.use('/api/portfolio', portfolio)
app.use('/api/seo-metadata', seoMetadata)
app.use('/api/social-media', socialMedia)

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
