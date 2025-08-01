# API Documentation - Backend Codecraft Authentication System

## 📋 Overview

Backend API untuk sistem autentikasi dengan fitur Role-Based Access Control (RBAC) dan Permission-Based Authorization. API ini dibangun dengan Express.js, Prisma ORM, dan JWT untuk keamanan.

## 🌐 Base URL

```
http://localhost:3000
```

## 🔐 Authentication

API menggunakan JWT (JSON Web Token) untuk autentikasi. Token harus disertakan dalam header `Authorization` dengan format:

```
Authorization: Bearer <access_token>
```

### Token Types
- **Access Token**: Berlaku selama 15 menit
- **Refresh Token**: Berlaku selama 7 hari

## 📚 API Endpoints

### 🏥 Health Check

#### GET /health

Mengecek status server.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.123
}
```

---

## 🔑 Authentication Endpoints

### 1. Register User

**POST** `/api/auth/register`

Mendaftarkan user baru ke sistem.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "profile": "https://example.com/profile.jpg", // optional
  "bio": "Software Developer", // optional
  "role": "user", // optional, default: "user"
  "groupIds": [1, 2] // optional, array of group IDs
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User berhasil didaftarkan",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "profile": "https://example.com/profile.jpg",
      "bio": "Software Developer",
      "role": "user",
      "groups": [
        {
          "id": 1,
          "name": "editors",
          "permissions": [
            {
              "id": 1,
              "name": "article.create"
            }
          ]
        }
      ]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "success": false,
  "message": "Data tidak valid",
  "errors": [
    {
      "field": "email",
      "message": "Format email tidak valid"
    },
    {
      "field": "password",
      "message": "Password minimal 8 karakter"
    }
  ]
}
```

---

### 2. Login User

**POST** `/api/auth/login`

Melakukan login user ke sistem.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "profile": "https://example.com/profile.jpg",
      "bio": "Software Developer",
      "role": "user",
      "groups": [
        {
          "id": 1,
          "name": "editors",
          "permissions": [
            {
              "id": 1,
              "name": "article.create"
            }
          ]
        }
      ]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid credentials
{
  "success": false,
  "message": "Email atau password salah"
}

// 429 Too Many Requests - Rate limit exceeded
{
  "success": false,
  "message": "Terlalu banyak percobaan login. Coba lagi dalam 15 menit."
}
```

---

### 3. Refresh Token

**POST** `/api/auth/refresh`

Memperbarui access token menggunakan refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token berhasil diperbarui",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized - Invalid or expired refresh token
{
  "success": false,
  "message": "Refresh token tidak valid atau expired"
}
```

---

### 4. Get Profile

**GET** `/api/auth/me`

Mengambil informasi profil user yang sedang login.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profil user berhasil diambil",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "profile": "https://example.com/profile.jpg",
      "bio": "Software Developer",
      "role": "user",
      "groups": [
        {
          "id": 1,
          "name": "editors",
          "permissions": [
            {
              "id": 1,
              "name": "article.create"
            }
          ]
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### 5. Verify Token

**GET** `/api/auth/verify`

Memverifikasi validitas access token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token valid",
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "role": "user"
    },
    "iat": 1705315800,
    "exp": 1705316700
  }
}
```

---

### 6. Logout (Current Device)

**POST** `/api/auth/logout`

Logout dari device saat ini dengan mencabut refresh token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body (Optional):**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // optional, untuk logout specific token
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

### 7. Logout All Devices

**POST** `/api/auth/logout-all`

Logout dari semua device dengan mencabut semua refresh token user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout dari semua perangkat berhasil",
  "data": {
    "revokedTokens": 3
  }
}
```

---

### 8. Get Active Tokens

**GET** `/api/auth/tokens`

