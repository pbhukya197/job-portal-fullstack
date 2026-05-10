# API.md - API Integration Guide

## API Integration Documentation

Job Portal UI communicates with a backend REST API for all data operations. This document describes the API integration architecture and usage patterns.

## Overview

### API Purpose

The backend API provides all business logic and data persistence for:

- User authentication and authorization
- Job listings management
- Company information
- Job applications
- User profiles and resumes
- Contact form submissions
- Admin operations

### Architecture

```
Frontend (React)
    ↓ (HTTP Requests)
HTTP Client (Axios)
    ↓
Service Layer
    ↓
Backend API (REST)
    ↓
Database
```

## Connection Configuration

### Base URL

The API base URL is configured via environment variables:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Default: `http://localhost:8080/api`

### HTTP Client Setup

The application uses Axios with centralized configuration in `src/config/httpClient.js`:

- Base URL configuration
- Default headers (Content-Type, Accept)
- Request/response interceptors
- Automatic error handling
- CSRF token management
- 30-second timeout

### Request Headers

**Standard Headers:**
- `Content-Type: application/json`
- `Accept: application/vnd.eazyapp+json;v=1.0`
- `Authorization: Bearer {token}` (for authenticated requests)
- `X-CSRF-Token: {token}` (for state-changing requests)

### Authentication

#### JWT Token Flow

1. User logs in with credentials
2. Backend returns JWT token
3. Token stored in HTTP client
4. Token automatically included in subsequent requests
5. Token expires after configured duration
6. Refresh token mechanism (if supported)

#### Public Endpoints (No Auth Required)
- `/auth/login/public`
- `/auth/register/public`
- `/companies/public`
- `/contacts/public`
- `/csrf-token/public`

#### Protected Endpoints (Auth Required)
- All other endpoints require valid JWT token
- Automatic redirect to login on 401 errors

## API Endpoints

### Authentication Endpoints

**Login**
- Method: POST
- Path: `/auth/login/public`
- Body: `{ email, password }`
- Response: `{ token, user }`

**Register**
- Method: POST
- Path: `/auth/register/public`
- Body: `{ name, email, password, role }`
- Response: `{ token, user }`

**Logout**
- Method: POST
- Path: `/auth/logout`
- Body: (empty)
- Response: `{ success }`

### Company Endpoints

**Get All Companies**
- Method: GET
- Path: `/companies/public`
- Query Parameters: (none)
- Response: `Company[]`

**Get Company by ID**
- Method: GET
- Path: `/companies/{id}`
- Response: `Company`

**Get Company by Name**
- Method: GET
- Path: `/companies/name/{name}`
- Response: `Company`

**Create Company (Admin)**
- Method: POST
- Path: `/companies/admin`
- Body: `{ name, description, ... }`
- Response: `Company`

**Update Company (Admin)**
- Method: PUT
- Path: `/companies/{id}/admin`
- Body: `{ name, description, ... }`
- Response: `Company`

**Delete Company (Admin)**
- Method: DELETE
- Path: `/companies/{id}/admin`
- Response: `{ success }`

### Job Endpoints

**Get All Jobs**
- Method: GET
- Path: `/jobs`
- Query Parameters: `?page=1&limit=20&search=&category=&location=`
- Response: `{ jobs: Job[], total, page }`

**Get Job by ID**
- Method: GET
- Path: `/jobs/{id}`
- Response: `Job`

**Create Job (Employer)**
- Method: POST
- Path: `/jobs`
- Body: `{ title, description, category, ... }`
- Response: `Job`

**Update Job (Employer)**
- Method: PUT
- Path: `/jobs/{id}`
- Body: `{ title, description, ... }`
- Response: `Job`

**Delete Job (Employer)**
- Method: DELETE
- Path: `/jobs/{id}`
- Response: `{ success }`

### Job Application Endpoints

**Submit Application**
- Method: POST
- Path: `/applications`
- Body: `{ jobId, coverLetter, resume }`
- Response: `Application`

**Get My Applications (Job Seeker)**
- Method: GET
- Path: `/applications/my`
- Response: `Application[]`

**Get Job Applicants (Employer)**
- Method: GET
- Path: `/applications/job/{jobId}`
- Response: `Application[]`

