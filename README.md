# Backend Codecraft - Authentication System

Sistem autentikasi yang dibangun dengan Express.js, Prisma, dan JWT. Mendukung role-based access control (RBAC) dan permission-based authorization.

## 🚀 Fitur

- **Authentication**: Login, register, logout dengan JWT
- **Authorization**: Role-based dan permission-based access control
- **Security**: Password hashing, rate limiting, CORS, Helmet
- **Validation**: Input validation dengan Zod
- **Database**: Prisma ORM dengan PostgreSQL
- **Token Management**: Access token dan refresh token
- **Error Handling**: Comprehensive error handling
- **Logging**: Request logging dan error logging

## 📋 Prerequisites

- Node.js (v18 atau lebih baru)
- npm atau yarn
- PostgreSQL database (atau SQLite untuk development)

## 🛠️ Installation

1. Clone repository:
```bash
git clone <repository-url>
cd backend_codecraft
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
# Buat file .env
cp .env.example .env
```

Edit file `.env` dengan konfigurasi yang sesuai:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="file:./dev.db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this-in-production

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

4. Setup database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate-dev

# Seed database with test data
npx prisma db seed
```

5. Start development server:
```bash
npm run dev
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Logout user (current device) | Yes |
| POST | `/auth/logout-all` | Logout from all devices | Yes |
| GET | `/auth/tokens` | Get user's active tokens | Yes |
| GET | `/auth/me` | Get current user profile | Yes |
| GET | `/auth/verify` | Verify token | Yes |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## 🔐 Authentication

### JWT Token
- **Access Token**: Expires dalam 15 menit
- **Refresh Token**: Expires dalam 7 hari dan disimpan di database
- **Token Management**: Refresh token dapat dicabut secara individual atau massal
- **Device Tracking**: Refresh token menyimpan informasi device (user agent, IP address)

### Authorization Header
```
Authorization: Bearer <access_token>
```

## 👥 User Roles & Permissions

### Test Accounts
- **Admin**: `admin@example.com` / `admin123`
- **Editor**: `editor@example.com` / `editor123`
- **User**: `user@example.com` / `user123`

### Permissions
- **Admin**: Semua permissions
- **Editor**: Article dan read permissions
- **User**: Read permissions saja

## 🛡️ Security Features

- Password hashing dengan bcrypt
- JWT token dengan expiration
- Refresh token persistence di database
- Token revocation dan device management
- Rate limiting (100 requests/15min global, 5 login attempts/15min)
- CORS protection
- Helmet security headers
- Input validation dengan Zod
- Role-based access control (RBAC)
- Permission-based authorization
- IP address tracking untuk security monitoring

## 🧪 Testing

### Manual Testing
Gunakan file `test-api.http` untuk testing manual dengan REST Client extension.

### cURL Examples

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

#### Get Profile
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Logout (Current Device)
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Logout from All Devices
```bash
curl -X POST http://localhost:3000/api/auth/logout-all \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Get User's Active Tokens
```bash
curl -X GET http://localhost:3000/api/auth/tokens \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Logout with Specific Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "YOUR_REFRESH_TOKEN"}'
```

## 📁 Project Structure

```
backend_codecraft/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.ts           # Database seed
├── src/
│   ├── controller/
│   │   └── authController.ts
│   ├── middleware/
│   │   └── middleware.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── example.ts
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   └── user.schema.ts
│   ├── services/
│   │   └── authService.ts
│   └── index.ts
├── API_DOCUMENTATION.md
├── test-api.http
└── README.md
```

## 🔧 Middleware

### Authentication Middleware
- `authenticateToken`: Verifikasi JWT token
- `optionalAuth`: Optional authentication (tidak fail jika tidak ada token)

### Authorization Middleware
- `requireRole(roles[])`: Role-based authorization
- `requirePermission(permissions[])`: Permission-based authorization

### Security Middleware
- `rateLimiter`: Global rate limiting
- `loginRateLimiter`: Login-specific rate limiting
- `securityMiddleware`: CORS dan Helmet

### Utility Middleware
- `validateRequest(schema)`: Input validation
- `errorHandler`: Error handling
- `requestLogger`: Request logging

## 🚀 Deployment

### Production Setup
1. Set environment variables untuk production
2. Use PostgreSQL database
3. Set strong JWT secrets
4. Configure CORS origins
5. Set up proper logging
6. Use PM2 atau Docker untuk process management

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET=your-very-strong-secret-key
JWT_REFRESH_SECRET=your-very-strong-refresh-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
```

## 📝 Scripts

```bash
npm run dev              # Start development server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate-dev # Run database migrations
npx prisma db seed       # Seed database
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

## 🔄 Changelog

### v1.1.0
- Added RefreshToken model for persistent token storage
- Enhanced logout functionality with token revocation
- Added device tracking (user agent, IP address)
- New endpoints: `/auth/logout-all`, `/auth/tokens`
- Improved security with token management
- Added IP address handling for proxy environments

### v1.0.0
- Initial release
- Authentication system
- RBAC implementation
- Security middleware
- API documentation
