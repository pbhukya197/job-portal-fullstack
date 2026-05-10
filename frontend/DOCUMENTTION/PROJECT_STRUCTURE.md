# PROJECT_STRUCTURE.md - Project Architecture and Organization

## Project Structure Overview

Job Portal UI follows a scalable, modular architecture designed for maintainability and growth.

## Directory Structure

```
job-portal-ui/
│
├── public/                                  # Static assets served as-is
│   └── logos/                              # Company logos and images
│
├── src/                                    # Application source code
│
│   ├── components/                         # Reusable UI components
│   │   ├── CompaniesSection.jsx           # Company listings display
│   │   ├── ConfirmationModal.jsx          # Confirmation dialog component
│   │   ├── Footer.jsx                     # Application footer
│   │   ├── Hero.jsx                       # Landing page hero section
│   │   ├── JobsSection.jsx                # Job listings display
│   │   ├── Layout.jsx                     # Main layout wrapper
│   │   ├── Navbar.jsx                     # Navigation bar
│   │   ├── ProtectedRoute.jsx             # Role-based route protection
│   │   ├── RefreshButton.jsx              # Data refresh utility
│   │   └── ScrollToTop.jsx                # Auto-scroll on navigation
│
│   ├── pages/                             # Page components (route views)
│   │   ├── AppliedJobs.jsx                # Job seeker - applied jobs list
│   │   ├── Companies.jsx                  # Public - companies directory
│   │   ├── CompanyDetail.jsx              # Public - company profile
│   │   ├── Contact.jsx                    # Public - contact form
│   │   ├── Home.jsx                       # Public - landing page
│   │   ├── JobApplicants.jsx              # Employer - applicant management
│   │   ├── JobDetail.jsx                  # Public - job details + apply
│   │   ├── Jobs.jsx                       # Public - jobs search/browse
│   │   ├── Login.jsx                      # Public - login page
│   │   ├── MyJobs.jsx                     # Employer - posted jobs
│   │   ├── PostJob.jsx                    # Employer - job posting form
│   │   ├── Profile.jsx                    # Job seeker - profile management
│   │   ├── Register.jsx                   # Public - registration page
│   │   ├── SavedJobs.jsx                  # Job seeker - saved jobs
│   │   └── admin/                         # Admin-only pages
│   │       ├── CompanyManagement.jsx      # Admin - company CRUD
│   │       ├── ContactMessages.jsx        # Admin - contact management
│   │       ├── Dashboard.jsx              # Admin - overview dashboard
│   │       └── EmployerManagement.jsx     # Admin - employer management
│
│   ├── context/                           # React Context (primary state)
│   │   ├── AuthContext.jsx                # Authentication & user state
│   │   ├── JobContext.jsx                 # Job applications & saved jobs
│   │   └── ThemeContext.jsx               # Dark/light theme state
│
│   ├── contexts/                          # Additional context providers
│   │   ├── CompaniesContext.jsx           # Company data context
│   │   └── JobsDataContext.jsx            # Job aggregation context
│
│   ├── services/                          # API integration layer
│   │   ├── companyService.js              # Company API operations
│   │   ├── contactService.js              # Contact form submissions
│   │   ├── jobApplicationService.js       # Application management
│   │   ├── profileService.js              # User profile operations
│   │   └── savedJobService.js             # Saved jobs management
│
│   ├── config/                            # Configuration files
│   │   ├── api.js                         # API endpoints & base URL
│   │   └── httpClient.js                  # Axios instance & interceptors
│
│   ├── data/                              # Mock and seed data
│   │   └── mockData.js                    # Mock data for development
│
│   ├── App.jsx                            # Root component with routing
│   ├── App.css                            # Global component styles
│   ├── index.css                          # Global styles & Tailwind
│   └── main.jsx                           # React DOM entry point
│
├── .env.local                             # Environment variables (git ignored)
├── .gitignore                             # Git ignore rules
├── index.html                             # HTML template
├── package.json                           # Project dependencies
├── package-lock.json                      # Dependency lock file
├── vite.config.js                         # Vite build configuration
├── eslint.config.js                       # ESLint rules
├── tailwind.config.js                     # Tailwind CSS config (if present)
│
├── README.md                              # Project overview
├── DOCUMENTATION.md                       # Technical documentation
├── INSTALLATION.md                        # Setup instructions
├── FEATURES.md                            # Feature list
├── CONTRIBUTING.md                        # Contribution guidelines
├── PROJECT_STRUCTURE.md                   # This file
└── LICENSE                                # License information
```

## Architectural Patterns

### Component Architecture

The application follows a component-based architecture:

#### Smart (Container) Components
- Located in `pages/` directory
- Connect to context/state
- Handle business logic
- Pass data to presentation components
- Examples: Profile.jsx, Jobs.jsx, MyJobs.jsx

#### Presentational (Dumb) Components
- Located in `components/` directory
- Receive data via props
- Handle UI rendering only
- Reusable across multiple pages
- Examples: JobCard, CompanyCard, Navbar

#### Layout Components
- Provide structure and common UI
- Wrap other components
- Examples: Layout.jsx (main), ProtectedRoute.jsx

### State Management Architecture

```
App.jsx (Root)
├── AuthProvider (Authentication & User)
├── JobsDataProvider (Job Data Aggregation)
├── JobProvider (User Job State)
├── CompaniesProvider (Company Data)
└── ThemeProvider (Theme Settings)
```

Each context handles a specific domain:

- **AuthContext** - User authentication, session, profile
- **JobContext** - Applied jobs, saved jobs, posted jobs
- **ThemeContext** - Dark/light mode preference
- **CompaniesContext** - Company listings and details
- **JobsDataContext** - Aggregated job data and search

### Service Layer Architecture