**Update Application Status (Employer)**
- Method: PUT
- Path: `/applications/{id}/status`
- Body: `{ status }`
- Response: `Application`

**Withdraw Application (Job Seeker)**
- Method: DELETE
- Path: `/applications/{id}`
- Response: `{ success }`

### Saved Jobs Endpoints

**Get Saved Jobs**
- Method: GET
- Path: `/saved-jobs`
- Response: `SavedJob[]`

**Save Job**
- Method: POST
- Path: `/saved-jobs`
- Body: `{ jobId }`
- Response: `SavedJob`

**Remove Saved Job**
- Method: DELETE
- Path: `/saved-jobs/{id}`
- Response: `{ success }`

### Profile Endpoints

**Get Profile**
- Method: GET
- Path: `/profile`
- Response: `Profile`

**Update Profile**
- Method: PUT
- Path: `/profile`
- Body: `{ name, email, phone, ... }`
- Response: `Profile`

**Upload Profile Picture**
- Method: POST
- Path: `/profile/picture`
- Body: FormData (multipart)
- Response: `{ url }`

**Upload Resume**
- Method: POST
- Path: `/profile/resume`
- Body: FormData (multipart)
- Response: `{ url }`

### Contact Endpoints

**Submit Contact Message**
- Method: POST
- Path: `/contacts/public`
- Body: `{ name, email, subject, message }`
- Response: `ContactMessage`

**Get Contact Messages (Admin)**
- Method: GET
- Path: `/contacts/admin`
- Response: `ContactMessage[]`

## Service Modules

### companyService.js

Handles all company-related API operations.

**Functions:**
- `fetchCompanies()` - Get all companies with jobs
- `fetchCompanyById(id)` - Get specific company
- `fetchCompanyByName(name)` - Search company by name
- `fetchAllJobs()` - Get aggregated jobs from all companies
- `transformJob(job)` - Transform job data from API response

**Data Transformation:**
- Parses JSON strings in API responses
- Handles missing or malformed data
- Validates array fields (requirements, benefits)
- Provides default values

### jobApplicationService.js

Manages job application operations.

**Functions:**
- `submitApplication(jobId, data)` - Apply for a job
- `getMyApplications()` - Get user's applications
- `getJobApplicants(jobId)` - Get job's applicants
- `updateApplicationStatus(appId, status)` - Update status
- `withdrawApplication(appId)` - Cancel application
- `getApplicationDetails(appId)` - Get application details

**Data Format:**
```
Application {
  id: string
  jobId: string
  userId: string
  status: 'pending' | 'accepted' | 'rejected' | 'interview'
  coverLetter: string
  appliedAt: ISO8601DateTime
  job: Job (nested)
}
```

### savedJobService.js

Handles saved/bookmarked jobs.

**Functions:**
- `getSavedJobs()` - Get all saved jobs
- `saveJob(jobId)` - Save a job
- `unsaveJob(jobId)` - Remove saved job
- `isSaved(jobId)` - Check if job is saved

**Data Format:**
```
SavedJob {
  id: string
  jobId: string
  userId: string
  savedAt: ISO8601DateTime
  job: Job (nested)
}
```

### profileService.js

Manages user profile operations.

**Functions:**
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update profile
- `uploadProfileImage(file)` - Upload picture
- `uploadResume(file)` - Upload resume
- `getSkills()` - Get user skills
- `addSkill(skill)` - Add skill
- `removeSkill(skillId)` - Remove skill

### contactService.js

Handles contact form submissions.

**Functions:**
- `submitContactMessage(data)` - Submit contact form
- `getContactMessages()` - Get messages (admin)
- `getMessageDetails(id)` - Get message details
- `markAsRead(id)` - Mark as read
- `replyToMessage(id, reply)` - Send reply

## Request/Response Patterns

### Successful Request

```
Request:
GET /jobs?page=1&limit=20
Headers: Authorization: Bearer {token}

Response: 200 OK
{
  "data": {
    "jobs": [...],
    "total": 100,
    "page": 1
  },
  "success": true
}
```

### Error Response

```
Response: 400 Bad Request
{
  "error": "Validation failed",
  "message": "Email is required",
  "errors": {
    "email": "Email is required"
  }
}
```

### Error Types

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (resource already exists) |
| 422 | Unprocessable Entity (validation error) |
| 500 | Internal Server Error |

