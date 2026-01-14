# MindStream - Blog Platform

A full-stack blog application built with **React (Frontend)** and **Node.js/Express (Backend)**, featuring user authentication, post management with image uploads, and a responsive user interface.

<div align="center">

  <h3>
    🚀 <a href="https://mindstream-project.netlify.app/">View Live Demo</a> 🚀
  </h3>
</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)

---

## ✨ Features

### User Management

- User registration with email validation
- Secure login with JWT authentication
- User profile viewing
- Logout with token blacklisting
- Password hashing with bcrypt

### Blog Post Management

- **Create & Edit**: Create posts with cover images uploaded directly to Cloudinary.
- **Pagination**: Browse posts easily with page-based navigation.
- **Rich Media**: Integrated Cloudinary storage for optimized image delivery.
- **Categories**: Filter content by 10 specific categories (Technology, Health, Lifestyle, etc.).
- **CRUD**: Full Create, Read, Update, Delete capabilities for authors.

### UI/UX

- **Skeleton Loading**: Smooth loading states for better user experience.
- **Responsive Design**: Mobile-friendly interface.

### Security

- JWT-based authentication
- Token blacklisting on logout
- Author-only post editing and deletion
- Protected routes requiring authentication
- Secure password storage with bcrypt

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas/Local)
- **Authentication**: JWT (jsonwebtoken)
- **Media Storage**: **Cloudinary** (Cloud Storage)
- **File Upload**: multer + multer-storage-cloudinary
- **Hosting**: **Render**

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS / CSS
- **HTTP Client**: **Axios** (with Interceptors)
- **UI Components**: Material UI (Pagination), Lucide React (Icons)
- **Hosting**: **Netlify**

---

## 📁 Project Structure

```
Blog Project/
├── Backend/
│   ├── controllers/
│   │   ├── user.js          # User authentication & profile logic
│   │   └── post.js          # Post CRUD operations
│   ├── models/
│   │   ├── user.js          # User schema
│   │   ├── post.js          # Post schema
│   │   ├── blacklistToken.js # Token blacklist schema
│   │   └── listing.js       # Listing schema
│   ├── routes/
│   │   ├── user.js          # User routes
│   │   └── post.router.js   # Post routes
│   ├── middlewares/
│   │   └── auth.middlewares.js # JWT authentication middleware
│   ├── services/
│   │   └── user.services.js # User business logic
│   ├── init/
│   │   └── data.js          # Database initialization
│   ├── uploads/             # Uploaded images storage
│   ├── index.js             # Express server entry point
│   ├── package.json
│   ├── .env
│   └── README.md            # API documentation
│
├── Frontend/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home.jsx             # Homepage with all posts
│   │   │   ├── CreatePost.jsx       # Create new post
│   │   │   ├── EditPost.jsx         # Edit existing post
│   │   │   ├── PageView.jsx         # Single post view
│   │   │   ├── Profile.jsx          # User profile
│   │   │   ├── UserLogin.jsx        # Login page
│   │   │   ├── UserSignup.jsx       # Registration page
│   │   │   ├── UserLogout.jsx       # Logout handler
│   │   │   └── UserProtectWrapper.jsx # Route protection
│   │   ├── componenets/
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   └── Skeleton.jsx         # Loading skeleton
│   │   ├── context/
│   │   │   └── UserContext.jsx      # User state management
│   │   ├── assets/                  # Static assets
│   │   ├── App.jsx                  # Main App component
│   │   ├── index.css                # Global styles
│   │   ├── App.css                  # App styles
│   │   └── main.jsx                 # React entry point
│   ├── public/                      # Public assets
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── index.html
│
└── README.md                        # This file
```

---

## 📦 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance)
- **Cloudinary Account** (For image storage)
- **Git** (for version control)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Blog Project"
```

### 2. Backend Setup

Navigate to the Backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```bash
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/MindStream  # Or your Atlas URI
JWT_SECRET=your_super_secret_key
NODE_ENV=development

# Cloudinary Credentials (Get these from your Cloudinary Dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup

Navigate to the Frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```bash
VITE_API_URL=http://localhost:4000
# For Production (Netlify), change this to your Render Backend URL
# VITE_BASE_URL=[https://your-backend-app.onrender.com](https://your-backend-app.onrender.com)
```

