# 🚀 Portfolio Forge Application Documentation

---

## 📄 Overview

**Portfolio Forge** is a full-stack web application designed for creating and managing professional portfolios. It features a **drag-and-drop interface** for building custom portfolio websites with components like headers, hero sections, about sections, projects, skills, and contact forms.

Users can:
- Authenticate via a local system
- Manage multiple portfolios
- Publish them to the web

The application includes an **interactive 3D interface** powered by **Three.js** for portfolio management.

---

## 🧱 System Architecture

### 🔹 Frontend Architecture

- **Framework**: React 18 with TypeScript  
- **Build Tool**: Vite for fast development and optimized builds  
- **Styling**: Tailwind CSS with a custom design system  
- **UI Components**: Radix UI primitives and [shadcn/ui](https://ui.shadcn.com) component library  
- **State Management**: Zustand for managing editor state  
- **Data Fetching**: TanStack Query (React Query)  
- **Routing**: Wouter for client-side routing  
- **Drag & Drop**: `@dnd-kit` for component manipulation  
- **3D Graphics**: Three.js with React Three Fiber  

---

### 🔹 Backend Architecture

- **Runtime**: Node.js with Express.js server  
- **Language**: TypeScript with ES Modules  
- **Authentication**: Local authentication using Passport.js  
- **Session Management**: Express sessions with PostgreSQL store  
- **API Design**: RESTful endpoints with robust error handling  

---

## 🗃️ Data Storage

- **Database**: PostgreSQL with Neon serverless driver  
- **ORM**: Drizzle ORM for type-safe database operations  
- **Schema Management**: Drizzle migrations  
- **Session Storage**: Database-backed sessions for persistent authentication  

---

## 🔐 Key Components

### 1. Authentication System

- **Provider**: Local auth with email and password  
- **Session Management**: Secure sessions using PostgreSQL  
- **User Management**: Register, login, and profile features  
- **Security**: Password hashing (bcrypt), HTTP-only secure cookies  

---

### 2. Portfolio Editor

- **Visual Editor**: Drag-and-drop interface  
- **Component Library**: Header, Hero, About, Projects, Skills, Contact  
- **Live Preview**: Real-time rendering of portfolio changes  
- **State Management**: Zustand store for all components  
- **Property Panel**: Editable fields for each component  

---

### 3. Component System

- **Modular Design**: Reusable, configurable components  
- **Type Safety**: TypeScript interfaces for props and data  
- **Responsive Design**: Mobile-first with Tailwind CSS  
- **Customization**: Dynamic text, images, styles  

---

### 4. Publishing System

- **Portfolio Management**: Create, update, delete portfolios  
- **Publishing**: Public URLs for live portfolios  
- **Version Control**: Track portfolio changes  

---

## 🔄 Data Flow

1. **Authentication Flow**: Local login via Replit Auth (OpenID), sessions stored in PostgreSQL  
2. **Dashboard Access**: Authenticated users view/manage their portfolios  
3. **Editor Interaction**: Drag-and-drop, edit properties  
4. **State Sync**: Zustand manages state, which is persisted to DB  
5. **Publishing**: Layout and data saved and made publicly accessible  

---

## 🧩 External Dependencies

### Core Framework

- React ecosystem (React, React DOM, React Query)  
- Vite with TypeScript  
- Express.js  

### Authentication & Security

- Replit Auth with OpenID Connect  
- Passport.js  
- `connect-pg-simple` for session storage  

### Database & ORM

- PostgreSQL (via Neon)  
- Drizzle ORM  
- Zod for schema validation  

### UI & Styling

- Tailwind CSS  
- Radix UI  
- shadcn/ui  
- `@dnd-kit`  

### Dev Tools

- TypeScript  
- ESBuild (server bundling)  
- PostCSS  

---

## 🚀 Deployment Strategy

### Development Environment

- **Runtime**: Node.js 20  
- **Database**: PostgreSQL 16  
- **Build Tool**: Vite with HMR  
- **Env Variables**:
  - `DATABASE_URL`
  - `SESSION_SECRET`
  - `REPL_ID`
  - `ISSUER_URL`

---

### Production Deployment

- **Platform**: Replit Autoscale  
- **Build Command**: `npm run build` (client + server)  
- **Start Command**: `npm run start`  
- **Static Assets**: Served from `dist/public`  
- **Database**: Env-based PostgreSQL  

---

### Build Process

- **Client**: Vite outputs to `dist/public`  
- **Server**: Bundled with ESBuild to `dist/index.js`  
- **Static Assets**: Served in production  
- **Development Mode**: Uses Vite middleware with HMR  

---

## ⚙️ User Preferences

- **Communication Style**: Simple, clear, everyday language for accessibility

---