Services provide abstraction between components and API:

```
Component
    ↓
Hook (useAuth, useJobs, etc.)
    ↓
Context
    ↓
Service (companyService, jobApplicationService, etc.)
    ↓
HTTP Client (Axios instance)
    ↓
Backend API
```

Benefits:
- Separation of concerns
- Reusable API logic
- Centralized error handling
- Easy testing
- Consistent data transformation

## Code Organization Principles

### Single Responsibility Principle
- Each component has one primary responsibility
- Each service handles one domain
- Clear separation of concerns

### DRY (Don't Repeat Yourself)
- Reusable components in `components/`
- Shared utilities and helpers
- Context for global state
- Services for API logic

### Modularity
- Independent, self-contained features
- Minimal coupling between modules
- Clear interfaces and contracts
- Easy to locate and modify code

### Maintainability
- Consistent naming conventions
- Clear folder structure
- Comprehensive documentation
- Type hints in comments

## Data Flow

### User Authentication Flow
```
Login Form
    ↓
AuthContext.login()
    ↓
loginService()
    ↓
httpClient.post(/auth/login)
    ↓
Store token & user data
    ↓
Redirect to dashboard
```

### Job Application Flow
```
Apply Button (JobDetail.jsx)
    ↓
JobContext.applyJob()
    ↓
jobApplicationService.submitApplication()
    ↓
httpClient.post(/applications)
    ↓
Update JobContext state
    ↓
Show success notification
```

### Theme Toggle Flow
```
Theme Toggle Button (Navbar.jsx)
    ↓
ThemeContext.toggleTheme()
    ↓
Update theme state
    ↓
Apply theme class to DOM
    ↓
Save to localStorage
```

## Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase.jsx | `JobCard.jsx` |
| Pages | PascalCase.jsx | `Profile.jsx` |
| Services | camelCase.js | `jobService.js` |
| Config | camelCase.js | `httpClient.js` |
| Utilities | camelCase.js | `helpers.js` |
| Styles | Match file | `App.css` |

### Variables & Functions

| Type | Convention | Example |
|------|-----------|---------|
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Variables | camelCase | `userData` |
| Functions | camelCase | `handleSubmit()` |
| React Hooks | camelCase | `useAuth()` |
| Context | PascalCase | `AuthContext` |
| Components | PascalCase | `JobCard` |

### CSS Classes

```
.component-name
.component-name__element
.component-name__element--modifier

Example:
.job-card
.job-card__title
.job-card__title--featured
```

## Dependency Management

### Dependencies (Installed with npm)

#### UI & Framework
- react (19.0.0) - UI library
- react-dom (19.0.0) - DOM rendering
- react-router-dom (7.8.0) - Routing
- @vitejs/plugin-react (4.3.4) - React support in Vite

#### Styling
- tailwindcss (4.0.6) - CSS framework
- @tailwindcss/vite (4.0.6) - Tailwind Vite plugin
- @fortawesome packages - Icons

#### State & HTTP
- @reduxjs/toolkit (2.8.1) - State management
- react-redux (9.2.0) - Redux React integration
- axios (1.8.1) - HTTP client
- js-cookie (3.0.5) - Cookie management

#### Additional
- react-toastify (11.0.5) - Notifications
- @stripe packages - Payment processing
- lucide-react (0.539.0) - Icon library

### Dev Dependencies

- eslint - Code quality
- vite - Build tool
- @types packages - TypeScript support

## Scalability Considerations

### How to Add New Features

1. **New Page:**
   - Create file in `pages/`
   - Add route in `App.jsx`
   - Add navigation link if needed

2. **New API Integration:**
   - Create service in `services/`
   - Add endpoints in `config/api.js`
   - Use in components via hooks

3. **New Global State:**
   - Create context in `context/`
   - Wrap in App.jsx
   - Create custom hook for access

4. **New Reusable Component:**
   - Create file in `components/`
   - Document props and behavior
   - Use in multiple pages

### Performance Optimization Areas

1. **Code Splitting** - Routes lazy load
2. **Image Optimization** - Serve optimized images
3. **Caching** - Browser caching for assets
4. **Bundle Analysis** - Monitor bundle size
5. **Component Memoization** - React.memo for expensive components

## Environment & Configuration

### Build System (Vite)
- Fast HMR development
- Optimized production builds
- ES modules only
- Plugin system for extensibility

### Styling (Tailwind CSS)
- Utility-first approach
- Dark mode built-in
- Responsive design
- Tree-shakeable CSS

### Testing Infrastructure
- ESLint for code quality
- No unit test framework configured (add as needed)

## Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

### Commit Messages
See [CONTRIBUTING.md](CONTRIBUTING.md) for commit guidelines

## Documentation Standards

### In-Code Documentation
- JSDoc comments for functions
- Comments for complex logic
- Property descriptions for components
- README in complex folders

### External Documentation
- README.md - Project overview
- DOCUMENTATION.md - Technical details
- FEATURES.md - Feature descriptions
- INSTALLATION.md - Setup guide
- CONTRIBUTING.md - Contribution rules
- PROJECT_STRUCTURE.md - This file

## Maintenance Tasks

### Regular Maintenance
- Update dependencies monthly
- Review and fix security vulnerabilities
- Monitor performance metrics
- Clean up unused code
- Update documentation

### Code Quality
- Run linting regularly
- Follow ESLint rules
- Keep bundle size in check
- Monitor browser compatibility

## Troubleshooting Structure

### Common Issues Resolution
1. Check DevTools console for errors
2. Verify API connectivity
3. Check browser compatibility
4. Review environment configuration
5. See DOCUMENTATION.md for detailed solutions

---

**Last Updated:** May 2026

For detailed component documentation, see [DOCUMENTATION.md](DOCUMENTATION.md).
