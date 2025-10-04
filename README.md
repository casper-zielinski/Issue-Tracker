# Issue Tracker

A modern, full-stack issue tracking application built with Next.js, featuring real-time data visualization, user authentication, and comprehensive issue management capabilities.

🔗 **Live Demo**: [https://issue-tracker-pearl-alpha.vercel.app/](https://issue-tracker-pearl-alpha.vercel.app/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Functionality
- **Issue Management**: Create, read, update, and delete issues with priority levels (Low, Medium, High, Urgent)
- **Status Tracking**: Track issue progress through Open, In Progress, and Closed states
- **Rich Text Editor**: Markdown-supported descriptions using MDX editor
- **Form Validation**: Client-side validation with Zod schema validation

### 📊 Data Visualization
- **Interactive Dashboard**: Real-time charts showing issue distribution by priority and status
- **Recharts Integration**: Responsive bar charts with sorting capabilities
- **Analytics**: Visual insights into issue trends and team productivity

### 🔐 Authentication & User Management
- **Supabase Authentication**: Secure user registration and login
- **Redux State Management**: Centralized user state with persistent sessions
- **Profile Management**: User settings with customizable preferences

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **DaisyUI Components**: Professional UI components with consistent theming
- **Dark Theme**: Eye-friendly dark mode design
- **Animations**: Smooth transitions and gradient orb animations
- **Mobile Responsive**: Optimized for all device sizes

### ⚙️ Settings & Configuration
- **User Preferences**: Notification settings, language preferences, auto-save
- **Security Settings**: Password management and two-factor authentication setup
- **Data Management**: Export/import functionality and account management

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and optimizations
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **DaisyUI** - Component library for consistent design

### Backend & Database
- **Prisma** - Type-safe database ORM
- **Supabase** - Authentication and database hosting
- **API Routes** - Next.js built-in API functionality

### State Management & Data
- **Redux Toolkit** - Predictable state management
- **React Hook Form** - Efficient form handling
- **Zod** - Runtime type validation
- **Axios** - HTTP client for API calls

### Data Visualization
- **Recharts** - React chart library for analytics
- **Lucide React** - Modern icon library
- **React Icons** - Additional icon sets

### Development Tools
- **ESLint** - Code linting and formatting
- **Autoprefixer** - CSS vendor prefix automation
- **PostCSS** - CSS processing

## 📱 Screenshots

### Dashboard Analytics
The main dashboard provides comprehensive insights into issue distribution:
- Real-time charts showing issues by priority and status
- Interactive sorting and filtering capabilities
- Color-coded visualization for quick understanding

### Issue Management
Streamlined issue creation and management:
- Rich text editor with Markdown support
- Priority and status assignment
- Responsive card-based layout

### User Authentication
Secure authentication system:
- Separate login and registration modals
- Form validation and error handling
- Seamless user experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account (for database and authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd issue-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_database_connection_string
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   └── issues/         # Issue CRUD operations
│   ├── components/         # Reusable UI components
│   │   ├── LoginModal.tsx  # User authentication
│   │   └── SignupModal.tsx # User registration
│   ├── Dashboard/          # Analytics dashboard
│   │   ├── page.tsx       # Main dashboard view
│   │   ├── SortButton.tsx # Chart sorting functionality
│   │   └── types.ts       # TypeScript definitions
│   ├── Issues/            # Issue management
│   │   ├── page.tsx       # Issues listing
│   │   └── new/           # Create new issue
│   ├── Settings/          # User preferences
│   │   ├── page.tsx       # Settings interface
│   │   └── ProfileTab.tsx # Profile management
│   └── layout.tsx         # Root layout with providers
├── redux/                 # State management
│   ├── store.ts          # Redux store configuration
│   └── slices/           # Redux slices
└── lib/                   # Utility functions
    └── supabase.ts       # Supabase client
```

## 🔌 API Routes

### Issues API (`/api/issues`)
- `GET /api/issues` - Fetch all issues
- `POST /api/issues` - Create new issue
- `PUT /api/issues/[id]` - Update existing issue
- `DELETE /api/issues/[id]` - Delete issue

### Request/Response Examples

**Create Issue**
```typescript
POST /api/issues
{
  "title": "Bug in user authentication",
  "description": "Users cannot log in with valid credentials",
  "priority": "HIGH",
  "status": "OPEN"
}
```

**Response**
```typescript
{
  "id": 1,
  "title": "Bug in user authentication",
  "description": "Users cannot log in with valid credentials",
  "priority": "HIGH",
  "status": "OPEN",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

##  Database Schema

### Issues Table
```sql
model Issue {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  priority    Priority
  status      Status
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow TypeScript best practices
2. Add appropriate comments for complex functionality
3. Ensure responsive design across all devices
4. Test authentication flows thoroughly
5. Maintain consistent code formatting with ESLint

## 📄 License

This project is for educational and interview purposes.

---

**Built with ❤️ for interviews and portfolio demonstration**