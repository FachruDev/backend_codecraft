# API Documentation

Dokumentasi API lengkap untuk Digital Agency Pro dalam format `.http` files yang dapat digunakan langsung dengan REST Client VSCode atau tools serupa.

## 📁 Struktur File

```
api-docs/
├── README.md                   # Dokumentasi ini
├── auth.http                  # Authentication & Authorization
├── users.http                 # User & Profile Management
├── groups-permissions.http    # Groups & Permissions Management
├── articles.http             # Articles & Categories Management
├── portfolio-services.http   # Portfolio & Services Management
├── website-content.http      # Website Content (Singleton Data)
└── miscellaneous.http        # Additional Endpoints
```

## 🚀 Cara Penggunaan

### 1. Install REST Client Extension (VSCode)
- Install extension "REST Client" di VSCode
- Atau gunakan tools seperti Postman, Insomnia, atau curl

### 2. Base URL Configuration
Semua file sudah dikonfigurasi dengan base URL:
```
@baseUrl = http://localhost:3000
```

### 3. Authentication Token
Untuk endpoint yang memerlukan authentication, gunakan token yang didapat dari login:
```
@token = {{login_response.response.body.accessToken}}
@adminToken = {{admin_login_response.response.body.accessToken}}
```

### 4. Menjalankan Request
- Buka file `.http` yang diinginkan
- Klik "Send Request" di atas setiap endpoint
- Atau gunakan Ctrl+Alt+R (Windows/Linux) atau Cmd+Alt+R (Mac)

## 📋 Daftar Endpoint

