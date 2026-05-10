# INSTALLATION.md - Detailed Setup Instructions

## Installation Guide for Job Portal UI

This guide provides step-by-step instructions for setting up the Job Portal UI project on your local machine.

## Prerequisites

Before starting, ensure you have the following installed:

### Required
- **Node.js** - Version 16.0.0 or higher
- **npm** - Comes with Node.js (version 7.0.0 or higher)
- **Git** - For cloning the repository
- **Backend API** - Running at `http://localhost:8080/api`

### Optional
- **Yarn** - Alternative package manager to npm
- **Docker** - For containerized development
- **VS Code** - Recommended code editor

### Verify Prerequisites

Check if you have the required software:

```bash
# Check Node.js version
node --version
# Should be v16.0.0 or higher

# Check npm version
npm --version
# Should be 7.0.0 or higher

# Check Git version
git --version
```

## Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/job-portal-ui.git

# Navigate to project directory
cd job-portal-ui
```

### Step 2: Verify Project Structure

Ensure the following directories exist:

```
job-portal-ui/
├── public/
├── src/
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html
```

### Step 3: Install Dependencies

```bash
# Install project dependencies
npm install

# This will:
# - Install all packages from package.json
# - Create node_modules directory
# - Generate package-lock.json
```

**Installation may take 2-5 minutes depending on your internet connection.**

### Step 4: Verify Installation

Verify that all dependencies are correctly installed:

```bash
# List installed packages
npm list

# Check for any issues
npm audit
```

### Step 5: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Create the file
touch .env.local

# Or on Windows:
# type nul > .env.local
```

Add the following environment variables:

```
# API Configuration (Required)
VITE_API_BASE_URL=http://localhost:8080/api

# Stripe Configuration (Optional, if using payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key

# Feature Flags (Optional)
VITE_ENABLE_PAYMENTS=false
```

**Note:** Do not commit `.env.local` to version control. It should be in `.gitignore`.

### Step 6: Ensure Backend is Running

The application requires a backend API to be running:

```bash
# Backend should be accessible at:
http://localhost:8080/api

# If your backend is on a different port, update VITE_API_BASE_URL
```

### Step 7: Start Development Server

```bash
# Start the development server
npm run dev

# You should see output like:
# > vite
# ➜  Local:   http://localhost:5173/
# ➜  press h + enter to show help
```

### Step 8: Open in Browser

- Navigate to `http://localhost:5173`
- The application should load successfully
- You should see the home page

## Verification Checklist

After installation, verify everything works:

- [ ] `npm install` completed without errors
- [ ] `.env.local` file created with correct values
- [ ] Backend API is running and accessible
- [ ] Development server starts: `npm run dev`
- [ ] Application loads at `http://localhost:5173`
- [ ] No console errors in browser DevTools
- [ ] Pages load and display content
- [ ] Theme toggle works (dark/light mode)
- [ ] Network requests show API calls in DevTools

## Installation with Yarn

If you prefer Yarn instead of npm:

```bash
# Install dependencies with Yarn
yarn install

# Start development server
yarn dev

# Build project
yarn build

# Preview production build
yarn preview

# Run linting
yarn lint
```

## Installation with Docker

### Prerequisites
- Docker installed and running
- Docker Compose (optional)

### Dockerfile Setup

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

### Build and Run

```bash
# Build Docker image
docker build -t job-portal-ui .

# Run container
docker run -p 5173:5173 \
  -e VITE_API_BASE_URL=http://localhost:8080/api \
  job-portal-ui
```

## Troubleshooting Installation

### Node Version Mismatch

**Problem:** Incompatible Node version
**Solution:**
```bash
# Check Node version
node --version

# Update Node via:
# Windows: Download from https://nodejs.org
# Mac: brew install node
# Linux: Use package manager or nvm
```

### Dependencies Won't Install

**Problem:** `npm install` fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Port 5173 Already in Use

**Problem:** Port 5173 is occupied
**Solution:**
```bash
# Use a different port
npm run dev -- --port 3000

# Or kill the process using port 5173:
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173
```

### API Connection Errors

**Problem:** Cannot connect to backend API
**Solution:**
1. Verify backend is running at correct URL
2. Check `VITE_API_BASE_URL` in `.env.local`
3. Verify CORS is enabled on backend
4. Check network tab in DevTools

### Module Not Found Errors

**Problem:** Missing modules after installation
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Or install specific missing package
npm install package-name
```

### Build Errors

**Problem:** Build fails or syntax errors
**Solution:**
```bash
# Run linting to find issues
npm run lint

# Fix issues automatically
npm run lint -- --fix

# Try rebuilding
npm run build
```

## Post-Installation Setup

### IDE Configuration

#### VS Code
1. Install recommended extensions:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier

2. Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
```

### Git Configuration

```bash
# Set up git user (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Create a feature branch
git checkout -b feature/your-feature
```

## Development Setup

### Running Different Tasks

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Fix lint issues
npm run lint -- --fix
```

### Setting Up Pre-commit Hooks

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run lint
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Backend Integration

### Expected Backend Setup

The backend should provide:

- User authentication endpoints
- Job listing and search endpoints
- Company information endpoints
- Application management endpoints
- Profile management endpoints

### Testing API Connection

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload application
4. Check for successful API calls
5. Look for 200 status codes
6. Monitor for CORS errors

## Next Steps

After successful installation:

1. Read [README.md](README.md) for overview
2. Check [FEATURES.md](FEATURES.md) for available features
3. Review [DOCUMENTATION.md](DOCUMENTATION.md) for technical details
4. Start development: `npm run dev`
5. Make your first changes
6. Submit your contribution

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting-installation) section
2. Review [DOCUMENTATION.md](DOCUMENTATION.md)
3. Check GitHub [Issues](../../issues)
4. Create a new issue with details

---

**Last Updated:** May 2026
