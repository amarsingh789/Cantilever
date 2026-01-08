# Task Management Frontend

A modern React frontend application for task management built with Vite, Tailwind CSS, and shadcn/ui components.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Pages](#pages)
- [Components](#components)
- [State Management](#state-management)
- [Styling](#styling)
- [Build & Deployment](#build--deployment)

---

## Overview

This is a full-featured React application that provides task management capabilities with user authentication, dashboard analytics, and document management. The application uses a modern tech stack with Vite for fast development and shadcn/ui for high-quality UI components.

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Pre-built React components |
| **Recharts** | Data visualization and charts |
| **React Router** | Client-side routing (if configured) |
| **Axios** | HTTP client (for API calls) |
| **ESLint** | Code linting |

---

## Project Structure

```
Frontend/
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── app-sidebar.jsx # Main sidebar component
│   │   ├── site-header.jsx # Header component
│   │   └── ...             # Other app components
│   ├── context/            # React Context for state management
│   │   └── UserContext.jsx # User authentication context
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.jsx  # Mobile detection hook
│   ├── lib/                # Utility functions
│   │   └── utils.js        # Helper utilities
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Main dashboard page
│   │   ├── Home.jsx        # Home page
│   │   ├── StartedPage.jsx # Getting started page
│   │   ├── UserLogin.jsx   # Login page
│   │   └── UserSignUp.jsx  # Registration page
│   ├── app/                # Application-specific data
│   │   └── dashboard/      # Dashboard data and configs
│   ├── App.jsx             # Root component
│   ├── App.css             # App-level styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Public static files
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
├── jsconfig.json           # JavaScript config
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

---

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn package manager

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (if needed):
```bash
# Create a .env file for API endpoints
VITE_API_URL=http://localhost:5000
```

---

## Available Scripts

### Development Server

Start the development server with hot module replacement (HMR):
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Production Build

Build the application for production:
```bash
npm run build
```

This generates an optimized build in the `dist/` directory.

### Preview Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

---

## Pages

### Home Page (`/`)
- Landing page for new users
- Overview of the application features
- Navigation to login/signup

### Getting Started Page
- Onboarding guide for new users
- Feature introduction
- Setup instructions

### User Login (`/login`)
- Email and password login form
- Form validation
- Error handling for invalid credentials
- Redirects to dashboard on successful login

### User Sign Up (`/signup`)
- New user registration form
- Email, password, and full name inputs
- Form validation and error messages
- Automatic redirect to dashboard after registration

### Dashboard (`/dashboard`)
- Main application interface
- User profile and navigation
- Task overview and statistics
- Charts and data visualization
- Document/task management

---

## Components

### UI Components (shadcn/ui)
Located in `src/components/ui/`:
- `button.jsx` - Button component
- `input.jsx` - Input field component
- `card.jsx` - Card container component
- `table.jsx` - Data table component
- `tabs.jsx` - Tabbed interface
- `avatar.jsx` - User avatar component
- `badge.jsx` - Badge/label component
- `checkbox.jsx` - Checkbox input
- `drawer.jsx` - Sidebar drawer
- `dropdown-menu.jsx` - Dropdown menu
- `modal.jsx` - Modal dialog
- `tooltip.jsx` - Tooltip component
- `chart.jsx` - Chart component wrapper
- `skeleton.jsx` - Loading skeleton

### App Components
- **app-sidebar.jsx** - Main application sidebar with navigation
- **site-header.jsx** - Header with branding and user menu
- **nav-main.jsx** - Main navigation menu
- **nav-user.jsx** - User menu with profile and logout options
- **section-cards.jsx** - Card sections for dashboard
- **data-table.jsx** - Reusable data table for displaying tasks/documents
- **chart-area-interactive.jsx** - Interactive area chart for analytics
- **nav-documents.jsx** - Document/task navigation
- **nav-secondary.jsx** - Secondary navigation options

---

## State Management

### UserContext
Location: `src/context/UserContext.jsx`

Manages:
- User authentication state
- User profile information
- Login/logout operations
- Token management

Usage:
```jsx
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

function MyComponent() {
  const { user, login, logout } = useContext(UserContext);
  
  return (
    <div>
      {user ? <p>Welcome {user.name}</p> : <p>Please login</p>}
    </div>
  );
}
```

---

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Configuration: `tailwind.config.js`
- Global styles: `src/index.css`
- Component styles: `src/App.css`

### PostCSS
- CSS transformation tool
- Configuration: `postcss.config.js`
- Processes Tailwind CSS directives

---

## Custom Hooks

### use-mobile.jsx
Detects if the application is running on a mobile device.

Usage:
```jsx
import { useIsMobile } from '../hooks/use-mobile';

function MyComponent() {
  const isMobile = useIsMobile();
  
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

---

## Utility Functions

Location: `src/lib/utils.js`

Common utility functions for:
- Class name merging (using clsx/classnames)
- Data formatting
- API calls
- Error handling

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Creates an optimized build in the `dist/` directory ready for deployment.

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

#### Traditional Server
Upload the `dist/` folder contents to your web server.

---

## Best Practices

1. **Component Organization**: Keep components focused and reusable
2. **State Management**: Use UserContext for global state, useState for local state
3. **API Calls**: Implement proper error handling and loading states
4. **Styling**: Use Tailwind utility classes, avoid inline styles
5. **Performance**: Lazy load pages using React.lazy() and Suspense
6. **Accessibility**: Ensure proper ARIA labels and semantic HTML

---

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Build Errors
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf .vite`
3. Rebuild: `npm run build`

### Hot Module Replacement Not Working
- Ensure your browser supports HMR
- Check browser console for errors
- Restart the dev server

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)