### 🔐 Authentication (`auth.http`)
- **POST** `/api/auth/register` - Register user baru
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/refresh` - Refresh access token
- **POST** `/api/auth/logout` - Logout dari device saat ini
- **POST** `/api/auth/logout-all` - Logout dari semua device
- **GET** `/api/auth/me` - Get profile user saat ini
- **GET** `/api/auth/verify` - Verify token
- **GET** `/api/auth/tokens` - Get active tokens
- **GET** `/health` - Health check

### 👥 User Management (`users.http`)
- **GET** `/api/user` - Get semua users (Admin)
- **GET** `/api/user/{id}` - Get user by ID (Admin)
- **POST** `/api/user` - Create user baru (Admin)
- **PUT** `/api/user/{id}` - Update user (Admin)
- **DELETE** `/api/user/{id}` - Delete user (Admin)
- **GET** `/api/profile/me` - Get profile sendiri
- **PUT** `/api/profile/me` - Update profile sendiri
- **DELETE** `/api/profile/me` - Delete profile sendiri

### 🏢 Groups & Permissions (`groups-permissions.http`)
- **GET** `/api/permission` - Get semua permissions
- **GET** `/api/group` - Get semua groups
- **GET** `/api/group/{id}` - Get group by ID
- **POST** `/api/group` - Create group baru
- **PUT** `/api/group/{id}` - Update group
- **DELETE** `/api/group/{id}` - Delete group
- **POST** `/api/group/{id}/users` - Add user ke group
- **DELETE** `/api/group/{id}/users` - Remove user dari group
- **POST** `/api/group/{id}/users/bulk` - Bulk add users
- **DELETE** `/api/group/{id}/users/bulk` - Bulk remove users
- **POST** `/api/group/{id}/permissions/bulk` - Bulk add permissions
- **DELETE** `/api/group/{id}/permissions/bulk` - Bulk remove permissions

### 📝 Articles & Categories (`articles.http`)
- **GET** `/api/article-category` - Get semua categories
- **GET** `/api/article-category/{id}` - Get category by ID
- **POST** `/api/article-category` - Create category baru
- **PUT** `/api/article-category/{id}` - Update category
- **DELETE** `/api/article-category/{id}` - Delete category
- **GET** `/api/article` - Get semua articles
- **GET** `/api/article/{id}` - Get article by ID
- **POST** `/api/article` - Create article baru
- **PUT** `/api/article/{id}` - Update article
- **DELETE** `/api/article/{id}` - Delete article

### 💼 Portfolio & Services (`portfolio-services.http`)
- **GET** `/api/portfolio` - Get semua portfolios
- **GET** `/api/portfolio/{id}` - Get portfolio by ID
- **POST** `/api/portfolio` - Create portfolio baru
- **PUT** `/api/portfolio/{id}` - Update portfolio
- **DELETE** `/api/portfolio/{id}` - Delete portfolio
- **GET** `/api/service` - Get semua services
- **GET** `/api/service/{id}` - Get service by ID
- **POST** `/api/service` - Create service baru
- **PUT** `/api/service/{id}` - Update service
- **DELETE** `/api/service/{id}` - Delete service
- **GET** `/api/sub-service` - Get semua sub-services
- **GET** `/api/qa` - Get Q&A/FAQ

### 🌐 Website Content (`website-content.http`)
- **GET** `/api/hero-section` - Get hero section
- **PUT** `/api/hero-section` - Update hero section
- **GET** `/api/about-our` - Get about us
- **PUT** `/api/about-our` - Update about us
- **GET** `/api/contact-information` - Get contact info
- **PUT** `/api/contact-information` - Update contact info
- **GET** `/api/contact-section` - Get contact section
- **PUT** `/api/contact-section` - Update contact section
- **GET** `/api/portfolio-section` - Get portfolio section
- **PUT** `/api/portfolio-section` - Update portfolio section
- **GET** `/api/why-we` - Get why choose us
- **PUT** `/api/why-we` - Update why choose us
- **GET** `/api/web-setting` - Get web settings
- **PUT** `/api/web-setting` - Update web settings

### 🎯 Miscellaneous (`miscellaneous.http`)
- **GET** `/api/achievement` - Get achievements
- **POST** `/api/achievement` - Create achievement
- **PUT** `/api/achievement/{id}` - Update achievement
- **DELETE** `/api/achievement/{id}` - Delete achievement
- **GET** `/api/client` - Get clients
- **POST** `/api/client` - Create client
- **PUT** `/api/client/{id}` - Update client
- **DELETE** `/api/client/{id}` - Delete client
- **GET** `/api/social-media` - Get social media links
- **POST** `/api/social-media` - Create social media link
- **PUT** `/api/social-media/{id}` - Update social media link
- **DELETE** `/api/social-media/{id}` - Delete social media link
- **GET** `/api/contact-form` - Get contact form submissions
- **POST** `/api/contact-form` - Submit contact form
- **PUT** `/api/contact-form/{id}` - Update contact form status
- **DELETE** `/api/contact-form/{id}` - Delete contact form
- **GET** `/api/seo-metadata` - Get SEO metadata
- **POST** `/api/seo-metadata` - Create/update SEO metadata

## 🔑 Permission System

API menggunakan permission-based access control. Berikut daftar permissions utama:

### User Management
- `USER_VIEW` - Melihat daftar users
- `USER_CREATE` - Membuat user baru
- `USER_EDIT` - Edit user
- `USER_DELETE` - Delete user

### Group Management
- `GROUP_VIEW` - Melihat groups
- `GROUP_CREATE` - Membuat group
- `GROUP_EDIT` - Edit group
- `GROUP_DELETE` - Delete group

### Article Management
- `ARTICLE_VIEW` - Melihat articles
- `ARTICLE_CREATE` - Membuat article
- `ARTICLE_EDIT` - Edit article
- `ARTICLE_DELETE` - Delete article
- `ARTICLE_CATEGORY_CREATE` - Membuat category
- `ARTICLE_CATEGORY_EDIT` - Edit category
- `ARTICLE_CATEGORY_DELETE` - Delete category

### Portfolio Management
- `PORTFOLIO_CREATE` - Membuat portfolio
- `PORTFOLIO_EDIT` - Edit portfolio
- `PORTFOLIO_DELETE` - Delete portfolio

### Website Content
- `HERO_SECTION_EDIT` - Edit hero section
- `ABOUT_OUR_EDIT` - Edit about us
- `CONTACT_INFORMATION_EDIT` - Edit contact info
- `WEB_SETTING_EDIT` - Edit web settings

## 🌍 Multilingual Support

API mendukung konten multilingual dengan language keys:
- `en` - English
- `id` - Bahasa Indonesia

Contoh struktur data multilingual:
```json
{
  "title": {
    "en": "Welcome to Our Digital Agency",
    "id": "Selamat Datang di Agensi Digital Kami"
  }
}
```

## 📊 Response Format

Semua response menggunakan format standar:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    // Validation errors (if any)
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## 🔧 Environment Variables

Pastikan environment variables berikut sudah diset:

```env
PORT=3000
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
```

## 📝 Notes

1. **Authentication**: Sebagian besar endpoint memerlukan Bearer token
2. **Rate Limiting**: API memiliki rate limiting untuk mencegah abuse
3. **CORS**: API sudah dikonfigurasi untuk handle CORS
4. **Validation**: Semua input data divalidasi menggunakan Zod schemas
5. **Error Handling**: API memiliki comprehensive error handling

## 🤝 Testing Workflow

1. **Health Check**: Mulai dengan test `/health` endpoint
2. **Authentication**: Login untuk mendapatkan token
3. **Test Endpoints**: Gunakan token untuk test endpoint lainnya
4. **Permissions**: Test dengan different roles (admin, editor, user)

## 📞 Support

Jika ada pertanyaan atau issues, silakan contact development team atau buka issue di repository.