Mengambil daftar semua refresh token aktif untuk user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token aktif berhasil diambil",
  "data": {
    "tokens": [
      {
        "id": 1,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "ipAddress": "192.168.1.100",
        "issuedAt": "2024-01-15T10:30:00.000Z",
        "expiresAt": "2024-01-22T10:30:00.000Z",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

## 🛡️ Protected Route Examples

### 1. Protected Route

**GET** `/api/example/protected`

Route yang membutuhkan autentikasi.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Ini adalah protected route",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

---

### 2. Admin Only Route

**GET** `/api/example/admin-only`

Route yang hanya bisa diakses oleh admin atau super_admin.

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Ini adalah admin only route",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Akses ditolak. Role yang diperlukan: admin, super_admin"
}
```

---

### 3. Create Article (Permission Required)

**POST** `/api/example/create-article`

Route yang membutuhkan permission `article.create`.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "title": "My New Article",
  "content": "This is the content of my article"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Artikel berhasil dibuat",
  "user": {
    "id": 1,
    "email": "editor@example.com",
    "role": "editor"
  }
}
```

---

### 4. Delete Article (Multiple Permissions)

**DELETE** `/api/example/delete-article/:id`

Route yang membutuhkan permission `article.delete` atau `article.manage`.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Artikel berhasil dihapus",
  "articleId": "1",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### 5. Update User (Role + Permission)

**PUT** `/api/example/update-user/:id`

Route yang membutuhkan role `admin` dan permission `user.update`.

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Request Body:**
```json
{
  "name": "Updated User Name"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User berhasil diupdate",
  "userId": "1",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## ❌ Error Responses

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "field_name",
      "message": "Error description"
    }
  ]
}
```

### Authentication Errors

```json
// 401 - No token provided
{
  "success": false,
  "message": "Token tidak ditemukan"
}

// 401 - Invalid token
{
  "success": false,
  "message": "Token tidak valid"
}

// 401 - Expired token
{
  "success": false,
  "message": "Token sudah expired"
}

// 403 - Insufficient role
{
  "success": false,
  "message": "Akses ditolak. Role yang diperlukan: admin"
}

// 403 - Insufficient permission
{
  "success": false,
  "message": "Akses ditolak. Permission yang diperlukan: article.create"
}
```

---

## 🔒 Security Features

### Rate Limiting

- **Global**: 100 requests per 15 minutes
- **Login**: 5 login attempts per 15 minutes per IP

### Headers Required

```http
Content-Type: application/json
Authorization: Bearer <token> // untuk protected routes
```

### Security Headers

API secara otomatis menambahkan security headers:
- CORS protection
- Helmet security headers
- Rate limiting

---

## 👥 User Roles & Permissions

### Default Roles

| Role | Permissions |
|------|-------------|
| `user` | `read` |
| `editor` | `read`, `article.create`, `article.edit` |
| `admin` | All permissions |
| `super_admin` | All permissions + system management |

### Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| editor@example.com | editor123 | editor |
| user@example.com | user123 | user |

---

## 📝 Frontend Integration Examples

### JavaScript/TypeScript

#### 1. Login Function

```typescript
interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}
```

#### 2. API Client with Token Management

```typescript
class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  async request(url: string, options: RequestInit = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle token refresh if access token expired
    if (response.status === 401 && this.refreshToken) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${this.accessToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
      }
    }

    return response;
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.data.accessToken;
        localStorage.setItem('accessToken', this.accessToken);
        return true;
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }

    // Clear tokens if refresh failed
    this.clearTokens();
    return false;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
```

#### 3. React Hook Example

```typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  // ... other user properties
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      setUser(data.data.user);
      return { success: true };
    }

    return { success: false, message: data.message };
  }

  async function logout() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout request failed:', error);
      }
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
```

---

## 🚀 Quick Start untuk Frontend

### 1. Install Dependencies

```bash
npm install axios  # or your preferred HTTP client
```

### 2. Environment Variables

```env
REACT_APP_API_URL=http://localhost:3000
```

### 3. Basic Setup

```typescript
// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('/api/auth/refresh', {
            refreshToken,
          });
          const newToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          
          // Retry original request
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axios.request(error.config);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository atau hubungi tim development.

## 📄 License

MIT License - Lihat file LICENSE untuk detail lengkap.