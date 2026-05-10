# DEVELOPMENT.md - Development Guidelines and Best Practices

## Development Guidelines

This document provides guidelines and best practices for developing the Job Portal UI application.

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git
- Code editor (VS Code recommended)
- Basic React and JavaScript knowledge

### Initial Setup

```bash
git clone https://github.com/yourusername/job-portal-ui.git
cd job-portal-ui
npm install
npm run dev
```

See [INSTALLATION.md](INSTALLATION.md) for detailed setup instructions.

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/feature-name
```

### 2. Make Changes

- Write code following project conventions
- Commit frequently with clear messages
- Test changes in browser

### 3. Lint and Format

```bash
npm run lint
npm run lint -- --fix
```

### 4. Test Thoroughly

- Test in development mode: `npm run dev`
- Test different user roles
- Test responsive design
- Check console for errors

### 5. Build and Preview

```bash
npm run build
npm run preview
```

### 6. Submit Pull Request

Push changes and create PR with detailed description.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Code Style Guide

### JavaScript/React

#### Naming Conventions

**Components (PascalCase)**
```
JobCard.jsx
UserProfile.jsx
CompanyDirectory.jsx
```

**Functions/Variables (camelCase)**
```
const handleSubmit = () => {}
const userData = {}
let isLoading = false
```

**Constants (UPPER_SNAKE_CASE)**
```
const MAX_FILE_SIZE = 5242880
const API_TIMEOUT = 30000
const DEFAULT_THEME = 'light'
```

#### File Structure

```jsx
// 1. Imports
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import './JobCard.css'

// 2. Component definition
const JobCard = ({ job, onApply }) => {
  // 3. Hooks and state
  const { user } = useAuth()
  const [expanded, setExpanded] = useState(false)

  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, [])

  // 5. Handlers
  const handleViewDetails = () => {
    setExpanded(!expanded)
  }

  // 6. Render
  return (
    <div className="job-card">
      {/* JSX content */}
    </div>
  )
}

// 7. Export
export default JobCard
```

#### Comments

**JSDoc for functions:**
```javascript
/**
 * Apply for a job position
 * @param {string} jobId - The job ID
 * @param {object} applicationData - Application details
 * @returns {Promise<Application>} Application response
 */
const applyForJob = async (jobId, applicationData) => {
  // Implementation
}
```

**Inline comments for complex logic:**
```javascript
// Filter jobs by salary range and location
const filteredJobs = jobs.filter(job =>
  job.salary >= minSalary &&
  job.salary <= maxSalary &&
  job.location === selectedLocation
)
```

### CSS/Tailwind

#### Class Naming

```html
<!-- Component level -->
<div class="job-card">

  <!-- Element level -->
  <h2 class="job-card__title">

  <!-- Modifier level -->
  <h2 class="job-card__title--featured">

  <!-- State -->
  <button class="btn btn--primary btn--disabled">
</div>
```

#### Dark Mode

```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

#### Responsive Design

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

## Component Development

### Creating a New Component

1. Create file in `src/components/YourComponent.jsx`
2. Follow component structure guidelines
3. Add prop documentation
4. Create accompanying CSS if needed
5. Export component

### Example Component Template

```jsx
/**
 * JobCard Component
 * Displays a single job listing card
 * 
 * Props:
 * - job: Job object with title, company, salary
 * - onApply: Callback when apply button clicked
 * - isSaved: Boolean indicating if job is saved
 */

import { useState } from 'react'
import './JobCard.css'

const JobCard = ({ job, onApply, isSaved = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleApplyClick = () => {
    onApply(job.id)
  }

  return (
    <div
      className="job-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="job-card__header">
        <h3 className="job-card__title">{job.title}</h3>
        {isSaved && <span className="job-card__badge">Saved</span>}
      </div>

      <div className="job-card__body">
        <p className="job-card__company">{job.company}</p>
        <p className="job-card__salary">${job.salary}</p>
      </div>

      <div className="job-card__footer">
        <button
          onClick={handleApplyClick}
          className="btn btn--primary"
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}

export default JobCard
```

### Prop Documentation

```jsx
/**
 * Prop definitions for JobCard
 */
JobCard.propTypes = {
  job: {
    id: string,        // Unique job identifier
    title: string,     // Job title
    company: string,   // Company name
    salary: number,    // Annual salary
    description: string // Job description
  },
  onApply: function,   // Callback function when apply is clicked
  isSaved: boolean     // Whether job is bookmarked
}

JobCard.defaultProps = {
  isSaved: false
}
```

## State Management

### Using Context

```jsx
import { useAuth } from '@/context/AuthContext'

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <div>Please log in</div>
  }

  return <div>Welcome, {user.name}</div>
}
```

### Creating Custom Hooks

```jsx
// src/hooks/useJobApplications.js
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import * as jobService from '@/services/jobApplicationService'

export const useJobApplications = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    const loadApplications = async () => {
      setIsLoading(true)
      try {
        const data = await jobService.getMyApplications()
        setApplications(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadApplications()
  }, [user])

  return { applications, isLoading, error }
}
```

## API Integration

### Service Function Pattern

