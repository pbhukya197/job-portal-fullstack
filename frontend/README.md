# README.md - Job Portal UI

# Job Portal UI - A Modern Job Marketplace Platform

[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1.0-purple)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.6-06B6D4)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A comprehensive, full-featured job portal application built with modern React and Vite. This platform connects job seekers, employers, and administrators in a seamless, responsive web application with role-based access control and advanced job matching capabilities.

## 🌟 Overview

Job Portal UI is a frontend application designed to power a complete job marketplace ecosystem. It provides an intuitive interface for:

- **Job Seekers** to discover, apply for, and track job opportunities
- **Employers** to post jobs and manage applications
- **Administrators** to oversee the platform and manage users

The application is built with modern web technologies and best practices, featuring a responsive design, dark mode support, and real-time notifications.

## ✨ Key Features

### For Job Seekers
- Advanced job search with filters (location, category, salary, experience level)
- Job application tracking and status management
- Save/bookmark favorite jobs for later
- Comprehensive profile management with resume upload
- Work history and education tracking
- Skills endorsement system
- Applied jobs history with detailed status

### For Employers
- Post and manage job listings
- View and manage job applicants
- Track application status and pipeline
- Company profile customization
- Job performance analytics
- Applicant resume review

### For Administrators
- Comprehensive platform dashboard
- Company management (CRUD operations)
- Employer account management
- Contact message management
- Platform statistics and analytics
- User activity monitoring

### General Features
- Multi-role authentication system
- Dark and light theme modes
- Responsive design (mobile, tablet, desktop)
- Real-time toast notifications
- Form validation and error handling
- Data persistence with localStorage
- CSRF protection
- Role-based route protection

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Backend API running at `http://localhost:8080/api`

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/job-portal-ui.git

# Navigate to project directory
cd job-portal-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

The project follows a scalable, modular architecture:

```
job-portal-ui/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Route-specific pages
│   ├── context/              # React Context for state management
│   ├── services/             # API integration layer
│   ├── config/               # Configuration files
│   ├── data/                 # Mock data for development
│   ├── App.jsx               # Root component
│   └── main.jsx              # Entry point
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── eslint.config.js          # Linting rules
```

## 🛠 Technology Stack

### Frontend Framework
- **React 19.0.0** - UI library with modern hooks
- **Vite 7.1.0** - Fast build tool and dev server
- **React Router DOM 7.8.0** - Client-side routing

### State Management
- **React Context API** - Global state management
- **Redux Toolkit 2.8.1** - Additional state management support

### Styling
- **Tailwind CSS 4.0.6** - Utility-first CSS framework
- **Font Awesome 6.7.2** - Icon library
- **Lucide React 0.539.0** - Modern icon set

### HTTP & API
- **Axios 1.8.1** - HTTP client for API requests
- **js-cookie 3.0.5** - Cookie management

### Additional Libraries
- **React Toastify 11.0.5** - Toast notifications
- **Stripe Integration** - Payment processing support

### Development Tools
- **ESLint 9.17.0** - Code quality linting
- **Tailwind CSS Vite Plugin** - CSS processing

## 🔐 Authentication & Authorization

The application supports three distinct user roles:

### Role Types

**Job Seeker** (`ROLE_JOB_SEEKER`)
- Apply for job positions
- Search and filter job listings
- Maintain professional profile
- Track application status
- Save favorite jobs

**Employer** (`ROLE_EMPLOYER`)
- Post and manage job listings
- Review applicant profiles
- Manage application pipeline
- Company profile management
- Track job performance

**Administrator** (`ROLE_ADMIN`)
- Full platform access
- User management
- Company management
- Content moderation
- Platform analytics

### Security Features
- JWT token-based authentication
- CSRF protection for state-changing operations
- Secure cookie handling
- Protected routes with role validation
- Automatic session management

## 📋 Main Pages & Sections

### Public Pages
- **Home** - Landing page with featured jobs and companies
- **Jobs** - Job listings with advanced search and filters
- **Job Details** - Comprehensive job information and application form
- **Companies** - Company directory and browsing
- **Company Details** - Company profiles and open positions
- **Contact** - Contact form for inquiries

### Job Seeker Pages (Protected)
- **Profile** - Resume, skills, experience, and education management
- **Applied Jobs** - Track submitted applications and statuses
- **Saved Jobs** - Manage bookmarked job listings

### Employer Pages (Protected)
- **Post Job** - Create and publish new job listings
- **My Jobs** - Manage posted jobs and view applicant counts
- **Job Applicants** - Review and manage applications for specific jobs

