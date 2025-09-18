# 🚀 Hikvision UAE - Professional Security Solutions Platform

<div align="center">

![Hikvision UAE](https://img.shields.io/badge/Hikvision-UAE%20Official%20Distributor-blue?style=for-the-badge&logo=security)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.10.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

**Leading provider of cutting-edge surveillance systems and security equipment in Dubai, UAE**

[🌐 Live Demo](https://hikvisionuae.ae) • [📧 Contact](mailto:info@hikvisionuae.ae) • [📱 WhatsApp](https://wa.me/971509893134)

</div>

---

## 🎯 Project Overview

Hikvision UAE is a comprehensive e-commerce and information platform for professional security solutions, serving as the official distributor of Hikvision products in the United Arab Emirates. This modern web application provides customers with detailed product information, secure admin management, and seamless user experience for all security system needs.

### 🏆 Key Features

- **🛡️ Professional Security Solutions** - Complete range of Hikvision CCTV cameras and security systems
- **🛒 Advanced E-commerce Platform** - Product catalog with categories, subcategories, and detailed product pages
- **👨‍💼 Admin Dashboard** - Comprehensive management system for products, categories, and orders
- **📱 Responsive Design** - Mobile-first approach with modern UI/UX
- **🔒 Secure Authentication** - JWT-based admin authentication system
- **📊 Real-time Analytics** - Dashboard with live statistics and monitoring
- **🌐 SEO Optimized** - Structured data, meta tags, and sitemap generation
- **☁️ Cloud Integration** - Cloudinary for image management and AWS S3 support
- **🚀 Performance Optimized** - Next.js 15 with App Router and optimized loading

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **TypeScript 5.7.3** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Smooth animations and transitions
- **React Icons 5.5.0** - Comprehensive icon library
- **AOS (Animate On Scroll) 2.3.4** - Scroll animations

### Backend & Database
- **MongoDB 8.10.0** - NoSQL database with Mongoose ODM
- **Next.js API Routes** - Serverless API endpoints
- **JWT Authentication** - Secure token-based authentication
- **bcryptjs 2.4.3** - Password hashing and security

### Cloud & Storage
- **Cloudinary 2.5.1** - Cloud image and video management
- **AWS S3 SDK 3.744.0** - Cloud storage integration
- **MongoDB Atlas** - Cloud database hosting

### Development Tools
- **ESLint 9** - Code linting and quality
- **PostCSS 8.4.49** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing
- **Docker** - Containerization and deployment
- **Interactive CRUD Testing** - Built-in testing tool for API endpoints

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or Atlas)
- **Cloudinary** account for image management

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hikvisionuae.git
   cd hikvisionuae
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hikvision?retryWrites=true&w=majority
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # AWS S3 (Optional)
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=your-region
   AWS_BUCKET_NAME=your-bucket-name
   
   # Application
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Create admin user
   npm run create-admin
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
hikvisionuae/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 [navbarCategory]/   # Dynamic category routes
│   │   ├── 📁 admin/              # Admin dashboard
│   │   ├── 📁 api/                # API routes
│   │   ├── 📁 Components/         # Reusable components
│   │   ├── 📁 models/             # MongoDB schemas
│   │   └── 📁 utils/              # Utility functions
│   ├── 📁 middleware/             # Custom middleware
│   └── 📁 types/                  # TypeScript type definitions
├── 📁 public/                     # Static assets
├── 📁 scripts/                    # Utility scripts
└── 📄 Configuration files
```

### Key Directories

- **`src/app/`** - Main application with Next.js App Router
- **`src/app/admin/`** - Admin dashboard and management interface
- **`src/app/api/`** - RESTful API endpoints
- **`src/app/Components/`** - Reusable React components
- **`src/app/models/`** - MongoDB schemas and data models
- **`public/`** - Static assets (images, icons, etc.)

---

## 🎨 Features & Functionality

### 🛒 E-commerce Features
- **Product Catalog** - Organized by categories and subcategories
- **Product Details** - Comprehensive product information and specifications
- **Search & Filter** - Advanced product search capabilities
- **Responsive Design** - Mobile-optimized shopping experience

### 👨‍💼 Admin Dashboard
- **Dashboard Overview** - Real-time statistics and analytics
- **Product Management** - CRUD operations for products
- **Category Management** - Organize products by categories
- **Order Management** - Track and manage customer orders
- **User Management** - Admin user administration
- **File Upload** - Cloud-based image and file management

### 🔒 Security Features
- **JWT Authentication** - Secure admin login system
- **Password Hashing** - bcryptjs for password security
- **Protected Routes** - Middleware-based route protection
- **Input Validation** - Server-side data validation
- **CSRF Protection** - Cross-site request forgery prevention

### 📱 User Experience
- **Responsive Design** - Works on all devices and screen sizes
- **Smooth Animations** - Framer Motion powered transitions
- **Loading States** - Optimistic UI with loading indicators
- **Error Handling** - Graceful error handling and user feedback
- **SEO Optimization** - Meta tags, structured data, and sitemaps

---

## 🚀 Deployment

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Environment variables for production**
   ```env
   NODE_ENV=production
   PORT=8081
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   ```

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

---

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/admin/login` - Admin login
- `POST /api/auth/logout` - User logout
- `GET /api/admin/check-auth` - Verify authentication

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Category Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/[id]` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### File Upload
- `POST /api/upload` - Upload files to Cloudinary

---

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run create-admin # Create admin user
npm run crud-test    # Interactive CRUD testing tool
```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Tailwind CSS** for styling

### Testing & Quality Assurance

- **Interactive CRUD Testing Tool** - Built-in menu-driven testing for all API endpoints
- **Authentication Testing** - Test admin and public access modes
- **Bulk Operations Testing** - Comprehensive testing of all entities
- **Real-time API Validation** - Verify all CRUD operations work correctly

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📈 Performance & SEO

### Performance Optimizations
- **Next.js Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic bundle splitting
- **Static Generation** - Pre-rendered pages for better performance
- **CDN Integration** - Cloudinary CDN for fast image delivery

### SEO Features
- **Meta Tags** - Dynamic meta tags for each page
- **Structured Data** - JSON-LD schema markup
- **Sitemap Generation** - Automatic XML sitemap
- **Open Graph Tags** - Social media optimization
- **Canonical URLs** - Prevent duplicate content issues

---

## 🛡️ Security

### Security Measures
- **JWT Token Authentication** - Secure session management
- **Password Hashing** - bcryptjs for password security
- **Input Sanitization** - Prevent XSS attacks
- **CORS Configuration** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration management
- **HTTPS Enforcement** - Secure communication

---

## 📞 Support & Contact

### Technical Support
- **Email**: info@hikvisionuae.ae
- **Phone**: +971 50 989 3134
- **WhatsApp**: [Click to chat](https://wa.me/971509893134)

### Business Hours
- **Monday - Sunday**: 24/7 Support Available
- **Location**: No. 12, Al khabaisi, Abu hail, Dubai, UAE

### Social Media
- **Instagram**: [@hikvison_uae.01](https://www.instagram.com/hikvison_uae.01)
- **Website**: [hikvisionuae.ae](https://hikvisionuae.ae)

---

## 📄 License

This project is proprietary software developed for Hikvision UAE. All rights reserved.

---

## 🙏 Acknowledgments

- **Hikvision** - For providing world-class security solutions
- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **MongoDB** - For reliable database solutions
- **Cloudinary** - For cloud media management

---

<div align="center">

**Built with ❤️ for Hikvision UAE**

![Hikvision UAE](https://hikvisionuae.ae/logo.png)

*Professional Security Solutions in Dubai, UAE*

</div>