```javascript
/**
 * Fetch all companies
 * @returns {Promise<Company[]>} Array of companies
 * @throws {Error} If request fails
 */
export const fetchCompanies = async () => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.COMPANIES)
    return response.data
  } catch (error) {
    console.error('Error fetching companies:', error)
    throw error
  }
}
```

### Error Handling in Components

```jsx
const MyComponent = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchData()
      setData(result)
    } catch (err) {
      setError(err.message || 'An error occurred')
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <div>No data available</div>

  return <div>{/* Render data */}</div>
}
```

## Form Development

### Form Validation Pattern

```jsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
  name: ''
})

const [errors, setErrors] = useState({})

const validateForm = () => {
  const newErrors = {}

  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else if (!formData.email.includes('@')) {
    newErrors.email = 'Invalid email format'
  }

  if (!formData.password) {
    newErrors.password = 'Password is required'
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (!formData.name) {
    newErrors.name = 'Name is required'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  try {
    await submitForm(formData)
    toast.success('Form submitted successfully')
    setFormData({ email: '', password: '', name: '' })
  } catch (error) {
    toast.error(error.message)
  }
}
```

## Performance Optimization

### Memoization

```jsx
import { memo } from 'react'

// Memoize expensive component
const JobCard = memo(({ job, onApply }) => {
  return (
    <div className="job-card">
      {/* Component content */}
    </div>
  )
})

export default JobCard
```

### Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react'

const Profile = lazy(() => import('./pages/Profile'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))

<Route
  path="/profile"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    </Suspense>
  }
/>
```

### useMemo for Expensive Calculations

```jsx
import { useMemo } from 'react'

const MyComponent = ({ jobs, searchQuery }) => {
  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [jobs, searchQuery])

  return <div>{/* Render filtered jobs */}</div>
}
```

## Testing

### Manual Testing Checklist

- Test all user roles (Job Seeker, Employer, Admin)
- Test form submissions and validation
- Test API calls and error handling
- Test responsive design on different screen sizes
- Test dark/light theme switching
- Test navigation between pages
- Test authentication and authorization
- Check for console errors

### Browser Testing

- Test in Chrome
- Test in Firefox
- Test in Safari
- Test on mobile browsers

## Debugging

### Using Browser DevTools

1. Open DevTools (F12)
2. Console tab - Check for errors
3. Network tab - Monitor API calls
4. Elements tab - Inspect DOM
5. Application tab - Check localStorage/cookies

### React DevTools

- Install React DevTools browser extension
- View component hierarchy
- Inspect props and state
- Track component re-renders

### Logging

```jsx
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Error logging
console.error('Error:', error)
```

## Git Workflow

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (not functionality)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Test addition
- `chore:` - Dependencies/tooling

**Examples:**
```
feat(auth): add social login support
fix(jobs): correct pagination bug on search
docs(api): update endpoint documentation
refactor(components): simplify JobCard component
```

## Documentation

### When to Document

- New features or components
- Complex logic or algorithms
- API integration points
- Configuration options
- Breaking changes

### What to Document

- Component props and return values
- Function parameters and return type
- Complex business logic
- Configuration requirements
- Usage examples

## Code Review Checklist

Before submitting PR:

- [ ] Code follows style guidelines
- [ ] Comments are clear and helpful
- [ ] No unused imports or variables
- [ ] Error handling is present
- [ ] Responsive design is implemented
- [ ] Accessibility is considered
- [ ] Forms validate input
- [ ] No console errors
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Documentation is updated

## Performance Tips

1. **Avoid inline objects/functions in JSX**
   - Causes unnecessary re-renders
   - Move to component level

2. **Use keys in lists**
   - Helps React identify which items have changed
   - Use unique, stable identifiers

3. **Lazy load routes**
   - Code splitting for better performance
   - Load only what's needed

4. **Optimize images**
   - Use appropriate formats (WebP, etc.)
   - Serve responsive images

5. **Minimize bundle size**
   - Only import what you need
   - Use tree-shaking

## Security Best Practices

1. **Never commit secrets**
   - Use environment variables
   - Add sensitive files to .gitignore

2. **Validate user input**
   - Validate on client and server
   - Sanitize before display

3. **Use HTTPS**
   - Encrypted communication
   - Secure data transmission

4. **Protect sensitive operations**
   - CSRF protection
   - Authorization checks

5. **Keep dependencies updated**
   - Regular security audits
   - Update vulnerable packages

## Development Tools Setup

### VS Code Extensions

Recommended extensions for efficient development:

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Thunder Client (API testing)
- GitLens
- Error Lens

### IDE Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  }
}
```

## Common Issues & Solutions

### Issue: Hot Reload Not Working
**Solution:**
1. Restart dev server
2. Clear browser cache
3. Check Vite config

### Issue: API Calls Failing
**Solution:**
1. Verify backend is running
2. Check VITE_API_BASE_URL
3. Check Network tab for details

### Issue: Component Not Re-rendering
**Solution:**
1. Check state management
2. Verify dependencies in useEffect
3. Use React DevTools to inspect

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Git Workflow Guide](https://git-scm.com/book)

---

**Last Updated:** May 2026

For more details, see:
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [DOCUMENTATION.md](DOCUMENTATION.md) - Technical documentation
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Project organization
