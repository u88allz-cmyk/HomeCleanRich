# 홈클린리치 (Home Clean Rich) - Cleaning Service Website

## Overview

This is a single-page cleaning service website for 홈클린리치 (Home Clean Rich), a Korean cleaning service company. The website replicates the structure of cleanalert.imweb.me with customized content. It provides information about various cleaning services including move-in cleaning, residential cleaning, commercial cleaning, and specialized cleaning services.

The application is built as a full-stack web application with a React frontend and Express backend, designed to showcase services and collect customer inquiries through a contact form.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & UI Library**
- **React with TypeScript**: Single-page application using functional components and hooks
- **Vite**: Build tool and development server for fast hot module replacement
- **Wouter**: Lightweight client-side routing (alternative to React Router)
- **shadcn/ui**: Component library built on Radix UI primitives with Tailwind CSS
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

**State Management**
- **TanStack Query (React Query)**: Server state management for API calls and data fetching
- **React Hook Form**: Form state management with Zod validation
- **Framer Motion**: Animation library for scroll-based and interactive animations

**Design System**
- Custom color scheme with Naver green (#03C75A) as the primary accent color
- White background for clean, fresh aesthetic
- Responsive design with mobile-first approach
- Korean language (ko) as the primary language
- Noto Sans KR font family

**Page Structure**
The home page follows an 11-section single-page layout:
1. Header/Navigation (sticky)
2. Hero/Main Banner
3. Statistics Section (animated counters)
4. Three Key Advantages
5. Four Service Cards
6. Before & After Gallery
7. Additional sections for reviews, process, and contact

**Service Pages (4 dedicated pages)**
- /service1 - 입주청소 (Move-in Cleaning)
- /service2 - 거주청소 (Residential Cleaning)
- /service3 - 상가청소 (Commercial Cleaning)
- /service4 - 특수청소 (Special Cleaning)

Each service page includes:
- Hero section with background image and dark wash overlay
- Badge pill showing service type
- "왜 필요할까요?" (Why is it needed?) heading
- 3 benefit cards with alternating left/right layout
- ChevronDown arrow separators between cards
- Scroll-based animations using Framer Motion
- CTA section with consultation and Kakao buttons
- Consistent navigation linking all service pages

### Backend Architecture

**Server Framework**
- **Express.js**: Node.js web application framework
- **TypeScript**: Type-safe server-side code
- **ES Modules**: Modern JavaScript module system

**Development vs Production**
- **Development mode**: Uses Vite middleware for hot reloading and development features
- **Production mode**: Serves pre-built static assets from dist/public directory
- Separate entry points (index-dev.ts and index-prod.ts) for different environments

**API Design**
- RESTful API endpoints under `/api` prefix
- Two main endpoints:
  - `POST /api/contact`: Submit contact form inquiries
  - `GET /api/contacts`: Retrieve all contact submissions
- JSON request/response format
- Input validation using Zod schemas

**Data Storage**
- **In-Memory Storage**: MemStorage class for development/simple deployments
- Stores contact submissions with UUID identifiers
- Designed to be replaced with database implementation (PostgreSQL with Drizzle ORM)

**Session Management**
- Uses connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- Express session middleware setup prepared for future authentication needs

### Database Schema (Prepared)

**ORM Configuration**
- **Drizzle ORM**: Type-safe SQL query builder configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- Schema definition in shared/schema.ts for code sharing between client and server

**Contact Submissions Table**
```typescript
- id: UUID (primary key, auto-generated)
- name: text (required)
- phone: text (required) 
- services: text array (required, minimum 1 service)
- message: text (required)
- createdAt: timestamp (auto-generated)
```

**Validation**
- Zod schemas for runtime validation (insertContactSchema)
- Ensures data integrity before database operations
- Shared validation between frontend forms and backend API

### Code Organization

**Monorepo Structure**
- `client/`: Frontend React application
  - `src/pages/`: Route components (home, not-found)
  - `src/components/ui/`: Reusable UI components from shadcn/ui
  - `src/hooks/`: Custom React hooks
  - `src/lib/`: Utility functions and query client setup
- `server/`: Backend Express application
  - `routes.ts`: API route definitions
  - `storage.ts`: Data storage abstraction layer
  - `app.ts`: Express app configuration
- `shared/`: Code shared between client and server
  - `schema.ts`: Database schema and validation types

**Path Aliases**
TypeScript and Vite configured with path aliases:
- `@/`: Maps to client/src/
- `@shared/`: Maps to shared/
- `@assets/`: Maps to attached_assets/

## External Dependencies

### UI & Styling
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **Embla Carousel**: Carousel/slider component

### Form Management
- **React Hook Form**: Form state and validation
- **Zod**: Schema validation for TypeScript
- **@hookform/resolvers**: Zod resolver for React Hook Form

### Data Fetching & State
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library

### Backend & Database
- **Express**: Web server framework
- **Drizzle ORM**: Type-safe database ORM
- **@neondatabase/serverless**: Neon PostgreSQL client
- **connect-pg-simple**: PostgreSQL session store
- **Drizzle Kit**: Database migration tool

### Development Tools
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type safety across the stack
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds
- **Replit plugins**: Development environment integration

### Build & Deployment
- Build process creates production bundle in `dist/` directory
- Frontend compiled to `dist/public/`
- Backend compiled to `dist/index.js`
- Environment variables required: `DATABASE_URL` for PostgreSQL connection