---

## ⚙️ Configuration

### Backend `.env` Variables

```env
PORT=4000                           # Server port (default 8080)
MONGODB_URI=mongodb://127.0.0.1:27017/MindStream  # MongoDB connection string
JWT_SECRET=your_secret_key          # Secret key for JWT signing (use strong, random value)
NODE_ENV=development                # Environment (development/production)
```

### Frontend `.env` Variables

```env
VITE_API_URL=http://localhost:4000  # Backend API base URL
```

**Note**: Change `VITE_API_URL` to your production backend URL when deploying.

---

## ▶️ Running the Application

### Start MongoDB

Ensure MongoDB is running on your system:

```bash
# On Windows (if using MongoDB as a service)
net start MongoDB

# Or run MongoDB locally
mongod
```

### Start Backend Server

From the `Backend` folder:

```bash
npm start
# or
npm run dev
```

Server will start on `http://localhost:4000`

### Start Frontend Development Server

From the `Frontend` folder:

```bash
npm run dev
```

Frontend will open at `http://localhost:5173` (Vite default)

---

## Deployment

This project is configured for cloud deployment.
**Backend (Render)**

- Push code to GitHub.
- Create a Web Service on Render.
- Connect your repository and set Root Directory to Backend.
- Add Environment Variables in Render Dashboard:
- MONGODB_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.

**Frontend (Netlify)**

- Create a New Site from Git on Netlify.
- Set Base directory to Frontend.
- Set Build command to npm run build.
- Set Publish directory to dist.
- Add Environment Variable:
- VITE_BASE_URL = https://mindstream-asa7.onrender.com/

## 🗄️ Database Schema & Media

### Media Storage (Cloudinary)

- Unlike traditional local storage, this app uses Cloudinary.
- When a user uploads an image, it is sent directly to Cloudinary.
- The database stores the Secure URL (e.g., https://res.cloudinary.com/...) returned by Cloudinary.
- This ensures images persist even after server restarts on platforms like Render.

## Post Schema

```
{
  title: String,
  content: String,
  coverImage: String, // Stores the Cloudinary URL
  category: String,
  author: ObjectId (ref: 'user'),
  createdAt: Date
}
```

## 📚 API Documentation

Complete API documentation is available in [Backend/README.md](Backend/README.md)

### API Endpoints Summary

#### **User Routes** (`/users`)

- `POST /users/register` - Register new user
- `POST /users/login` - Authenticate user
- `GET /users/profile` - Get user profile (authenticated)
- `GET /users/logout` - Logout user (authenticated)

#### **Post Routes** (`/posts`)

- `POST /posts/create` - Create new post (authenticated, multipart)
- `GET /posts/all` - Get all posts
- `GET /posts/get/:id` - Get single post by ID
- `PUT /posts/update/:id` - Update post (authenticated, multipart)
- `DELETE /posts/delete/:id` - Delete post (authenticated)
- `GET /posts/my-posts` - Get user's posts (authenticated)

#### **Static Files**

- `GET /uploads/:filename` - Serve uploaded images

---

## 🗄️ Database Schema

### User Schema

```javascript
{
  fullname: {
    firstname: String (min: 3 chars),
    lastname: String (min: 3 chars)
  },
  email: String (unique, required, min: 5 chars),
  password: String (hashed, required)
}
```

### Post Schema

```javascript
{
  title: String (required),
  content: String (required),
  coverImage: String (required),
  category: String (enum: ['Technology', 'Health', 'Lifestyle', 'Education', 'Entertainment', 'Business', 'Travel', 'Food', 'Sports', 'Finance']),
  author: ObjectId (ref: 'user', required),
  createdAt: Date (default: current timestamp)
}
```

### Blacklist Token Schema

```javascript
{
  token: String (required),
  createdAt: Date (default: current timestamp)
}
```

---

## 🔐 Authentication Flow

### Registration Flow

1. User submits registration form with `firstname`, `lastname`, `email`, `password`
2. Backend validates input (email format, password length, name length)
3. Password is hashed using bcrypt
4. New user document created in MongoDB
5. JWT token generated and returned to client
6. Token stored in cookies/local storage

### Login Flow

1. User submits login form with `email`, `password`
2. Backend validates email and password format
3. User lookup by email in database
4. Password compared with stored hash using bcrypt
5. If match, JWT token generated and returned
6. Token stored in cookies/local storage
7. Token set in HTTP header for subsequent requests

### Protected Routes

1. Middleware checks for token in cookies or `Authorization` header
2. Token verified against JWT_SECRET
3. Token checked against blacklist in database
4. User fetched from database and attached to `req.user`
5. Request proceeds if all checks pass

### Logout Flow

1. User requests logout with valid token
2. Cookie cleared from client
3. Token added to blacklist collection in database
4. Token rejected for future requests

---

## 🎨 Frontend Pages & Features

### Home Page (`Home.jsx`)

- Displays all blog posts in a grid/list view
- Shows post cover image, title, author, category
- Loading skeleton while fetching
- Clickable posts redirect to post detail page

### Create Post (`CreatePost.jsx`)

- Requires authentication
- Form with fields: title, content, category dropdown, image upload
- Category options: Technology, Health, Lifestyle, Education, Entertainment, Business, Travel, Food, Sports, Finance
- Image preview before upload
- Submit creates post and redirects to home

### Edit Post (`EditPost.jsx`)

- Requires authentication and post ownership
- Pre-fills form with current post data
- Can update title, content, category, and image
- Shows current cover image
- Submit updates post and redirects to post view

### Post View (`PageView.jsx`)

- Displays single post with full content
- Shows author name, email, creation date
- Displays cover image
- Edit and Delete buttons (only for post author)
- Back button to home

### User Profile (`Profile.jsx`)

- Requires authentication
- Displays user's personal information
- Shows list of user's created posts
- Link to create new post
- My Posts section with options to edit/delete

### Login (`UserLogin.jsx`)

- Email and password form
- Input validation
- Error messages for invalid credentials
- Redirects to home on successful login
- Link to signup page

### Signup (`UserSignup.jsx`)

- Registration form with fields: first name, last name, email, password
- Real-time form validation
- Displays validation errors
- Redirects to home on successful registration
- Link to login page

### User Protection Wrapper (`UserProtectWrapper.jsx`)

- Wraps protected pages/routes
- Redirects to login if user not authenticated
- Checks authentication from UserContext

### User Context (`UserContext.jsx`)

- Global state management for user
- Stores: user data, authentication token, login status
- Provides: login, logout, setUser functions
- Persists user data across page refreshes

---

## 💡 Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a Post (with image)

```bash
curl -X POST http://localhost:4000/posts/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=My First Blog Post" \
  -F "content=This is my first blog post content..." \
  -F "category=Technology" \
  -F "coverImage=@/path/to/image.jpg"
```

### Get All Posts

```bash
curl http://localhost:4000/posts/all
```

### Get User's Posts

```bash
curl http://localhost:4000/posts/my-posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📋 File Upload Details

- **Location**: `Backend/uploads/` directory
- **Filename Format**: `{originalname}-{timestamp}-{randomId}.{extension}`
- **Publicly Accessible**: Yes, via `http://localhost:4000/uploads/{filename}`
- **Size Limit**: Currently unlimited (configure in multer if needed)
- **Supported Formats**: All image formats (configure in multer if needed)

---

## 🔍 Environment & Ports

- **Backend Server**: `http://localhost:4000`
- **Frontend Dev Server**: `http://localhost:5173`
- **MongoDB**: `mongodb://127.0.0.1:27017/MindStream`
- **Database Name**: `MindStream`

---

## 📝 Notes

- Ensure MongoDB is running before starting the backend
- Frontend communicates with backend via fetch API
- JWT tokens expire based on backend configuration
- Cover images are stored locally; consider cloud storage (AWS S3, Cloudinary) for production
- Implement rate limiting and input sanitization before production deployment

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository or contact the development team.

---

## 🎯 Future Enhancements

- [ ] Comment system on posts
- [ ] Like/favorite posts feature
- [ ] Search and filter posts
- [ ] Post pagination
- [ ] User profile customization
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media sharing
- [ ] Dark mode theme
- [ ] Mobile responsive design improvements
- [ ] AWS S3 or Cloudinary integration for image storage
- [ ] Advanced analytics

---

**Last Updated**: December 30, 2025
