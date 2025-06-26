# Portfolio Builder Application

## Overview

This is a full-stack web application for building and managing professional portfolios. The application provides a drag-and-drop interface for creating custom portfolio websites with various components like headers, hero sections, about sections, projects, skills, and contact forms. Users can authenticate through Replit's authentication system, create multiple portfolios, and publish them to the web.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: Zustand for editor state management
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Drag & Drop**: @dnd-kit for component manipulation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with proper error handling

### Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations for database versioning
- **Session Storage**: Database-backed sessions for authentication persistence

## Key Components

### Authentication System
- **Provider**: Replit Auth integration with OpenID Connect
- **Session Management**: Secure session handling with PostgreSQL storage
- **User Management**: Automatic user creation and profile management
- **Security**: HTTP-only cookies with secure session configuration

### Portfolio Editor
- **Visual Editor**: Drag-and-drop interface for component placement
- **Component Library**: Pre-built components (Header, Hero, About, Projects, Skills, Contact)
- **Real-time Preview**: Live preview of portfolio changes
- **State Management**: Zustand store for editor state and component management
- **Property Panel**: Dynamic property editing for selected components

### Component System
- **Modular Design**: Reusable portfolio components with configurable properties
- **Type Safety**: TypeScript interfaces for component props and data structures
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Customization**: Editable text, images, and styling properties

### Publishing System
- **Portfolio Management**: Create, update, and delete portfolios
- **Publishing**: Generate public URLs for portfolio sharing
- **Version Control**: Track portfolio changes and updates

## Data Flow

1. **Authentication Flow**: User authenticates through Replit Auth, session is stored in PostgreSQL
2. **Dashboard Access**: Authenticated users can view and manage their portfolios
3. **Editor Interaction**: Users drag components to canvas, modify properties through panels
4. **State Synchronization**: Editor state is managed through Zustand and persisted to database
5. **Publishing**: Portfolios are saved with layout data and made publicly accessible

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Vite build system with TypeScript support
- Express.js server framework

### Authentication & Security
- Replit Auth with OpenID Connect
- Passport.js for authentication strategy
- Session management with connect-pg-simple

### Database & ORM
- PostgreSQL with Neon serverless driver
- Drizzle ORM for database operations
- Zod for schema validation

### UI & Styling
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- shadcn/ui component library
- @dnd-kit for drag-and-drop functionality

### Development Tools
- TypeScript for type safety
- ESBuild for server bundling
- PostCSS for CSS processing

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with npm package management
- **Database**: PostgreSQL 16 for development and production
- **Build Process**: Vite development server with hot module replacement
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPL_ID, ISSUER_URL

### Production Deployment
- **Platform**: Replit autoscale deployment target
- **Build Command**: `npm run build` - builds both client and server
- **Start Command**: `npm run start` - runs production server
- **Static Assets**: Client files served from dist/public directory
- **Database**: PostgreSQL connection via environment variable

### Build Process
- Client application built with Vite to dist/public
- Server application bundled with ESBuild to dist/index.js
- Static asset serving in production mode
- Development mode uses Vite middleware for hot reloading

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup