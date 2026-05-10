# Job Portal UI - Complete Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Running the Application](#running-the-application)
6. [Features](#features)
7. [Core Components](#core-components)
8. [Pages Documentation](#pages-documentation)
9. [State Management & Context](#state-management--context)
10. [Services & API Integration](#services--api-integration)
11. [Configuration](#configuration)
12. [Authentication & Authorization](#authentication--authorization)
13. [Styling & Theme](#styling--theme)
14. [Scripts & Commands](#scripts--commands)

---

## Project Overview

**Job Portal UI** is a modern, full-featured React-based job portal application built with Vite. It serves as the frontend for a complete job marketplace platform that connects job seekers with employers and companies.

### Purpose
- Enable job seekers to browse, search, apply, and save job listings
- Allow employers to post job listings and manage applications
- Provide administrators with management tools for companies, employers, and contact messages
- Support multiple user roles with role-based access control

### Key Capabilities
- Multi-role authentication (Job Seeker, Employer, Admin)
- Job browsing and filtering
- Company directory
- Application management
- Profile management
- Dark/Light theme support
- Responsive design
- Real-time notifications

---

## Technology Stack

### Core Framework & Build Tools
- **React** (v19.0.0) - UI library
- **Vite** (v7.1.0) - Build tool and dev server
- **React Router DOM** (v7.8.0) - Client-side routing

### State Management & Data
- **Redux Toolkit** (v2.8.1) - State management
- **React Redux** (v9.2.0) - Redux bindings for React
- **Axios** (v1.8.1) - HTTP client for API calls
- **js-cookie** (v3.0.5) - Cookie management

### UI & Styling
- **Tailwind CSS** (v4.0.6) - Utility-first CSS framework
- **@tailwindcss/vite** (v4.0.6) - Vite plugin for Tailwind
- **Lucide React** (v0.539.0) - Icon library
- **Font Awesome** (v6.7.2) - Additional icon library
  - Free solid, regular, and brands icons
  - React Font Awesome component

### Additional Libraries
- **React Toastify** (v11.0.5) - Toast notifications
- **Stripe Integration** (for payments)
  - @stripe/react-stripe-js (v3.6.0)
  - @stripe/stripe-js (v7.2.0)

### Development Tools
- **ESLint** (v9.17.0) - Code linting
- **ESLint Plugins**
  - @eslint/js
  - eslint-plugin-react
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh

---

## Project Structure

```
job-portal-ui/
├── public/                          # Static assets
│   └── logos/                       # Company logos
├── src/
│   ├── components/                  # Reusable React components
│   │   ├── CompaniesSection.jsx     # Companies display section
│   │   ├── ConfirmationModal.jsx    # Confirmation dialog component
│   │   ├── Footer.jsx               # Application footer
│   │   ├── Hero.jsx                 # Hero section banner
│   │   ├── JobsSection.jsx          # Jobs display section
│   │   ├── Layout.jsx               # Main layout wrapper
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── ProtectedRoute.jsx       # Role-based route protection
│   │   ├── RefreshButton.jsx        # Data refresh utility
│   │   └── ScrollToTop.jsx          # Auto scroll to top on route change
│   │
│   ├── config/                      # Configuration files
│   │   ├── api.js                   # API endpoints and base URL
│   │   └── httpClient.js            # Axios instance with interceptors
│   │
│   ├── context/                     # React Context (primary state management)
│   │   ├── AuthContext.jsx          # Authentication and user state
│   │   ├── JobContext.jsx           # Job-related state (applied, saved jobs)
│   │   └── ThemeContext.jsx         # Dark/Light theme state
│   │
│   ├── contexts/                    # Additional Context providers
│   │   ├── CompaniesContext.jsx     # Companies data context
│   │   └── JobsDataContext.jsx      # Jobs data context
│   │
│   ├── data/
│   │   └── mockData.js              # Mock data for testing/development
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── AppliedJobs.jsx          # Job seeker applied jobs list
│   │   ├── Companies.jsx            # Companies browse page
│   │   ├── CompanyDetail.jsx        # Company detail view
│   │   ├── Contact.jsx              # Contact form page
│   │   ├── Home.jsx                 # Landing page
│   │   ├── JobApplicants.jsx        # Employer applicants list
│   │   ├── JobDetail.jsx            # Job detail view with apply form
│   │   ├── Jobs.jsx                 # Jobs browse page with filters
│   │   ├── Login.jsx                # Login page
│   │   ├── MyJobs.jsx               # Employer posted jobs list
│   │   ├── PostJob.jsx              # Job posting form (employer)
│   │   ├── Profile.jsx              # Job seeker profile management
│   │   ├── Register.jsx             # Registration page
│   │   ├── SavedJobs.jsx            # Job seeker saved jobs list
│   │   └── admin/                   # Admin pages
│   │       ├── CompanyManagement.jsx# Admin company management
│   │       ├── ContactMessages.jsx  # Admin contact messages
│   │       ├── Dashboard.jsx        # Admin dashboard
│   │       └── EmployerManagement.jsx # Admin employer management
│   │
│   ├── services/                    # API service functions
│   │   ├── companyService.js        # Company API operations
│   │   ├── contactService.js        # Contact form submissions
│   │   ├── jobApplicationService.js # Job application operations
│   │   ├── profileService.js        # User profile operations
│   │   └── savedJobService.js       # Saved jobs operations
│   │
│   ├── App.jsx                      # Root component with routing
│   ├── App.css                      # Global styles
│   ├── index.css                    # Global CSS and Tailwind imports
│   └── main.jsx                     # React DOM render entry point
│
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint rules
└── tailwind.config.js               # Tailwind CSS configuration (if present)
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running at `http://localhost:8080/api` (or configured URL)

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd job-portal-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables** (if needed)
   Create or update `.env` or `.env.local` file:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Verify installation**
   ```bash
   npm list
   ```

---

## Running the Application

### Development Server

```bash
npm run dev
```

- Starts Vite dev server with hot module replacement (HMR)
- Application available at `http://localhost:5173`
- Changes are reflected immediately in the browser

### Build for Production

```bash
npm run build
```

- Creates optimized production build
- Output in `dist/` directory
- Minified and chunked for better performance

### Preview Production Build

```bash
npm run preview
```

- Local preview of production build
- Useful for testing before deployment

### Lint Code

```bash
npm run lint
```

- Runs ESLint to check for code quality issues
- Reports style and error violations

---

## Features

### For Job Seekers
- ✅ **Browse Jobs** - Search and filter job listings by category, location, experience level
- ✅ **Job Details** - View comprehensive job information and company details
- ✅ **Apply for Jobs** - Submit applications with cover letters
- ✅ **Saved Jobs** - Bookmark favorite jobs for later
- ✅ **Applied Jobs** - Track application status and history
- ✅ **Profile Management** - Build professional profile with:
  - Personal information and contact details
  - Skills and experience summary
  - Work history and education
  - Resume upload
  - Portfolio/website links
- ✅ **View Companies** - Browse company profiles and open positions

### For Employers
- ✅ **Post Jobs** - Create job listings with:
  - Job title, description, requirements
  - Salary range and job type
  - Location and experience level
  - Skills and benefits
- ✅ **Manage Posted Jobs** - Edit, delete, and view job listings
- ✅ **View Applicants** - See applications for posted jobs
- ✅ **Application Management** - Review and manage candidate applications
- ✅ **Company Profile** - Manage company information and branding

### For Administrators
- ✅ **Dashboard** - Overview of platform statistics
- ✅ **Company Management** - CRUD operations for companies
- ✅ **Employer Management** - Manage employer accounts
- ✅ **Contact Messages** - View and manage contact form submissions
- ✅ **Content Management** - Monitor platform usage

### General Features
- ✅ **Authentication** - Secure login/register with role-based access
- ✅ **Theme Switching** - Dark/Light mode toggle
- ✅ **Responsive Design** - Mobile, tablet, and desktop support
- ✅ **Real-time Notifications** - Toast notifications for user actions
- ✅ **Error Handling** - Graceful error messages and recovery
- ✅ **Data Persistence** - LocalStorage for client-side data caching

---

## Core Components

### Layout Components

#### **Layout.jsx**
Main wrapper component for the entire application.
- Provides consistent header and footer
- Uses `<Outlet>` for page-specific content
- Implements theme styles

```jsx
// Structure:
<Layout>
  <Navbar />
  <main><Outlet /></main>
  <Footer />
</Layout>
```

#### **Navbar.jsx**
Navigation bar with:
- Logo and site title
- Navigation links (dynamic based on user role)
- User profile/dropdown menu
- Theme toggle button
- Authentication state display

#### **Footer.jsx**
Application footer with:
- Quick links
- Company information
- Contact details
- Social media links
- Copyright information

### Feature Components

#### **CompaniesSection.jsx**
Displays company listings in a grid layout.
- Company cards with logos and details
- Quick job counts
- Link to company detail page

#### **JobsSection.jsx**
Displays job listings.
- Job cards with title, company, salary
- Quick apply buttons
- Save job functionality

#### **Hero.jsx**
Landing page hero banner section.
- Eye-catching headline and tagline
- Search/filter quick access
- Call-to-action buttons

#### **ProtectedRoute.jsx**
Route protection component for role-based access.
```jsx
<ProtectedRoute allowedRoles={['ROLE_JOB_SEEKER', 'ROLE_EMPLOYER']}>
  <ProtectedPage />
</ProtectedRoute>
```

**Features:**
- Checks user authentication
- Validates user role against allowed roles
- Redirects to login if unauthorized
- Shows error message for insufficient permissions

**Supported Roles:**
- `ROLE_JOB_SEEKER` - Job seeker users
- `ROLE_EMPLOYER` - Employer/company accounts
- `ROLE_ADMIN` - Administrator accounts

#### **ScrollToTop.jsx**
Auto-scroll utility component.
- Scrolls page to top on route changes
- Improves UX when navigating between pages

#### **ConfirmationModal.jsx**
Reusable confirmation dialog.
- Delete confirmations
- Action confirmations
- Custom message and button text

#### **RefreshButton.jsx**
Data refresh utility component.
- Refetch data from server
- Visual loading state
- Success/error feedback

---

## Pages Documentation

### Public Pages (No Authentication Required)

#### **Home.jsx**
Landing page with:
- Hero banner
- Featured jobs section
- Featured companies section
- Call-to-action sections
- Navigation to main features

#### **Jobs.jsx**
Job listing and search page with:
- **Search & Filter:**
  - Job title search
  - Location filter
  - Job category filter
  - Experience level filter
  - Salary range filter
- **Job Display:**
  - Paginated job list
  - Sort options (newest, most relevant)
  - Job cards with key details
- **Actions:**
  - View job details
  - Quick apply (if authenticated)
  - Save/unsave job

#### **JobDetail.jsx**
Individual job detail page with:
- Full job description
- Company information
- Salary and job type details
- Requirements and skills
- Benefits section
- Apply form with:
  - Cover letter field
  - Resume selection
  - Application preview
- Applicant count and status tracking

#### **Companies.jsx**
Company browsing page with:
- Company list/grid
- Company search
- Filter by industry/size
- Company cards with job counts
- Link to company details

#### **CompanyDetail.jsx**
Company profile page with:
- Company overview and information
- Company logo and branding
- Open positions list
- Company statistics
- Employee count and location

#### **Contact.jsx**
Contact form page with:
- Contact form fields:
  - Name, email, subject
  - Message textarea
- Form validation
- Success/error messages
- Backend submission

### Job Seeker Pages (Requires `ROLE_JOB_SEEKER`)

#### **Profile.jsx**
Job seeker profile management page with:
- **Personal Information:**
  - Name, email, phone
  - Location, title/headline
  - Bio/summary
  - Profile picture upload
- **Professional Details:**
  - Skills management (add/remove)
  - Experience level
  - Years of experience
- **Work History:**
  - Add/edit/delete work experiences
  - Company, position, dates
  - Job description
- **Education:**
  - Add/edit/delete education entries
  - Degree, institution, year
- **Documents:**
  - Resume upload
  - Portfolio/website links
- **Profile Preview**

#### **AppliedJobs.jsx**
Job seeker's application history with:
- List of submitted applications
- Application status display:
  - Pending
  - Accepted
  - Rejected
- Application date and details
- View original job posting
- Withdraw application option
- Cover letter view

#### **SavedJobs.jsx**
Job seeker's saved/bookmarked jobs with:
- List of saved jobs
- Save date display
- Quick apply button
- Remove from saved option
- View full job details
- Search/filter saved jobs

### Employer Pages (Requires `ROLE_EMPLOYER`)

#### **PostJob.jsx**
Job posting form page for employers with:
- **Job Information:**
  - Job title, category
  - Job description (rich text)
  - Job type (Full-time, Part-time, etc.)
- **Requirements:**
  - Required skills
  - Experience level
  - Education requirements
  - Certifications needed
- **Compensation:**
  - Salary range (min/max)
  - Currency selection
  - Benefits list
- **Details:**
  - Location
  - Remote/hybrid options
  - Application deadline
- **Form Validation:**
  - Required field validation
  - URL validation
  - Format checking
- **Submit & Preview**

#### **MyJobs.jsx**
Employer's posted jobs management page with:
- List of posted jobs
- Job status (active, draft, expired)
- Posted date and application count
- Actions:
  - View applicants
  - Edit job posting
  - Delete job
  - View job details
- Statistics (total posted, active, applications)

#### **JobApplicants.jsx**
Applicant management page for specific job with:
- List of all applicants for a job
- Applicant information display:
  - Name, email, phone
  - Applied date
  - Application status
  - Cover letter view
- Filter by status (new, reviewed, accepted, rejected)
- Actions:
  - View full resume
  - Change application status
  - Send message/email
  - Schedule interview

### Admin Pages (Requires `ROLE_ADMIN`)

#### **Dashboard.jsx**
Admin dashboard with:
- Platform statistics:
  - Total users, jobs, companies
  - Applications count
  - New registrations
- Charts and graphs
- Recent activities
- Quick action buttons
- Links to management sections

#### **CompanyManagement.jsx**
Company management interface with:
- Company list with details
- Search and filter companies
- View company profile
- Edit company information
- Delete company
- Verify/approve companies
- Suspend/reactivate companies
- View associated jobs and users

#### **EmployerManagement.jsx**
Employer account management with:
- List of employers
- Filter by status (active, suspended)
- View employer profile
- Edit employer details
- Approve/reject employer accounts
- Suspend employer account
- View posted jobs
- View applications

#### **ContactMessages.jsx**
Contact form submissions management with:
- List of all contact messages
- Filter by status (new, read, replied)
- Search by name/email
- View message details
- Mark as read/unread
- Reply to messages
- Delete messages
- Export messages

---

## State Management & Context

### Context API Structure

The application uses React Context API for global state management, organized into multiple contexts for separation of concerns.

#### **AuthContext.jsx**
Handles authentication and user session management.

**Purpose:**
- User authentication state
- Login/logout functionality
- User role and permissions
- Session persistence

**State:**
```javascript
{
  user: {
    userId: string,
    name: string,
    email: string,
    role: 'ROLE_JOB_SEEKER' | 'ROLE_EMPLOYER' | 'ROLE_ADMIN',
    // Role-specific fields
    company?: string,           // For employers
    title?: string,             // For job seekers
    phone?: string,
    location?: string,
    // ... other user details
  },
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}
```

**Provided Methods:**
- `login(email, password)` - Authenticate user
- `register(userData)` - Create new account
- `logout()` - Clear session
- `updateProfile(updates)` - Update user information
- `hasRole(role)` - Check if user has specific role

**Features:**
- JWT token management (stored in httpClient)
- CSRF token handling for POST/PUT/DELETE requests
- Automatic token refresh
- Local storage persistence
- Fallback to dummy users for testing

#### **JobContext.jsx**
Manages job-seeker and employer specific job data.

**Purpose:**
- Applied jobs tracking
- Saved jobs management
- Posted jobs (employer)
- Application history

**State:**
```javascript
{
  appliedJobs: Job[],      // Jobs user applied for
  savedJobs: Job[],        // User's bookmarked jobs
  postedJobs: Job[],       // Employer's posted jobs
  allApplications: Application[]
}
```

**Provided Methods:**
- `applyJob(jobId, coverLetter)` - Submit application
- `saveJob(jobId)` - Add to saved jobs
- `unsaveJob(jobId)` - Remove from saved
- `withdrawApplication(appId)` - Cancel application
- `postJob(jobData)` - Create new job posting
- `updateJob(jobId, data)` - Edit job
- `deleteJob(jobId)` - Remove job posting

**Data Synchronization:**
- Syncs with backend API when user is authenticated
- Falls back to localStorage if API unavailable
- Updates on mount and user changes

#### **ThemeContext.jsx**
Manages application theme (dark/light mode).

**Purpose:**
- Theme state management
- Persistent theme preference
- DOM class application

**State:**
```javascript
{
  theme: 'light' | 'dark',
  isInitialized: boolean
}
```

**Provided Methods:**
- `toggleTheme()` - Switch between light and dark mode

**Features:**
- Loads saved preference from localStorage
- Applies theme via DOM classes
- Persists user preference
- Supports system theme preference detection

**Usage:**
```jsx
const { theme, toggleTheme } = useTheme();

// Apply theme-specific styles
<div className={theme === 'dark' ? 'dark-class' : 'light-class'}>
  {/* content */}
</div>
```

#### **CompaniesContext.jsx**
Manages company data and listings.

**Purpose:**
- Company data fetching and caching
- Company search and filtering
- Company details management

**State:**
```javascript
{
  companies: Company[],
  selectedCompany: Company | null,
  isLoading: boolean,
  error: string | null
}
```

**Provided Methods:**
- `fetchCompanies()` - Get all companies
- `fetchCompanyById(id)` - Get specific company
- `setSelectedCompany(company)` - Set active company
- `searchCompanies(query)` - Search company name/location

#### **JobsDataContext.jsx**
Manages aggregated job data and search state.

**Purpose:**
- All jobs aggregation
- Job search and filtering state
- Pagination management

**State:**
```javascript
{
  allJobs: Job[],
  filteredJobs: Job[],
  searchQuery: string,
  filters: {
    location: string,
    category: string,
    experience: string,
    salaryRange: [min, max]
  },
  currentPage: number,
  jobApplicationsCount: number
}
```

**Provided Methods:**
- `setSearchQuery(query)` - Search jobs
- `setFilters(filters)` - Apply filters
- `resetFilters()` - Clear all filters
- `setCurrentPage(page)` - Pagination
- `updateJobApplicationsCount(count)` - Update app count

---

## Services & API Integration

### Service Architecture

Services are API integration layers that handle all backend communication. Each service corresponds to a specific domain.

#### **companyService.js**
Handles company-related API operations.

**Key Functions:**

```javascript
// Fetch all companies with jobs
fetchCompanies() -> Promise<Company[]>
// Returns: Array of company objects with nested jobs

// Fetch single company by ID
fetchCompanyById(id: string) -> Promise<Company>
// Returns: Company details with all jobs

// Fetch company by name
fetchCompanyByName(name: string) -> Promise<Company>
// Returns: Matching company or null

// Get all jobs from all companies
fetchAllJobs() -> Promise<Job[]>
// Returns: Flattened array of all jobs

// Transform job data
transformJob(job: object) -> Job
// Converts API response to frontend format
// Handles:
// - JSON string parsing for arrays (requirements, benefits)
// - Date formatting
// - Data validation
```

**Data Transformation:**
The service includes robust parsing for job data:
- Parses JSON strings in API responses
- Handles missing or malformed data gracefully
- Validates array fields
- Provides default values

#### **jobApplicationService.js**
Handles job application operations.

**Key Functions:**

```javascript
// Apply for a job
submitApplication(jobId: string, data: object) -> Promise<Application>
// Data: { coverLetter: string, resume?: string }

// Get user's applications
getMyApplications() -> Promise<Application[]>
// Returns: All applications for logged-in user

// Get job applicants (employer)
getJobApplicants(jobId: string) -> Promise<Application[]>
// Returns: All applications for specific job

// Update application status (employer)
updateApplicationStatus(appId: string, status: string) -> Promise<Application>
// Status: 'pending', 'accepted', 'rejected', 'interview'

// Withdraw application (job seeker)
withdrawApplication(appId: string) -> Promise<void>

// Get application details
getApplicationDetails(appId: string) -> Promise<Application>
```

**Application Object:**
```javascript
{
  id: string,
  jobId: string,
  userId: string,
  status: 'pending' | 'accepted' | 'rejected' | 'interview',
  coverLetter: string,
  resume: {
    url: string,
    filename: string
  },
  appliedAt: ISO8601DateTime,
  updatedAt: ISO8601DateTime,
  job: Job  // Nested job details
}
```

#### **savedJobService.js**
Manages saved/bookmarked jobs for job seekers.

**Key Functions:**

```javascript
// Get all saved jobs for user
getSavedJobs() -> Promise<SavedJob[]>
// Returns: Array of saved job objects

// Save a job
saveJob(jobId: string) -> Promise<SavedJob>

// Remove saved job
unsaveJob(jobId: string) -> Promise<void>

// Check if job is saved
isSaved(jobId: string) -> Promise<boolean>
```

**SavedJob Object:**
```javascript
{
  id: string,
  jobId: string,
  userId: string,
  savedAt: ISO8601DateTime,
  job: Job  // Nested job details
}
```

#### **profileService.js**
Handles user profile operations.

**Key Functions:**

```javascript
// Get user profile
getProfile() -> Promise<Profile>

// Update profile
updateProfile(data: object) -> Promise<Profile>
// Data fields:
// - name, email, phone
// - title, location
// - bio, skills
// - profileImage, resume

// Upload profile picture
uploadProfileImage(file: File) -> Promise<{ url: string }>

// Upload resume
uploadResume(file: File) -> Promise<{ url: string }>

// Get user skills
getSkills() -> Promise<Skill[]>

// Add skill
addSkill(skill: string) -> Promise<Skill>

// Remove skill
removeSkill(skillId: string) -> Promise<void>
```

#### **contactService.js**
Handles contact form submissions.

**Key Functions:**

```javascript
// Submit contact message
submitContactMessage(data: object) -> Promise<ContactMessage>
// Data: { name, email, subject, message }

// Get contact messages (admin only)
getContactMessages() -> Promise<ContactMessage[]>

// Get message details
getMessageDetails(id: string) -> Promise<ContactMessage>

// Mark as read
markAsRead(id: string) -> Promise<void>

// Reply to message
replyToMessage(id: string, reply: string) -> Promise<void>
```

### HTTP Client Configuration

**httpClient.js** provides centralized Axios configuration.

**Features:**
- Base URL configuration from environment
- Default headers (Content-Type, Accept)
- CSRF token handling
- Request/response interceptors
- Error handling
- Timeout configuration (30 seconds)
- Cookie support (withCredentials)

**Interceptors:**

1. **Request Interceptor:**
   - Adds Accept header
   - Handles CSRF token for unsafe methods (POST, PUT, DELETE, PATCH)
   - Skips token for public endpoints

2. **Response Interceptor:**
   - Handles HTTP error responses
   - Transforms error messages
   - Auto-logout on 401 (unauthorized)
   - Redirects to login if needed

**Public Endpoints** (no auth required):
```javascript
[
  "/auth/login/public",
  "/auth/register/public",
  "/companies/public",
  "/contacts/public",
  "/csrf-token/public"
]
```

### API Configuration

**api.js** centralizes all endpoint definitions.

**Configuration:**
```javascript
API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:8080/api"
DEFAULT_API_VERSION = "1.0"
```

**Endpoint Definitions:**
- Company endpoints
- Job endpoints
- Auth endpoints
- User endpoints
- Application endpoints
- Saved job endpoints
- Contact endpoints

**Usage:**
```javascript
import { API_ENDPOINTS } from '@/config/api'

httpClient.get(API_ENDPOINTS.COMPANIES)
httpClient.get(API_ENDPOINTS.JOB_BY_ID('123'))
```

---

## Configuration

### Environment Variables

Create `.env.local` file in project root:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Stripe Public Key (if using payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx

# Feature Flags
VITE_ENABLE_PAYMENTS=false
```

### Vite Configuration (vite.config.js)

```javascript
export default defineConfig({
  plugins: [
    react(),           // React fast refresh
    tailwindcss()      // Tailwind CSS processing
  ],
  // ... other config
})
```

### Tailwind CSS

Tailwind is configured for utility-first CSS with:
- Dark mode support
- Custom color palette
- Responsive breakpoints
- Utility functions

### ESLint Configuration (eslint.config.js)

Enforces code quality with:
- React best practices
- React Hooks rules
- React Refresh rules
- General JavaScript standards

---

## Authentication & Authorization

### Authentication Flow

1. **User Registration**
   - Submit registration form with email, password, role
   - Backend creates user account
   - User redirected to login

2. **User Login**
   - Submit email and password
   - Backend validates credentials
   - Returns JWT token and user data
   - Token stored in httpClient
   - User context updated

3. **Session Persistence**
   - Token stored in HTTP-only cookie or localStorage
   - Auto-loaded from storage on app start
   - User restored from token on page refresh

4. **Logout**
   - Clear token from storage
   - Clear user context
   - Redirect to home/login

### User Roles & Permissions

#### **ROLE_JOB_SEEKER**
Job seeker/candidate account.

**Access:**
- View jobs and companies
- Search and filter jobs
- Apply for jobs
- Save/bookmark jobs
- View profile
- Manage applications
- View saved jobs
- Edit own profile

**Restricted:**
- Cannot post jobs
- Cannot see applicant data
- Cannot access admin panel

#### **ROLE_EMPLOYER**
Employer/HR representative account.

**Access:**
- Post job listings
- Edit own job postings
- View job applicants
- Manage applications
- View own company profile
- Track job statistics

**Restricted:**
- Cannot apply for jobs
- Cannot access admin panel
- Cannot manage other companies

#### **ROLE_ADMIN**
Administrator account.

**Access:**
- View all jobs and companies
- View all users
- Manage companies (CRUD)
- Manage employers
- View contact messages
- Dashboard and statistics
- Full platform access

**Restrictions:**
- None (full access)

### Role-Based Route Protection

Routes are protected using `ProtectedRoute` component:

```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={['ROLE_JOB_SEEKER']}>
      <Profile />
    </ProtectedRoute>
  }
/>
```

**Protection Logic:**
1. Check if user is authenticated
2. Verify user role is in allowed list
3. Redirect to login if not authenticated
4. Show error if role not allowed
5. Render component if authorized

### Token Management

- JWT tokens handled by httpClient
- Automatic token injection in Authorization header
- Token refresh on expiry (handled by backend)
- CSRF tokens for state-changing operations
- Secure cookie storage

---

## Styling & Theme

### Tailwind CSS Framework

The application uses Tailwind CSS for all styling.

**Key Features:**
- Utility-first approach
- Responsive design (mobile-first)
- Dark mode support with `dark:` prefix
- Custom components and extensions
- Optimized production builds

**Responsive Breakpoints:**
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Dark Mode Implementation

**ThemeContext provides:**
- Theme toggle functionality
- Persistent preference storage
- Dynamic DOM class application

**HTML Structure:**
```html
<!-- Light mode -->
<html class="light">

<!-- Dark mode -->
<html class="dark">
```

**Tailwind Dark Styles:**
```jsx
// Light by default, dark on dark mode
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

### Global Styles

**index.css:**
- Tailwind CSS imports
- Custom CSS variables
- Global utility classes
- Font configurations

**App.css:**
- Component-specific styles
- Animations
- Transitions
- Custom theme variables

### Icon Libraries

**Font Awesome:**
- Free solid icons
- Free regular icons
- Free brand icons
- React component integration

**Lucide React:**
- Lightweight icon set
- Tree-shakeable
- Customizable sizing and colors

**Usage:**
```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Search } from 'lucide-react'

<FontAwesomeIcon icon={faUser} />
<Search size={24} />
```

---

## Scripts & Commands

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Run linting check
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

### Production Commands

```bash
# Build optimized production bundle
npm run build
# Output: dist/ directory

# Preview production build locally
npm run preview
```

### Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy `dist/` directory to hosting**
   - Netlify
   - Vercel
   - GitHub Pages
   - Traditional web server

3. **Configure environment**
   - Set `VITE_API_BASE_URL` to production API
   - Update any other environment variables

4. **Server Configuration**
   - For client-side routing, configure server to:
     - Serve `index.html` for all routes
     - Cache static files (JS, CSS, images)
     - Set proper headers

---

## Development Workflow

### Code Organization Best Practices

1. **Components**
   - Keep components focused and single-purpose
   - Use functional components with hooks
   - Extract reusable logic to custom hooks
   - Prop validation with comments

2. **Services**
   - One service per domain/feature
   - Async operations only
   - Error handling
   - Return consistent data structure

3. **Context**
   - Separate contexts for different concerns
   - Use custom hooks (useAuth, useTheme, etc.)
   - Provider wrapping in App.jsx
   - Memoization for performance

4. **Pages**
   - One page per route
   - Heavy lifting delegated to components
   - Error boundary wrapping
   - Loading states

### Common Patterns

#### Using Context

```jsx
import { useAuth } from '@/context/AuthContext'

function MyComponent() {
  const { user, isAuthenticated, login } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  
  return <div>Welcome, {user.name}</div>
}
```

#### Error Handling

```jsx
import { toast } from 'react-toastify'

try {
  const data = await apiCall()
} catch (error) {
  toast.error(error.message || 'An error occurred')
}
```

#### Form Validation

```jsx
const [formData, setFormData] = useState({})
const [errors, setErrors] = useState({})

const handleSubmit = (e) => {
  e.preventDefault()
  
  // Validate
  const newErrors = {}
  if (!formData.email) newErrors.email = 'Email required'
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }
  
  // Submit
  submitForm(formData)
}
```

---

## Troubleshooting Guide

### Common Issues

#### **Port Already in Use**
```bash
# Change Vite port
npm run dev -- --port 3000
```

#### **API Connection Issues**
- Verify backend is running at configured URL
- Check `VITE_API_BASE_URL` environment variable
- Check network tab in DevTools
- Verify CORS configuration on backend

#### **Authentication Problems**
- Check token storage (cookies/localStorage)
- Verify JWT token validity
- Check if routes are properly protected
- Verify role configuration

#### **Styling Not Applied**
- Rebuild project: `npm run build`
- Check Tailwind config
- Clear browser cache
- Verify CSS imports in index.css

#### **Build Failures**
- Clear `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Check for TypeScript errors
- Run lint to find issues: `npm run lint`

---

## Performance Optimization

### Current Optimizations
- Code splitting with Vite
- Lazy loading of routes
- Image optimization
- CSS purging in production
- Minification and compression

### Recommended Improvements
- Add React.memo for expensive components
- Implement image lazy loading
- Add service worker for offline support
- Optimize bundle size with code analysis
- Add virtual scrolling for large lists

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Resources & Documentation

### Official Documentation
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

### Project Resources
- Backend API Documentation (see backend project)
- Environment configuration guide
- API endpoint reference

---

## Support & Contact

For issues, questions, or contributions:
- Check existing documentation
- Review code comments
- Check browser console for errors
- Verify backend connection
- Test with different browsers

---

## License

[Add your license here]

---

**Last Updated:** May 2026
**Version:** 1.0.0
**Project Name:** Job Portal UI