## Data Models

### User Model

```
User {
  userId: string
  name: string
  email: string
  phone: string
  role: 'ROLE_JOB_SEEKER' | 'ROLE_EMPLOYER' | 'ROLE_ADMIN'
  profileImage?: string (URL)
  createdAt: ISO8601DateTime
  updatedAt: ISO8601DateTime
  
  // For job seekers
  title?: string
  location?: string
  bio?: string
  skills?: string[]
  
  // For employers
  company?: string
  companyId?: string
}
```

### Job Model

```
Job {
  id: string
  title: string
  description: string
  category: string
  location: string
  salaryMin: number
  salaryMax: number
  salary: string (formatted)
  jobType: string
  experience: string
  company: Company
  companyId: string
  requirements: string[]
  benefits: string[]
  applicantCount?: number
  postedDate: ISO8601DateTime
  deadline: ISO8601DateTime
  createdBy: string (userId)
  createdAt: ISO8601DateTime
  updatedAt: ISO8601DateTime
}
```

### Company Model

```
Company {
  id: string
  name: string
  description: string
  logo: string (URL)
  website: string
  location: string
  size: string
  industry: string
  foundedYear: number
  jobs: Job[]
  jobCount: number
  createdAt: ISO8601DateTime
  updatedAt: ISO8601DateTime
}
```

### Application Model

```
Application {
  id: string
  jobId: string
  userId: string
  status: 'pending' | 'viewed' | 'shortlisted' | 'interview' | 'offered' | 'rejected'
  coverLetter: string
  resume: {
    url: string
    filename: string
  }
  applicant: User
  job: Job
  appliedAt: ISO8601DateTime
  updatedAt: ISO8601DateTime
}
```

## Error Handling

### HTTP Client Interceptors

**Request Interceptor:**
- Adds Authorization header
- Adds CSRF token for state-changing requests
- Skips auth for public endpoints

**Response Interceptor:**
- Catches HTTP errors
- Handles 401 errors (unauthorized)
- Redirects to login on authentication failure
- Transforms error messages

### Service Layer Error Handling

Services wrap API calls in try-catch:

```
try {
  const response = await httpClient.get(endpoint)
  return response.data
} catch (error) {
  console.error('API Error:', error)
  throw new Error(error.response?.data?.message || 'An error occurred')
}
```

### Component Level Error Handling

Components display user-friendly error messages:

```
try {
  await apiCall()
  toast.success('Operation successful')
} catch (error) {
  toast.error(error.message)
  setError(error)
}
```

## API Best Practices

### Request Optimization

1. **Pagination** - Use limit and offset parameters
2. **Filtering** - Filter on server-side when possible
3. **Caching** - Leverage browser caching for GET requests
4. **Batch Requests** - Combine related requests when beneficial

### Response Handling

1. **Data Transformation** - Transform in service layer
2. **Error Messages** - Display user-friendly errors
3. **Status Codes** - Handle different HTTP status codes
4. **Loading States** - Show loading indicators

### Performance

1. **Lazy Loading** - Load data on demand
2. **Pagination** - Don't load all data at once
3. **Caching** - Store frequently accessed data
4. **Debouncing** - Debounce search and filter requests

## Testing API Calls

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Perform actions in app
4. Check request/response details
5. Verify status codes and data

### Common Issues

**Connection Refused**
- Verify backend is running
- Check URL in VITE_API_BASE_URL
- Check network firewall

**CORS Errors**
- Check CORS configuration on backend
- Verify Access-Control-Allow-Origin headers
- Try with credentials: true

**401 Unauthorized**
- Verify JWT token is valid
- Check token expiration
- Re-login if needed

**5xx Server Errors**
- Check backend logs
- Verify database connection
- Check server resources

## API Documentation Resources

- Backend API Swagger/OpenAPI documentation
- Backend repository documentation
- API endpoint examples in services
- Network tab in browser DevTools

## Future API Enhancements

- GraphQL integration
- WebSocket for real-time updates
- Webhook support
- API versioning improvements
- Rate limiting configuration
- Advanced caching strategies

---

**Last Updated:** May 2026

For service layer implementation details, see [DOCUMENTATION.md](DOCUMENTATION.md).