### Admin Pages (Protected)
- **Dashboard** - Platform overview and statistics
- **Company Management** - CRUD operations for companies
- **Employer Management** - Manage employer accounts
- **Contact Messages** - View and respond to contact submissions

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_key_here
VITE_ENABLE_PAYMENTS=false
```

### API Configuration

The application communicates with a backend API. Ensure the backend is running and accessible at the configured URL. All API requests go through a centralized HTTP client with:

- Automatic token injection
- CSRF protection
- Request/response interceptors
- Error handling and logging

## 📦 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Run ESLint to check code quality
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix
```

### Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 🚢 Deployment

### Build Process

1. Create production build: `npm run build`
2. The `dist/` directory contains the optimized bundle
3. Deploy the `dist/` folder to your hosting provider

### Hosting Options

- **Netlify** - Recommended, with automatic builds
- **Vercel** - Optimized for Vite projects
- **GitHub Pages** - Free hosting for static sites
- **Traditional Web Server** - Apache, Nginx, or other servers

### Post-Deployment Configuration

- Update `VITE_API_BASE_URL` environment variable to production API
- Configure server for client-side routing (serve index.html for all routes)
- Set up proper HTTP headers for caching and security
- Enable HTTPS/SSL certificate

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Dark Mode

The application includes built-in dark mode support. Users can toggle between light and dark themes, which is persisted in local storage. The implementation uses Tailwind CSS dark mode utilities and a custom theme context.

## 🔔 Notifications

User actions trigger toast notifications using React Toastify:
- Success messages for completed actions
- Error alerts for failed operations
- Information messages for user guidance
- Warning prompts for destructive actions

## 🗂 State Management

The application uses React Context API for global state:

- **AuthContext** - User authentication and session
- **JobContext** - Job applications and saved jobs
- **ThemeContext** - Dark/light mode preference
- **CompaniesContext** - Company data and listings
- **JobsDataContext** - Job aggregation and search

## 🔗 API Integration

The application integrates with a backend REST API for:

- User authentication and registration
- Job listings and details
- Job applications and tracking
- Company information
- Profile management
- Contact message handling

All API communication is handled through service modules that provide clean abstractions and consistent error handling.

## 🤝 Contributing

We welcome contributions from the community. Please follow these guidelines:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines
2. Fork the repository
3. Create a feature branch
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

Please ensure your code follows the project's ESLint rules and maintains the existing code style.

## 📖 Documentation

- [DOCUMENTATION.md](DOCUMENTATION.md) - Comprehensive technical documentation
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Detailed project organization
- [FEATURES.md](FEATURES.md) - Complete feature list and descriptions
- [INSTALLATION.md](INSTALLATION.md) - Detailed setup instructions
- [API.md](API.md) - API integration documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

## 🐛 Troubleshooting

### Common Issues

**Port 5173 already in use**
- Change the dev port: `npm run dev -- --port 3000`

**API connection errors**
- Verify backend is running
- Check `VITE_API_BASE_URL` in environment
- Verify CORS configuration on backend

**Build errors**
- Clear dependencies: `rm -rf node_modules`
- Reinstall: `npm install`
- Check for TypeScript/syntax errors

**Dark mode not working**
- Clear browser cache and localStorage
- Restart development server

For more troubleshooting, see the [DOCUMENTATION.md](DOCUMENTATION.md) file.

## 📊 Performance

The application is optimized for performance through:

- Code splitting via Vite
- Lazy loading of route components
- Image optimization
- CSS purging in production
- Minification and compression
- Efficient re-rendering with React hooks

## 🔒 Security

Security is a priority. The application includes:

- JWT token-based authentication
- CSRF protection
- Secure cookie handling
- Input validation
- Protected API routes
- Role-based access control
- Secure HTTP client configuration

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Contributors

- **Original Developer** - Udemy Spring Boot Course
- **Contributors** - [List contributors here]

## 📞 Support

For issues and questions:

1. Check the [DOCUMENTATION.md](DOCUMENTATION.md) file
2. Review [FEATURES.md](FEATURES.md) for feature details
3. Check [Troubleshooting](#troubleshooting) section
4. Open a GitHub issue with detailed information

## 🔮 Future Enhancements

Potential features for future releases:

- Advanced job recommendation engine
- Video interview capabilities
- Salary negotiation tools
- Job seeker skill assessments
- Employer branding tools
- Analytics dashboard enhancements
- Mobile application (iOS/Android)
- Messaging system between users
- Integration with third-party job boards

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🙏 Acknowledgments

- React community for excellent tools and libraries
- Tailwind CSS for powerful styling framework
- Vite team for fast build tooling
- All contributors and supporters

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Status:** Active Development

For the latest updates and news, please follow the repository and check the [releases](../../releases) page.
